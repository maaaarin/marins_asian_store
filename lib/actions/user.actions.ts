"use server";
import User from "@/lib/database/models/user.model";
import { mongoConnect } from "@/lib/database/connection";
import { Product } from "@/types";

// Create User
export async function createUser(user: any) {
  try {
    await mongoConnect();
    const newUser = await User.create(user);
    return JSON.parse(JSON.stringify(newUser));
  } catch (error) {
    console.log(error);
  }
}

// Get User by ID

export async function getUserById(clerkId: string | undefined) {
  try {
    await mongoConnect();
    // Get User
    const userr = await User.findOne({ clerkId: clerkId });
    return JSON.parse(JSON.stringify(userr));
  } catch (error) {
    console.log(error);
  }
}

// Get Wishlist
export async function getWishlist(clerkId: string | undefined) {
  try {
    await mongoConnect();
    // Get user then find wishlist
    const wishlist = await User.findOne({ clerkId: clerkId }).populate({
      path: "wishlist",
      select: "_id name price picture color",
    });
    return JSON.parse(JSON.stringify(wishlist));
  } catch (error) {
    console.log(error);
  }
}

// Add to Wishlist
export async function addToWishlist(
  clerkId: string | undefined,
  product: Product
) {
  try {
    await mongoConnect();
    // Verify if product already exists then add it
    const updateWishlist = await User.findOneAndUpdate(
      { clerkId, wishlist: { $ne: product._id } },
      { $push: { wishlist: product } },
      { new: true }
    );
    return JSON.parse(JSON.stringify(updateWishlist));
  } catch (error) {
    console.log(error);
  }
}

// Get Wishlist product by ID
export async function getWishlistProductById(
  clerkId: string | undefined,
  productId: string
) {
  try {
    await mongoConnect();
    // Verify if product exists
    const getProduct = await User.findOne({
      clerkId,
      wishlist: { $ne: productId },
    });
    return JSON.parse(JSON.stringify(getProduct));
  } catch (error) {
    console.log(error);
  }
}
