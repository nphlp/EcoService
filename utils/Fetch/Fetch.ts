import { ResponseFormat, RoutesList } from "@utils/FetchConfig";

const NEXT_PUBLIC_BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

if (!NEXT_PUBLIC_BASE_URL) {
    throw new Error("NEXT_PUBLIC_BASE_URL environment variable is not defined");
}

export type Routes = RoutesList;

export type Route = keyof Routes;

export type Params<R extends Route> = Routes[R]["params"];

export type FetchProps<R extends Route> = {
    route: R;
    params?: Params<R>;
    method?: Routes[R] extends { method: string } ? Routes[R]["method"] : undefined;
    body?: Routes[R] extends { body: object } ? Routes[R]["body"] : undefined;
    signal?: AbortSignal;
    client?: boolean;
};

export type FetchResponse<R extends Route> = Routes[R]["response"];

export const Fetch = async <R extends Route>(props: FetchProps<R>): Promise<FetchResponse<R>> => {
    const { route, params, method = "GET", body, signal, client = false } = props;

    const baseUrl = client ? "" : NEXT_PUBLIC_BASE_URL;
    const encodedParams = encodeURIComponent(JSON.stringify(params));
    const urlParams = params ? "?params=" + encodedParams : "";
    const url = baseUrl + "/api" + route + urlParams;

    const formData = new FormData();
    if (body) {
        Object.entries(body).forEach(([key, value]) => {
            formData.append(key, value);
        });
    }

    const response = await fetch(url, {
        method,
        ...(body && { body: formData }),
        signal: signal ?? AbortSignal.timeout(10000),
    });

    const { data, error }: ResponseFormat<FetchResponse<R>> = await response.json();

    if (error) {
        throw new Error(error ?? "Something went wrong...");
    }

    return data as FetchResponse<R>;
};
