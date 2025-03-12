"use client";

import { ProductType } from "@actions/types/Product";
import { create } from "zustand";

export type CatalogStoreType = {
    // State
    productList?: ProductType[] | null;
    productAmount?: number | null;

    // Actions
    setProductList: (productList?: ProductType[] | null) => void;
    setProductAmount: (productAmount?: number | null) => void;
};

/**
 * Use Catalog Store
 */
export const useCatalogStore = create<CatalogStoreType>()((set) => ({
    // State
    productList: undefined,
    productAmount: undefined,

    // Actions
    setProductList: (productList?: ProductType[] | null) => set({ productList }),
    setProductAmount: (productAmount?: number | null) => set({ productAmount }),
}));
