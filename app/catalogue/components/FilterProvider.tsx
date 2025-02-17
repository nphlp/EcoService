"use client";

import { Options, useQueryState } from "nuqs";
import {
    createContext,
    Dispatch,
    ReactNode,
    SetStateAction,
    useState,
} from "react";
import {
    CategoryParam,
    CategoryParamType,
    ItemsPerPageParam,
    ItemsPerPageParamType,
    PageParam,
    PageParamType,
    PriceOrderParam,
    PriceOrderParamType,
} from "./FilterTypes";
import { ProductType } from "@actions/types/Product";

/** UseQueryState setter function type */
type SetterFunction<T> = (
    value: T | ((old: T) => T),
    options?: Options | undefined,
) => Promise<URLSearchParams>;

type FilterContextType = {
    // Use State
    productList: ProductType[] | null | "isLoading";
    setProductList: Dispatch<SetStateAction<ProductType[] | null | "isLoading">>;
    productAmount: number;
    setProductAmount: Dispatch<SetStateAction<number>>;

    // Use Query State
    priceOrder: PriceOrderParamType["priceOrder"];
    setPriceOrder: SetterFunction<PriceOrderParamType["priceOrder"]>;
    page: PageParamType["page"];
    setPage: SetterFunction<PageParamType["page"]>;
    take: ItemsPerPageParamType["take"];
    setTake: SetterFunction<ItemsPerPageParamType["take"]>;
    category: CategoryParamType["category"];
    setCategory: SetterFunction<CategoryParamType["category"]>;
};

export const FilterContext = createContext<FilterContextType>(
    {} as FilterContextType,
);

type FilterProviderProps = {
    productList: ProductType[] | null;
    productAmount: number;
    children: ReactNode;
};

export default function FilterProvider(props: FilterProviderProps) {
    const { productList: productListInit, productAmount: productAmountInit, children } = props;

    const [productList, setProductList] = useState<ProductType[] | null | "isLoading">(productListInit);
    const [productAmount, setProductAmount] = useState<number>(productAmountInit);

    const [priceOrder, setPriceOrder] = useQueryState(
        "priceOrder",
        PriceOrderParam["priceOrder"],
    );
    const [page, setPage] = useQueryState("page", PageParam["page"]);
    const [take, setTake] = useQueryState("take", ItemsPerPageParam["take"]);
    const [category, setCategory] = useQueryState("category", CategoryParam["category"]);
    return (
        <FilterContext.Provider
            value={{
                productList,
                setProductList,
                productAmount,
                setProductAmount,
                priceOrder,
                setPriceOrder,
                page,
                setPage,
                take,
                setTake,
                category,
                setCategory,
            }}
        >
            {children}
        </FilterContext.Provider>
    );
}
