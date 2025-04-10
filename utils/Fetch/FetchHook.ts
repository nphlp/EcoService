"use client";

import { Routes } from "@app/api/stripe/Routes";
import { Fetch, FetchProps, FetchResponse } from "./Fetch";
import { useEffect, useMemo, useRef, useState } from "react";

/**
 * Props for the useFetch hook
 * Same as FetchProps but without the client property (always true in client components)
 * @template Key - The route key from the Routes type
 * @param fetchOnFirstRender - Whether to fetch the data on the first render,
 * useful to avoid fetching data on the first render if the data is already fetched in the server component
 */
export type FetchHookProps<Key extends keyof Routes> = Omit<FetchProps<Key>, "client"> & {
    fetchOnFirstRender?: boolean;
};

/**
 * A React hook for fetching data from API endpoints with type safety
 *
 * Features:
 * - Type-safe API requests based on the Routes type definition
 * - Automatic refetching when parameters change
 * - Request cancellation on component unmount
 * - Loading and error states
 *
 * @template Key - The route key from the Routes type
 * @param props - The fetch configuration
 * @returns An object containing data, loading state, and error information
 */
export const useFetch = <Key extends keyof Routes>(props: FetchHookProps<Key>) => {
    const { route, params, fetchOnFirstRender = false } = props;

    const stringifiedParams = JSON.stringify(params);

    // Memoize the props to avoid re-rendering the component when the params change
    const memoizedProps = useMemo(
        () => ({
            route,
            params: JSON.parse(stringifiedParams),
        }),
        [route, stringifiedParams],
    );

    // Enable or disable the fetch on first render, depending on SSR (false by default) or CSR (true)
    const fetchOnFirstRenderRef = useRef(fetchOnFirstRender);

    // State for managing the fetch lifecycle
    const [data, setData] = useState<FetchResponse<Key>>();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string>();

    // Effect for fetching data
    useEffect(() => {
        // Create an AbortController for cancelling the request if the component unmounts
        const controller = new AbortController();
        const { signal } = controller;

        const fetchData = async () => {
            // Reset loading state when params change
            setIsLoading(true);

            console.log("FETCH TRIGGERED");

            try {
                const { route, params } = memoizedProps;

                // Fetch the data
                const response = await Fetch({
                    route,
                    params,
                    client: true, // Always true for client components
                    signal,
                });

                // Only update state if the request wasn't aborted
                if (!signal.aborted) setData(response);
            } catch (error) {
                // Only update error state if the request wasn't aborted
                if (!signal.aborted) setError((error as Error).message);
            } finally {
                // Only update loading state if the request wasn't aborted
                if (!signal.aborted) setIsLoading(false);
            }
        };

        // Prevent fetching data on first render if `fetchOnFirstRender` is false
        if (fetchOnFirstRenderRef.current) {
            fetchData();
        }
        // Set the `fetchOnFirstRenderRef` to true for the next renders
        fetchOnFirstRenderRef.current = true;

        // Cleanup function to abort the request when the component unmounts
        // or when the dependencies change
        return () => controller.abort();
    }, [memoizedProps]); // Trigger useEffect only when the memoized props change

    return { data, isLoading, error };
};
