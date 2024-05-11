"use client";

// Modules
import Link from "next/link";
import clsx from "clsx";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import { Cart as CartType } from "@/types";

// NextUI
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@nextui-org/react";

// Components
import { Search } from "../Search/Search";
import { SearchBar } from "../Search/SearchBar";
import { UserMenu } from "@/components/ui/User/UserMenu";

// Files
import logo from "/public/assets/logo.svg";
import { FlavorTrail } from "../FlavorTrail/FlavorTrail";
import { Cart } from "../Cart/Cart";
import { getCart } from "@/lib/actions/cart.actions";

export const Header = () => {
  // Clerk
  const { isLoaded, isSignedIn, user } = useUser();
  useEffect(() => {
    if (!isSignedIn || !isLoaded) {
      closeDisplay();
    }
  });

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
    if (currentPathName !== pathName){
      setSearchDisplay(false);
      setCurrentPathName(pathName);
    }
  }, [searchQuery, currentPathName, pathName])

  // Cart
  const [cart, setCart] = useState<CartType>();
  useEffect(() => {
    const fetchCart = async () => {
      const userCart = await getCart(user?.id);
      userCart && setCart(userCart);
      console.log(userCart);
    };
    fetchCart();
  }, [user, ]);

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
          <li>Explore</li>
          <li>Features</li>
          <li>About</li>
        </ul>
        {/* Search Bar */}
        {(searchDisplay || searchQuery) && (
          <SearchBar closeDisplay={closeDisplay} />
        )}
        <ul className="w-auto h-full flex gap-4 items-center">
          <li>
            {/* Search */}
            <Search
              searchDisplay={searchDisplay}
              setSearchDisplay={setSearchDisplay}
              searchQuery={searchQuery}
              closeDisplay={closeDisplay}
            />
          </li>
          <li>
            {/* <Cart/> */}
            <Cart
              cart={cart}
              cartDisplay={cartDisplay}
              setCartDisplay={setCartDisplay}
              closeDisplay={closeDisplay}
            />
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
