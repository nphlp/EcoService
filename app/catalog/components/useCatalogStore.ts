"use client";

import { ProductModel } from "@services/types";
import { create } from "zustand";

type ProductListState = ProductModel[] | null;
type ProductAmountState = number | null;

export type CatalogStoreType = {
    // State
    dataStore?: {
        productList: ProductListState;
        productAmount: ProductAmountState;
    };

    // Actions
    setDataStore: (newDataStore: { productList: ProductListState; productAmount: ProductAmountState }) => void;
};

/**
 * Use Catalog Store
 */
export const useCatalogStore = create<CatalogStoreType>()((set) => ({
    // State
    dataStore: undefined,

    // Actions
    setDataStore: (newDataStore: CatalogStoreType["dataStore"]) =>
        set(({ dataStore }) => ({
            dataStore: {
                ...(dataStore ?? {
                    productList: null,
                    productAmount: null,
                }),
                ...newDataStore,
            },
        })),
}));
