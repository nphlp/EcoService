import { FetchProps, FetchResponse, FetchV2, Params, Route } from "./FetchV2";

type MapProps<
    Input,
    R extends Route<Input>[],
    P extends {
        [K in keyof R]: R[K] extends Route<Input> ? Params<Input, R[K]> : never;
    },
> = {
    [K in keyof R]: FetchProps<Input, R[K], P[K]>;
};

type MapResponse<
    Input,
    R extends Route<Input>[],
    P extends {
        [K in keyof R]: R[K] extends Route<Input> ? Params<Input, R[K]> : never;
    },
> = {
    [K in keyof R]: FetchResponse<Input, R[K], P[K]>;
};

export const FetchParallelizedV2 = async <
    Input,
    R extends Route<Input>[],
    P extends {
        [K in keyof R]: R[K] extends Route<Input> ? Params<Input, R[K]> : never;
    },
>(
    paramList: MapProps<Input, R, P>,
): Promise<MapResponse<Input, R, P>> => {
    const promises = paramList.map((param) => FetchV2(param));
    return Promise.all(promises) as Promise<MapResponse<Input, R, P>>;
};
