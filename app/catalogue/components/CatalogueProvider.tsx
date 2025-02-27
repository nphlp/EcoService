"use client";

import { useQueryState } from "nuqs";
import { createContext, ReactNode, useContext, useEffect, useRef } from "react";
import { useStore } from "zustand";
import {
    CatalogueState,
    CatalogueStore,
    createCatalogueStore,
} from "./CatalogueStore";
import {
    CategoryParam,
    ItemsPerPageParam,
    PageParam,
    PriceOrderParam,
    SearchParam,
} from "./QueryTypes";

export type CatalogueStoreApi = ReturnType<typeof createCatalogueStore>;

export const CatalogueStoreContext = createContext<CatalogueStoreApi | undefined>(
    undefined,
);

export type CatalogueStoreProviderProps = {
    children: ReactNode;

    // Use State
    initialValues: {
        productList: CatalogueState["productList"];
        productAmount: CatalogueState["productAmount"];
    };
};

export const CatalogueStoreProvider = (props: CatalogueStoreProviderProps) => {
    const { children, initialValues } = props;

    // Manage query state
    const [page, setPage] = useQueryState("page", PageParam["page"]);
    const [take, setTake] = useQueryState("take", ItemsPerPageParam["take"]);
    const [priceOrder, setPriceOrder] = useQueryState(
        "priceOrder",
        PriceOrderParam["priceOrder"],
    );
    const [category, setCategory] = useQueryState(
        "category",
        CategoryParam["category"],
    );
    const [search, setSearch] = useQueryState("search", SearchParam["search"]);

    // Create ref for the store
    const storeRef = useRef<CatalogueStoreApi>();

    // Update store when query state changes
    useEffect(() => {
        if (storeRef.current) {
            storeRef.current.setState({
                page,
                take,
                priceOrder,
                category,
                search,
            });
        }
    }, [page, take, priceOrder, category, search]);

    // Initialize store if not already done, and hydrate states
    if (!storeRef.current) {
        storeRef.current = createCatalogueStore(
            initialValues,
            {
                page,
                take,
                priceOrder,
                category,
                search,
                setPage,
                setTake,
                setPriceOrder,
                setCategory,
                setSearch,
            },
        );
    }

    return (
        <CatalogueStoreContext.Provider value={storeRef.current}>
            {children}
        </CatalogueStoreContext.Provider>
    );
};

export const useCatalogueStore = <T,>(
    selector: (store: CatalogueStore) => T,
): T => {
    const storeContext = useContext(CatalogueStoreContext);

    if (!storeContext) {
        throw new Error(
            "useCatalogueStore must be used within a CatalogueStoreProvider",
        );
    }

    return useStore(storeContext, selector);
};
