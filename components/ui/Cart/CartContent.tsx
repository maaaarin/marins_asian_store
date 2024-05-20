import { Cart } from "@/types";
import React, { useEffect, useState } from "react";
import { CartItem } from "./CartItem";
import { CartItem as CartItemType } from "@/types";
import { useSelector } from "react-redux";
import {
  cartIdSelector,
  subtotalCartSelector,
  totalPointsCartSelector,
  totalQuantityCartSelector,
} from "@/lib/store/slices/cart.slice";
import { useAuth } from "@clerk/nextjs";
import CheckoutButton from "@/components/widgets/CheckoutButton";
import styles from "./Cart.module.scss";

const CartContent = () => {
  const { userId } = useAuth();
  const cart = useSelector((state: any) => state.cart),
    totalCartItems = useSelector(totalQuantityCartSelector),
    subtotalCart = useSelector(subtotalCartSelector),
    totalPoints = useSelector(totalPointsCartSelector);

  useEffect(() => {
    console.log(cart);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [totalCartItems, subtotalCart]);

  return (
    <>
      <div className="w-full  px-4 lg:hidden">
        <div className="w-full flex gap-2 items-center justify-center bg-gray-100 py-2 rounded-full">
          Earn
          <span className="py-1 px-2 bg-secondary rounded-full text-white">
            {totalPoints} points
          </span>
          from this order
        </div>
      </div>
      <div
        className={`${styles.cartContent} size-full flex flex-col gap-4 overflow-auto px-4 rounded-xl lg:gap-0 lg:rounded-3xl`}>
        {cart.items.map((item: CartItemType, key: number) => (
          <CartItem key={key} item={item} />
        ))}
      </div>
      <div className="w-full h-auto flex p-4  bg-gray-100 items-center rounded-b-3xl lg:rounded-full lg:justify-between lg:py-3 lg:pr-3 lg:pl-8">
        <div className="hidden items-center gap-2 lg:flex">
          Earn
          <span className="py-1 px-2 bg-secondary rounded-full text-white">
            {totalPoints} points
          </span>
          from this order
        </div>
        <div className="w-full flex gap-3 flex-col lg:w-auto lg:flex-row">
          <div className="rounded-lg gap-5 flex items-center justify-between">
            Subtotal
            <span className="py-1 px-2 bg-neutral-200 rounded-lg">
              {subtotalCart.toFixed(2)} €
            </span>
          </div>
          <CheckoutButton userId={userId} />
        </div>
      </div>
    </>
  );
};

export default CartContent;
