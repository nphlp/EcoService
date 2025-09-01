"use client";

import { useSearchQueryParams } from "@comps/SHARED/queryParamsClientHooks";
import { useFetchV2 } from "@utils/FetchV2/FetchHookV2";
import { ReactNode } from "react";
import { Context } from "./context";
import { articleCountParams } from "./fetchParams";

type ContextProviderProps = {
    initialArticleAmount: number;
    children: ReactNode;
};

export default function Provider(props: ContextProviderProps) {
    const { initialArticleAmount, children } = props;

    const { search } = useSearchQueryParams();

    const { data: articleAmount, isLoading } = useFetchV2({
        route: "/article/count",
        params: articleCountParams({ search }),
        initialData: initialArticleAmount,
    });

    const value = { itemsAmount: articleAmount, isLoading };

    return <Context.Provider value={value}>{children}</Context.Provider>;
}
