"use client";

import Image from "next/image";
import React from "react";
import styles from "./Product.module.scss";
import { AddItemCardButton } from "@/components/utils/AddItemCardButton";
import { Product } from "@/types";
import Link from "next/link";
import { AddWishlistCardButton } from "@/components/utils/AddWishlistCardButton";

type Props = {
  key: string;
  product: Product;
};

export const ProductCard = ({ product }: Props) => {
  return (
    <div
      className={`${styles.product} w-full rounded-3xl cursor-pointer border border-slate-300 relative`}>
      <div
        className={`${styles.productHover} h-3/4 w-full invisible duration-500 opacity-0  flex items-center justify-center absolute backdrop-blur-sm rounded-t-3xl z-50 pointer-events-none`}>
        <AddItemCardButton product={product} />
        <AddWishlistCardButton />
      </div>
      <Link href={`/products/${product._id}`}>
        <div
          className="h-3/4 flex items-center justify-center rounded-t-3xl px-8 relative overflow-hidden"
          style={{
            background: `linear-gradient(180deg, ${product.color} 0%, transparent 100%)`,
          }}>
          <Image
            src={product.picture}
            alt="Product Image"
            width={250}
            height={250}
            className="h-4/5 object-contain"
          />
        </div>
        <div className="h-1/4 flex items-center justify-between px-4 py-2 gap-2">
          <span className="size-fit line-clamp-2">{product.name}</span>
          <span className="size-fit text-nowrap text-lg bg-black text-white rounded-full py-1 px-3">
            {product.price.toFixed(2)} €
          </span>
        </div>
      </Link>
    </div>
  );
};
