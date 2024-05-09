"use server";
import User from "@/lib/database/models/user.model";
import Product from "@/lib/database/models/product.model";
import { mongoConnect } from "@/lib/database/connection";
import { auth } from "@clerk/nextjs/server";
const { userId } = auth();

// Get Wishlist
export async function getWishlist() {
  try {
    await mongoConnect();
    const user = await User.findOne({ clerkId: userId }).populate({
      path: "wishlist",
      model: Product,
      select: "_id name price picture color",
    });
    return JSON.parse(JSON.stringify(user.wishlist));
  } catch (error) {
    console.log(error);
  }
}

// Get Wishlist product
export async function getFromWishlist(productId: string) {
  try {
    await mongoConnect();
    const product = await User.findOne({
      clerkId: userId,
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
export async function addWishlist(productId: string) {
  try {
    await mongoConnect();
    const addProduct = await User.findOneAndUpdate(
      { clerkId: userId, wishlist: { $ne: productId } },
      { $push: { wishlist: productId } },
      { new: true }
    );
    return JSON.parse(JSON.stringify(addProduct));
  } catch (error) {
    console.log(error);
  }
}

// Remove from Wishlist
export async function removeWishlist(productId: string) {
  try {
    await mongoConnect();
    const removeProduct = await User.findOneAndUpdate(
      { clerkId: userId },
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
