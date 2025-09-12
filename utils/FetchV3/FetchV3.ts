import { Routes } from "@app/api/Routes";
import { ResponseFormat } from "@utils/FetchConfig";

const NEXT_PUBLIC_BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

if (!NEXT_PUBLIC_BASE_URL) {
    throw new Error("NEXT_PUBLIC_BASE_URL environment variable is not defined");
}

/**
 * Server only headers inport
 */
const headers = async () => {
    if (typeof window !== "undefined") return undefined;
    const nextHeaders = await import("next/headers");
    return await nextHeaders.headers();
};

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

export const FetchV3 = async <
    Input,
    R extends Route<Input>,
    P extends Params<Input, R>,
    M extends Method<Input, R>,
    B extends Body<Input, R>,
>(
    props: FetchProps<Input, R, P, M, B>,
): Promise<FetchResponse<Input, R, P>> => {
    const { route, params, method = "GET", body, signal, client = false } = props;

    const baseUrl = client ? "" : NEXT_PUBLIC_BASE_URL;
    const encodedParams = params ? encodeURIComponent(JSON.stringify(params)) : "";
    const urlParams = params ? "?params=" + encodedParams : "";
    const url = baseUrl + "/api" + route + urlParams;

    // Prevent timeout in pipeline tests
    const newAbortSignal = process.env.NODE_ENV !== "test" ? AbortSignal.timeout(10000) : undefined;

    const formData = new FormData();
    if (body) {
        Object.entries(body).forEach(([key, value]) => {
            formData.append(key, value);
        });
    }

    const response = await fetch(url, {
        method,
        ...(body && { body: formData }),
        signal: signal ?? newAbortSignal,

        /**
         * Send `headers` from server to client
         * -> Required for @lib/zustandCookieStorage.ts to update client cookies from server
         */
        headers: await headers(),

        /**
         * Send `cookies` from client to server
         * -> Required for @lib/zustandServer.ts to read cookies server side
         */
        credentials: "include",
    });

    const { data, error }: ResponseFormat<FetchResponse<Input, R, P>> = await response.json();

    if (error || data === undefined) {
        throw new Error(error ?? "Something went wrong...");
    }

    return data;
};
