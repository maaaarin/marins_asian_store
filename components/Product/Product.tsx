import Image from "next/image";
import React from "react";
import styles from "./Product.module.scss";

export const Product = (Product: { name: string, price: number, color: string, picture: string }) => {
  return (
    <div
      className={`${styles.product} w-full rounded-3xl cursor-pointer border border-slate-300`}>
      <div
        className="h-3/4 flex items-center justify-center  rounded-t-3xl"
        style={{
          background: `linear-gradient(to top, transparent 20%, ${Product.color} 100%)`,
        }}>
        <Image
          src={Product.picture}
          alt="Product Image"
          width={250}
          height={250}
          className="h-4/5 object-contain"
        />
      </div>
      <div className="h-1/4 flex items-center justify-between px-4 py-2 gap-2">
        <span className="size-fit line-clamp-2">
          {Product.name}
        </span>
        <span className="size-fit text-nowrap text-lg bg-black text-white rounded-full py-1 px-3">
        {Product.price} €
        </span>
      </div>
    </div>
  );
};
