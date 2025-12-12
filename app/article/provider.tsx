"use client";

import { useSearchQueryParams } from "@comps/SHARED/queryParamsClientHooks";
import { ReactNode } from "react";
import useSolid from "@/solid/solid-hook";
import { Context } from "./context";
import { articleCountParams } from "./fetchParams";

type ContextProviderProps = {
    initialArticleAmount: number;
    children: ReactNode;
};

export default function Provider(props: ContextProviderProps) {
    const { initialArticleAmount, children } = props;

    const { search } = useSearchQueryParams();

    const { data: articleAmount, isLoading } = useSolid({
        route: "/solid/article/count",
        params: articleCountParams({ search }),
        initialData: initialArticleAmount,
    });

    const value = { itemsAmount: articleAmount, isLoading };

    return <Context.Provider value={value}>{children}</Context.Provider>;
}
