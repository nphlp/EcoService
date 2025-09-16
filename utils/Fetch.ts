import { Routes } from "@app/api/Routes";
import { ResponseFormat } from "@utils/FetchConfig";

const NEXT_PUBLIC_BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

if (!NEXT_PUBLIC_BASE_URL) {
    throw new Error("NEXT_PUBLIC_BASE_URL environment variable is not defined");
}

/**
 * Server only headers inport
 */
// const headers = async () => {
//     if (typeof window !== "undefined") return undefined;
//     const nextHeaders = await import("next/headers");
//     return await nextHeaders.headers();
// };

export type Route<Input> = keyof Routes<Input>;

export type Params<Input, R extends Route<Input>> =
    ReturnType<Routes<Input>[R]> extends { params: object } ? ReturnType<Routes<Input>[R]>["params"] : undefined;

export type Method<Input, R extends Route<Input>> =
    ReturnType<Routes<Input>[R]> extends { method: string } ? ReturnType<Routes<Input>[R]>["method"] : undefined;

export type Body<Input, R extends Route<Input>> =
    ReturnType<Routes<Input>[R]> extends { body: object } ? ReturnType<Routes<Input>[R]>["body"] : undefined;

export type FetchProps<
    Input,
    R extends Route<Input>,
    P extends Params<Input, R>,
    M extends Method<Input, R>,
    B extends Body<Input, R>,
> = {
    route: R;
    params?: P;
    method?: M;
    body?: B;
    signal?: AbortSignal;
    client?: boolean;
};

export type FetchResponse<Input, R extends Route<Input>, P extends Params<Input, R>> = ReturnType<
    Routes<P>[R]
>["response"];

export const Fetch = async <
    Input,
    R extends Route<Input>,
    P extends Params<Input, R>,
    M extends Method<Input, R>,
    B extends Body<Input, R>,
>(
    props: FetchProps<Input, R, P, M, B>,
): Promise<FetchResponse<Input, R, P>> => {
    const { route, params, method = "GET", body: bodyObject, signal: overrideSignal, client = false } = props;

    // Construct URL
    const baseUrl = client ? "" : NEXT_PUBLIC_BASE_URL;
    const encodedParams = params ? encodeURIComponent(JSON.stringify(params)) : "";
    const urlParams = params ? "?params=" + encodedParams : "";
    const url = baseUrl + "/api" + route + urlParams;

    // Construct body
    const body = bodyObject ? new FormData() : undefined;
    if (body && bodyObject) {
        Object.entries(bodyObject).forEach(([key, value]) => {
            body.append(key, value);
        });
    }

    // Manage abort controller signal
    const defaultOrOverrideSignal = overrideSignal ?? AbortSignal.timeout(10000);
    const signal = process.env.NODE_ENV !== "test" ? defaultOrOverrideSignal : undefined;

    const response = await fetch(url, {
        method,
        body,
        signal,

        // headers: await headers(),
        // credentials: "include",
    });

    const { data, error }: ResponseFormat<FetchResponse<Input, R, P>> = await response.json();

    if (error || data === undefined) {
        throw new Error(error ?? "Something went wrong...");
    }

    return data;
};
