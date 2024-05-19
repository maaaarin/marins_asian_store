"use client";

import styles from "./WishlistIcon.module.scss";
import React, { useEffect, useState } from "react";
import {
  addWishlist as addWishlistAction,
  removeWishlist as removeWishlistAction,
} from "@/lib/actions/wishlist.actions";
import { useRouter } from "next/navigation";
import { useAuth } from "@clerk/nextjs";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  Button,
} from "@nextui-org/react";
import { useDispatch, useSelector } from "react-redux";
import { isOnWishlistSelector } from "@/lib/store/slices/wishlist.slice";
import { addWishlist, removeWishlist } from "@/lib/store/slices/wishlist.slice";

type Props = {
  productId: string;
  type?: string;
};

export const AddWishlistButton = ({ productId, type }: Props) => {
  const router = useRouter();
  const { userId } = useAuth();
  const onWishlist = useSelector((state) =>
    isOnWishlistSelector(state, productId)
  );
  const dispatch = useDispatch();

  async function handleUpdateWishlist() {
    if (userId) {
      if (!onWishlist) {
        const addingWishlist = await addWishlistAction(userId, productId);
        dispatch(addWishlist(productId));
        router.refresh();
        return;
      }
      // Then remove
      const removingWishlist = await removeWishlistAction(userId, productId);
      dispatch(removeWishlist(productId));
      router.refresh();
    }
  }

  // Wishlist for guest user
  const [isOpen, setIsOpen] = React.useState(false);
  const [closeTimeOut, setCloseTimeOut] = useState<NodeJS.Timeout | null>(null);

  function closeDelay() {
    return setTimeout(() => {
      setIsOpen(false);
    }, 1500);
  }

  useEffect(() => {
    if (isOpen) {
      if (closeTimeOut) {
        clearTimeout(closeTimeOut);
      }
      const closeTimeOutId = closeDelay();
      setCloseTimeOut(closeTimeOutId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  if (type === "mobile") {
    return (
      <div className="size-10 rounded-full relative flex items-center justify-center  !pointer-events-auto">
        <Button
          className="!size-10 min-w-0 min-h-0 bg-black/5"
          radius="full"
          size="md"
          onClick={handleUpdateWishlist}></Button>
        <div className="size-full absolute flex items-center justify-center p-2 pointer-events-none">
          <div className={styles.heartContainer} title="Favorite">
            <input
              type="checkbox"
              className={styles.checkbox}
              checked={onWishlist}></input>
            <div className={styles.svgContainer}>
              <svg
                viewBox="0 0 24 24"
                className={styles.svgEmpty}
                xmlns="http://www.w3.org/2000/svg">
                <path d="M17.5,1.917a6.4,6.4,0,0,0-5.5,3.3,6.4,6.4,0,0,0-5.5-3.3A6.8,6.8,0,0,0,0,8.967c0,4.547,4.786,9.513,8.8,12.88a4.974,4.974,0,0,0,6.4,0C19.214,18.48,24,13.514,24,8.967A6.8,6.8,0,0,0,17.5,1.917Z"></path>
              </svg>
              <svg
                viewBox="0 0 24 24"
                className={styles.svgFilled}
                xmlns="http://www.w3.org/2000/svg">
                <path d="M17.5,1.917a6.4,6.4,0,0,0-5.5,3.3,6.4,6.4,0,0,0-5.5-3.3A6.8,6.8,0,0,0,0,8.967c0,4.547,4.786,9.513,8.8,12.88a4.974,4.974,0,0,0,6.4,0C19.214,18.48,24,13.514,24,8.967A6.8,6.8,0,0,0,17.5,1.917Z"></path>
              </svg>
              <svg
                className={styles.svgCelebrate}
                width="100"
                height="100"
                xmlns="http://www.w3.org/2000/svg">
                <polygon points="10,10 20,20"></polygon>
                <polygon points="10,50 20,50"></polygon>
                <polygon points="20,80 30,70"></polygon>
                <polygon points="90,10 80,20"></polygon>
                <polygon points="90,50 80,50"></polygon>
                <polygon points="80,80 70,70"></polygon>
              </svg>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!userId && type === "page") {
    return (
      <Popover
        placement="left"
        shouldCloseOnBlur
        shouldBlockScroll
        showArrow
        isOpen={isOpen}
        onOpenChange={(open) => {
          setIsOpen(open);
        }}>
        <PopoverTrigger>
          <div className="w-full h-full flex items-center justify-center rounded-lg bg-zinc-50 cursor-pointer">
            <div className="size-8 absolute">
              <div className={styles.heartContainer} title="Favorite">
                <div className={styles.svgContainer}>
                  <svg
                    viewBox="0 0 24 24"
                    className={styles.svgEmpty}
                    xmlns="http://www.w3.org/2000/svg">
                    <path d="M17.5,1.917a6.4,6.4,0,0,0-5.5,3.3,6.4,6.4,0,0,0-5.5-3.3A6.8,6.8,0,0,0,0,8.967c0,4.547,4.786,9.513,8.8,12.88a4.974,4.974,0,0,0,6.4,0C19.214,18.48,24,13.514,24,8.967A6.8,6.8,0,0,0,17.5,1.917Z"></path>
                  </svg>
                  <svg
                    viewBox="0 0 24 24"
                    className={styles.svgFilled}
                    xmlns="http://www.w3.org/2000/svg">
                    <path d="M17.5,1.917a6.4,6.4,0,0,0-5.5,3.3,6.4,6.4,0,0,0-5.5-3.3A6.8,6.8,0,0,0,0,8.967c0,4.547,4.786,9.513,8.8,12.88a4.974,4.974,0,0,0,6.4,0C19.214,18.48,24,13.514,24,8.967A6.8,6.8,0,0,0,17.5,1.917Z"></path>
                  </svg>
                  <svg
                    className={styles.svgCelebrate}
                    width="100"
                    height="100"
                    xmlns="http://www.w3.org/2000/svg">
                    <polygon points="10,10 20,20"></polygon>
                    <polygon points="10,50 20,50"></polygon>
                    <polygon points="20,80 30,70"></polygon>
                    <polygon points="90,10 80,20"></polygon>
                    <polygon points="90,50 80,50"></polygon>
                    <polygon points="80,80 70,70"></polygon>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </PopoverTrigger>
        <PopoverContent className="w-full">
          <div className="px-1 py-2 w-full">
            <div className="text-small font-bold">Oops!</div>
            <div className="text-tiny">Sign in to add to wishlist!</div>
          </div>
        </PopoverContent>
      </Popover>
    );
  }

  if (!userId && type === "cart") {
    return (
      <Popover
        placement="left"
        shouldCloseOnBlur
        shouldBlockScroll
        showArrow
        isOpen={isOpen}
        onOpenChange={(open) => {
          setIsOpen(open);
        }}>
        <PopoverTrigger>
          <Button
            className="!size-10 min-w-0 min-h-0 bg-white absolute top-0 right-0 m-4 p-2 !pointer-events-auto"
            radius="full"
            onClick={handleUpdateWishlist}>
            <div className={styles.heartContainer} title="Favorite">
              <input
                type="checkbox"
                disabled={true}
                defaultChecked={false}
                className={styles.checkbox}></input>
              <div className={styles.svgContainer}>
                <svg
                  viewBox="0 0 24 24"
                  className={styles.svgEmpty}
                  xmlns="http://www.w3.org/2000/svg">
                  <path d="M17.5,1.917a6.4,6.4,0,0,0-5.5,3.3,6.4,6.4,0,0,0-5.5-3.3A6.8,6.8,0,0,0,0,8.967c0,4.547,4.786,9.513,8.8,12.88a4.974,4.974,0,0,0,6.4,0C19.214,18.48,24,13.514,24,8.967A6.8,6.8,0,0,0,17.5,1.917Z"></path>
                </svg>
                <svg
                  viewBox="0 0 24 24"
                  className={styles.svgFilled}
                  xmlns="http://www.w3.org/2000/svg">
                  <path d="M17.5,1.917a6.4,6.4,0,0,0-5.5,3.3,6.4,6.4,0,0,0-5.5-3.3A6.8,6.8,0,0,0,0,8.967c0,4.547,4.786,9.513,8.8,12.88a4.974,4.974,0,0,0,6.4,0C19.214,18.48,24,13.514,24,8.967A6.8,6.8,0,0,0,17.5,1.917Z"></path>
                </svg>
                <svg
                  className={styles.svgCelebrate}
                  width="100"
                  height="100"
                  xmlns="http://www.w3.org/2000/svg">
                  <polygon points="10,10 20,20"></polygon>
                  <polygon points="10,50 20,50"></polygon>
                  <polygon points="20,80 30,70"></polygon>
                  <polygon points="90,10 80,20"></polygon>
                  <polygon points="90,50 80,50"></polygon>
                  <polygon points="80,80 70,70"></polygon>
                </svg>
              </div>
            </div>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full">
          <div className="px-1 py-2 w-full">
            <div className="text-small font-bold">Oops!</div>
            <div className="text-tiny">Sign in to add to wishlist!</div>
          </div>
        </PopoverContent>
      </Popover>
    );
  }

  if (!userId) {
    return (
      <Popover
        placement="left"
        shouldCloseOnBlur
        shouldBlockScroll
        showArrow
        isOpen={isOpen}
        onOpenChange={(open) => {
          setIsOpen(open);
        }}>
        <PopoverTrigger>
          <Button
            className="!size-12 min-w-0 min-h-0 bg-white absolute top-0 right-0 m-4 p-3 !pointer-events-auto"
            radius="full"
            onClick={handleUpdateWishlist}>
            <div className={styles.heartContainer} title="Favorite">
              <input
                type="checkbox"
                disabled={true}
                defaultChecked={false}
                className={styles.checkbox}></input>
              <div className={styles.svgContainer}>
                <svg
                  viewBox="0 0 24 24"
                  className={styles.svgEmpty}
                  xmlns="http://www.w3.org/2000/svg">
                  <path d="M17.5,1.917a6.4,6.4,0,0,0-5.5,3.3,6.4,6.4,0,0,0-5.5-3.3A6.8,6.8,0,0,0,0,8.967c0,4.547,4.786,9.513,8.8,12.88a4.974,4.974,0,0,0,6.4,0C19.214,18.48,24,13.514,24,8.967A6.8,6.8,0,0,0,17.5,1.917Z"></path>
                </svg>
                <svg
                  viewBox="0 0 24 24"
                  className={styles.svgFilled}
                  xmlns="http://www.w3.org/2000/svg">
                  <path d="M17.5,1.917a6.4,6.4,0,0,0-5.5,3.3,6.4,6.4,0,0,0-5.5-3.3A6.8,6.8,0,0,0,0,8.967c0,4.547,4.786,9.513,8.8,12.88a4.974,4.974,0,0,0,6.4,0C19.214,18.48,24,13.514,24,8.967A6.8,6.8,0,0,0,17.5,1.917Z"></path>
                </svg>
                <svg
                  className={styles.svgCelebrate}
                  width="100"
                  height="100"
                  xmlns="http://www.w3.org/2000/svg">
                  <polygon points="10,10 20,20"></polygon>
                  <polygon points="10,50 20,50"></polygon>
                  <polygon points="20,80 30,70"></polygon>
                  <polygon points="90,10 80,20"></polygon>
                  <polygon points="90,50 80,50"></polygon>
                  <polygon points="80,80 70,70"></polygon>
                </svg>
              </div>
            </div>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full">
          <div className="px-1 py-2 w-full">
            <div className="text-small font-bold">Oops!</div>
            <div className="text-tiny">Sign in to add to wishlist!</div>
          </div>
        </PopoverContent>
      </Popover>
    );
  }

  if (type === "wishlist") {
    return (
      <button className="size-12 rounded-full grid place-items-center p-3 bg-zinc-100">
        <div className={styles.heartContainer} title="Favorite">
          <input
            type="checkbox"
            className={styles.checkbox}
            checked={onWishlist}
            onChange={handleUpdateWishlist}></input>
          <div className={styles.svgContainer}>
            <svg
              viewBox="0 0 24 24"
              className={styles.svgEmpty}
              xmlns="http://www.w3.org/2000/svg">
              <path d="M17.5,1.917a6.4,6.4,0,0,0-5.5,3.3,6.4,6.4,0,0,0-5.5-3.3A6.8,6.8,0,0,0,0,8.967c0,4.547,4.786,9.513,8.8,12.88a4.974,4.974,0,0,0,6.4,0C19.214,18.48,24,13.514,24,8.967A6.8,6.8,0,0,0,17.5,1.917Z"></path>
            </svg>
            <svg
              viewBox="0 0 24 24"
              className={styles.svgFilled}
              xmlns="http://www.w3.org/2000/svg">
              <path d="M17.5,1.917a6.4,6.4,0,0,0-5.5,3.3,6.4,6.4,0,0,0-5.5-3.3A6.8,6.8,0,0,0,0,8.967c0,4.547,4.786,9.513,8.8,12.88a4.974,4.974,0,0,0,6.4,0C19.214,18.48,24,13.514,24,8.967A6.8,6.8,0,0,0,17.5,1.917Z"></path>
            </svg>
            <svg
              className={styles.svgCelebrate}
              width="100"
              height="100"
              xmlns="http://www.w3.org/2000/svg">
              <polygon points="10,10 20,20"></polygon>
              <polygon points="10,50 20,50"></polygon>
              <polygon points="20,80 30,70"></polygon>
              <polygon points="90,10 80,20"></polygon>
              <polygon points="90,50 80,50"></polygon>
              <polygon points="80,80 70,70"></polygon>
            </svg>
          </div>
        </div>
      </button>
    );
  }

  if (type === "cart") {
    return (
      <button className="size-10 flex items-center justify-center bg-white rounded-full absolute top-0 right-0 m-3 p-2">
        <div className={styles.heartContainer} title="Favorite">
          <input
            type="checkbox"
            className={styles.checkbox}
            checked={onWishlist}
            onChange={handleUpdateWishlist}></input>
          <div className={styles.svgContainer}>
            <svg
              viewBox="0 0 24 24"
              className={styles.svgEmpty}
              xmlns="http://www.w3.org/2000/svg">
              <path d="M17.5,1.917a6.4,6.4,0,0,0-5.5,3.3,6.4,6.4,0,0,0-5.5-3.3A6.8,6.8,0,0,0,0,8.967c0,4.547,4.786,9.513,8.8,12.88a4.974,4.974,0,0,0,6.4,0C19.214,18.48,24,13.514,24,8.967A6.8,6.8,0,0,0,17.5,1.917Z"></path>
            </svg>
            <svg
              viewBox="0 0 24 24"
              className={styles.svgFilled}
              xmlns="http://www.w3.org/2000/svg">
              <path d="M17.5,1.917a6.4,6.4,0,0,0-5.5,3.3,6.4,6.4,0,0,0-5.5-3.3A6.8,6.8,0,0,0,0,8.967c0,4.547,4.786,9.513,8.8,12.88a4.974,4.974,0,0,0,6.4,0C19.214,18.48,24,13.514,24,8.967A6.8,6.8,0,0,0,17.5,1.917Z"></path>
            </svg>
            <svg
              className={styles.svgCelebrate}
              width="100"
              height="100"
              xmlns="http://www.w3.org/2000/svg">
              <polygon points="10,10 20,20"></polygon>
              <polygon points="10,50 20,50"></polygon>
              <polygon points="20,80 30,70"></polygon>
              <polygon points="90,10 80,20"></polygon>
              <polygon points="90,50 80,50"></polygon>
              <polygon points="80,80 70,70"></polygon>
            </svg>
          </div>
        </div>
      </button>
    );
  }

  if (type === "page") {
    return (
      <div className="w-full h-full flex items-center justify-center rounded-lg relative">
        <Button
          isIconOnly
          className="!size-full bg-zinc-50"
          onClick={handleUpdateWishlist}></Button>
        <div className="size-8 absolute pointer-events-none">
          <div className={styles.heartContainer} title="Favorite">
            <input
              type="checkbox"
              className={styles.checkbox}
              checked={onWishlist}></input>
            <div className={styles.svgContainer}>
              <svg
                viewBox="0 0 24 24"
                className={styles.svgEmpty}
                xmlns="http://www.w3.org/2000/svg">
                <path d="M17.5,1.917a6.4,6.4,0,0,0-5.5,3.3,6.4,6.4,0,0,0-5.5-3.3A6.8,6.8,0,0,0,0,8.967c0,4.547,4.786,9.513,8.8,12.88a4.974,4.974,0,0,0,6.4,0C19.214,18.48,24,13.514,24,8.967A6.8,6.8,0,0,0,17.5,1.917Z"></path>
              </svg>
              <svg
                viewBox="0 0 24 24"
                className={styles.svgFilled}
                xmlns="http://www.w3.org/2000/svg">
                <path d="M17.5,1.917a6.4,6.4,0,0,0-5.5,3.3,6.4,6.4,0,0,0-5.5-3.3A6.8,6.8,0,0,0,0,8.967c0,4.547,4.786,9.513,8.8,12.88a4.974,4.974,0,0,0,6.4,0C19.214,18.48,24,13.514,24,8.967A6.8,6.8,0,0,0,17.5,1.917Z"></path>
              </svg>
              <svg
                className={styles.svgCelebrate}
                width="100"
                height="100"
                xmlns="http://www.w3.org/2000/svg">
                <polygon points="10,10 20,20"></polygon>
                <polygon points="10,50 20,50"></polygon>
                <polygon points="20,80 30,70"></polygon>
                <polygon points="90,10 80,20"></polygon>
                <polygon points="90,50 80,50"></polygon>
                <polygon points="80,80 70,70"></polygon>
              </svg>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="size-12 rounded-full flex items-center justify-center bg-white absolute top-0 right-0 m-4 !pointer-events-auto">
      <Button
        className="!size-full min-w-0 min-h-0 bg-white"
        radius="full"
        onClick={handleUpdateWishlist}></Button>
      <div className="size-full absolute flex items-center justify-center p-3 pointer-events-none">
        <div className={styles.heartContainer} title="Favorite">
          <input
            type="checkbox"
            className={styles.checkbox}
            checked={onWishlist}></input>
          <div className={styles.svgContainer}>
            <svg
              viewBox="0 0 24 24"
              className={styles.svgEmpty}
              xmlns="http://www.w3.org/2000/svg">
              <path d="M17.5,1.917a6.4,6.4,0,0,0-5.5,3.3,6.4,6.4,0,0,0-5.5-3.3A6.8,6.8,0,0,0,0,8.967c0,4.547,4.786,9.513,8.8,12.88a4.974,4.974,0,0,0,6.4,0C19.214,18.48,24,13.514,24,8.967A6.8,6.8,0,0,0,17.5,1.917Z"></path>
            </svg>
            <svg
              viewBox="0 0 24 24"
              className={styles.svgFilled}
              xmlns="http://www.w3.org/2000/svg">
              <path d="M17.5,1.917a6.4,6.4,0,0,0-5.5,3.3,6.4,6.4,0,0,0-5.5-3.3A6.8,6.8,0,0,0,0,8.967c0,4.547,4.786,9.513,8.8,12.88a4.974,4.974,0,0,0,6.4,0C19.214,18.48,24,13.514,24,8.967A6.8,6.8,0,0,0,17.5,1.917Z"></path>
            </svg>
            <svg
              className={styles.svgCelebrate}
              width="100"
              height="100"
              xmlns="http://www.w3.org/2000/svg">
              <polygon points="10,10 20,20"></polygon>
              <polygon points="10,50 20,50"></polygon>
              <polygon points="20,80 30,70"></polygon>
              <polygon points="90,10 80,20"></polygon>
              <polygon points="90,50 80,50"></polygon>
              <polygon points="80,80 70,70"></polygon>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};
