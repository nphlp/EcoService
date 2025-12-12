"use client";

import { Dispatch, SetStateAction, useEffect, useMemo, useRef, useState } from "react";

export type RefetchType = (offsetTime?: number) => void;

type UseFetchProps<T, TArgs = unknown> = {
    /**
     * **oRPC client method**
     */
    client: (args?: TArgs, options?: { signal?: AbortSignal }) => Promise<T>;
    /**
     * **Request arguments**
     *
     * Arguments to pass to the client method
     */
    args?: TArgs;
    /**
     * **Refetch keys**
     *
     * When a key changes, the data is re-fetched
     */
    keys: unknown[];
    /**
     * **Initial data**
     *
     * Data to use for server-side rendering
     */
    initialData?: T;
    /**
     * **Debounce time**
     *
     * Timeout in milliseconds before re-fetching when a key changes (default 0ms)
     * Useful for search inputs to prevent excessive requests
     */
    debounce?: number;
    /**
     * **Fetch on first render**
     *
     * - `false` (default): prevents fetch on first render (useful for SSR)
     * - `true`: fetches data on first render
     */
    fetchOnFirstRender?: boolean;
};

type UseFetchResponse<T> = {
    /**
     * **Fetched data**
     */
    data: T | undefined;
    /**
     * **Loading state**
     */
    isFetching: boolean;
    /**
     * **Error message**
     */
    error: string | undefined;
    /**
     * **Manual refetch**
     *
     * Function to manually trigger a refetch
     */
    refetch: RefetchType;
    /**
     * **Set data bypassing fetch**
     *
     * Manually set the data without triggering a fetch
     */
    setDataBypass: Dispatch<SetStateAction<T | undefined>>;
};

/**
 * **useFetch hook**
 *
 * A custom hook to fetch data from an oRPC client method with support for loading state, error handling, debouncing, and manual refetching.
 *
 * @example
 * ```tsx
 * import oRPC from "@lib/orpc";
 * import { useFetch } from "@lib/orpc-hook";
 *
 * const { data, isFetching } = useFetch({
 *     client: oRPC.task.list,
 *     args: {
 *         userId: selectedUser,
 *         take: 10
 *     },
 *     keys: [selectedUser],
 *     initialData: tasks,
 * });
 *
 * return (
 *     <ul>
 *         {data.map((task) => (
 *             <li key={task.id}>{task.title}</li>
 *         ))}
 *     </ul>
 * )
 * ```
 */
export const useFetch = <T, TArgs = unknown>(props: UseFetchProps<T, TArgs>): UseFetchResponse<T> => {
    const { client, args, keys, initialData, debounce = 0, fetchOnFirstRender = false } = props;

    // Prevent fetch on first render
    const firstRenderRef = useRef(fetchOnFirstRender);

    // Store args in a ref so they don't trigger refetch
    const argsRef = useRef(args);

    // States
    const [data, setData] = useState<T | undefined>(initialData);
    const [isFetching, setIsLoading] = useState(false);
    const [error, setError] = useState<string | undefined>();

    // Re-fetch counter state for refetch function
    const [refetchTrigger, setRefetchTrigger] = useState(0);

    // Memoize keys to prevent unnecessary re-renders
    const stringifiedKeys = JSON.stringify(keys);
    const memoizedKeys = useMemo(() => JSON.parse(stringifiedKeys), [stringifiedKeys]);

    // Update args ref when args change
    useEffect(() => {
        argsRef.current = args;
    }, [args]);

    useEffect(() => {
        // Abort previous fetches, trust only the latest
        const controller = new AbortController();
        const { signal } = controller;

        if (process.env.NODE_ENV === "development") {
            console.log("Fetching:", "\n- args:", argsRef.current, "\n- keys:", memoizedKeys);
        }

        const fetchData = async () => {
            setIsLoading(true);

            try {
                // Execute client with signal automatically injected
                const response = await client(argsRef.current, { signal });

                if (!signal.aborted) setData(response);
            } catch (error) {
                if (!signal.aborted) setError((error as Error).message);
            } finally {
                if (!signal.aborted) setIsLoading(false);
            }
        };

        const debounceTimeout = setTimeout(() => {
            // Skip fetch on first render
            if (firstRenderRef.current) fetchData();

            // Enable fetches on next renders
            firstRenderRef.current = true;
        }, debounce);

        // Cleanup debounce and abort controller
        return () => {
            clearTimeout(debounceTimeout);
            controller.abort();
        };
    }, [client, memoizedKeys, refetchTrigger, debounce]);

    // Manual refetch
    const refetch: RefetchType = (offsetTime: number = 100) => {
        setTimeout(() => {
            setRefetchTrigger((prev) => prev + 1);
        }, offsetTime);
    };

    // Manual set data (bypass fetch)
    const setDataBypass: Dispatch<SetStateAction<T | undefined>> = (value) => {
        return setData(value);
    };

    return { data, isFetching, error, refetch, setDataBypass };
};
