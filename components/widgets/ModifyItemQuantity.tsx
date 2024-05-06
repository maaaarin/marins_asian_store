import { Item } from "@/types";
import React from "react";
import { useDispatch } from "react-redux";
import {
  increaseItemQuantity,
  decreaseItemQuantity,
} from "@/lib/store/slices/cart.slice";

type Props = {
  item: Item;
};

export const ModifyItemQuantity = ({ item }: Props) => {
  const dispatch = useDispatch();

  return (
    <div className="flex bg-white border border-black rounded-full gap-3 px-2 py-1">
      <button
        onClick={() => {
          dispatch(decreaseItemQuantity({ item }));
        }}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          className="size-5"
          viewBox="0 0 16 16">
          <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8" />
        </svg>
      </button>
      <span>{item.quantity}</span>
      <button
        onClick={() => {
          dispatch(increaseItemQuantity({ item }));
        }}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          className="size-5"
          viewBox="0 0 16 16">
          <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
        </svg>
      </button>
    </div>
  );
};
