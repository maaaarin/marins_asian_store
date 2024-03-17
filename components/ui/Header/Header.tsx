"use client";

import clsx from "clsx";
import React, { useState } from "react";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { totalBagItemsSelector } from "@/lib/store/slices/bag.slice";

// Styles
import styles from "./Header.module.scss";

// Components
import { Search } from "../Search/Search";
import { Bag } from "../Bag/Bag";
import { SearchBar } from "../Search/SearchBar";
import { useSelector } from "react-redux";

export const Header = () => {

  // Search Query / Reload
  const searchParams = useSearchParams();
  const query = searchParams.get("query") || "";

  // Display
  const [search, setSearch] = useState(false),
    [bag, setBag] = useState(false),
    [user, setUser] = useState(false),
    [overlay, setOverlay] = useState(false);

  function closeDisplay() {
    setSearch(false);
    setBag(false);
    setUser(false);
    setOverlay(false);
  }

  const { replace } = useRouter();
  const pathName = usePathname();

  function handleDisplay(id: string) {
    // Clear params query
    const params = new URLSearchParams(searchParams);
    params.delete("query");
    replace(`${pathName}?${params.toString()}`);

    // Handle display
    switch (id) {
      case "search":
        closeDisplay();
        setSearch(true);
        break;
      case "bag":
        closeDisplay();
        setBag(true);
        break;
      case "user":
        closeDisplay();
        setUser(true);
        break;
    }
    setOverlay(true);
  }

  // Bag

  const totalBagItems = useSelector(totalBagItemsSelector);

  return (
    <header
      className={`${styles.header} container h-16 z-50 fixed top-5 right-0 left-0  flex justify-center items-center`}>
      <nav className="w-3/5 h-full flex justify-between items-center px-4 py-2 bg-white z-50 border border-black rounded-2xl">
        <svg
          className="w-20 h-auto object-contain cursor-pointer"
          viewBox="0 0 123 30"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <g clipPath="url(#clip0_80_316)">
            <path
              d="M0 0.168427H5.7199L18.1776 25.5999L28.9812 0.168427H33.6418C32.032 0.676701 31.6089 2.03013 31.6089 3.552V26.3593C31.6089 27.8812 32.032 29.2789 33.6418 29.7872H26.6938C28.3036 29.2789 28.7711 27.9255 28.7711 26.3593V1.98876L16.9466 29.7458L3.51538 2.1572V26.0224C3.51538 28.0526 4.78779 29.1962 6.60762 29.7872H0C1.82279 29.1962 3.05081 28.0112 3.05081 26.0224V3.72339C3.05081 1.86169 1.65117 0.676701 0 0.168427Z"
              fill="#1D1D1B"
            />
            <path
              d="M37.0742 24.669C37.0742 19.7606 45.6763 17.8576 49.4047 17.3079V15.065C49.4047 12.3582 48.4312 9.09871 45.1259 9.09871C43.6019 9.09871 40.8027 9.81679 40.8027 11.7228C40.8027 12.3138 41.0157 12.8664 41.0157 13.4988C41.0157 14.5154 40.4239 15.065 39.406 15.065C38.388 15.065 37.9235 14.2612 37.9235 13.3718C37.9235 10.4935 43.1344 8.63181 45.5076 8.63181C51.2275 8.63181 51.7779 11.8913 51.7779 16.7553C54.3197 16.12 56.8201 15.3162 59.1075 14.0041C59.1075 13.1147 58.9388 11.3387 57.7108 11.3387L61.5251 8.67318V12.4823C63.3893 11.0845 65.4222 8.63181 67.964 8.63181C68.8547 8.63181 69.701 9.01301 69.701 9.98523C69.701 10.9575 69.1092 11.4657 68.1327 11.4657C67.1562 11.4657 66.8189 10.7033 65.5494 10.7033C64.786 10.7033 63.8124 11.1702 63.2206 11.6755C58.856 15.4403 54.0682 16.7524 48.5614 17.9374C44.9187 18.7411 40.0451 20.0118 40.0451 24.6218C40.0451 27.2459 41.7821 28.8948 44.3654 28.8948C46.1024 28.8948 47.502 28.1767 48.8987 27.2459C47.4576 29.0662 45.2561 29.87 42.9657 29.87C39.7877 29.87 37.0772 28.094 37.0772 24.6661L37.0742 24.669ZM49.4047 18.6614C50.2096 18.4486 50.973 18.2802 51.7779 18.1117V25.8127C51.7779 27.1247 52.2454 28.4368 53.7693 28.4368C54.3612 28.4368 54.9559 28.3097 55.3791 27.8871C55.0832 28.945 53.4734 29.8759 52.4141 29.8759C49.8722 29.8759 49.4047 27.9728 49.4047 25.8127V18.6614ZM57.0746 29.7902C58.7258 29.1992 59.1075 27.9285 59.1075 26.3209V15.529C59.6993 15.2335 61.0132 14.3854 61.5221 13.9214V26.318C61.5221 27.9669 61.9453 29.0692 63.5136 29.7872H57.0746V29.7902Z"
              fill="#1D1D1B"
            />
            <path
              d="M71.6895 29.7872C73.2992 29.279 73.7224 27.8842 73.7224 26.318V13.9214C73.7224 13.0319 73.5537 11.2973 72.3227 11.2973L76.137 8.6318V26.318C76.137 27.8842 76.6016 29.279 78.1699 29.7872H71.6865H71.6895ZM73.894 6.00769L75.0806 2.32565H77.4952L74.6131 6.00769H73.894Z"
              fill="#1D1D1B"
            />
            <path
              d="M80.8418 29.7872C82.5374 29.1962 83.002 27.7985 83.002 26.1052V14.2583C83.002 13.2861 82.7889 11.4657 81.478 11.4657L85.3751 8.6318L85.4166 26.1082C85.4166 27.8014 85.8811 29.1962 87.5767 29.7902H80.8389L80.8418 29.7872ZM86.7748 11.8883C88.4259 9.89953 90.9264 8.50473 93.554 8.50473C97.7914 8.50473 99.5698 12.0154 99.5698 15.8658V26.1052C99.5698 27.7985 100.079 29.2376 101.774 29.7872H94.9951C96.6906 29.2376 97.1552 27.7571 97.1552 26.1052V15.3605C97.1552 12.3995 95.9686 9.52128 92.5805 9.52128C90.4618 9.52128 88.3845 10.6206 86.7748 11.8913V11.8883Z"
              fill="#1D1D1B"
            />
            <path
              d="M104.441 0C105.669 0 106.518 0.762411 106.518 2.20154C106.518 3.64066 105.755 5.24823 104.695 6.17908L104.399 5.88357C105.119 4.91135 105.204 3.8091 104.441 3.8091C103.423 3.8091 102.577 3.00532 102.577 1.90603C102.577 0.88948 103.423 0.00295508 104.441 0.00295508V0Z"
              fill="#1D1D1B"
            />
            <path
              d="M115.117 29.3647C117.531 29.3647 121.429 28.815 121.429 25.6412C121.429 20.2246 107.829 21.4509 107.829 14.3026C107.829 10.4108 111.217 8.37766 114.777 8.37766C116.428 8.37766 120.411 9.18144 121.938 9.85815V13.8357C120.964 10.8304 117.7 8.75886 114.608 8.75886C112.448 8.75886 109.353 9.98522 109.353 12.5236C109.353 18.6998 122.997 17.2193 122.997 24.1164C122.997 28.4752 119.227 29.997 115.454 29.997C112.998 29.997 109.903 29.4474 107.53 28.7264V23.6909C108.758 26.906 111.554 29.3617 115.114 29.3617L115.117 29.3647Z"
              fill="#1D1D1B"
            />
          </g>
          <defs>
            <clipPath id="clip0_80_316">
              <rect width="123" height="30" fill="white" />
            </clipPath>
          </defs>
        </svg>
        <ul
          className={clsx("flex items-center gap-4 font-normal text-lg", {
            hidden: search || query,
          })}>
          <li>Explore</li>
          <li>Features</li>
          <li>About</li>
        </ul>
        {(search || query) && <SearchBar closeDisplay={closeDisplay} />}
        <ul className="flex gap-4 h-auto items-center">
          <li id="search" onClick={(e) => handleDisplay(e.currentTarget.id)}>
            <svg
              className={clsx("w-6 h-6", { hidden: search || query })}
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20.26 20.72">
              <path d="M9.74,19.48C4.37,19.48,0,15.11,0,9.74S4.37,0,9.74,0s9.74,4.37,9.74,9.74-4.37,9.74-9.74,9.74ZM9.74,1.5C5.2,1.5,1.5,5.2,1.5,9.74s3.7,8.24,8.24,8.24,8.24-3.7,8.24-8.24S14.28,1.5,9.74,1.5Z" />
              <path d="M19.51,20.72c-.19,0-.38-.07-.53-.22l-3.52-3.52c-.29-.29-.29-.77,0-1.06,.29-.29,.77-.29,1.06,0l3.52,3.52c.29,.29,.29,.77,0,1.06-.15,.15-.34,.22-.53,.22Z" />
            </svg>
          </li>
          <li className="relative grid place-items-center" id="bag" onClick={(e) => handleDisplay(e.currentTarget.id)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              className="w-7 h-7"
              viewBox="0 0 16 16">
              <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1m3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4z" />
            </svg>
            {totalBagItems > 0 && <div className="w-8 bg-primary rounded-md absolute -bottom-3 text-center text-sm text-white border border-white">{totalBagItems}</div>}
          </li>
          <li id="user" onClick={(e) => handleDisplay(e.currentTarget.id)}>
            <Image
              src="/assets/img/profile.webp"
              alt="Profile Picture"
              width={150}
              height={100}
              className="rounded-full w-12 h-12 aspect-square max-w-none object-cover border-2 border-primary"
            />
          </li>
        </ul>
      </nav>
      {(search || query) && <Search />}
      {bag && <Bag closeDisplay={closeDisplay} />}
      <div
        className={clsx(
          `${styles.overlayScreen} animate__animated animate__fadeIn animate__faster fade w-screen h-screen fixed top-0 left-0 -z-10`,
          { hidden: !overlay && !query }
        )}></div>
    </header>
  );
};
