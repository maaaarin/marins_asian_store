import { useEffect, useState } from "react";
import styles from "./Search.module.scss";
import { getAllProducts } from "@/lib/actions/product.actions";
import { SearchMenu } from "./SearchMenu";
import { SearchContent } from "./SearchContent";
import { Product } from "@/types";
import clsx from "clsx";

type Props = {
  searchDisplay: boolean;
  setSearchDisplay: React.Dispatch<React.SetStateAction<boolean>>;
  closeDisplay: Function;
  searchQuery: string;
};

export const Search = ({
  searchDisplay,
  setSearchDisplay,
  closeDisplay,
  searchQuery,
}: Props) => {
  // Products
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    // Products Fetch
    const getProducts = async () => {
      const productsList = await getAllProducts({ query: searchQuery });
      productsList && setProducts(productsList);
    };

    getProducts();

    // Delay
    // const fetchDelay = setTimeout(() => {
    //     getProducts();
    // }, 250);

    return () => {
      // clearTimeout(fetchDelay);
    };
    
    // if (searchQuery) {
    //   setSearchDisplay(false);
    // }
  }, [searchQuery]);


  function handleSearchDisplay() {
    if (searchDisplay) {
      closeDisplay();
    } else {
      closeDisplay();
      setSearchDisplay(true);
    }
  }

  return (
    <>
      <div className="cursor-pointer" onClick={handleSearchDisplay}>
        <svg
          className={clsx("size-6", { hidden: searchDisplay || searchQuery })}
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 20.26 20.72">
          <path d="M9.74,19.48C4.37,19.48,0,15.11,0,9.74S4.37,0,9.74,0s9.74,4.37,9.74,9.74-4.37,9.74-9.74,9.74ZM9.74,1.5C5.2,1.5,1.5,5.2,1.5,9.74s3.7,8.24,8.24,8.24,8.24-3.7,8.24-8.24S14.28,1.5,9.74,1.5Z" />
          <path d="M19.51,20.72c-.19,0-.38-.07-.53-.22l-3.52-3.52c-.29-.29-.29-.77,0-1.06,.29-.29,.77-.29,1.06,0l3.52,3.52c.29,.29,.29,.77,0,1.06-.15,.15-.34,.22-.53,.22Z" />
        </svg>
      </div>
      {(searchDisplay || searchQuery) && (
        <div
          className={`${styles.searchContainer} container fixed top-24 left-0 right-0 pointer-events-none animate-slide-in-blurred-top`}>
          {searchQuery ? (
            <SearchContent products={products} searchQuery={searchQuery} />
          ) : (
            <SearchMenu />
          )}
        </div>
      )}
    </>
  );
};
