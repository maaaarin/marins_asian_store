import React from "react";
import { useUser } from "@clerk/nextjs";
import { updateWishlist } from "@/lib/actions/user.actions";
import { Product } from "@/types";

export const AddWishlistCardButton = ({ product }: { product: Product }) => {
  const { isLoaded, isSignedIn, user } = useUser();

  function handleAddWishlist() {
    const addToWishlist = async () => {
      await updateWishlist(user?.id, product);
      console.log("working!");
    };
    addToWishlist();
  }

  return (
    <button
      className="size-12 bg-white rounded-full grid place-items-center absolute top-0 right-0 m-4 !pointer-events-auto"
      onClick={handleAddWishlist}>
      <svg
        viewBox="0 0 24 24"
        className="size-3/5 text-gray-300"
        fill="currentColor">
        <path d="M20.205 4.791a5.938 5.938 0 0 0-4.209-1.754A5.906 5.906 0 0 0 12 4.595a5.904 5.904 0 0 0-3.996-1.558 5.942 5.942 0 0 0-4.213 1.758c-2.353 2.363-2.352 6.059.002 8.412L12 21.414l8.207-8.207c2.354-2.353 2.355-6.049-.002-8.416z"></path>
      </svg>
    </button>
  );
};
