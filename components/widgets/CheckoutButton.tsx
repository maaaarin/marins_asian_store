"use client";
import React, { useEffect } from "react";
import { CheckoutOrder } from "@/lib/actions/order.actions";
import { Cart } from "@/types";
import { Button } from "@nextui-org/react";
import { getCart } from "@/lib/actions/cart.actions";

type Props = {
  userId: string | null | undefined;
};

const CheckoutButton = ({ userId }: Props) => {
  async function handleCheckout() {
    const cart = await getCart(userId);
    cart && console.log(cart);
    const checkout = await CheckoutOrder(cart);
    checkout && console.log(checkout);
    if (checkout) {
      window.location.href = checkout.url;
    }
  }

  return (
    <form action={handleCheckout} method="post">
      <Button
        size="lg"
        type="submit"
        className="px-16 py-3 bg-primary rounded-full text-white">
        View Cart
      </Button>
    </form>
  );
};

export default CheckoutButton;
