import { Routes } from "@services/api";
import { NextRequest } from "next/server";

// =============================================== //
// ==================== Utils ==================== //
// =============================================== //

export const revalidate = process.env.NODE_ENV === "development" ? 5 : 300;

export const parseAndDecodeParams = (request: NextRequest) => {
    const encodedParams = request.nextUrl.searchParams.get("params") ?? "{}";
    const stringParams = decodeURIComponent(encodedParams);
    return JSON.parse(stringParams);
};

export type ResponseFormat<Response> =
    | {
          data: Response;
          error?: undefined;
      }
    | {
          data?: undefined;
          error: string;
      };

// ===================================== //
// =============== Fetch =============== //
// ===================================== //

export type Keys<T> = keyof Routes<T>;

// Fetch props type
export type FetchProps<K extends Keys<T>, T> = {
    route: K;
    params?: Routes<T>[K]["props"];
    signal?: AbortSignal;
    client?: boolean;
};

export type FetchResponse<K extends Keys<T>, T> = Routes<T>[K]["response"];

// Generic function for all routes
export async function FetchV2<K extends Keys<T>, T>(props: FetchProps<K, T>): Promise<FetchResponse<K, T>> {
    const { route, params, signal, client = false }: FetchProps<K, T> = props;

    const baseUrl = client ? "" : process.env.BASE_URL;
    const encodedParams = params ? encodeURIComponent(JSON.stringify(params)) : "";
    const urlParams = params ? "?params=" + encodedParams : "";
    const url = baseUrl + "/api" + route + urlParams;

    const response = await fetch(url, {
        method: "GET",
        signal: signal ?? AbortSignal.timeout(10000),
    });

    const responseJson = await response.json();

    if (responseJson.error) {
        throw new Error(responseJson.error ?? "Something went wrong...");
    }

    const data: FetchResponse<K, T> = responseJson.data;
    
    return data;
}
