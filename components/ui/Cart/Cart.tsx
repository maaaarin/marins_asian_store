import React, { useEffect, useRef, useState } from "react";
import styles from "./Cart.module.scss";
import { CartItem } from "./CartItem";
import { getServerSideProps } from "next/dist/build/templates/pages";
import { useSelector } from "react-redux";
import { CartItem as CartItemType } from "@/types";
import {
  subtotalCartSelector,
  totalCartItemsSelector,
} from "@/lib/store/slices/cart.slice";
import Image from "next/image";
import { getCart } from "@/lib/actions/cart.actions";
import { Cart as CartType } from "@/types";
import { Player } from "@lordicon/react";

import cartIcon from "@/public/assets/icons/cart.json";
import CartEmpty from "./CartEmpty";
import clsx from "clsx";
import CartContent from "./CartContent";

type Props = {
  cartDisplay: boolean;
  setCartDisplay: React.Dispatch<React.SetStateAction<boolean>>;
  closeDisplay: Function;
};

export const Cart = ({ cartDisplay, setCartDisplay, closeDisplay }: Props) => {
  // const cart = useSelector((state: any) => state.cart),
  //   totalCartItems = useSelector(totalCartItemsSelector),
  //   subtotalCart = useSelector(subtotalCartSelector);

  // Animated icon
  const [cart, setCart] = useState<CartType>();
  const cartRef = useRef<Player>(null);

  function cartIconAnimation() {
    let iconAnimation = cartRef.current;
    if (!iconAnimation?.isPlaying) {
      iconAnimation?.playFromBeginning();
    }
  }

  useEffect(() => {
    const fetchCart = async () => {
      const cart = await getCart();
      cart && setCart(cart);
      console.log(cart);
    };
    fetchCart();
  }, []);

  function handleCartDisplay() {
    if (cartDisplay) {
      closeDisplay();
    } else {
      closeDisplay();
      setCartDisplay(true);
    }
  }

  return (
    <>
      <div
        className="relative grid place-items-center cursor-pointer"
        id="cart"
        onClick={handleCartDisplay}>
        <Player ref={cartRef} icon={cartIcon} size={32} />
        {cart?.totalQuantity && (
          <div className="size-5 bg-primary rounded-full absolute -top-2 -right-2  text-xs text-white outline outline-4 outline-white flex items-center justify-center">
            {cart?.totalQuantity}
          </div>
        )}
      </div>
      <div
        className={clsx(
          `${styles.cartContainer} container h-auto fixed top-24 right-0 left-0 flex justify-center pointer-events-none`,
          { "animate-slide-in-blurred-top": cartDisplay },
          { "translate-y-[-1000px]": !cartDisplay }
        )}>
        <div className="w-3/5 h-auto bg-white pt-6 flex flex-col gap-5 rounded-3xl point pointer-events-auto">
          <div className="w-full h-auto flex relative items-center justify-center px-8">
            <button
              className="size-5 absolute left-8"
              onClick={handleCartDisplay}>
              <svg
                className="size-5"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 15.98 13.98">
                <path
                  d="M15.98,6.99c0,.55-.45,1-1,1H3.41l4.29,4.29c.39,.39,.39,1.02,0,1.41s-1.02,.39-1.41,0L.29,7.7c-.39-.39-.39-1.02,0-1.41,0,0,0,0,0,0L6.28,.29c.39-.39,1.02-.39,1.41,0s.39,1.02,0,1.41L3.41,5.99H14.98c.55,0,1,.45,1,1"
                  fillRule="evenodd"
                />
              </svg>
            </button>
            <span className="font-bold text-xl text-center">Your Cart</span>
          </div>
          {cart ? <CartContent cart={cart} /> : <CartEmpty />}
        </div>
      </div>
    </>
  );
};
