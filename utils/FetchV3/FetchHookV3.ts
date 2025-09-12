"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Body, FetchProps, FetchResponse, FetchV3, Method, Params, Route } from "./FetchV3";

export type FetchHookProps<
    Input,
    R extends Route<Input>,
    P extends Params<Input, R>,
    M extends Method<Input, R>,
    B extends Body<Input, R>,
> = Omit<FetchProps<Input, R, P, M, B>, "client" | "signal"> & {
    fetchOnFirstRender?: boolean;
    initialData?: FetchResponse<Input, R, P>;
};

export const useFetchV3 = <
    Input,
    R extends Route<Input>,
    P extends Params<Input, R>,
    M extends Method<Input, R>,
    B extends Body<Input, R>,
>(
    props: FetchHookProps<Input, R, P, M, B>,
) => {
    const { route, params, fetchOnFirstRender = false, initialData } = props;

    const stringifiedParams = JSON.stringify(params);
    const memoizedProps = useMemo(
        () => ({
            route,

            // FetchV2
            params: JSON.parse(stringifiedParams),
            // FetchV1
            // params: stringifiedParams ? JSON.parse(stringifiedParams) : undefined,
        }),
        [route, stringifiedParams],
    );

    const fetchOnFirstRenderRef = useRef(fetchOnFirstRender);

    const [data, setData] = useState<FetchResponse<Input, R, P> | undefined>(initialData);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string>();

    useEffect(() => {
        const controller = new AbortController();
        const { signal } = controller;

        const fetchData = async () => {
            setIsLoading(true);

            if (process.env.NODE_ENV === "development") {
                console.log("useFetchV3: ", memoizedProps);
            }

            try {
                const { route, params } = memoizedProps;

                const response = await FetchV3<Input, R, P, M, B>({
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
