import React from "react";
import styles from "./Bag.module.scss";
import { ItemBag } from "../Item/ItemBag";
import { getServerSideProps } from "next/dist/build/templates/pages";
import { useSelector } from "react-redux";
import { Item } from "@/types";
import {
  subtotalBagSelector,
  totalBagItemsSelector,
} from "@/lib/store/slices/bag.slice";
import Image from "next/image";
import dynamic from "next/dynamic";

// const DynamicItemBag = dynamic(() => import("../Item/ItemBag"), {
//   ssr: false,
// });

type Props = Awaited<ReturnType<typeof getServerSideProps>>["props"];

export const Bag = ({ closeDisplay, cartIconAnimation }: Props) => {
  const bag = useSelector((state: any) => state.bag),
    totalBagItems = useSelector(totalBagItemsSelector),
    subtotalBag = useSelector(subtotalBagSelector);

  function handleCloseBag() {
    closeDisplay();
  }

  return (
    <div
      className={`${styles.bagContainer} container h-auto fixed top-24 right-0 left-0 flex justify-center pointer-events-none`}>
      <div className="w-3/5 h-auto bg-white pt-6 flex flex-col gap-5 rounded-3xl point pointer-events-auto">
        <div className="w-full h-auto flex relative items-center justify-center px-8">
          <button
            className="size-5 absolute left-8"
            onClick={() => {
              handleCloseBag();
            }}>
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
          {totalBagItems > 0 && (
            <span className="py-2 px-4 bg-black rounded-xl text-white absolute right-8">
              {bag.totalQuantity}
            </span>
          )}
        </div>
        {totalBagItems < 1 && (
          <div className="w-full h-auto flex flex-col items-center justify-center py-20">
            <Image
              src="/assets/img/cat_bag.gif"
              alt="Cat GIF"
              width={150}
              height={150}
            />
            <span>Nothing yet here!</span>
            <span className="text-gray-400">(Zzzz)</span>
          </div>
        )}
        {totalBagItems > 0 && (
          <>
            <div className="size-full flex flex-col overflow-auto px-4 rounded-3xl">
              {bag.items.map((item: Item) => (
                <ItemBag key={item.product._id} item={item} />
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
                    {subtotalBag.toFixed(2)} €
                  </span>
                </div>
                <button className="px-16 py-3 bg-primary rounded-full text-white">
                  View Bag
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
