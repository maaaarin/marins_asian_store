import { useEffect, useState } from "react";
import { getServerSideProps } from "next/dist/build/templates/pages";
import { useSearchParams } from "next/navigation";

// Styles
import styles from './Search.module.scss';

// Actions
import { getAllProducts } from "@/lib/actions/product.actions";

// Components
import { SearchBar } from "./SearchBar";
import { SearchMenu } from "./SearchMenu";
import { SearchResults } from "./SearchResults";

type Props = Awaited<ReturnType<typeof getServerSideProps>>["props"];

export default function Search({ setDisplay }: Props) {

    // Products
    const [products, setProducts] = useState<any[]>([]);

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
        }
    }, [query]);

    return (
        <>
            <SearchBar setDisplay={setDisplay} />
            <div
                className={`${styles.searchContainer} container fixed left-0 right-0 animate__animated animate__slideInDown animate__faster `}>
                {!query && <SearchMenu />}
                {query && <SearchResults products={products} query={query} />}
            </div>
        </>
    );
}
