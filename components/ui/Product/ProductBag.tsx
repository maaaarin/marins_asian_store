import { ModifyItemQuantity } from "@/components/utils/ModifyItemQuantity";
import { removeItem } from "@/lib/store/slices/bag.slice";
import { Item, Product } from "@/types";
import Image from "next/image";
import React from "react";
import { useDispatch } from "react-redux";

type Props = {
  item: Item;
};

export const ProductBag = ({ item }: Props) => {
  const dispatch = useDispatch();

  const product = item.product;

  function handleRemoveItem() {
    dispatch(removeItem({ item }));
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
              handleRemoveItem();
            }}
            className="size-9 bg-white rounded-full flex items-center justify-center absolute bottom-0 right-0 m-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              className="size-2/4 text-gray-600"
              viewBox="0 0 16 16">
              <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z" />
            </svg>
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
      <ModifyItemQuantity item={item}/>
    </div>
  );
};
