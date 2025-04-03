import { FetchProps, FetchResponse, FetchV2, Params, Route } from "./FetchV2";

export const FetchParallelizedV2 = async <
    Input,
    R extends Route<Input>[],
    P extends { [K in keyof R]: Params<Input, R[K]> },
>(paramList: {
    [K in keyof R]: FetchProps<Input, R[K], P[K]>;
}) => {
    return Promise.all(paramList.map((p) => FetchV2(p))) as Promise<{
        [K in keyof R]: R[K] extends Route<Input> ? FetchResponse<Input, R[K], P[K]> : never;
    }>;
};
