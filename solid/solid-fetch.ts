import { Routes } from "@app/api/Routes";
import { createApiURL, encodeParams } from "@utils/url-parsers";
import { ResponseFormat } from "@/solid/solid-config";

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

export type SolidProps<
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

export type SolidResponse<Input, R extends Route<Input>, P extends Params<Input, R>> = ReturnType<
    Routes<P>[R]
>["response"];

const Solid = async <
    Input,
    R extends Route<Input>,
    P extends Params<Input, R>,
    M extends Method<Input, R>,
    B extends Body<Input, R>,
>(
    props: SolidProps<Input, R, P, M, B>,
): Promise<SolidResponse<Input, R, P>> => {
    const { route, params, method = "GET", body: bodyObject, signal: overrideSignal } = props;

    // Construct URL
    const baseUrl = NEXT_PUBLIC_BASE_URL;
    const prefix = ["api"];
    const searchParams = params ? encodeParams(params) : undefined;
    const url = createApiURL({ baseUrl, prefix, route, searchParams });

    // Construct body
    const body = bodyObject ? JSON.stringify(bodyObject) : undefined;

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

    const { data, error }: ResponseFormat<SolidResponse<Input, R, P>> = await response.json();

    if (error || data === undefined) {
        throw new Error(error ?? "Something went wrong...");
    }

    return data;
};

export default Solid;
