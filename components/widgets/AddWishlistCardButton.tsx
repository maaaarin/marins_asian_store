"use client";
import React, { useEffect, useRef, useState } from "react";
import { useUser } from "@clerk/nextjs";
import {
  addToWishlist,
  removeFromWishlist,
} from "@/lib/actions/wishlist.actions";
import wishlistAddIcon from "@/public/assets/icons/wishlist-add.json";
import wishlistRemoveIcon from "@/public/assets/icons/wishlist-remove.json";
import { getFromWishlistById } from "@/lib/actions/wishlist.actions";
import { Product } from "@/types";
import clsx from "clsx";
import { Player } from "@lordicon/react";

export const AddWishlistCardButton = ({ product }: { product: Product }) => {
  const { isLoaded, isSignedIn, user } = useUser();
  const [onWihlist, setOnWishlist] = useState(false);
  const wishlistAddRef = useRef<Player>(null),
    wishlistRemoveRef = useRef<Player>(null);

  useEffect(() => {
    // Verificar si el producto ya está en wishlist
    const getProduct = async () => {
      const productFound = await getFromWishlistById(user?.id, product._id);
      if (!productFound) {
        setOnWishlist(false);
      } else {
        setOnWishlist(true);
      }
    };
    getProduct();
  }, [user, product]);

  async function handleUpdateWishlist() {
    if (!onWihlist) {
      const addingWishlist = await addToWishlist(user?.id, product._id);
      if (addingWishlist) {
        wishlistRemoveRef.current?.playFromBeginning();
      }
      return;
    }
    // Then remove
    wishlistRemoveRef.current?.playFromBeginning();
    const removingWishlist = await removeFromWishlist(user?.id, product._id);
    if (removingWishlist) {
      wishlistAddRef.current?.playFromBeginning();
    }
  }

  function handleIconAnimation() {
    if (onWihlist) {
      setOnWishlist(false);
    } else {
      setOnWishlist(true);
    }
  }

  return (
    <button
      className="size-12 bg-white rounded-full grid place-items-center absolute top-0 right-0 m-4 !pointer-events-auto"
      onClick={handleUpdateWishlist}>
      {onWihlist ? (
        <Player
          ref={wishlistAddRef}
          icon={wishlistAddIcon}
          size={36}
          onComplete={handleIconAnimation}
        />
      ) : (
        <Player
          ref={wishlistRemoveRef}
          icon={wishlistRemoveIcon}
          size={36}
          onComplete={handleIconAnimation}
        />
      )}
    </button>
  );
};
