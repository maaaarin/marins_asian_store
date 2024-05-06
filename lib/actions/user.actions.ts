"use server";
import { Product, User as UserType } from "@/types";
import { mongoConnect } from "../database/connection";
import User from "../database/models/user.model";

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

export async function updateWishlist(
  clerkId: string | undefined,
  product: Product
) {
  try {
    await mongoConnect();

    const updateWishlist = await User.findOneAndUpdate(
      { clerkId },
      { $push: { wishlist: product } },
      { new: true }
    );

    return JSON.parse(JSON.stringify(updateWishlist));
  } catch (error) {
    console.log(error);
  }
}

// Function for update xp

// function for level up

// function for level down

// function for
