"use client";

import { ProductType } from "@actions/types/Product";
import { create } from "zustand";

export type CatalogueStoreType = {
    // State
    productList?: ProductType[] | "isLoading" | null;
    productAmount?: number;

    // Actions
    setProductList: (productList?: ProductType[] | "isLoading" | null) => void;
    setProductAmount: (productAmount?: number) => void;
};

export const useCatalogueStore = create<CatalogueStoreType>()((set) => ({
    // State
    productList: undefined,
    productAmount: undefined,

    // Actions
    setProductList: (productList?: ProductType[] | "isLoading" | null) => set({ productList }),
    setProductAmount: (productAmount?: number) => set({ productAmount }),
}));
