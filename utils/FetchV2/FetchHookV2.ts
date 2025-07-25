"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { FetchProps, FetchResponse, FetchV2, Params, Route } from "./FetchV2";

export type FetchHookProps<Input, R extends Route<Input>, P extends Params<Input, R>> = Omit<
    FetchProps<Input, R, P>,
    "client" | "signal"
> & {
    fetchOnFirstRender?: boolean;
    initialData?: FetchResponse<Input, R, P>;
};

export const useFetchV2 = <Input, R extends Route<Input>, P extends Params<Input, R>>(
    props: FetchHookProps<Input, R, P>,
) => {
    const { route, params, fetchOnFirstRender = false, initialData } = props;

    const stringifiedParams = JSON.stringify(params);
    const memoizedProps = useMemo(
        () => ({
            route,
            params: JSON.parse(stringifiedParams),
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
                console.log("FETCH TRIGGERED: ", memoizedProps);
            }

            try {
                const { route, params } = memoizedProps;

                const response = await FetchV2<Input, R, P>({
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
