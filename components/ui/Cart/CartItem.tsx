"use client";

import { ModifyItemQuantity } from "@/components/widgets/ModifyItemQuantity";
import { cartIdSelector, removeItem } from "@/lib/store/slices/cart.slice";
import { CartItem as CartItemType } from "@/types";
import Image from "next/image";
import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import trashIcon from "@/public/assets/icons/trash.json";
import { Player } from "@lordicon/react";
import { useAuth } from "@clerk/nextjs";
import { removeCartItem } from "@/lib/actions/cart.actions";
import { AddWishlistButton } from "@/components/widgets/AddWishlistButton";

type Props = {
  item: CartItemType;
};

export const CartItem = ({ item }: Props) => {
  const { userId } = useAuth();
  const dispatch = useDispatch();
  const cartId = useSelector(cartIdSelector);
  const product = item.product;

  // Animated icon
  const playerRef = useRef<Player>(null);

  function handleIconAnimation() {
    let iconAnimation = playerRef.current;
    if (!iconAnimation?.isPlaying) {
      iconAnimation?.playFromBeginning();
    }
  }

  function handleRemoveCartItem() {
    const removingItem = async () => {
      if (userId) {
        const removeItemm = await removeCartItem(userId, product._id);
        return;
      }
      const removeItemm = await removeCartItem(null, product._id, cartId);
    };
    dispatch(removeItem({ item }));
    removingItem();
  }

  return (
    <div className="w-full h-48 bg-gray-50 rounded-3xl p-4 flex items-center justify-between pr-8">
      <div className="h-full flex items-center gap-5">
        <div
          className="w-56 h-full rounded-2xl flex items-center justify-center relative"
          style={{ backgroundColor: `${product.color}` }}>
          <AddWishlistButton productId={product._id} type={"cart"} />
          <button
            onClick={handleRemoveCartItem}
            onMouseOver={() => {
              handleIconAnimation();
            }}
            className="size-9 bg-white rounded-full flex items-center justify-center absolute bottom-0 right-0 m-3">
            <Player ref={playerRef} icon={trashIcon} size={24} />
          </button>
          <Image
            src={product.picture}
            alt="Product Image"
            width={250}
            height={250}
            className="h-4/5 object-contain"
          />
        </div>
        <span className="w-52">{product.name}</span>
      </div>
      <span>{product.price.toFixed(2)} €</span>
      <ModifyItemQuantity item={item} />
    </div>
  );
};
