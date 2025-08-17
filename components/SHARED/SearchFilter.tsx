"use client";

import Input from "@comps/ui/input";
import { useQueryState } from "nuqs";
import { usePageQueryParams } from "./PaginationFilter";
import { searchQueryParser } from "./serverQueryParsers";

export const useSearchQueryParams = () => {
    const [search, setSearch] = useQueryState("search", searchQueryParser);
    return { search, setSearch };
};

export default function SearchFilter() {
    const { search, setSearch } = useSearchQueryParams();

    const { setPage } = usePageQueryParams();

    const handleChange = () => {
        setPage(1);
    };

    return (
        <Input
            label="Rechercher"
            placeholder="Rechercher"
            classLabel="text-white"
            afterChange={handleChange}
            setValue={setSearch}
            value={search}
        />
    );
}
