import { ProductType } from "@actions/types/Product";
import { create } from "zustand";
import {
    CategoryParamType,
    ItemsPerPageParamType,
    PageParamType,
    PriceOrderParamType,
    SearchParamType,
} from "./FilterTypes";

export type StoreState = {
    // Use State
    productListStore?: ProductType[] | "isLoading" | null;
    productAmountStore?: number;

    // Use Query State
    priceOrderStore?: PriceOrderParamType["priceOrder"];
    pageStore?: PageParamType["page"];
    takeStore?: ItemsPerPageParamType["take"];
    categoryStore?: CategoryParamType["category"];
    searchStore?: SearchParamType["search"];
};

export type StoreActions = {
    // Use State
    setProductListStore: (productList?: ProductType[] | "isLoading" | null) => void;
    setProductAmountStore: (productAmount?: number) => void;

    // Use Query State
    setPriceOrderStore: (priceOrder?: PriceOrderParamType["priceOrder"]) => void;
    setPageStore: (page?: PageParamType["page"]) => void;
    setTakeStore: (take?: ItemsPerPageParamType["take"]) => void;
    setCategoryStore: (category?: CategoryParamType["category"]) => void;
    setSearchStore: (search?: SearchParamType["search"]) => void;

    // Reset Store
    resetStore: () => void;
};

export type CatalogueStore = StoreState & StoreActions;

export const useCatalogueStore = create<CatalogueStore>()((set) => ({
    // Use State
    productListStore: undefined,
    productAmountStore: undefined,
    setProductListStore: (productListStore?: ProductType[] | "isLoading" | null) => set({ productListStore }),
    setProductAmountStore: (productAmountStore?: number) => set({ productAmountStore }),

    // Use Query State
    priceOrderStore: undefined,
    pageStore: undefined,
    takeStore: undefined,
    categoryStore: undefined,
    searchStore: undefined,
    setPriceOrderStore: (priceOrderStore?: PriceOrderParamType["priceOrder"]) => set({ priceOrderStore }),
    setPageStore: (pageStore?: PageParamType["page"]) => set({ pageStore }),
    setTakeStore: (takeStore?: ItemsPerPageParamType["take"]) => set({ takeStore }),
    setCategoryStore: (categoryStore?: CategoryParamType["category"]) => set({ categoryStore }),
    setSearchStore: (searchStore?: SearchParamType["search"]) => set({ searchStore }),

    // Reset Store
    resetStore: () =>
        set({
            productListStore: undefined,
            productAmountStore: undefined,
            priceOrderStore: undefined,
            pageStore: undefined,
            takeStore: undefined,
            categoryStore: undefined,
            searchStore: undefined,
        }),
}));
