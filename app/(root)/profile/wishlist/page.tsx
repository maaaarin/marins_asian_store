"use client";

import { AddItemCardButton } from "@/components/widgets/AddItemCardButton";
import { Button } from "@nextui-org/react";
import { color } from "framer-motion";
import Image from "next/image";
import React from "react";

const Wishlist = () => {
  var wishlistProducts = [
    {
      id: 1,
      name: "Cheetos - Super Spicy Cheese",
      price: 4.5,
      color: "#FF81B9",
      picture: "https://i.imgur.com/fcFnQrz.png",
    },
    {
      id: 2,
      name: "Oyatsu Butamen Instant Ramen Noodles",
      price: 3.5,
      color: "#C8E6FF",
      picture: "https://i.imgur.com/2chtIZL.png",
    },
    {
      id: 3,
      name: "Malang Cow Soft Candy - Strawberry Milk",
      price: 3.2,
      color: "#FFE0EB",
      picture: "https://i.imgur.com/HXi1L2g.png",
    },
  ];

  return (
    <div className="size-full flex flex-col gap-8">
      <h2 className="text-2xl font-semibold">Wishlist</h2>
      <ul className="w-full h-auto flex flex-col gap-3">
        {/* Wishlist */}
        {wishlistProducts.map((product: any) => (
          <li
            key={product.id}
            className="w-full h-32 rounded-2xl flex items-center gap-8 border  relative py-4 px-8">
            <div className="w-auto h-full flex-center relative">
              <div
                className="size-24  rounded-full"
                style={{ background: product.color }}></div>
              <Image
                src={product.picture}
                alt="Wishlist Item Picture"
                width={96}
                height={96}
                className="w-auto max-w-[6/12] h-full z-10 absolute"
              />
            </div>
            <div className="w-auto h-full flex flex-col justify-center items-start gap-2">
              <span className="line-clamp-2">{product.name}</span>
              <div className="flex gap-2">
                <span className="size-fit text-nowrap  bg-black text-white rounded-full py-1 px-3">
                  {product.price.toFixed(2)} €
                </span>
              </div>
            </div>
            <div className="absolute right-8 flex items-center gap-5">
              <Button isIconOnly className="rounded-full bg-zinc-100">
                <svg
                  viewBox="0 0 24 24"
                  className="size-9/12 text-red-500"
                  fill="currentColor">
                  <path d="M20.205 4.791a5.938 5.938 0 0 0-4.209-1.754A5.906 5.906 0 0 0 12 4.595a5.904 5.904 0 0 0-3.996-1.558 5.942 5.942 0 0 0-4.213 1.758c-2.353 2.363-2.352 6.059.002 8.412L12 21.414l8.207-8.207c2.354-2.353 2.355-6.049-.002-8.416z"></path>
                </svg>
              </Button>
              <AddItemCardButton product={null} />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Wishlist;
