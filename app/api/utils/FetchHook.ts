"use client";

import { useEffect, useRef, useState } from "react";
import { Routes } from "@api/Routes";
import { DataResponse, Fetch, FetchProps } from "./Fetch";

/**
 * Props for the useFetch hook
 * Same as FetchProps but without the client property (always true in client components)
 * @template Key - The route key from the Routes type
 * @param firstFetch - Whether to fetch the data on the first render,
 * useful to avoid fetching data on the first render if the data is already fetched in the server component
 */
export type FetchHookProps<Key extends keyof Routes> = Omit<FetchProps<Key>, "client"> & {
    firstFetch?: boolean;
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
    const { route, params, firstFetch = true } = props;

    const fetchAllowedRef = useRef(firstFetch);

    // Create a ref to give params to the fetch without causing a re-render
    const propsRef = useRef({ route, params });

    // Update the ref when the props change
    useEffect(() => {
        propsRef.current = { route, params };
    }, [route, params]);

    // Trigger a re-render to re-fetch the data when params change
    const paramsString = JSON.stringify(props.params);

    // State for managing the fetch lifecycle
    const [data, setData] = useState<DataResponse<Key>["data"]>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | undefined>();

    // Effect for fetching data
    useEffect(() => {
        // Create an AbortController for cancelling the request if the component unmounts
        const controller = new AbortController();
        const { signal } = controller;

        const fetchData = async () => {
            // Reset loading state when params change
            setIsLoading(true);

            try {
                const { route, params } = propsRef.current;

                // Make the API request
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

        if (fetchAllowedRef.current) {
            fetchData();
        }

        fetchAllowedRef.current = true;

        // Cleanup function to abort the request when the component unmounts
        // or when the dependencies change
        return () => {
            controller.abort();
        };
    }, [paramsString]); // Re-run the effect when the params change

    return { data, isLoading, error };
};
