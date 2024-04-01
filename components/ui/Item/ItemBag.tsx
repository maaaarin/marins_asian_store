"use client";

import { ModifyItemQuantity } from "@/components/utils/ModifyItemQuantity";
import { removeItem } from "@/lib/store/slices/bag.slice";
import { Item } from "@/types";
import Image from "next/image";
import React, { useRef } from "react";
import { useDispatch } from "react-redux";
import trashIcon from "@/public/assets/icons/trash.json";
import { Player } from "@lordicon/react";

// import dynamic from "next/dynamic";
// const { Player } = dynamic(() => import("@lordicon/react"), { ssr: false });

type Props = {
  item: Item;
};

export const ItemBag = ({ item }: Props) => {
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
            {/* <svg
              viewBox="0 0 25 24"
              fill="none"
              className={clsx("size-8", { hidden: removeIconHover })}>
              <path
                d="M4.25 4.75H20.75"
                stroke="#000"
                stroke-width="1.5"
                stroke-miterlimit="10"
                stroke-linecap="round"
              />
              <path
                d="M12.5 2.75V4.75"
                stroke="#000"
                stroke-width="1.5"
                stroke-miterlimit="10"
                stroke-linecap="round"
              />
              <path
                d="M14.2402 17.27V12.77"
                stroke="#000"
                stroke-width="1.5"
                stroke-miterlimit="10"
                stroke-linecap="round"
              />
              <path
                d="M10.75 17.25V12.75"
                stroke="#000"
                stroke-width="1.5"
                stroke-miterlimit="10"
                stroke-linecap="round"
              />
              <path
                d="M5.87012 8.75H19.1701"
                stroke="#000"
                stroke-width="1.5"
                stroke-miterlimit="10"
              />
              <path
                d="M15.91 21.25H9.09C8.07 21.25 7.21 20.48 7.1 19.47L5.5 4.75H19.5L17.9 19.47C17.79 20.48 16.93 21.25 15.91 21.25V21.25Z"
                stroke="#000"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg> */}
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
