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
      <div className="size-full flex flex-col overflow-auto px-4 rounded-3xl">
        {cart.items.map((item: CartItemType, key: number) => (
          <CartItem key={key} item={item} />
        ))}
      </div>
      <div className="w-full h-auto flex py-3 pr-3 pl-8 bg-gray-100 rounded-full justify-between">
        <div className="flex items-center gap-2">
          Earn
          <span className="py-1 px-2 bg-secondary rounded-full text-white">
            {totalPoints} points
          </span>
          from this order
        </div>
        <div className="flex gap-3">
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
