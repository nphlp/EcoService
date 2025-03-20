import { ResponseFormat, Routes } from "@api/Routes";

export type FetchProps<Key extends keyof Routes> = {
    /**
     * The API route to fetch data from
     * @example "/products"
     */
    route: Key;
    /**
     * Optional parameters to send with the request
     */
    params?: Routes[Key]["params"];
    /**
     * Optional method to send with the request
     * @default "GET"
     */
    method?: Routes[Key] extends { method: string } ? Routes[Key]["method"] : undefined;
    /**
     * Optional body to send with the request
     * Usefull to keep File prototype
     */
    body?: Routes[Key] extends { body: object } ? Routes[Key]["body"] : undefined;
    /**
     * Optional AbortSignal for cancelling the request
     */
    signal?: AbortSignal;
    /**
     * Whether the fetch is being called from the client
     * - true: No baseUrl will be prepended (for client-side fetching)
     * - false: baseUrl will be prepended (for server-side fetching)
     * @default false
     */
    client?: boolean;
};

/**
 * Type representing the keys of the Routes type
 */
export type Key = keyof Routes;

/**
 * Type representing the response structure from an API route
 * @template Key - The route key from the Routes type
 */
export type DataType<Key extends keyof Routes> = Routes[Key]["response"];

/**
 * A type-safe fetch utility for making API requests
 *
 * This function handles:
 * - Constructing the URL with proper base URL depending on client/server context
 * - Encoding parameters
 * - Setting up AbortController for request cancellation
 * - Type-safe responses based on the Routes type definition
 * - Error handling
 *
 * @template Key - The route key from the Routes type
 * @param props - The fetch configuration
 * @returns A promise that resolves to the response from the API
 * @throws Error if the request fails
 */
export const Fetch = async <Key extends keyof Routes>(props: FetchProps<Key>): Promise<DataType<Key>> => {
    const { route, params, method = "GET", body, signal, client = false } = props;

    // Server requieres a baseUrl, but client doesn't
    const baseUrl = client ? "" : process.env.BASE_URL;

    // Encode the props
    const encodedParams = encodeURIComponent(JSON.stringify(params));

    const urlParams = params ? "?params=" + encodedParams : "";

    // Construct the url
    const url = baseUrl + "/api" + route + urlParams;

    // Create a formData object for POST requests that need it
    const formData = new FormData();

    // Append the object body to the formData object
    if (body) {
        Object.entries(body).forEach(([key, value]) => {
            formData.append(key, value);
        });
    }

    // Fetch the data
    const response = await fetch(url, {
        method,
        ...(body && { body: formData }),
        // Stop the request after 10 seconds
        signal: signal ?? AbortSignal.timeout(10000),
    });

    // Parse and type the data
    const { data, error }: ResponseFormat<DataType<Key>> = await response.json();

    // If the response has an error, throw an error
    if (!data || error) {
        throw new Error(error ?? "Something went wrong...");
    }

    // Return the data
    return data;
};
