"use client";

import { useQueryState } from "nuqs";
import { CategoryParam, ItemsPerPageParam, PageParam, PriceOrderParam, SearchParam } from "./FilterTypes";

/**
 * Use Query States
 * Useful function from nuqs to get the query states.
 */
export const useCatalogueParams = () => {
    const [priceOrder, setPriceOrder] = useQueryState("priceOrder", PriceOrderParam["priceOrder"]);
    const [page, setPage] = useQueryState("page", PageParam["page"]);
    const [take, setTake] = useQueryState("take", ItemsPerPageParam["take"]);
    const [category, setCategory] = useQueryState("category", CategoryParam["category"]);
    const [search, setSearch] = useQueryState("search", SearchParam["search"]);

    return {
        priceOrder,
        page,
        take,
        category,
        search,
        setPriceOrder,
        setPage,
        setTake,
        setCategory,
        setSearch,
    };
};
