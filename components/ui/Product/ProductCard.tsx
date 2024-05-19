"use client";

import Image from "next/image";
import React from "react";
import styles from "./Product.module.scss";
import { AddItemButton } from "@/components/widgets/AddItemButton";
import { Product } from "@/types";
import Link from "next/link";
import { AddWishlistButton } from "@/components/widgets/AddWishlistButton";

type Props = {
  key: string;
  product: Product;
};

export const ProductCard = ({ product }: Props) => {
  return (
    <div className="w-full">
      <div
        className={`h-auto ${styles.product} w-full transition-all duration-400 cursor-pointer border rounded-xl border-slate-300 relative lg:hover:!-translate-y-2 lg:rounded-3xl`}>
        <div
          className={`hidden ${styles.productHover} h-3/4 w-full invisible duration-500 opacity-0 items-center justify-center absolute backdrop-blur-sm rounded-t-3xl z-50 pointer-events-none lg:flex`}>
          <AddItemButton product={product} />
          <AddWishlistButton productId={product._id} />
        </div>
        <Link href={`/products/${product._id}`}>
          <div
            className="h-3/4 flex items-center justify-center rounded-xl p-2 relative overflow-hidden lg:p-6 lg:rounded-3xl"
            style={{
              background: `linear-gradient(180deg, ${product.color} 0%, transparent 100%)`,
            }}>
            <Image
              src={product.picture}
              alt="Product Image"
              width={250}
              height={250}
              className="h-full w-auto"
            />
          </div>
        </Link>
        <div className="hidden lg:flex h-1/4 items-center justify-between px-4 py-2 gap-2">
          <span className="size-fit line-clamp-2">{product.name}</span>
          <span className="hidden size-fit text-nowrap text-lg bg-black text-white rounded-full py-1 px-3 lg:block">
            {product.price.toFixed(2)} €
          </span>
        </div>
        <div className="h-auto flex-col flex items-center justify-between p-4 gap-2 lg:py-2  lg:hidden">
          <span className="text-base size-fit line-clamp-2 text-center">
            {product.name}
          </span>
          <span className="text-base size-fit text-nowrap bg-black text-white rounded-full py-1 px-3">
            {product.price.toFixed(2)} €
          </span>
          <div className="w-full relative flex gap-1">
            <AddWishlistButton productId={product._id} type="mobile" />
            <AddItemButton product={product} type="mobile" />
          </div>
        </div>
      </div>
    </div>
  );
};
