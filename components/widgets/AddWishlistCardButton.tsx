"use client";
import React, { useEffect, useRef, useState } from "react";
import { addWishlist, removeWishlist } from "@/lib/actions/wishlist.actions";
import wishlistAddIcon from "@/public/assets/icons/wishlist-add.json";
import wishlistRemoveIcon from "@/public/assets/icons/wishlist-remove.json";
import { existsWishlist } from "@/lib/actions/wishlist.actions";
import { Player } from "@lordicon/react";
import { useRouter } from "next/navigation";
import { useAuth } from "@clerk/nextjs";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  Button,
} from "@nextui-org/react";

type Props = {
  productId: string;
  alreadyAdded?: boolean;
};

export const AddWishlistCardButton = ({ productId, alreadyAdded }: Props) => {
  const router = useRouter();
  const [onWishlist, setOnWishlist] = useState(alreadyAdded);
  const wishlistAddRef = useRef<Player>(null),
    wishlistRemoveRef = useRef<Player>(null);
  const { isLoaded, userId, sessionId, getToken } = useAuth();

  useEffect(() => {
    // Verificar si el producto ya está en wishlist
    if (userId) {
      const getProduct = async () => {
        const produtExist = await existsWishlist(userId, productId);
        if (!produtExist) {
          setOnWishlist(false);
        } else {
          setOnWishlist(true);
        }
      };
      if (!alreadyAdded) {
        getProduct();
      }
    }
  }, [alreadyAdded, productId, userId]);

  async function handleUpdateWishlist() {
    if (userId) {
      if (!onWishlist) {
        const addingWishlist = await addWishlist(userId, productId);
        if (addingWishlist) {
          wishlistRemoveRef.current?.playFromBeginning();
          router.refresh();
        }
        return;
      }
      // Then remove
      wishlistRemoveRef.current?.playFromBeginning();
      const removingWishlist = await removeWishlist(userId, productId);
      if (removingWishlist) {
        wishlistAddRef.current?.playFromBeginning();
        router.refresh();
      }
    }
  }

  function handleIconAnimation() {
    if (onWishlist) {
      setOnWishlist(false);
    } else {
      setOnWishlist(true);
    }
  }
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
      // <Tooltip
      //   placement="left"
      //   content={
      //     <div className="px-1 py-2">
      //       <div className="text-small font-bold">Not yet!</div>
      //       <div className="text-tiny">Sign in to add to your wishlist!</div>
      //     </div>
      //   }
      //   shouldCloseOnInteractOutside={(e) => false}
      //   closeDelay={0}>
      //   <Button
      //     isIconOnly
      //     size="lg"
      //     ref={wishlistButton}
      //     className="size-12 rounded-full grid place-items-center bg-white absolute top-0 right-0 m-4 !pointer-events-auto"
      //     onClick={handleUpdateWishlist}>
      //     <Player ref={wishlistRemoveRef} icon={wishlistRemoveIcon} size={36} />
      //   </Button>
      // </Tooltip>
    );
  }

  if (alreadyAdded) {
    return (
      <button
        className="size-12 rounded-full grid place-items-center bg-zinc-100"
        onClick={handleUpdateWishlist}>
        <Player ref={wishlistAddRef} icon={wishlistAddIcon} size={36} />
      </button>
    );
  }

  return (
    <button
      className="size-12 rounded-full grid place-items-center bg-white absolute top-0 right-0 m-4 !pointer-events-auto"
      onClick={handleUpdateWishlist}>
      {onWishlist ? (
        <Player
          ref={wishlistAddRef}
          icon={wishlistAddIcon}
          size={36}
          onComplete={handleIconAnimation}
        />
      ) : (
        <Player
          ref={wishlistRemoveRef}
          icon={wishlistRemoveIcon}
          size={36}
          onComplete={handleIconAnimation}
        />
      )}
    </button>
  );
};
