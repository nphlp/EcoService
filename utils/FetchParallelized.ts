import { Fetch, FetchProps, FetchResponse, Route } from "@utils/Fetch";

type MapProps<R extends Route[]> = {
    [K in keyof R]: FetchProps<R[K]>;
};

type MapResponse<R extends Route[]> = {
    [K in keyof R]: R[K] extends Route ? FetchResponse<R[K]> : never;
};

export function FetchParallelized<R extends Route[]>(paramList: MapProps<R>): Promise<MapResponse<R>> {
    const promises = paramList.map((param) => Fetch(param));
    return Promise.all(promises) as Promise<MapResponse<R>>;
}
