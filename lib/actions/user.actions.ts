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
