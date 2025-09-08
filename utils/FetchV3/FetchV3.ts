import { Routes } from "@app/api/Routes";
import { ResponseFormat } from "@utils/FetchConfig";

const NEXT_PUBLIC_BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

if (!NEXT_PUBLIC_BASE_URL) {
    throw new Error("NEXT_PUBLIC_BASE_URL environment variable is not defined");
}

export type Route<Input> = keyof Routes<Input>;

export type Params<Input, R extends Route<Input>> =
    ReturnType<Routes<Input>[R]> extends { params: object } ? ReturnType<Routes<Input>[R]>["params"] : undefined;

export type FetchProps<Input, R extends Route<Input>, P extends Params<Input, R>> = {
    route: R;
    params?: P;
    signal?: AbortSignal;
    client?: boolean;
};

export type FetchResponse<Input, R extends Route<Input>, P extends Params<Input, R>> = ReturnType<
    Routes<P>[R]
>["response"];

export const FetchV3 = async <Input, R extends Route<Input>, P extends Params<Input, R>>(
    props: FetchProps<Input, R, P>,
): Promise<FetchResponse<Input, R, P>> => {
    const { route, params, signal, client = false } = props;

    const baseUrl = client ? "" : NEXT_PUBLIC_BASE_URL;
    const encodedParams = params ? encodeURIComponent(JSON.stringify(params)) : "";
    const urlParams = params ? "?params=" + encodedParams : "";
    const url = baseUrl + "/api" + route + urlParams;

    const newAbortSignal = process.env.NODE_ENV !== "test" ? AbortSignal.timeout(10000) : undefined;

    const response = await fetch(url, {
        method: "GET",
        signal: signal ?? newAbortSignal,
    });

    const { data, error }: ResponseFormat<FetchResponse<Input, R, P>> = await response.json();

    if (error || data === undefined) {
        throw new Error(error ?? "Something went wrong...");
    }

    return data;
};
