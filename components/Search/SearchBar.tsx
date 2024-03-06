import { getServerSideProps } from "next/dist/build/templates/pages";
import React, { useEffect, useRef, useState } from "react";
import styles from "./Search.module.scss";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import clsx from "clsx";
import { getAllProducts } from "@/lib/actions/product.actions";
import { SearchMenu } from "./SearchMenu";
import { Product } from "../Product/Product";
import { SearchResults } from "./SearchResults";

type Props = Awaited<ReturnType<typeof getServerSideProps>>["props"];

export const SearchBar = ({ display, setDisplay }: Props) => {
    // Search
    const [query, setQuery] = useState("");

    // Search Input
    const searchInput = useRef<HTMLInputElement>(null);
    const [isSearching, setIsSearching] = useState(false);

    // Search URL
    const searchParams = useSearchParams();
    const pathName = usePathname();
    const { replace } = useRouter();

    // Searching
    function handleSearch(term: string) {
        setQuery(term);
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
        handleSearch("");
        setIsSearching(false);
    }

    // Close Search
    function handleCloseSearch() {
        setDisplay(false);
    }

    // Products
    const [products, setProducts] = useState<any[]>([]);

    useEffect(() => {
        searchInput.current?.focus();

        // Fetching Products
        const getProducts = async () => {
            const productsList = await getAllProducts({ query: query });
            productsList && setProducts(productsList);
        };
        getProducts();

        if (searchInput.current?.value) {
            setIsSearching(true);
        } else {
            setIsSearching(false);
        }
    }, [query]);

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
            <div
                className={`${styles.searchWrapper} container fixed left-0 right-0 animate__animated animate__slideInDown animate__faster `}>
                {!query && <SearchMenu />}
                {query &&
                    <div className="size-full bg-white rounded-3xl px-8 py-10">
                        <div className="size-full flex flex-col gap-3">
                            <div className="w-full h-auto flex justify-between">
                                <button className="py-2 px-5 flex items-center gap-3 border border-slate-300 rounded-full">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="currentColor"
                                        className="w-5 h-5"
                                        viewBox="0 0 16 16">
                                        <path d="M3.5 3.5a.5.5 0 0 0-1 0v8.793l-1.146-1.147a.5.5 0 0 0-.708.708l2 1.999.007.007a.497.497 0 0 0 .7-.006l2-2a.5.5 0 0 0-.707-.708L3.5 12.293zm4 .5a.5.5 0 0 1 0-1h1a.5.5 0 0 1 0 1zm0 3a.5.5 0 0 1 0-1h3a.5.5 0 0 1 0 1zm0 3a.5.5 0 0 1 0-1h5a.5.5 0 0 1 0 1zM7 12.5a.5.5 0 0 0 .5.5h7a.5.5 0 0 0 0-1h-7a.5.5 0 0 0-.5.5" />
                                    </svg>
                                    <span>Sort</span>
                                </button>
                                <div className="flex gap-1 text-lg">
                                    <span>{products.length}</span>
                                    results for
                                    <span className="font-bold">{query}</span>
                                </div>
                                <button className="py-2 px-5 flex items-center gap-3 border border-slate-300 rounded-full">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="currentColor"
                                        className="w-5 h-5"
                                        viewBox="0 0 16 16">
                                        <path
                                            fillRule="evenodd"
                                            d="M11.5 2a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3M9.05 3a2.5 2.5 0 0 1 4.9 0H16v1h-2.05a2.5 2.5 0 0 1-4.9 0H0V3zM4.5 7a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3M2.05 8a2.5 2.5 0 0 1 4.9 0H16v1H6.95a2.5 2.5 0 0 1-4.9 0H0V8zm9.45 4a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3m-2.45 1a2.5 2.5 0 0 1 4.9 0H16v1h-2.05a2.5 2.5 0 0 1-4.9 0H0v-1z"
                                        />
                                    </svg>
                                    <span>Filters</span>
                                </button>
                            </div>
                            <div className="size-full overflow-auto pt-5">
                                <div className="size-full grid grid-cols-4 gap-4">
                                    {products.map((product) => (
                                        <Product key={product._id} name={product.name} price={product.price} color={product.color} picture={product.picture} />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                }
                {/* {query && <SearchResults />} */}
            </div>
        </>
    );
};
