"use client";

import { useFetchV2 } from "@utils/FetchV2/FetchHookV2";
import { ReactNode } from "react";
import { Context } from "./context";
import { productCountParams } from "./fetchParams";
import { useCatalogParams } from "./queryParamsHook";

type ContextProviderProps = {
    initialProductAmount: number;
    children: ReactNode;
};

export default function Provider(props: ContextProviderProps) {
    const { initialProductAmount, children } = props;

    const { category, search } = useCatalogParams();

    const { data: productAmount, isLoading } = useFetchV2({
        route: "/product/count",
        params: productCountParams({ category, search }),
        initialData: initialProductAmount,
    });

    const value = { productAmount, isLoading };

    return <Context.Provider value={value}>{children}</Context.Provider>;
}
