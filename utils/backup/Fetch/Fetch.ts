// import { Routes } from "@app/api/Routes";
// import { ResponseFormat } from "@utils/FetchConfig";

// const NEXT_PUBLIC_BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

// if (!NEXT_PUBLIC_BASE_URL) {
//     throw new Error("NEXT_PUBLIC_BASE_URL environment variable is not defined");
// }

// // Dynamicly import headers (server only)
// const headers = async () => {
//     if (typeof window === "undefined") {
//         const nextHeaders = await import("next/headers");
//         const awaitedHeaders = await nextHeaders.headers();
//         return awaitedHeaders;
//     }
//     return undefined;
// };

// export type Route<Input> = keyof Routes<Input>;

// export type Params<Input, R extends Route<Input>> = Routes<Input>[R] extends { params: object }
//     ? Routes<Input>[R]["params"]
//     : undefined;

// export type FetchProps<Input, R extends Route<Input>> = {
//     route: R;
//     params?: Params<Input, R>;
//     method?: Routes<Input>[R] extends { method: string } ? Routes<Input>[R]["method"] : undefined;
//     body?: Routes<Input>[R] extends { body: object } ? Routes<Input>[R]["body"] : undefined;
//     signal?: AbortSignal;
//     client?: boolean;
// };

// export type FetchResponse<Input, R extends Route<Input>> = ReturnType<Routes<Input>[R]>["response"];

// export const Fetch = async <Input, R extends Route<Input>>(
//     props: FetchProps<Input, R>,
// ): Promise<FetchResponse<Input, R>> => {
//     const { route, params, method = "GET", body, signal, client = false } = props;

//     const baseUrl = client ? "" : NEXT_PUBLIC_BASE_URL;
//     const encodedParams = encodeURIComponent(JSON.stringify(params));
//     const urlParams = params ? "?params=" + encodedParams : "";
//     const url = baseUrl + "/api" + route + urlParams;

//     const formData = new FormData();
//     if (body) {
//         Object.entries(body).forEach(([key, value]) => {
//             formData.append(key, value);
//         });
//     }

//     const response = await fetch(url, {
//         method,
//         // Send headers if request is sent from server
//         headers: await headers(),
//         // Send cookies if request is sent from client
//         credentials: "include",
//         ...(body && { body: formData }),
//         signal: signal ?? AbortSignal.timeout(10000),
//     });

//     const { data, error }: ResponseFormat<FetchResponse<Input, R>> = await response.json();

//     if (error) {
//         throw new Error(error ?? "Something went wrong...");
//     }

//     return data as FetchResponse<Input, R>;
// };
