import { ProductType } from "@actions/types/Product";
import { Options } from "nuqs";
import { createStore } from "zustand";
import {
    CategoryParamType,
    ItemsPerPageParamType,
    PageParamType,
    PriceOrderParamType,
    SearchParamType,
} from "./QueryTypes";

// ============================= //
//        Use State types        //
// ============================= //

export type CatalogueState = {
    productList: ProductType[] | null | "isLoading";
    productAmount: number;
};

export type CatalogueActions = {
    setProductList: (value: ProductType[] | null | "isLoading") => void;
    setProductAmount: (value: number) => void;
};

// ============================= //
//        Use Query State        //
// ============================= //

export type SetterFunction<T> = (
    value: T | ((old: T) => T),
    options?: Options | undefined,
) => Promise<URLSearchParams>;

export type QueryState = {
    page: PageParamType["page"];
    take: ItemsPerPageParamType["take"];
    priceOrder: PriceOrderParamType["priceOrder"];
    category: CategoryParamType["category"];
    search: SearchParamType["search"];
};

export type QueryActions = {
    setPage: SetterFunction<PageParamType["page"]>;
    setTake: SetterFunction<ItemsPerPageParamType["take"]>;
    setPriceOrder: SetterFunction<PriceOrderParamType["priceOrder"]>;
    setCategory: SetterFunction<CategoryParamType["category"]>;
    setSearch: SetterFunction<SearchParamType["search"]>;
};

// ============================= //
//        Use Store types        //
// ============================= //

export type QueryStore = QueryState & QueryActions;

export type CatalogueStore = CatalogueState & CatalogueActions & QueryStore;

export const defaultInitState: CatalogueState = {
    productList: null,
    productAmount: 0,
};

export const createCatalogueStore = (
    initState: CatalogueState = defaultInitState,
    useQueryStateList: QueryStore,
) => {
    return createStore<CatalogueStore>()((set) => ({
        // Use State Getters (hydratation values)
        ...initState,

        // Use State Setters
        setProductList: (value) => set(() => ({ productList: value })),
        setProductAmount: (value) => set(() => ({ productAmount: value })),

        // Use Query State
        ...useQueryStateList,
    }));
};
