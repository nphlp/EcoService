"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Routes } from "./Fetch";
import { Fetch, FetchProps, FetchResponse } from "./Fetch";

export type FetchHookProps<Key extends keyof Routes> = Omit<FetchProps<Key>, "client"> & {
    fetchOnFirstRender?: boolean;
};

export const useFetch = <Key extends keyof Routes>(props: FetchHookProps<Key>) => {
    const { route, params, fetchOnFirstRender = false } = props;

    const stringifiedParams = params ? JSON.stringify(params) : undefined;

    const memoizedProps = useMemo(
        () => ({
            route,
            params: stringifiedParams ? JSON.parse(stringifiedParams) : undefined,
        }),
        [route, stringifiedParams],
    );

    const fetchOnFirstRenderRef = useRef(fetchOnFirstRender);

    const [data, setData] = useState<FetchResponse<Key>>();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string>();

    useEffect(() => {
        const controller = new AbortController();
        const { signal } = controller;

        const fetchData = async () => {
            setIsLoading(true);

            if (process.env.NODE_ENV === "development") {
                console.log("useFetch: ", memoizedProps);
            }

            try {
                const { route, params } = memoizedProps;

                const response = await Fetch({
                    route,
                    params,
                    client: true,
                    signal,
                });

                if (!signal.aborted) setData(response);
            } catch (error) {
                if (!signal.aborted) setError((error as Error).message);
            } finally {
                if (!signal.aborted) setIsLoading(false);
            }
        };

        if (fetchOnFirstRenderRef.current) {
            fetchData();
        }
        fetchOnFirstRenderRef.current = true;

        return () => controller.abort();
    }, [memoizedProps]);

    return { data, isLoading, error };
};
