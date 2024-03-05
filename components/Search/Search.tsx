import { getServerSideProps } from "next/dist/build/templates/pages";
import React, { useEffect, useRef, useState } from "react";
import styles from "./Search.module.scss";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import clsx from "clsx";
import Image from "next/image";

type Props = Awaited<ReturnType<typeof getServerSideProps>>["props"];

export const Search = ({ display, setDisplay }: Props) => {
    // Search
    const [isClosed, setIsClosed] = useState(false);

    useEffect(() => {
        searchInput.current?.focus();

        if (searchInput.current?.value) {
            setIsSearching(true);
        } else {
            setIsSearching(false);
        }

        // Disable/Enable scroll
        // document.body.classList.add("overflow-y-hidden");
        return () => {
            // document.body.classList.remove("overflow-y-hidden");
        };
    }, []);

    // Search Input
    const searchInput = useRef<HTMLInputElement>(null);
    const [isSearching, setIsSearching] = useState(false);

    // Search URL
    const searchParams = useSearchParams();
    const pathName = usePathname();
    const { replace } = useRouter();

    function handleSearch(query: string) {
        const params = new URLSearchParams(searchParams);

        if (query) {
            params.set("search", query);
            setIsSearching(true);
        } else {
            params.delete("search");
            setIsSearching(false);
        }

        replace(`${pathName}?${params.toString()}`);
    }

    function handleClearSearch() {
        if (searchInput.current) {
            searchInput.current.value = "";
        }
        searchInput.current?.focus();
        handleSearch("");
        setIsSearching(false);
    }

    function handleCloseSearch() {
        setDisplay(false);
    }

    return (
        <>
            <div
                className={clsx(
                    "w-3/5 h-full rounded-full flex bg-slate-200 border-2 border-indigo-700 items-center",
                    { hidden: !display }
                )}>
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
                        defaultValue={searchParams.get("search")?.toString()}
                        onChange={(e) => {
                            handleSearch(e.target.value);
                        }}
                        className={`${styles.searchBar} size-full border-none outline-none bg-transparent`}
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
            <div
                className={`${styles.searchWrapper} container fixed left-0 right-0 animate__animated animate__slideInDown animate__faster `}>
                <div className="w-full h-auto bg-white rounded-3xl px-8 py-10">
                    <div className="size-full  flex gap-3">
                        <div className="w-1/4 flex flex-col gap-3 ">
                            <span className="text-xl font-bold pl-4">Popular Search</span>
                            <ul className="flex flex-col gap-1 w-full ">
                                <li>
                                    <button className="flex items-center w-full rounded-xl gap-3 py-2 px-4 hover:bg-slate-100 duration-500">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="currentColor"
                                            className="w-5 h-5"
                                            viewBox="0 0 16 16">
                                            <path
                                                fillRule="evenodd"
                                                d="M14 2.5a.5.5 0 0 0-.5-.5h-6a.5.5 0 0 0 0 1h4.793L2.146 13.146a.5.5 0 0 0 .708.708L13 3.707V8.5a.5.5 0 0 0 1 0z"
                                            />
                                        </svg>
                                        <span>Pocky Vanilla</span>
                                    </button>
                                </li>
                                <li>
                                    <button className="flex items-center w-full rounded-xl gap-3 py-2 px-4 hover:bg-slate-100 duration-500">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="currentColor"
                                            className="w-5 h-5"
                                            viewBox="0 0 16 16">
                                            <path
                                                fillRule="evenodd"
                                                d="M14 2.5a.5.5 0 0 0-.5-.5h-6a.5.5 0 0 0 0 1h4.793L2.146 13.146a.5.5 0 0 0 .708.708L13 3.707V8.5a.5.5 0 0 0 1 0z"
                                            />
                                        </svg>
                                        <span>Kit Kat Cheesecake</span>
                                    </button>
                                </li>
                                <li>
                                    <button className="flex items-center w-full rounded-xl gap-3 py-2 px-4 hover:bg-slate-100 duration-500">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="currentColor"
                                            className="w-5 h-5"
                                            viewBox="0 0 16 16">
                                            <path
                                                fillRule="evenodd"
                                                d="M14 2.5a.5.5 0 0 0-.5-.5h-6a.5.5 0 0 0 0 1h4.793L2.146 13.146a.5.5 0 0 0 .708.708L13 3.707V8.5a.5.5 0 0 0 1 0z"
                                            />
                                        </svg>
                                        <span>Gummy</span>
                                    </button>
                                </li>
                                <li>
                                    <button className="flex items-center w-full rounded-xl gap-3 py-2 px-4 hover:bg-slate-100 duration-500">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="currentColor"
                                            className="w-5 h-5"
                                            viewBox="0 0 16 16">
                                            <path
                                                fillRule="evenodd"
                                                d="M14 2.5a.5.5 0 0 0-.5-.5h-6a.5.5 0 0 0 0 1h4.793L2.146 13.146a.5.5 0 0 0 .708.708L13 3.707V8.5a.5.5 0 0 0 1 0z"
                                            />
                                        </svg>
                                        <span>Cheetos Flaming Hot</span>
                                    </button>
                                </li>
                                <li>
                                    <button className="flex items-center w-full rounded-xl gap-3 py-2 px-4 hover:bg-slate-100 duration-500">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="currentColor"
                                            className="w-5 h-5"
                                            viewBox="0 0 16 16">
                                            <path
                                                fillRule="evenodd"
                                                d="M14 2.5a.5.5 0 0 0-.5-.5h-6a.5.5 0 0 0 0 1h4.793L2.146 13.146a.5.5 0 0 0 .708.708L13 3.707V8.5a.5.5 0 0 0 1 0z"
                                            />
                                        </svg>
                                        <span>Spicy Ramen</span>
                                    </button>
                                </li>
                            </ul>
                        </div>
                        <div className="w-9/12 h-auto flex flex-col gap-3">
                            <span className="text-xl font-bold">Recommended</span>
                            <div className="size-full flex gap-3">
                                <div
                                    className="w-52 h-auto rounded-2xl flex p-3 items-center justify-center relative"
                                    style={{ backgroundColor: "#CAE7FF" }}>
                                    <Image
                                        src={`/assets/products/1.webp`}
                                        alt="alt"
                                        width={150}
                                        height={0}
                                        className="w-4/5 aspect-square object-contain"
                                    />
                                    <span className="size-fit text-nowrap text-lg bg-black text-white rounded-full py-1 px-3 absolute bottom-3 right-3">
                                        5.25 €
                                    </span>
                                </div>
                                <div
                                    className="w-52 h-auto rounded-2xl flex p-3 items-center justify-center relative"
                                    style={{ backgroundColor: "#FFCEE1" }}>
                                    <Image
                                        src={`/assets/products/2.webp`}
                                        alt="alt"
                                        width={150}
                                        height={0}
                                        className="w-4/5 aspect-square object-contain"
                                    />
                                    <span className="size-fit text-nowrap text-lg bg-black text-white rounded-full py-1 px-3 absolute bottom-3 right-3">
                                        5.25 €
                                    </span>
                                </div>
                                <div
                                    className="w-52 h-auto rounded-2xl flex p-3 items-center justify-center relative"
                                    style={{ backgroundColor: "#FFAD5C" }}>
                                    <Image
                                        src={`/assets/products/3.webp`}
                                        alt="alt"
                                        width={150}
                                        height={0}
                                        className="w-4/5 aspect-square object-contain"
                                    />
                                    <span className="size-fit text-nowrap text-lg bg-black text-white rounded-full py-1 px-3 absolute bottom-3 right-3">
                                        5.25 €
                                    </span>
                                </div>
                                <div
                                    className="w-52 h-auto rounded-2xl flex p-3 items-center justify-center relative"
                                    style={{ backgroundColor: "#8AC7FF" }}>
                                    <Image
                                        src={`/assets/products/4.webp`}
                                        alt="alt"
                                        width={150}
                                        height={0}
                                        className="w-4/5 aspect-square object-contain"
                                    />
                                    <span className="size-fit text-nowrap text-lg bg-black text-white rounded-full py-1 px-3 absolute bottom-3 right-3">
                                        5.25 €
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* <div className="size-full flex flex-col">
                        <div className="w-full h-auto flex">
                            <button className="bg-primary flex">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                    <path d="M6 10.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5m-2-3a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5m-2-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5" />
                                </svg>
                                <span>Sort</span>
                            </button>
                        </div>
                    </div> */}
                </div>
            </div>
        </>
    );
};
