"use client";

import { Options, useQueryState } from "nuqs";
import {
    createContext,
    ReactNode,
} from "react";
import {
    ItemsPerPageParam,
    ItemsPerPageParamType,
    PageParam,
    PageParamType,
    PriceOrderParam,
    PriceOrderParamType,
} from "./FilterTypes";

/** UseQueryState setter function type */
type SetterFunction<T> = (
    value: T | ((old: T) => T),
    options?: Options | undefined
) => Promise<URLSearchParams>;

type FilterContextType = {
    priceOrder: PriceOrderParamType["priceOrder"];
    setPriceOrder: SetterFunction<PriceOrderParamType["priceOrder"]>;
    page: PageParamType["page"];
    setPage: SetterFunction<PageParamType["page"]>;
    take: ItemsPerPageParamType["take"];
    setTake: SetterFunction<ItemsPerPageParamType["take"]>;
};

export const FilterContext = createContext<FilterContextType>(
    {} as FilterContextType
);

type FilterProviderProps = {
    children: ReactNode;
};

export default function FilterProvider(props: FilterProviderProps) {
    const { children } = props;

    const [priceOrder, setPriceOrder] = useQueryState("priceOrder", PriceOrderParam["priceOrder"]);
    const [page, setPage] = useQueryState("page", PageParam["page"]);
    const [take, setTake] = useQueryState("take", ItemsPerPageParam["take"]);

    return (
        <FilterContext.Provider
            value={{
                priceOrder,
                setPriceOrder,
                page,
                setPage,
                take,
                setTake,
            }}
        >
            {children}
        </FilterContext.Provider>
    );
}
