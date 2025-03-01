"use client";

import { ProductType } from "@actions/types/Product";
import { createProvider } from "next-zustand";

export type CatalogueStoreType = {
    // State
    productList: ProductType[] | "isLoading" | null;
    productAmount: number;

    // Actions
    setProductList: (productList?: ProductType[] | "isLoading" | null) => void;
    setProductAmount: (productAmount?: number) => void;
};

export const CatalogueStore = createProvider<CatalogueStoreType>()((set) => ({
    // State
    productList: null,
    productAmount: 0,

    // Actions
    setProductList: (productList?: ProductType[] | "isLoading" | null) => set({ productList }),
    setProductAmount: (productAmount?: number) => set({ productAmount }),
}));


/**
 * Catalogue Store Provider
 * Useful function from next-zustand to provide initial state to the store, that is SSR friendly.
 */
export const CatalogueStoreProvider = CatalogueStore.Provider;

/**
 * Use Catalogue Store
 * Useful function from next-zustand to get the store instance.
 */
export const useCatalogueStore = CatalogueStore.getUseStore();
