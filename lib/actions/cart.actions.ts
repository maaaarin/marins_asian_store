"use server";
import { mongoConnect } from "@/lib/database/connection";
import Cart from "../database/models/cart.model";
import Product from "../database/models/product.model";
import { Types } from "mongoose";

// Get Cart
export async function getCart(userId: string | null | undefined) {
  try {
    await mongoConnect();
    const cart = await Cart.findOne({ userClerkId: userId }).populate({
      path: "items.product",
      model: Product,
      select: "_id name price picture color",
    });
    console.log("asd");
    if (!cart) throw new Error("Cart not found");
    return JSON.parse(JSON.stringify(cart));
  } catch (error) {
    console.log(error);
  }
}

// Add to Cart
export async function addCart(
  userId: string | null | undefined,
  productId: string | undefined,
  cartId?: string | null | undefined
) {
  try {
    await mongoConnect();

    // If it's a user
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
        return false;
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
      return true;
    }

    // Check guest cart
    // if (!cartId) {
    //   const test = await Cart.create({
    //     userClerkId: null,
    //     items: { product: productId, quantity: 1 },
    //     expireAt: Date.now(),
    //   });
    //   console.log("test---");
    //   console.log(test);
    //   return JSON.parse(JSON.stringify(test));
    // }

    // If it's a guest with no cart, creates a new one

    console.log("verify cart id");
    console.log(cartId);
    const cartExists = await Cart.exists({ _id: cartId });

    if (!cartExists) {
      const test = await Cart.create({
        userClerkId: null,
        expireAt: Date.now(),
      });
      console.log("test---");
      console.log(test);
      return JSON.parse(JSON.stringify(test));
    }

    const cartProduct = await Cart.exists({
      _id: cartId,
      items: { $elemMatch: { product: productId } },
    });

    // If product exists, increase quantity or...
    if (cartProduct) {
      const increaseProduct = await Cart.updateOne(
        { _id: cartId, "items.product": productId },
        { _id: cartId, $inc: { "items.$.quantity": 1 } },
        { new: true }
      );
      console.log(increaseProduct);
      return JSON.parse(JSON.stringify(increaseProduct));
    } else {
      // Add it
      console.log("añadir ya que no existe");
      const addNewProduct = await Cart.updateOne(
        { _id: cartId },
        { _id: cartId, $push: { items: { product: productId, quantity: 1 } } },
        { new: true }
      );
      return JSON.parse(JSON.stringify(addNewProduct));
    }
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
