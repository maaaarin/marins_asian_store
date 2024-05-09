"use client";

// Modules
import Link from "next/link";
import clsx from "clsx";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  totalCartItemsSelector,
  subtotalCartSelector,
} from "@/lib/store/slices/cart.slice";
import { Player } from "@lordicon/react";
import { getCart } from "@/lib/actions/cart.actions";
import { Cart as CartType } from "@/types";
import { useUser, useAuth } from "@clerk/nextjs";

// NextUI
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  Button,
} from "@nextui-org/react";

// Components
import { Search } from "../Search/Search";
import { Cart } from "../Cart/Cart";
import { SearchBar } from "../Search/SearchBar";
import { useSelector } from "react-redux";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import { UserMenu } from "@/components/ui/User/UserMenu";

// Files
import logo from "/public/assets/logo.svg";
import cartIcon from "@/public/assets/icons/cart.json";
import { FlavorTrail } from "../FlavorTrail/FlavorTrail";

export const Header = () => {
  // Clerk
  const { isLoaded, isSignedIn, user } = useUser();

  useEffect(() => {
    if (!isSignedIn || !isLoaded) {
      closeDisplay();
    }
  });

  const [cart, setCart] = useState<CartType>();

  // Cart
  useEffect(() => {
    const fetchCart = async () => {
      const cart = await getCart();
      cart && setCart(cart);
      console.log(cart);
    };
    fetchCart();
  }, []);

  // Search Query / Reload
  const searchParams = useSearchParams();
  const query = searchParams.get("query") || "";

  // Display
  const [searchDisplay, setSearchDisplay] = useState(false),
    [cartDisplay, setCartDisplay] = useState(false),
    [userDisplay, setUserDisplay] = useState(false),
    [overlay, setOverlay] = useState(false);
  const { replace } = useRouter();
  const pathName = usePathname();
  const params = new URLSearchParams(searchParams);

  function closeDisplay() {
    setSearchDisplay(false);
    setCartDisplay(false);
    setUserDisplay(false);
    setOverlay(false);
    params.delete("query");
    replace(`${pathName}?${params.toString()}`, { scroll: false });
  }

  // Close Search after click product
  useEffect(() => {
    if (query) {
      setSearchDisplay(false);
      setOverlay(false);
      setUserDisplay(false);
    }
  }, [query]);

  function handleDisplay(id: string) {
    // Handle display
    switch (id) {
      case "search":
        if (searchDisplay) {
          closeDisplay();
          return;
        }
        closeDisplay();
        setSearchDisplay(true);
        break;
      case "cart":
        if (cartDisplay) {
          closeDisplay();
          return;
        }
        closeDisplay();
        setCartDisplay(true);
        break;
      case "user":
        if (userDisplay) {
          setUserDisplay(false);
          return;
        }
        setUserDisplay(true);
        return;
    }
    setOverlay(true);
  }

  // Cart
  const totalCartItems = useSelector(totalCartItemsSelector),
    subtotalCart = useSelector(subtotalCartSelector),
    [prevTotalSubtotalCart, setPrevTotalSubtotalCart] = useState(subtotalCart);

  // Animated icon
  const cartRef = useRef<Player>(null);

  useEffect(() => {
    if (subtotalCart > prevTotalSubtotalCart) {
      cartIconAnimation();
    }
    setPrevTotalSubtotalCart(subtotalCart);
  }, [subtotalCart, prevTotalSubtotalCart]);

  function cartIconAnimation() {
    let iconAnimation = cartRef.current;
    if (!iconAnimation?.isPlaying) {
      iconAnimation?.playFromBeginning();
    }
  }

  return (
    <header className="container h-16 z-50 fixed top-4 right-0 left-0  flex justify-center items-center">
      <nav className="w-3/5 h-full flex justify-between items-center pl-4 pr-4 py-2 bg-white z-50 border border-black rounded-2xl">
        <Link href="/">
          <Image src={logo} alt="alt" width={78} height={24} />
        </Link>
        <ul
          className={clsx("flex items-center gap-4 font-normal text-lg", {
            hidden: searchDisplay || query,
          })}>
          <li>Explore</li>
          <li>Features</li>
          <li>About</li>
        </ul>
        {(searchDisplay || query) && <SearchBar closeDisplay={closeDisplay} />}
        <ul className="w-auto h-full flex gap-4 items-center">
          <li
            className="cursor-pointer"
            id="search"
            onClick={(e) => handleDisplay(e.currentTarget.id)}>
            <svg
              className={clsx("w-6 h-6", { hidden: searchDisplay || query })}
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20.26 20.72">
              <path d="M9.74,19.48C4.37,19.48,0,15.11,0,9.74S4.37,0,9.74,0s9.74,4.37,9.74,9.74-4.37,9.74-9.74,9.74ZM9.74,1.5C5.2,1.5,1.5,5.2,1.5,9.74s3.7,8.24,8.24,8.24,8.24-3.7,8.24-8.24S14.28,1.5,9.74,1.5Z" />
              <path d="M19.51,20.72c-.19,0-.38-.07-.53-.22l-3.52-3.52c-.29-.29-.29-.77,0-1.06,.29-.29,.77-.29,1.06,0l3.52,3.52c.29,.29,.29,.77,0,1.06-.15,.15-.34,.22-.53,.22Z" />
            </svg>
          </li>
          <li
            className="relative grid place-items-center cursor-pointer"
            id="cart"
            onClick={(e) => handleDisplay(e.currentTarget.id)}>
            <Player ref={cartRef} icon={cartIcon} size={32} />
            {cart?.totalQuantity && (
              <div className="size-5 bg-primary rounded-full absolute -top-2 -right-2  text-xs text-white outline outline-4 outline-white flex items-center justify-center">
                {cart?.totalQuantity}
              </div>
            )}
          </li>
          <SignedIn>
            <li className="w-auto h-full flex-center cursor-pointer">
              <FlavorTrail />
            </li>
          </SignedIn>
          <li id="user" className="w-auto h-full flex-center cursor-pointer">
            <SignedIn>
              <Popover
                placement="bottom"
                showArrow={true}
                shouldBlockScroll={true}
                classNames={{
                  content: ["p-0 border-none"],
                }}>
                <PopoverTrigger>
                  <Image
                    src={user?.imageUrl || ""}
                    alt="Profile Picture"
                    width={96}
                    height={96}
                    id="user"
                    className="size-10 rounded-full border-2 border-primary object-cover"
                    onClick={(e) => handleDisplay(e.currentTarget.id)}
                  />
                </PopoverTrigger>
                <PopoverContent>
                  <UserMenu />
                </PopoverContent>
              </Popover>
            </SignedIn>
            <SignedOut>
              <Link href="/sign-in">
                <button className="w-fit h-10 bg-secondary rounded-xl px-4 text-white">
                  Log In
                </button>
              </Link>
            </SignedOut>
          </li>
        </ul>
      </nav>
      {(searchDisplay || query) && <Search />}
      {cartDisplay && <Cart closeDisplay={closeDisplay} />}
      <div
        className={clsx(
          "bg-black/60 fixed top-0 left-0 right-0 bottom-0 -z-10 pointer-events-auto animate-fade-in",
          { hidden: !overlay && !query }
        )}
        onClick={() => {
          closeDisplay();
        }}></div>
    </header>
  );
};
