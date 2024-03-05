import Image from "next/image";
import React from "react";
import styles from "./Product.module.scss";

export const Product = (Props: { productId: String; productBg: String }) => {
  return (
    <div
      className={`${styles.product} w-3/12 rounded-3xl cursor-pointer border border-gray-100`}>
      <div
        className={`${styles.productImage} h-3/4 flex items-center justify-center  rounded-t-3xl`}
        style={{
          background: `linear-gradient(to top, transparent 10%, #${Props.productBg} 90%);`,
        }}>
        <Image
          src={`/assets/products/${Props.productId}.webp`}
          alt="Product Image"
          width={250}
          height={250}
          className="h-4/5 object-contain"
        />
      </div>
      <div className="h-1/4 flex items-center px-4 py-2 gap-2">
        <span className="size-fit line-clamp-2">
          Oyatsu Butamen Instant Ramen Noodles
        </span>
        <span className="size-fit text-nowrap text-lg bg-black text-white rounded-full py-2 px-3">
          5.25 €
        </span>
      </div>
    </div>
  );
};
