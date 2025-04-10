import { FetchProps, FetchResponse, FetchV2, Params, Route } from "./FetchV2";

type MapProps<
    Input,
    R extends Route<Input>[],
    P extends { [K in keyof R]: Params<Input, R[K]> }
> = {
    [K in keyof R]: FetchProps<Input, R[K], P[K]>;
};

type MapResponse<T> = T extends FetchProps<infer Input, infer R, infer P>
    ? FetchResponse<Input, R, P>
    : never;

export const FetchParallelizedV2 = async <
    Input,
    R extends Route<Input>[],
    P extends { [K in keyof R]: Params<Input, R[K]> },
    T extends MapProps<Input, R, P>
>(
    paramList: T
): Promise<{ [K in keyof T]: MapResponse<T[K]> }> => {
    const promises = paramList.map((param) => FetchV2(param));

    return Promise.all(promises) as Promise<{ [K in keyof T]: MapResponse<T[K]> }>;
};


// export const FetchParallelizedV3 = async <
//     Input,
//     R extends Route<Input>[],
//     P extends { [K in keyof R]: Params<Input, R[K]> },
// >(paramList: {
//     [K in keyof R]: FetchProps<Input, R[K], P[K]>;
// }) => {
//     return Promise.all(paramList.map((p) => FetchV2(p))) as Promise<{
//         [K in keyof R]: R[K] extends Route<Input> ? FetchResponse<Input, R[K], P[K]> : never;
//     }>;
// };

