import { NextRequest } from "next/server";

/**
 * Create API URL
 * ```ts
 * const apiUrl = createApiURL({
 *   baseUrl: "http://localhost:3000",
 *   prefix: ["api", "orpc"],
 *   route: "/user/list",
 *   searchParams: new URLSearchParams({ key: "value" }),
 * });
 * // Result: "http://localhost:3000/api/orpc/user/list?key=value"
 * ```
 */
export const createApiURL = ({
    baseUrl,
    prefix,
    route,
    searchParams,
}: {
    baseUrl: string;
    prefix: string[];
    route: string;
    searchParams?: URLSearchParams;
}): URL => {
    const prefixJoined = prefix.join("/");
    const routeUrl = new URL(prefixJoined + route, baseUrl);
    if (searchParams) routeUrl.search = searchParams.toString();
    return routeUrl;
};

/**
 * Encode search params
 * - Performs URI encoding on both keys and values
 * - Serializes values to JSON strings to preserve data types
 *
 * ```ts
 * const encodedParams = encodeParams({
 *     userId: "user/123-456",
 *     isAdmin: true,
 *     count: 5,
 *     tags: ["tag1", "tag2"]
 * });
 *
 * // Results
 * URLSearchParams.get("userId") => "%22user%2F123-456%22"
 * URLSearchParams.get("isAdmin") => "true"
 * URLSearchParams.get("count") => "5"
 * URLSearchParams.get("tags") => "%5B%22tag1%22%2C%22tag2%22%5D"
 * ```
 */
export const encodeParams = (params: object): URLSearchParams => {
    const searchParams = new URLSearchParams();
    for (const [key, value] of Object.entries(params)) {
        searchParams.append(encodeURIComponent(key), encodeURIComponent(JSON.stringify(value)));
    }
    return searchParams;
};

/** Decode search params
 * - Performs URI decoding on both keys and values
 * - Parses JSON strings back to original data types
 *
 * ```ts
 * // Inside a Next.js API route or middleware
 * const params = request.nextUrl.searchParams;
 *
 * // Or manual creation for testing
 * const params = new URLSearchParams();
 * params.append("userId", "%22user%2F123-456%22");
 * params.append("isAdmin", "true");
 * params.append("count", "5");
 * params.append("tags", "%5B%22tag1%22%2C%22tag2%22%5D");
 *
 * const decoded = decodeParams(params);
 *
 * // Results
 * => decoded = {
 *     userId: "user/123-456",
 *     isAdmin: true,
 *     count: 5,
 *     tags: ["tag1", "tag2"]
 * }
 * ```
 */
export const decodeParams = (params: URLSearchParams) => {
    const keyValueArray: [string, string][] = Array.from(params.entries());
    const decodedKeyValueArray = keyValueArray.map(([key, value]) => [
        decodeURIComponent(key),
        JSON.parse(decodeURIComponent(value)),
    ]);
    return Object.fromEntries(decodedKeyValueArray);
};

/**
 * Extract parameters or body from NextRequest
 * - For GET requests, extracts and decodes search parameters
 * - For other methods (POST, PUT, PATCH, DELETE), parses JSON body
 */
export const extractParamsOrBody = async <T>(request: NextRequest): Promise<T> => {
    if (request.method === "GET") return decodeParams(request.nextUrl.searchParams);
    // If POST, PUT, PATCH, DELETE
    return await request.json();
};
