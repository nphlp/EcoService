import { Routes } from "@app/api/Routes";
import { ResponseFormat } from "@utils/FetchConfig";

// Routes keys type
export type Route<Input> = keyof Routes<Input>;

// Params type for a specific route
export type Params<Input, R extends Route<Input>> = Routes<Input>[R]["params"];

// Fetch props type
export type FetchProps<Input, R extends Route<Input>, P extends Params<Input, R>> = {
    route: R;
    params?: P;
    signal?: AbortSignal;
    client?: boolean;
};

// Fetch response type
export type FetchResponse<Input, R extends Route<Input>, P extends Params<Input, R>> = Routes<P>[R]["response"];

// Generic function for all routes
export const FetchV2 = async <Input, R extends Route<Input>, P extends Params<Input, R>>(
    props: FetchProps<Input, R, P>,
): Promise<FetchResponse<Input, R, P>> => {
    const { route, params, signal, client = false } = props;

    const baseUrl = client ? "" : process.env.BASE_URL;
    const encodedParams = params ? encodeURIComponent(JSON.stringify(params)) : "";
    const urlParams = params ? "?params=" + encodedParams : "";
    const url = baseUrl + "/api" + route + urlParams;

    const response = await fetch(url, {
        method: "GET",
        signal: signal ?? AbortSignal.timeout(10000),
    });

    const { data, error }: ResponseFormat<FetchResponse<Input, R, P>> = await response.json();

    if (!data || error) {
        throw new Error(error ?? "Something went wrong...");
    }

    return data;
};
