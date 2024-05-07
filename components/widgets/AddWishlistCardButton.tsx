import React, { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { addToWishlist } from "@/lib/actions/user.actions";
import { getWishlistProductById } from "@/lib/actions/user.actions";
import { Product } from "@/types";
import clsx from "clsx";

export const AddWishlistCardButton = ({ product }: { product: Product }) => {
  const [wishlistAdded, setWishlistAdded] = useState(false);

  const { isLoaded, isSignedIn, user } = useUser();

  useEffect(() => {
    // Verificar si el producto ya está en wishlist
    const getProduct = async () => {
      const productFound = await getWishlistProductById(user?.id, product._id);
      if (!productFound) {
        setWishlistAdded(true);
      }
    };
    getProduct();
  }, [user, product]);

  function handleUpdateWishlist() {
    const updateWishlist = async () => {
      const updatingWishlist = await addToWishlist(user?.id, product);
      if (updatingWishlist) {
        setWishlistAdded(true);
      }
    };
    updateWishlist();
  }

  return (
    <button
      className="size-12 bg-white rounded-full grid place-items-center absolute top-0 right-0 m-4 !pointer-events-auto"
      onClick={handleUpdateWishlist}>
      <svg
        viewBox="0 0 24 24"
        className={clsx(
          "size-3/5 ",
          {
            "text-secondary": wishlistAdded,
          },
          {
            "text-gray-300": !wishlistAdded,
          }
        )}
        fill="currentColor">
        <path d="M20.205 4.791a5.938 5.938 0 0 0-4.209-1.754A5.906 5.906 0 0 0 12 4.595a5.904 5.904 0 0 0-3.996-1.558 5.942 5.942 0 0 0-4.213 1.758c-2.353 2.363-2.352 6.059.002 8.412L12 21.414l8.207-8.207c2.354-2.353 2.355-6.049-.002-8.416z"></path>
      </svg>
    </button>
  );
};
