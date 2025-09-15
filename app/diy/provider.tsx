"use client";

import { useSearchQueryParams } from "@comps/SHARED/queryParamsClientHooks";
import { useFetch } from "@utils/FetchHook";
import { ReactNode } from "react";
import { Context } from "./context";
import { diyCountParams } from "./fetchParams";

type ContextProviderProps = {
    initialDiyAmount: number;
    children: ReactNode;
};

export default function Provider(props: ContextProviderProps) {
    const { initialDiyAmount, children } = props;

    const { search } = useSearchQueryParams();

    const { data: diyAmount, isLoading } = useFetch({
        route: "/internal/diy/count",
        params: diyCountParams({ search }),
        initialData: initialDiyAmount,
    });

    const value = { itemsAmount: diyAmount, isLoading };

    return <Context.Provider value={value}>{children}</Context.Provider>;
}
