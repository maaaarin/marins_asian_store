import React, { useEffect, useRef } from "react";
import styles from "./Cart.module.scss";
import { Player } from "@lordicon/react";
import cartIcon from "@/public/assets/icons/cart.json";
import CartEmpty from "./CartEmpty";
import clsx from "clsx";
import CartContent from "./CartContent";
import { useSelector } from "react-redux";
import { countCartItemsSelector } from "../../../lib/store/slices/cart.slice";
import {
  subtotalCartSelector,
  totalQuantityCartSelector,
} from "@/lib/store/slices/cart.slice";

type Props = {
  cartDisplay: boolean;
  closeDisplay: any;
};

export const Cart = ({ cartDisplay, closeDisplay }: Props) => {
  const countCartItems = useSelector(countCartItemsSelector);

  return (
    <>
      <div
        className={clsx(
          `${styles.cartContainer} container h-auto fixed top-24 right-0 left-0 flex justify-center pointer-events-none`,
          { "animate-slide-in-blurred-top": cartDisplay },
          { "translate-y-[-2500px]": !cartDisplay }
        )}>
        <div className="w-full h-auto bg-white pt-6 flex flex-col gap-5 rounded-3xl point pointer-events-auto lg:w-3/5">
          <div className="w-full h-auto flex relative items-center justify-center px-8">
            <button className="size-5 absolute left-8" onClick={closeDisplay}>
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
          {countCartItems ? <CartContent /> : <CartEmpty />}
        </div>
      </div>
    </>
  );
};
