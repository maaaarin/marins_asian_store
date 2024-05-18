"use client";

// Modules
import Link from "next/link";
import clsx from "clsx";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import { Cart as CartType } from "@/types";
import { useAuth } from "@clerk/nextjs";

// NextUI
import { Popover, PopoverTrigger, PopoverContent } from "@nextui-org/react";

// Components
import { Search } from "../Search/Search";
import { SearchBar } from "../Search/SearchBar";
import { UserMenu } from "@/components/ui/User/UserMenu";

// Files
import cartIcon from "@/public/assets/icons/cart.json";
import logo from "/public/assets/logo.svg";
import { FlavorTrail } from "../FlavorTrail/FlavorTrail";
import { Cart } from "../Cart/Cart";
import { getCart } from "@/lib/actions/cart.actions";
import { useDispatch, useSelector } from "react-redux";
import {
  cartIdSelector,
  countCartItemsSelector,
  resetCart,
  setCart,
  subtotalCartSelector,
  totalQuantityCartSelector,
} from "@/lib/store/slices/cart.slice";
import { Player } from "@lordicon/react";
import { resetWishlist, setWishlist } from "@/lib/store/slices/wishlist.slice";
import { getWishlist } from "@/lib/actions/wishlist.actions";

export const Header = () => {
  // Clerk
  const { isLoaded, isSignedIn, user } = useUser();
  const { userId } = useAuth();
  useEffect(() => {
    if (!isSignedIn || !isLoaded) {
      closeDisplay();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSignedIn, isLoaded]);

  // Search
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("query") || "";
  // Display
  const [searchDisplay, setSearchDisplay] = useState(false),
    [cartDisplay, setCartDisplay] = useState(false);
  const { replace } = useRouter();
  const pathName = usePathname();
  const params = new URLSearchParams(searchParams);

  function closeDisplay() {
    setSearchDisplay(false);
    setCartDisplay(false);
    params.delete("query");
    replace(`${pathName}?${params.toString()}`, { scroll: false });
  }

  const [currentPathName, setCurrentPathName] = useState(pathName);
  useEffect(() => {
    if (currentPathName !== pathName) {
      setSearchDisplay(false);
      setCurrentPathName(pathName);
    }
  }, [searchQuery, currentPathName, pathName]);

  // Cart
  const dispatch = useDispatch();
  const countCartItems = useSelector(countCartItemsSelector),
    subtotalCart = useSelector(subtotalCartSelector),
    [prevSubtotalCart, setPrevSubtotalCart] = useState(subtotalCart);

  useEffect(() => {
    dispatch(resetCart());
    const fetchCart = async () => {
      // User cart
      if (userId) {
        window.localStorage.removeItem("cart");
        const getUserCart = await getCart(userId);
        if (getUserCart) {
          dispatch(resetCart());
          dispatch(setCart(getUserCart));
        }
        const localCart = window.localStorage.getItem("cart");
        if (localCart) {
          const guestCart = JSON.parse(localCart);
          console.log(guestCart);
        }
        return;
      }
      if (!userId) {
        // Try to find guest cart on localStorage
        const localCart = window.localStorage.getItem("cart");
        if (localCart) {
          const guestCart = JSON.parse(localCart);
          const getGuestCart = await getCart(null, guestCart._id);
          // getGuestCart && dispatch(setCart(getGuestCart));
          if (getGuestCart) {
            dispatch(setCart(getGuestCart));
          } else {
            window.localStorage.removeItem("cart");
          }
          return;
        }
      }
    };
    fetchCart();
  }, [userId, isSignedIn, dispatch]);

  // Cart Icon
  const cartRef = useRef<Player>(null);
  function cartIconAnimation() {
    let iconAnimation = cartRef.current;
    if (!iconAnimation?.isPlaying) {
      iconAnimation?.playFromBeginning();
    }
  }

  useEffect(() => {
    if (subtotalCart > prevSubtotalCart) {
      cartIconAnimation();
    }
    setPrevSubtotalCart(subtotalCart);
  }, [subtotalCart, prevSubtotalCart]);

  // Wishlist
  useEffect(() => {
    // dispatch(resetWishlist());
    if (userId) {
      const fetchWishlist = async () => {
        const getUserWishlist = await getWishlist(userId);
        if (getUserWishlist) {
          dispatch(setWishlist(getUserWishlist));
        }
      };
      fetchWishlist();
    }
  }, [userId, dispatch]);

  // Display
  function handleCartDisplay() {
    if (cartDisplay) {
      closeDisplay();
    } else {
      closeDisplay();
      setCartDisplay(true);
    }
  }

  function handleSearchDisplay() {
    if (searchDisplay) {
      closeDisplay();
    } else {
      closeDisplay();
      setSearchDisplay(true);
    }
  }

  const [userDisable, setUserDisable] = useState(false);

  // User disable display
  useEffect(() => {
    if (pathName.includes("profile")) {
      setUserDisable(true);
    } else {
      setUserDisable(false);
    }
  }, [pathName]);

  return (
    <header className="container h-16 z-50 fixed top-4 right-0 left-0  flex justify-center items-center">
      <nav className="w-3/5 h-full flex justify-between items-center pl-4 pr-4 py-2 bg-white z-50 border border-black rounded-2xl">
        <Link href="/">
          <Image src={logo} alt="alt" width={78} height={24} />
        </Link>
        <ul
          className={clsx("flex items-center gap-4 font-normal text-lg", {
            hidden: searchDisplay || searchQuery,
          })}>
          <Link href="/categories/snack">
            <li>Snacks</li>
          </Link>
          <Link href="/categories/drink">
            <li>Drinks</li>
          </Link>
          <Link href="/categories/candy">
            <li>Candy</li>
          </Link>
          <Link href="/categories/soup">
            <li>Soups</li>
          </Link>
        </ul>
        {/* Search Bar */}
        {(searchDisplay || searchQuery) && (
          <SearchBar closeDisplay={closeDisplay} />
        )}
        <ul className="w-auto h-full flex gap-4 items-center">
          <li>
            {/* Search */}
            <div className="cursor-pointer" onClick={handleSearchDisplay}>
              <svg
                className={clsx("size-6", {
                  hidden: searchDisplay || searchQuery,
                })}
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20.26 20.72">
                <path d="M9.74,19.48C4.37,19.48,0,15.11,0,9.74S4.37,0,9.74,0s9.74,4.37,9.74,9.74-4.37,9.74-9.74,9.74ZM9.74,1.5C5.2,1.5,1.5,5.2,1.5,9.74s3.7,8.24,8.24,8.24,8.24-3.7,8.24-8.24S14.28,1.5,9.74,1.5Z" />
                <path d="M19.51,20.72c-.19,0-.38-.07-.53-.22l-3.52-3.52c-.29-.29-.29-.77,0-1.06,.29-.29,.77-.29,1.06,0l3.52,3.52c.29,.29,.29,.77,0,1.06-.15,.15-.34,.22-.53,.22Z" />
              </svg>
            </div>
            <Search searchDisplay={searchDisplay} searchQuery={searchQuery} />
          </li>
          <li>
            {/* Cart */}
            <div
              className="relative grid place-items-center cursor-pointer"
              onClick={handleCartDisplay}>
              <Player ref={cartRef} icon={cartIcon} size={32} />
              {countCartItems ? (
                <div className="size-5 bg-primary rounded-full absolute -top-2 -right-2  text-xs text-white outline outline-4 outline-white flex items-center justify-center">
                  {countCartItems}
                </div>
              ) : (
                ""
              )}
            </div>
            <Cart cartDisplay={cartDisplay} closeDisplay={closeDisplay} />
          </li>
          {/* Flavor Trail */}
          <SignedIn>
            <li>
              <FlavorTrail />
            </li>
          </SignedIn>
          <li className="w-auto h-full flex-center cursor-pointer">
            {/* User */}
            <SignedIn>
              {userDisable ? (
                <Image
                  src={user?.imageUrl || ""}
                  alt="Profile Picture"
                  width={96}
                  height={96}
                  id="user"
                  className="size-10 rounded-full border-2 border-primary object-cover"
                />
              ) : (
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
                    />
                  </PopoverTrigger>
                  <PopoverContent>
                    <UserMenu />
                  </PopoverContent>
                </Popover>
              )}
            </SignedIn>
            <SignedOut>
              <Link href="/sign-in">
                <button className="w-fit h-10 bg-secondary rounded-xl px-4 text-white">
                  Sign In
                </button>
              </Link>
            </SignedOut>
          </li>
        </ul>
      </nav>
      <div
        className={clsx(
          "bg-black/60 fixed top-0 left-0 right-0 bottom-0 -z-10 pointer-events-auto animate-fade-in",
          { hidden: !cartDisplay && !searchDisplay && !searchQuery }
        )}
        onClick={() => {
          closeDisplay();
        }}></div>
    </header>
  );
};
