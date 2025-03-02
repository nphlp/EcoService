import { Routes } from "./Routes";

export type FetchProps<Key extends keyof Routes> = {
    route: Key;
    params?: Routes[Key]["params"];
    signal?: AbortSignal;
    client?: boolean;
};

export async function Fetch<Key extends keyof Routes>(
    props: FetchProps<Key>,
): Promise<Routes[Key]["response"]> {
    try {
        const { route, params, signal, client = false } = props;

        // Server requieres a baseUrl, but client doesn't
        const baseUrl = client ? "" : process.env.BASE_URL;

        // Encode the props
        const encodedParams = encodeURIComponent(JSON.stringify(params));

        // Construct the url
        const url = baseUrl + "/api/get" + route + "?params=" + encodedParams;

        // Fetch the data
        const response = await fetch(url, {
            // Stop the request after 10 seconds
            signal: signal ?? AbortSignal.timeout(10000),
        });

        // If the request failed, return an error
        if (!response.ok) {
            throw new Error("Something went wrong...");
        }

        // Parse and type the data
        const data: Routes[Key]["response"] = await response.json();

        // Return the data
        return data;
    } catch (error) {
        throw new Error((error as Error).message);
    }
}
