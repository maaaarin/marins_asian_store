"use server";
import { mongoConnect } from "@/lib/database/connection";
import Cart from "../database/models/cart.model";
import Product from "../database/models/product.model";
import { Types } from "mongoose";
import { Cart as CartType, CartItem as CartItemType } from "@/types";

// // Create Cart
// export async function createCart(userId: string | null | undefined, cart: CartType){
//   try {
//     await mongoConnect();
//     const newCart = await Cart.create({
//         userClerkId: userId,
//         items: cart.items,
//         totalQuantity: cart.totalAmount,
//         totalAmount: cart.totalAmount,
//         expireAt: null,
//       });
//       console.log(newCart);
//     return JSON.parse(JSON.stringify(cart));
//   } catch (error) {
//     console.log(error);
//   }
// }

// Get Cart
export async function getCart(
  userId: string | null | undefined,
  cartId?: string | null | undefined
) {
  try {
    await mongoConnect();
    if (userId) {
      const cart = await Cart.findOne({ userClerkId: userId }).populate({
        path: "items.product",
        model: Product,
        select: "_id name price picture color",
      });
      return JSON.parse(JSON.stringify(cart));
    }

    const cart = await Cart.findOne({ _id: cartId }).populate({
      path: "items.product",
      model: Product,
      select: "_id name price picture color",
    });
    return JSON.parse(JSON.stringify(cart));
  } catch (error) {
    console.log(error);
  }
}

// Add to Cart
export async function addCartItem(
  userId: string | null | undefined,
  productId: string | undefined,
  cartId?: string | null | undefined
) {
  try {
    await mongoConnect();

    // Get product details
    const product = await Product.findOne({ _id: productId });

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
          totalAmount: product.price,
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
          {
            $inc: {
              "items.$.quantity": 1,
              totalQuantity: 1,
              totalAmount: product.price,
            },
          },
          { new: true }
        );
      } else {
        // Add it
        await Cart.updateOne(
          { userClerkId: userId },
          {
            $push: { items: { product: productId, quantity: 1 } },
            $inc: { totalQuantity: 1, totalAmount: product.price },
          },
          { new: true }
        );
      }
      return true;
    }

    // If it's a guest with no cart, creates a new one
    const cartExists = await Cart.exists({ _id: cartId });

    // If Cart doesn't exist, create a new one
    if (!cartExists) {
      const cart = await Cart.create({
        userClerkId: null,
        items: { product: productId, quantity: 1 },
        totalQuantity: 1,
        totalAmount: product.price,
        expireAt: Date.now(),
      });
      return JSON.parse(JSON.stringify(cart));
    }

    const cartProduct = await Cart.exists({
      _id: cartId,
      items: { $elemMatch: { product: productId } },
    });

    // If product exists, increase quantity or...
    if (cartProduct) {
      const increaseProduct = await Cart.updateOne(
        { _id: cartId, "items.product": productId },
        {
          _id: cartId,
          $inc: {
            "items.$.quantity": 1,
            totalQuantity: 1,
            totalAmount: product.price,
          },
        },
        { new: true }
      );
      return JSON.parse(JSON.stringify(increaseProduct));
    } else {
      // Add it
      const addNewProduct = await Cart.updateOne(
        { _id: cartId },
        {
          _id: cartId,
          $push: { items: { product: productId, quantity: 1 } },
          $inc: { totalQuantity: 1, totalAmount: product.price },
        },
        { new: true }
      );
      return JSON.parse(JSON.stringify(addNewProduct));
    }
  } catch (error) {
    console.log(error);
  }
}

export async function increaseCartItem(
  userId: string | null | undefined,
  productId: string | undefined,
  cartId?: string | null | undefined
) {
  try {
    await mongoConnect();
    // Get product details
    const product = await Product.findOne({ _id: productId });

    // If it's a user
    if (userId) {
      const increaseItem = await Cart.findOneAndUpdate(
        { userClerkId: userId, "items.product": productId },
        {
          $inc: {
            "items.$.quantity": 1,
            totalQuantity: 1,
            totalAmount: product.price,
          },
        },
        { new: true }
      );
      return JSON.parse(JSON.stringify(increaseItem));
    }

    // Then guest cart
    const increaseItem = await Cart.updateOne(
      { _id: cartId, "items.product": productId },
      {
        _id: cartId,
        $inc: {
          "items.$.quantity": 1,
          totalQuantity: 1,
          totalAmount: product.price,
        },
      },
      { new: true }
    );
    return JSON.parse(JSON.stringify(increaseItem));
  } catch (error) {}
}

export async function decreaseCartItem(
  userId: string | null | undefined,
  productId: string | undefined,
  cartId?: string | null | undefined
) {
  try {
    await mongoConnect();
    // Get product details
    const product = await Product.findOne({ _id: productId });

    // If it's a user
    if (userId) {
      const decreaseItem = await Cart.findOneAndUpdate(
        {
          userClerkId: userId,
          items: {
            $elemMatch: {
              product: productId,
              quantity: { $gt: 1 },
            },
          },
        },
        {
          $inc: {
            "items.$[elem].quantity": -1,
            totalQuantity: -1,
            totalAmount: -product.price,
          },
        },
        {
          new: true,
          arrayFilters: [
            { "elem.product": productId, "elem.quantity": { $gt: 1 } },
          ],
        }
      );
      return JSON.parse(JSON.stringify(decreaseItem));
    }

    // Then guest cart
    const decreaseItem = await Cart.findOneAndUpdate(
      {
        _id: cartId,
        items: {
          $elemMatch: {
            product: productId,
            quantity: { $gt: 1 },
          },
        },
      },
      {
        $inc: {
          "items.$[elem].quantity": -1,
          totalQuantity: -1,
          totalAmount: -product.price,
        },
      },
      {
        new: true,
        arrayFilters: [
          { "elem.product": productId, "elem.quantity": { $gt: 1 } },
        ],
      }
    );
    return JSON.parse(JSON.stringify(decreaseItem));
  } catch (error) {
    console.log(error);
  }
}

export async function removeCartItem(
  userId: string | null | undefined,
  productId: string | undefined,
  cartId?: string | null | undefined
) {
  try {
    await mongoConnect();

    // If it's a user
    if (userId) {
      // Get car item details
      const cartItem = await Cart.findOne(
        { userClerkId: userId },
        { items: { $elemMatch: { product: productId } } }
      ).populate({
        path: "items.product",
        model: Product,
        select: "_id name price picture color",
      });

      const removeItem = await Cart.findOneAndUpdate(
        { userClerkId: userId },
        {
          $pull: { items: { product: productId } },
          $inc: {
            totalQuantity: -cartItem.items[0].quantity,
            totalAmount: -(
              cartItem.items[0].product.price * cartItem.items[0].quantity
            ),
          },
        },
        { new: true }
      );
      return JSON.parse(JSON.stringify(removeItem));
    }
  } catch (error) {
    console.log(error);
  }
}

export async function clearCart(
  userId: string | null | undefined,
  cartId?: string | null | undefined
) {
  try {
    await mongoConnect();
    // Find and delete cart
    const clearUserCart = await Cart.findOneAndDelete({ userClerkId: userId });
    return JSON.parse(JSON.stringify(clearUserCart));
  } catch (error) {
    console.log(error);
  }
}
