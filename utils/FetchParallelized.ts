import { Fetch, FetchProps, FetchResponse, Route } from "@utils/Fetch";

type MapProps<
    R extends Route[]
> = {
    [r in keyof R]: FetchProps<R[r]>;
};

type MapResponse<
    R extends Route[]
> = {
    [r in keyof R]: R[r] extends Route
        ? FetchResponse<R[r]>
        : never;
};

export function FetchParallelized<
    R extends Route[]
>(paramList: MapProps<R>): Promise<MapResponse<R>> {
    const promises = paramList.map((param) => Fetch(param));
    return Promise.all(promises) as Promise<MapResponse<R>>;
}
