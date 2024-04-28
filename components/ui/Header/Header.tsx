"use client";

// Modules
import Link from "next/link";
import clsx from "clsx";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { totalBagItemsSelector } from "@/lib/store/slices/bag.slice";
import { Player } from "@lordicon/react";

// Clerk
import { useUser, useAuth } from "@clerk/nextjs";

// NextUI
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  Button,
} from "@nextui-org/react";

// Styles
import styles from "./Header.module.scss";

// Components
import { Search } from "../Search/Search";
import { Bag } from "../Bag/Bag";
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
  const router = useRouter();

  useEffect(() => {
    if (!isSignedIn || !isLoaded) {
      closeDisplay();
    }
  }, [isSignedIn, isLoaded]);

  // Scrolling issue
  const scrollY = window.scrollY;

  useEffect(() => {
    const scrollPosition = window.scrollY;
    return () => {
      window.scrollTo(0, scrollPosition);
    };
  }, []);

  // Search Query / Reload
  const searchParams = useSearchParams();
  const query = searchParams.get("query") || "";

  // Display
  const [searchDisplay, setSearchDisplay] = useState(false),
    [bagDisplay, setBagDisplay] = useState(false),
    [userDisplay, setUserDisplay] = useState(false),
    [overlay, setOverlay] = useState(false);

  function closeDisplay() {
    setSearchDisplay(false);
    setBagDisplay(false);
    setUserDisplay(false);
    setOverlay(false);
  }

  // Close Search after click product
  useEffect(() => {
    if (query) {
      closeDisplay();
    }
  }, [query]);

  // Handle Display
  const { replace } = useRouter();
  const pathName = usePathname();

  function handleDisplay(id: string) {
    // Clear Params Query
    const params = new URLSearchParams(searchParams);
    params.delete("query");
    replace(`${pathName}?${params.toString()}`, { scroll: false });

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
      case "bag":
        if (bagDisplay) {
          closeDisplay();
          return;
        }
        closeDisplay();
        setBagDisplay(true);
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

  // Bag
  const totalBagItems = useSelector(totalBagItemsSelector),
    [prevTotalBagItems, setPreviousTotalBagItems] = useState(totalBagItems);

  // Animated icon
  const cartRef = useRef<Player>(null);

  useEffect(() => {
    if (totalBagItems > prevTotalBagItems) {
      cartIconAnimation();
    }
    setPreviousTotalBagItems(totalBagItems);
  }, [totalBagItems, prevTotalBagItems]);

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
            id="bag"
            onClick={(e) => handleDisplay(e.currentTarget.id)}>
            <Player ref={cartRef} icon={cartIcon} size={32} />
            {totalBagItems > 0 && (
              <div className="size-5 bg-primary rounded-full absolute -top-2 -right-2  text-xs text-white outline outline-4 outline-white flex items-center justify-center">
                {totalBagItems}
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
      {bagDisplay && <Bag closeDisplay={closeDisplay} />}
      <div
        className={clsx(
          "bg-black/60 fixed top-0 left-0 right-0 bottom-0 -z-10 pointer-events-auto",
          { hidden: !overlay && !query }
        )}
        onClick={() => {
          closeDisplay();
        }}></div>
    </header>
  );
};
