"use client";

import { ModifyItemQuantity } from "@/components/widgets/ModifyItemQuantity";
import { removeItem } from "@/lib/store/slices/cart.slice";
import { CartItem as CartItemType } from "@/types";
import Image from "next/image";
import React, { useRef } from "react";
import { useDispatch } from "react-redux";
import trashIcon from "@/public/assets/icons/trash.json";
import { Player } from "@lordicon/react";

// import dynamic from "next/dynamic";
// const { Player } = dynamic(() => import("@lordicon/react"), { ssr: false });

type Props = {
  item: CartItemType;
};

export const CartItem = ({ item }: Props) => {
  const dispatch = useDispatch(),
    product = item.product;

  // Animated icon
  const playerRef = useRef<Player>(null);

  function handleIconAnimation() {
    let iconAnimation = playerRef.current;
    if (!iconAnimation?.isPlaying) {
      iconAnimation?.playFromBeginning();
    }
  }

  return (
    <div className="w-full h-48 bg-gray-50 rounded-3xl p-4 flex items-center justify-between pr-8">
      <div className="h-full flex items-center gap-5">
        <div
          className="w-56 h-full rounded-2xl flex items-center justify-center relative"
          style={{ backgroundColor: `${product.color}` }}>
          <button className="size-9 flex items-center justify-center bg-white rounded-full absolute top-0 right-0 m-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              className="size-2/4 text-gray-300"
              viewBox="0 0 16 16">
              <path
                fillRule="evenodd"
                d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314"
              />
            </svg>
          </button>
          <button
            onClick={() => {
              dispatch(removeItem({ item }));
            }}
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
