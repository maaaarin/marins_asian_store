import { CartItem } from "@/types";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  increaseItemQuantity,
  decreaseItemQuantity,
  cartIdSelector,
} from "@/lib/store/slices/cart.slice";
import { increaseCartItem, decreaseCartItem } from "@/lib/actions/cart.actions";
import { useAuth } from "@clerk/nextjs";

type Props = {
  item: CartItem;
};

export const ModifyItemQuantity = ({ item }: Props) => {
  const { userId } = useAuth();
  const dispatch = useDispatch();
  const cartId = useSelector(cartIdSelector);

  function handleIncreaseQuantity() {
    const increaseItem = async () => {
      if (userId) {
        console.log("incrementar producto");
        const increaseQuantity = await increaseCartItem(
          userId,
          item.product._id
        );
        return;
      }
      const increaseQuantity = await increaseCartItem(
        null,
        item.product._id,
        cartId
      );
    };
    dispatch(increaseItemQuantity({ item }));
    increaseItem();
  }

  function handleDecreaseQuantity() {
    const decreaseItem = async () => {
      if (userId) {
        const decreaseQuantity = await decreaseCartItem(
          userId,
          item.product._id
        );
        if (decreaseQuantity) {
          dispatch(decreaseItemQuantity({ item }));
        }
        return;
      }
      const decreaseQuantity = await decreaseCartItem(
        null,
        item.product._id,
        cartId
      );
      if (decreaseQuantity) {
        dispatch(decreaseItemQuantity({ item }));
      }
    };

    decreaseItem();
  }

  return (
    <div className="flex bg-white border border-black rounded-full gap-3 px-2 py-1">
      <button onClick={handleDecreaseQuantity}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          className="size-5"
          viewBox="0 0 16 16">
          <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8" />
        </svg>
      </button>
      <span>{item.quantity}</span>
      <button onClick={handleIncreaseQuantity}>
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
