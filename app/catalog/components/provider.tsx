"use client";

import { useCategoryQueryParams, useSearchQueryParams } from "@comps/SHARED/queryParamsClientHooks";
import { ReactNode } from "react";
import useSolid from "@/solid/solid-hook";
import { Context } from "./context";
import { productCountParams } from "./fetchParams";

type ContextProviderProps = {
    initialProductAmount: number;
    children: ReactNode;
};

export default function Provider(props: ContextProviderProps) {
    const { initialProductAmount, children } = props;

    const { search } = useSearchQueryParams();
    const { category } = useCategoryQueryParams();

    const { data: productAmount, isLoading } = useSolid({
        route: "/solid/product/count",
        params: productCountParams({ category, search }),
        initialData: initialProductAmount,
    });

    const value = { itemsAmount: productAmount, isLoading };

    return <Context.Provider value={value}>{children}</Context.Provider>;
}
