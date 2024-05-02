"use server";
import { User as UserType } from "@/types";
import { mongoConnect } from "../database/connection";
import User from "../database/models/user.model";

// Create User
export const createUser = async (user: UserType) => {
  try {
    await mongoConnect();

    const newUser = await User.create({ user });

    return JSON.parse(JSON.stringify(newUser));
  } catch (error) {
    console.log(error);
  }
};

// Function for update xp

// function for level up

// function for level down

// function for
