"use client";

import { ProductModel } from "@class/ProductClass";
import { create } from "zustand";

export type CatalogStoreType = {
    // State
    productList?: ProductModel[] | null;
    productAmount?: number | null;

    // Actions
    setProductList: (productList?: ProductModel[] | null) => void;
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
    setProductList: (productList?: ProductModel[] | null) => set({ productList }),
    setProductAmount: (productAmount?: number | null) => set({ productAmount }),
}));
