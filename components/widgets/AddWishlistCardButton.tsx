"use client";
import React, { useEffect, useRef, useState } from "react";
import {
  addWishlist as addWishlistAction,
  removeWishlist as removeWishlistAction,
} from "@/lib/actions/wishlist.actions";
import wishlistAddIcon from "@/public/assets/icons/wishlist-add.json";
import wishlistRemoveIcon from "@/public/assets/icons/wishlist-remove.json";
import { Player } from "@lordicon/react";
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
  alreadyAdded?: boolean;
};

export const AddWishlistCardButton = ({ productId, alreadyAdded }: Props) => {
  const router = useRouter();
  const wishlistAddRef = useRef<Player>(null),
    wishlistRemoveRef = useRef<Player>(null);
  const { userId } = useAuth();
  const onWishlist = useSelector((state) =>
    isOnWishlistSelector(state, productId)
  );
  const dispatch = useDispatch();

  // useEffect(() => {
  //   console.log(onWishlist);
  // }, [onWishlist]);

  async function handleUpdateWishlist() {
    if (userId) {
      if (!onWishlist) {
        const addingWishlist = await addWishlistAction(userId, productId);
        dispatch(addWishlist(productId));
        if (addingWishlist) {
          // wishlistRemoveRef.current?.playFromBeginning();
          router.refresh();
        }
        return;
      }
      // Then remove
      const removingWishlist = await removeWishlistAction(userId, productId);
      dispatch(removeWishlist(productId));
      if (removingWishlist) {
        // wishlistAddRef.current?.playFromBeginning();
        router.refresh();
      }
    }
  }

  // Wishlist for guest user
  const [isOpen, setIsOpen] = React.useState(false);
  const [closeTimeOut, setCloseTimeOut] = useState<NodeJS.Timeout | null>(null);

  function closeDelay() {
    return setTimeout(() => {
      setIsOpen(false);
    }, 800);
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
            isIconOnly
            size="lg"
            className="size-12 rounded-full grid place-items-center bg-white absolute top-0 right-0 m-4 !pointer-events-auto"
            onClick={handleUpdateWishlist}>
            <Player
              ref={wishlistRemoveRef}
              icon={wishlistRemoveIcon}
              size={36}
            />
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

  // if (onWishlist) {
  //   return (
  //     <button
  //       className="size-12 rounded-full grid place-items-center bg-white absolute top-0 right-0 m-4 !pointer-events-auto"
  //       onClick={handleUpdateWishlist}>
  //       <Player ref={wishlistAddRef} icon={wishlistAddIcon} size={36} />
  //     </button>
  //   );
  // }

  return (
    <button
      className="size-12 rounded-full grid place-items-center bg-white absolute top-0 right-0 m-4 !pointer-events-auto"
      onClick={handleUpdateWishlist}>
      {onWishlist ? <span>Si</span> : <span>No</span>}
    </button>
  );
};
