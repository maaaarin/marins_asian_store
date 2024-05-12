"use client";
import {
  addItem,
  cartIdSelector,
  setCart,
} from "@/lib/store/slices/cart.slice";
import { Product } from "@/types";
import React from "react";
import { Button } from "@nextui-org/react";
import { addCart } from "@/lib/actions/cart.actions";
import { useAuth } from "@clerk/nextjs";
import { useDispatch, useSelector } from "react-redux";

type Props = {
  product: Product | null;
};

export const AddItemCardButton = ({ product }: Props) => {
  const { isLoaded, userId, sessionId, getToken } = useAuth();
  const dispatch = useDispatch();
  const cartId = useSelector(cartIdSelector);

  function handleAddItem() {
    const addCartProduct = async () => {
      console.log(userId);
      // If it's a user, add the product to the cart
      if (userId) {
        const addProduct = await addCart(userId, product?._id);
        addProduct &&
          dispatch(
            addItem({
              _id: product?._id,
              name: product?.name,
              price: product?.price,
              picture: product?.picture,
              color: product?.color,
            })
          );
        return;
      }

      // Exists guest cart
      if (cartId) {
        console.log("ok existe");
        console.log(cartId);
        const addProduct = await addCart(null, product?._id, cartId);
        if (addProduct) {
          dispatch(
            addItem({
              _id: product?._id,
              name: product?.name,
              price: product?.price,
              picture: product?.picture,
              color: product?.color,
            })
          );
          console.log(addProduct);
        }

        return;
      }

      // If it's a new guest with no cart
      const addProduct = await addCart(null, product?._id, null);
      if (addProduct) {
        dispatch(setCart(addProduct));
        dispatch(
          addItem({
            _id: product?._id,
            name: product?.name,
            price: product?.price,
            picture: product?.picture,
            color: product?.color,
          })
        );
        console.log("crear carrito no usuario");
        console.log(addProduct);
      }
    };
    addCartProduct();
  }

  return (
    <Button
      isIconOnly
      color="primary"
      aria-label="Add Product"
      radius="full"
      className="w-14 h-14 z-20 !pointer-events-auto"
      onClick={handleAddItem}>
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
    </Button>
  );
};
