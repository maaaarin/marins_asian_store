import { useEffect, useState } from "react";
import styles from "./Search.module.scss";
import { getAllProducts } from "@/lib/actions/product.actions";
import { SearchMenu } from "./SearchMenu";
import { SearchContent } from "./SearchContent";
import { Product } from "@/types";
import clsx from "clsx";

type Props = {
  searchDisplay: boolean;
  searchQuery: string;
};

export const Search = ({ searchDisplay, searchQuery }: Props) => {
  return (
    <>
      {(searchDisplay || searchQuery) && (
        <div
          className={`${styles.searchContainer} container w-full lg:container fixed top-24 left-0 right-0 pointer-events-none animate-slide-in-blurred-top`}>
          {searchQuery ? (
            <SearchContent searchQuery={searchQuery} />
          ) : (
            <SearchMenu />
          )}
        </div>
      )}
    </>
  );
};
