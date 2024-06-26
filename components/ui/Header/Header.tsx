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
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/widgets/sheet";
import { UserFeatures } from "../User/UserFeatures";
import ItemAddedToast from "@/components/widgets/ItemAddedToast";

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
  const cartTotalQuantity = useSelector(totalQuantityCartSelector),
    subtotalCart = useSelector(subtotalCartSelector),
    countCartItems = useSelector(countCartItemsSelector),
    [prevSubtotalCart, setPrevSubtotalCart] = useState(subtotalCart),
    [prevCountCartItems, setPrevCountCartItems] = useState(countCartItems),
    [prevTotalQuantity, setPrevTotalQuantity] = useState(cartTotalQuantity);

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

  // Detect new products / cart added toast
  const [isAdded, setIsAdded] = useState(false);
  const timeoutRef = useRef<any>(null);

  useEffect(() => {
    if (subtotalCart > prevSubtotalCart) {
      cartIconAnimation();
    }
    setPrevSubtotalCart(subtotalCart);
  }, [subtotalCart, prevSubtotalCart]);

  useEffect(() => {
    if (
      cartTotalQuantity > prevTotalQuantity &&
      prevTotalQuantity > 0 &&
      countCartItems > 0 &&
      !cartDisplay
    ) {
      if (isAdded) {
        if (timeoutRef.current) {
          return;
        }
      }
      setIsAdded(true);
      timeoutRef.current = setTimeout(() => {
        setIsAdded(false);
        timeoutRef.current = null;
      }, 3250);
    }
    setPrevTotalQuantity(cartTotalQuantity);
    return;
  }, [cartTotalQuantity, cartDisplay]);

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

  const [isUserProfile, setIsUserProfile] = useState(false);

  // User disable display
  useEffect(() => {
    if (pathName.includes("profile")) {
      setIsUserProfile(true);
    } else {
      setIsUserProfile(false);
    }
  }, [pathName]);

  useEffect(() => {
    if (searchDisplay || cartDisplay) {
      document.body.classList.add("overflow-y-hidden");
    } else {
      document.body.classList.remove("overflow-y-hidden");
    }
  }, [searchDisplay, cartDisplay]);

  return (
    <header className="container fixed top-4 right-0 left-0 lg:mt-0 lg:top-4 h-16 z-50 flex justify-center items-center">
      <nav className="w-full lg:w-3/5 h-full flex justify-between items-center pl-4 pr-4 py-2 bg-white z-50 border border-black rounded-2xl ">
        <div className="w-auto mr-4 flex items-center gap-3 lg:hidden">
          <Sheet>
            <SheetTrigger>
              <div className="size-8">
                <svg
                  fill="currentColor"
                  viewBox="0 0 16 16"
                  className="size-full">
                  <path
                    fill-rule="evenodd"
                    d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5"
                  />
                </svg>
              </div>
            </SheetTrigger>
            <SheetContent side="left">
              <div className="mt-6">
                <SignedOut>
                  <Link href="/sign-in">
                    <SheetClose asChild>
                      <div className="w-full h-20 rounded-xl flex flex-col text-white items-center justify-center bg-secondary bg-no-repeat bg-cover bg-[url('/assets/img/guest-banner.svg')] py-3">
                        <span className="text-lg font-semibold ">
                          Sign In or Sign Up
                        </span>
                        <span className="text-sm ">Join us!</span>
                      </div>
                    </SheetClose>
                  </Link>
                </SignedOut>
                <SignedIn>
                  <Link href="/profile/account">
                    <SheetClose asChild>
                      <div className="w-full h-24 rounded-xl flex flex-col text-white items-center justify-center bg-secondary bg-no-repeat bg-cover bg-[url('/assets/img/user-banner.svg')] py-3 relative">
                        <div className="size-full flex items-center gap-3 rounded-xl p-3  bg-cover bg-center lg:px-4 lg:py-6">
                          <div className="size-14 flex justify-center relative">
                            <Image
                              src={user?.imageUrl || ""}
                              alt="alt"
                              width={96}
                              height={96}
                              className="size-full rounded-full border-2 border-secondary object-cover"
                            />
                          </div>
                          <div className="flex flex-col">
                            <span className="text-white font-medium text-lg drop-shadow-sm">
                              {user?.firstName?.concat(
                                " ",
                                user?.lastName || ""
                              )}
                            </span>
                            <span className="w-fit px-2 py-1 text-xs bg-secondary text-white rounded-full">
                              Lvl. 1
                            </span>
                          </div>
                        </div>
                      </div>
                    </SheetClose>
                  </Link>
                </SignedIn>
                {isUserProfile ? (
                  <UserFeatures />
                ) : (
                  <div className="w-full h-auto flex flex-col gap-3 mt-4">
                    <h2 className="text-center">Explore</h2>
                    <ul className="w-full flex flex-col gap-2">
                      <Link href="/categories/snack">
                        <SheetClose asChild>
                          <li className="w-full px-4 py-3 flex items-center justify-between bg-zinc-50 rounded-full">
                            Snacks
                            <svg
                              className="size-4"
                              fill="currentColor"
                              viewBox="0 0 16 16">
                              <path
                                fill-rule="evenodd"
                                d="M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8"
                              />
                            </svg>
                          </li>
                        </SheetClose>
                      </Link>
                      <Link href="/categories/drink">
                        <SheetClose asChild>
                          <li className="w-full px-4 py-3 flex items-center justify-between bg-zinc-50 rounded-full">
                            Drinks
                            <svg
                              className="size-4"
                              fill="currentColor"
                              viewBox="0 0 16 16">
                              <path
                                fill-rule="evenodd"
                                d="M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8"
                              />
                            </svg>
                          </li>
                        </SheetClose>
                      </Link>
                      <Link href="/categories/candy">
                        <SheetClose asChild>
                          <li className="w-full px-4 py-3 flex items-center justify-between bg-zinc-50 rounded-full">
                            Candy
                            <svg
                              className="size-4"
                              fill="currentColor"
                              viewBox="0 0 16 16">
                              <path
                                fill-rule="evenodd"
                                d="M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8"
                              />
                            </svg>
                          </li>
                        </SheetClose>
                      </Link>
                      <Link href="/categories/soup">
                        <SheetClose asChild>
                          <li className="w-full px-4 py-3 flex items-center justify-between bg-zinc-50 rounded-full">
                            Soups
                            <svg
                              className="size-4"
                              fill="currentColor"
                              viewBox="0 0 16 16">
                              <path
                                fill-rule="evenodd"
                                d="M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8"
                              />
                            </svg>
                          </li>
                        </SheetClose>
                      </Link>
                    </ul>
                  </div>
                )}
              </div>
            </SheetContent>
          </Sheet>
          <Link href="/" className={clsx({ hidden: searchDisplay })}>
            <Image src={logo} alt="alt" width={100} height={25} />
          </Link>
        </div>
        <Link href="/" className="hidden lg:block">
          <Image src={logo} alt="alt" width={96} height={25} />
        </Link>
        <ul
          className={clsx(
            "hidden lg:flex items-center gap-6 font-normal text-lg ",
            {
              "!hidden": searchDisplay || searchQuery,
            }
          )}>
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
              {cartTotalQuantity ? (
                <div className="size-5 bg-primary rounded-full absolute -top-2 -right-2  text-xs text-white outline outline-4 outline-white flex items-center justify-center">
                  {cartTotalQuantity}
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
          <li className="hidden lg:flex w-auto h-full items-center justify-center cursor-pointer">
            {/* User */}
            <SignedIn>
              {isUserProfile ? (
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
          "bg-black/60 fixed top-0 left-0 right-0 bottom-0 z-20 pointer-events-auto animate-fade-in",
          { hidden: !cartDisplay && !searchDisplay && !searchQuery }
        )}
        onClick={() => {
          closeDisplay();
        }}></div>
      {isAdded && !cartDisplay && <ItemAddedToast />}
    </header>
  );
};
