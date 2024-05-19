"use client";

import React, { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import { getServerSideProps } from "next/dist/build/templates/pages";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

// Styles
import styles from "./Search.module.scss";

type Props = Awaited<ReturnType<typeof getServerSideProps>>["props"];

export const SearchBar = ({ closeDisplay }: Props) => {
  // Search Input
  const searchInput = useRef<HTMLInputElement>(null);
  const [isSearching, setIsSearching] = useState(false);

  // Search URL
  const searchParams = useSearchParams();
  const pathName = usePathname();
  const { replace } = useRouter();

  // Searching
  function handleSearch(term: string) {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set("query", term);
      setIsSearching(true);
    } else {
      params.delete("query");
      setIsSearching(false);
    }
    replace(`${pathName}?${params.toString()}`);
  }

  // Clear Search
  function handleClearSearch() {
    if (searchInput.current) {
      searchInput.current.value = "";
    }
    searchInput.current?.focus();
    setIsSearching(false);
    handleSearch("");
  }

  // Close Search
  function handleCloseSearch() {
    closeDisplay();
    handleSearch("");
  }

  useEffect(() => {
    searchInput.current?.focus();
    if (searchInput.current?.value) {
      setIsSearching(true);
    } else {
      setIsSearching(false);
    }
  }, []);

  return (
    <>
      <div
        className={
          "w-full lg:w-3/5 h-full rounded-full flex bg-slate-200 border-2 border-indigo-700 items-center"
        }>
        <button
          className="w-5 h-5 pl-4 pr-3 box-content"
          onClick={() => {
            handleCloseSearch();
          }}>
          <svg
            className="size-full"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 15.98 13.98">
            <path
              d="M15.98,6.99c0,.55-.45,1-1,1H3.41l4.29,4.29c.39,.39,.39,1.02,0,1.41s-1.02,.39-1.41,0L.29,7.7c-.39-.39-.39-1.02,0-1.41,0,0,0,0,0,0L6.28,.29c.39-.39,1.02-.39,1.41,0s.39,1.02,0,1.41L3.41,5.99H14.98c.55,0,1,.45,1,1"
              fillRule="evenodd"
            />
          </svg>
        </button>
        <div className="size-full flex items-center relative">
          <input
            type="text"
            ref={searchInput}
            defaultValue={searchParams.get("query")?.toString()}
            onChange={(e) => {
              handleSearch(e.target.value);
            }}
            className={`${styles.searchBar} size-full border-none outline-none bg-transparent pr-6`}
            placeholder="Search in Marín's"
          />
          <button
            id="clearSearch"
            className={clsx("absolute right-0", { hidden: !isSearching })}
            onClick={() => handleClearSearch()}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 16 16"
              className="w-4 h-4">
              <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z" />
            </svg>
          </button>
        </div>
        <button className="w-7 h-7 pl-3 pr-4 box-content">
          <svg
            className="size-full"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20.26 20.72">
            <path d="M9.74,19.48C4.37,19.48,0,15.11,0,9.74S4.37,0,9.74,0s9.74,4.37,9.74,9.74-4.37,9.74-9.74,9.74ZM9.74,1.5C5.2,1.5,1.5,5.2,1.5,9.74s3.7,8.24,8.24,8.24,8.24-3.7,8.24-8.24S14.28,1.5,9.74,1.5Z" />
            <path d="M19.51,20.72c-.19,0-.38-.07-.53-.22l-3.52-3.52c-.29-.29-.29-.77,0-1.06,.29-.29,.77-.29,1.06,0l3.52,3.52c.29,.29,.29,.77,0,1.06-.15,.15-.34,.22-.53,.22Z" />
          </svg>
        </button>
      </div>
    </>
  );
};
