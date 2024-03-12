"use client";

import Image from "next/image";
import React from "react";
import styles from "./Product.module.scss";

export const Product = (Product: {
  name: string;
  price: number;
  color: string;
  picture: string;
}) => {

  function handleAddProduct(Product: any) {
    console.log(Product);
  }

  return (
    <div
      className={`${styles.product} w-full rounded-3xl cursor-pointer border border-slate-300`}>
      <div
        className="h-3/4 flex items-center justify-center rounded-t-3xl px-8 relative overflow-hidden"
        style={{
          background: `linear-gradient(to top, transparent 10%, ${Product.color} 60%)`,
        }}>
        <div
          className={`${styles.productHover} invisible duration-500 opacity-0 size-full flex items-center justify-center absolute backdrop-blur-sm rounded-t-3xl`}>
          <button
            className="size-14 bg-primary rounded-full grid place-items-center"
            onClick={() => {
              handleAddProduct(Product);
            }}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              className="size-3/5 text-white"
              viewBox="0 0 16 16">
              <path
                fillRule="evenodd"
                d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2"
              />
            </svg>
          </button>
          <button className="size-12 bg-white rounded-full grid place-items-center absolute top-0 right-0 m-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              className="size-3/5 text-gray-300"
              fill="currentColor">
              <path d="M20.205 4.791a5.938 5.938 0 0 0-4.209-1.754A5.906 5.906 0 0 0 12 4.595a5.904 5.904 0 0 0-3.996-1.558 5.942 5.942 0 0 0-4.213 1.758c-2.353 2.363-2.352 6.059.002 8.412L12 21.414l8.207-8.207c2.354-2.353 2.355-6.049-.002-8.416z"></path>
            </svg>
          </button>
        </div>
        <Image
          src={Product.picture}
          alt="Product Image"
          width={250}
          height={250}
          className="h-4/5 object-contain"
        />
      </div>
      <div className="h-1/4 flex items-center justify-between px-4 py-2 gap-2">
        <span className="size-fit line-clamp-2">{Product.name}</span>
        <span className="size-fit text-nowrap text-lg bg-black text-white rounded-full py-1 px-3">
          {Product.price} €
        </span>
      </div>
    </div>
  );
};
