import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

// Styles
import styles from "./Search.module.scss";

// Actions
import { getAllProducts } from "@/lib/actions/product.actions";

// Components
import { SearchMenu } from "./SearchMenu";
import { SearchResults } from "./SearchResults";
import { Product } from "@/types";

export const Search = () => {
  // Products
  const [products, setProducts] = useState<Product[]>([]);

  // Search Query
  const searchParams = useSearchParams();
  const query = searchParams.get("query") || "";

  useEffect(() => {
    // Products Fetch
    const getProducts = async () => {
      const productsList = await getAllProducts({ query: query });
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
  }, [query]);

  return (
    <>
      <div
        className={`${styles.searchContainer} container fixed top-24 left-0 right-0 pointer-events-none`}>
        {!query && <SearchMenu />}
        {query && <SearchResults products={products} query={query} />}
      </div>
    </>
  );
};
