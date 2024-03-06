// Components
import { SearchBar } from "./SearchBar";

export default function Search({
    searchParams,
}: {
    searchParams?: {
        query?: string;
        page?: string;
    };
}) {
    console.log("hola");

    return (
        <>
            <SearchBar />
        </>
    );
}
