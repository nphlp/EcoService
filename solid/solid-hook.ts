"use client";

import { Dispatch, SetStateAction, useEffect, useMemo, useRef, useState } from "react";
import Solid, { Body, Method, Params, Route, SolidProps, SolidResponse } from "./solid-fetch";

export type SolidHookProps<
    Input,
    R extends Route<Input>,
    P extends Params<Input, R>,
    M extends Method<Input, R>,
    B extends Body<Input, R>,
> = Omit<SolidProps<Input, R, P, M, B>, "client" | "signal"> & {
    initialData: SolidResponse<Input, R, P>;
    debounce?: number;
    fetchOnFirstRender?: boolean;
};

export type RefetchType = (offsetTime?: number) => void;

export type SolidHookResponse<Input, R extends Route<Input>, P extends Params<Input, R>> = {
    data: SolidResponse<Input, R, P> | undefined;
    isLoading: boolean;
    setDataBypass: Dispatch<SetStateAction<SolidResponse<Input, R, P> | undefined>>;
    refetch: RefetchType;
    error: string | undefined;
};

const useSolid = <
    Input,
    R extends Route<Input>,
    P extends Params<Input, R>,
    M extends Method<Input, R>,
    B extends Body<Input, R>,
>(
    props: SolidHookProps<Input, R, P, M, B>,
): SolidHookResponse<Input, R, P> => {
    const { route, params, debounce = 0, fetchOnFirstRender = false, initialData } = props;

    const stringifiedParams = JSON.stringify(params);
    const memoizedProps = useMemo(
        () => ({
            route,
            params: JSON.parse(stringifiedParams),
            // params: stringifiedParams ? JSON.parse(stringifiedParams) : undefined,
        }),
        [route, stringifiedParams],
    );

    const fetchOnFirstRenderRef = useRef(fetchOnFirstRender);

    const [data, setData] = useState<SolidResponse<Input, R, P> | undefined>(initialData);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | undefined>();
    const [refetchTrigger, setRefetchTrigger] = useState(0);

    useEffect(() => {
        const controller = new AbortController();
        const { signal } = controller;

        const fetchData = async () => {
            setIsLoading(true);

            if (process.env.NODE_ENV === "development") {
                // console.log("useSolid: ", memoizedProps);
            }

            try {
                const { route, params } = memoizedProps;

                const response = await Solid<Input, R, P, M, B>({
                    route,
                    params,
                    client: true,
                    signal,
                });

                if (!signal.aborted) setData(response);
            } catch (error) {
                if (process.env.NODE_ENV === "development") {
                    console.error("useSolid error:", error);
                }
                if (!signal.aborted) setError((error as Error).message);
            } finally {
                if (!signal.aborted) setIsLoading(false);
            }
        };

        const debounceTimeout = setTimeout(() => {
            if (fetchOnFirstRenderRef.current) {
                fetchData();
            }
            fetchOnFirstRenderRef.current = true;
        }, debounce);

        return () => {
            clearTimeout(debounceTimeout);
            controller.abort();
        };
    }, [memoizedProps, refetchTrigger, debounce]);

    const refetch = (offsetTime: number = 100) => {
        setTimeout(() => {
            setRefetchTrigger((prev) => prev + 1);
        }, offsetTime);
    };

    const setDataBypass: Dispatch<SetStateAction<SolidResponse<Input, R, P> | undefined>> = (value) => {
        return setData(value);
    };

    return {
        data,
        setDataBypass,
        isLoading,
        error,
        refetch,
    };
};

export default useSolid;
