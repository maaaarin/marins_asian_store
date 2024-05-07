"use server";
import User from "@/lib/database/models/user.model";
import { mongoConnect } from "@/lib/database/connection";
import { Product } from "@/types";

// Get Wishlist
export async function getWishlist(clerkId: string | undefined) {
  try {
    await mongoConnect();
    const wishlist = await User.findOne({ clerkId: clerkId }).populate({
      path: "wishlist",
      select: "_id name price picture color",
    });
    return JSON.parse(JSON.stringify(wishlist));
  } catch (error) {
    console.log(error);
  }
}

// Get Wishlist product by ID
export async function getFromWishlistById(
  clerkId: string | undefined,
  productId: string
) {
  try {
    await mongoConnect();
    const product = await User.findOne({
      clerkId: clerkId,
      wishlist: productId,
    });
    if (product) {
      return true;
    }
    return false;
  } catch (error) {
    console.log(error);
  }
}

// Add to Wishlist
export async function addToWishlist(
  clerkId: string | undefined,
  productId: string
) {
  try {
    await mongoConnect();
    const addProduct = await User.findOneAndUpdate(
      { clerkId, wishlist: { $ne: productId } },
      { $push: { wishlist: productId } },
      { new: true }
    );
    return JSON.parse(JSON.stringify(addProduct));
  } catch (error) {
    console.log(error);
  }
}

// Remove from Wishlist
export async function removeFromWishlist(
  clerkId: string | undefined,
  productId: string
) {
  try {
    await mongoConnect();
    const removeProduct = await User.findOneAndUpdate(
      { clerkId: clerkId },
      { $pull: { wishlist: productId } },
      { new: true }
    );
    if (removeProduct) {
      return true;
    }
    return false;
  } catch (error) {
    console.log(error);
  }
}
