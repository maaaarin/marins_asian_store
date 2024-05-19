"use client";
import {
  addItem,
  cartIdSelector,
  resetCart,
  setCart,
} from "@/lib/store/slices/cart.slice";
import { Product } from "@/types";
import React from "react";
import { Button } from "@nextui-org/react";
import { addCartItem, getCart } from "@/lib/actions/cart.actions";
import { useAuth } from "@clerk/nextjs";
import { useDispatch, useSelector } from "react-redux";

type Props = {
  product: Product;
  type?: string;
};

export const AddItemButton = ({ product, type }: Props) => {
  const { userId } = useAuth();
  const dispatch = useDispatch();
  const cartId = useSelector(cartIdSelector);

  function handleAddItem() {
    const addCartItemProduct = async () => {
      console.log(userId);
      // If it's a user, add the product to the cart
      if (userId) {
        const productAdded = await addCartItem(userId, product?._id);
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
        // verify if still exists
        const getCurrentCart = await getCart(null, cartId);
        if (getCurrentCart) {
          const productAdded = await addCartItem(null, product?._id, cartId);
          if (productAdded) {
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
          dispatch(resetCart());
        }
      }

      // If it's a new guest with no cart, creates a new one
      const newCart = await addCartItem(null, product?._id, null);
      if (newCart) {
        const getNewCart = await getCart(null, newCart._id);
        dispatch(setCart(getNewCart));
        // Storage the new cart
        window.localStorage.setItem("cart", JSON.stringify(getNewCart));
      }
    };
    addCartItemProduct();
  }

  if (type === "page") {
    return (
      <Button
        isIconOnly
        color="primary"
        aria-label="Add Product"
        className="w-full h-16 rounded-lg flex items-center justify-center text-white py-3"
        onClick={handleAddItem}>
        <svg fill="currentColor" className="size-8" viewBox="0 0 16 16">
          <path
            fillRule="evenodd"
            d="M10.5 3.5a2.5 2.5 0 0 0-5 0V4h5zm1 0V4H15v10a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V4h3.5v-.5a3.5 3.5 0 1 1 7 0M8.5 8a.5.5 0 0 0-1 0v1.5H6a.5.5 0 0 0 0 1h1.5V12a.5.5 0 0 0 1 0v-1.5H10a.5.5 0 0 0 0-1H8.5z"
          />
        </svg>
      </Button>
    );
  }

  if (type === "mobile") {
    return (
      <Button
        isIconOnly
        color="primary"
        aria-label="Add Product"
        size="md"
        className="w-2/4 h-10 z-20 !pointer-events-auto rounded-full"
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
