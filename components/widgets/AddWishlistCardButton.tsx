"use client";
import React, { useEffect, useRef, useState } from "react";
import { addWishlist, removeWishlist } from "@/lib/actions/wishlist.actions";
import wishlistAddIcon from "@/public/assets/icons/wishlist-add.json";
import wishlistRemoveIcon from "@/public/assets/icons/wishlist-remove.json";
import { getFromWishlist } from "@/lib/actions/wishlist.actions";
import { Player } from "@lordicon/react";
import { useRouter } from "next/navigation";

type Props = {
  productId: string;
  alreadyAdded?: boolean;
};

export const AddWishlistCardButton = ({ productId, alreadyAdded }: Props) => {
  const router = useRouter();
  const [onWihlist, setOnWishlist] = useState(alreadyAdded);
  const wishlistAddRef = useRef<Player>(null),
    wishlistRemoveRef = useRef<Player>(null);

  useEffect(() => {
    // Verificar si el producto ya está en wishlist
    const getProduct = async () => {
      const productFound = await getFromWishlist(productId);
      if (!productFound) {
        setOnWishlist(false);
      } else {
        setOnWishlist(true);
      }
    };
    if (!alreadyAdded) {
      getProduct();
    }
  }, [alreadyAdded, productId]);

  async function handleUpdateWishlist() {
    if (!onWihlist) {
      const addingWishlist = await addWishlist(productId);
      if (addingWishlist) {
        wishlistRemoveRef.current?.playFromBeginning();
        router.refresh();
      }
      return;
    }
    // Then remove
    wishlistRemoveRef.current?.playFromBeginning();
    const removingWishlist = await removeWishlist(productId);
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
