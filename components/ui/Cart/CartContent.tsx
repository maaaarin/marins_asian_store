import { Cart } from "@/types";
import React, { useEffect } from "react";
import { CartItem } from "./CartItem";
import { CartItem as CartItemType } from "@/types";

const CartContent = ({ cart }: { cart: Cart }) => {
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
            690 points
          </span>
          from this order
        </div>
        <div className="flex gap-3">
          <div className="rounded-lg gap-5 flex items-center justify-between">
            Subtotal
            <span className="py-1 px-2 bg-neutral-200 rounded-lg">
              {cart.totalPrice.toFixed(2)} €
            </span>
          </div>
          <button className="px-16 py-3 bg-primary rounded-full text-white">
            View Cart
          </button>
        </div>
      </div>
    </>
  );
};

export default CartContent;
