"use client";

import { addItem } from "@/lib/store/slices/cart.slice";
import { Product } from "@/types";
import React from "react";
import { useDispatch } from "react-redux";
import { Button } from "@nextui-org/react";

type Props = {
  product: Product;
};

export const AddItemButton = ({ product }: Props) => {
  const dispatch = useDispatch();

  function handleAddItem() {
    dispatch(addItem({ product }));
  }

  return (
    <Button
      isIconOnly
      color="primary"
      aria-label="Add Product"
      className="w-full h-16 rounded-lg flex items-center justify-center text-white py-3"
      onClick={() => {
        handleAddItem();
      }}>
      <svg fill="currentColor" className="size-8" viewBox="0 0 16 16">
        <path
          fillRule="evenodd"
          d="M10.5 3.5a2.5 2.5 0 0 0-5 0V4h5zm1 0V4H15v10a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V4h3.5v-.5a3.5 3.5 0 1 1 7 0M8.5 8a.5.5 0 0 0-1 0v1.5H6a.5.5 0 0 0 0 1h1.5V12a.5.5 0 0 0 1 0v-1.5H10a.5.5 0 0 0 0-1H8.5z"
        />
      </svg>
    </Button>
  );
};
