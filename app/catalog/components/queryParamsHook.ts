"use client";

import { useQueryState } from "nuqs";
import { SearchParams } from "./queryParamsConfig";

/**
 * Use Query States
 */
export const useCatalogParams = () => {
    const [priceOrder, setPriceOrder] = useQueryState("priceOrder", SearchParams["priceOrder"]);
    const [page, setPage] = useQueryState("page", SearchParams["page"]);
    const [take, setTake] = useQueryState("take", SearchParams["take"]);
    const [category, setCategory] = useQueryState("category", SearchParams["category"]);
    const [search, setSearch] = useQueryState("search", SearchParams["search"]);

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
