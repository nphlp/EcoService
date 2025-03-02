"use client";

import { useEffect, useRef, useState } from "react";
import { Fetch, FetchProps } from "./Fetch";
import { Routes } from "./Routes";

export type FetchHookProps<Key extends keyof Routes> = Omit<FetchProps<Key>, "client">;

export function useFetch<Key extends keyof Routes>(props: FetchHookProps<Key>) {
    const { route, params } = props;

    // Create a ref to give params to the fetch without causing a re-render
    const propsRef = useRef({ route, params });

    // Update the ref when the props change
    useEffect(() => {
        propsRef.current = { route, params };
    }, [route, params]);

    // Trigger a re-render to re-fetch the data
    const paramsString = JSON.stringify(props.params);

    const [data, setData] = useState<Routes[Key]["response"]>();
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | undefined>();

    useEffect(() => {
        const controller = new AbortController();
        const { signal } = controller;

        const fetchData = async () => {
            try {
                const { route, params } = propsRef.current;

                const result = await Fetch({
                    route,
                    params,
                    client: true,
                    signal,
                });

                if (!signal.aborted) setData(result);
            } catch (error) {
                if (!signal.aborted) setError((error as Error).message);
            } finally {
                if (!signal.aborted) setIsLoading(false);
            }
        };

        fetchData();

        return () => {
            controller.abort();
        };
    }, [paramsString]);

    return { data, isLoading, error };
}
