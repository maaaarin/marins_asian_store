"use server";
import { mongoConnect } from "@/lib/database/connection";
import Cart from "../database/models/cart.model";
import Product from "../database/models/product.model";
import User from "../database/models/user.model";

// Get Cart
export async function getCart(userId: string | null | undefined) {
  try {
    await mongoConnect();
    const cart = await Cart.findOne({ userClerkId: userId }).populate({
      path: "items.product",
      model: Product,
      select: "_id name price picture color",
    });
    console.log("asd")
    if (!cart) throw new Error('Cart not found')
    return JSON.parse(JSON.stringify(cart));
  } catch (error) {
    console.log(error);
  }
}

// Add to Cart
export async function addCart(userId: string | null | undefined, productId: string | undefined) {
  try {
    await mongoConnect();

    if (userId) {
      // Check user cart
      const cartExists = await Cart.exists({ userClerkId: userId });

      // Is there's no cart, create one and push
      if (!cartExists) {
        await Cart.create({
          userClerkId: userId,
          items: { product: productId, quantity: 1 },
          totalQuantity: 1,
          expireAt: null,
        });
        return;
      }

      const cartProduct = await Cart.exists({
        userClerkId: userId,
        items: { $elemMatch: { product: productId } },
      });

      // If product exists, increase quantity or...
      if (cartProduct) {
        await Cart.updateOne(
          { userClerkId: userId, "items.product": productId },
          { $inc: { "items.$.quantity": 1, totalQuantity: 1 } },
          { new: true }
        );
      } else {
        // Add it
        await Cart.updateOne(
          { userClerkId: userId },
          {
            $push: { items: { product: productId, quantity: 1 } },
            $inc: { totalQuantity: 1 },
          },
          { new: true }
        );
      }
      return;
    }

    // Check user cart
    const cartExists = await Cart.exists({ userClerkId: userId });

    // Is there's no cart, create one and push
    if (!cartExists) {
      await Cart.create({
        userClerkId: userId,
        items: { product: productId, quantity: 1 },
        expireAt: null,
      });
      // { $push: { items: { product: productId, quantity: 1 } } }
      return;
    }

    const cartProduct = await Cart.exists({
      userClerkId: userId,
      items: { $elemMatch: { product: productId } },
    });

    // If product exists, increase quantity or...
    if (cartProduct) {
      await Cart.updateOne(
        { userClerkId: userId, "items.product": productId },
        { $inc: { "items.$.quantity": 1 } },
        { new: true }
      );
    } else {
      // Add it
      await Cart.updateOne(
        { userClerkId: userId },
        { $push: { items: { product: productId, quantity: 1 } } },
        { new: true }
      );
    }

    return;
  } catch (error) {
    console.log(error);
  }
}

// const item = state.items.find(
//   (item) => item.product._id === action.payload.product._id
// );

// if (item) {
//   item.quantity++;
// } else {
//   state.items.push({ ...action.payload, quantity: 1 });
//   state.totalQuantity++;
// }
