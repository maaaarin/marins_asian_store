"use client";
import React, { useEffect, useRef, useState } from "react";
import { addWishlist, removeWishlist } from "@/lib/actions/wishlist.actions";
import wishlistAddIcon from "@/public/assets/icons/wishlist-add.json";
import wishlistRemoveIcon from "@/public/assets/icons/wishlist-remove.json";
import { existsWishlist } from "@/lib/actions/wishlist.actions";
import { Player } from "@lordicon/react";
import { useRouter } from "next/navigation";
import { useAuth } from "@clerk/nextjs";

type Props = {
  productId: string;
  alreadyAdded?: boolean;
};

export const AddWishlistCardButton = ({ productId, alreadyAdded }: Props) => {
  const router = useRouter();
  const [onWihlist, setOnWishlist] = useState(alreadyAdded);
  const wishlistAddRef = useRef<Player>(null),
    wishlistRemoveRef = useRef<Player>(null);
    const { isLoaded, userId, sessionId, getToken } = useAuth();

  useEffect(() => {
    // Verificar si el producto ya está en wishlist
    const getProduct = async () => {
      const produtExist = await existsWishlist(userId, productId);
      if (!produtExist) {
        setOnWishlist(false);
      } else {
        setOnWishlist(true);
      }
    };
    if (!alreadyAdded) {
      getProduct();
    }
  }, [alreadyAdded, productId, userId]);

  async function handleUpdateWishlist() {
    if (!onWihlist) {
      const addingWishlist = await addWishlist(userId, productId);
      if (addingWishlist) {
        wishlistRemoveRef.current?.playFromBeginning();
        router.refresh();
      }
      return;
    }
    // Then remove
    wishlistRemoveRef.current?.playFromBeginning();
    const removingWishlist = await removeWishlist(userId, productId);
    if (removingWishlist) {
      wishlistAddRef.current?.playFromBeginning();
      router.refresh();
    }
  }

  function handleIconAnimation() {
    if (onWihlist) {
      setOnWishlist(false);
    } else {
      setOnWishlist(true);
    }
  }

  if (alreadyAdded) {
    return (
      <button
        className="size-12 rounded-full grid place-items-center bg-zinc-100"
        onClick={handleUpdateWishlist}>
        <Player ref={wishlistAddRef} icon={wishlistAddIcon} size={36} />
      </button>
    );
  }

  return (
    <button
      className="size-12 rounded-full grid place-items-center bg-white absolute top-0 right-0 m-4 !pointer-events-auto"
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
