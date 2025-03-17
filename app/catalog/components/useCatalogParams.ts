"use client";

import { useQueryState } from "nuqs";
import { QueryParams } from "./searchParams";

/**
 * Use Query States
 */
export const useCatalogParams = () => {
    const [priceOrder, setPriceOrder] = useQueryState("priceOrder", QueryParams["priceOrder"]);
    const [page, setPage] = useQueryState("page", QueryParams["page"]);
    const [take, setTake] = useQueryState("take", QueryParams["take"]);
    const [category, setCategory] = useQueryState("category", QueryParams["category"]);
    const [search, setSearch] = useQueryState("search", QueryParams["search"]);

    return {
        /** Price order (default value: `"not"`) */
        priceOrder,
        /** Page number (default value: `1`) */
        page,
        /** Items per page (default value: `20`) */
        take,
        /** Category (default value: `""`) */
        category,
        /** Search (default value: `""`) */
        search,
        setPriceOrder,
        setPage,
        setTake,
        setCategory,
        setSearch,
    };
};
