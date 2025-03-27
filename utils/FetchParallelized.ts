import { FetchResponse, Fetch, FetchProps, Route } from "@utils/Fetch";

/**
 * Map the props to the fetch props
 * @param paramList - The list of fetch props
 * @returns The list of fetch props
 */
type MapToProps<R extends Route[]> = {
    [r in keyof R]: FetchProps<R[r]>;
};

/**
 * Map the data type to the data type
 */
type MapToDataType<R extends Route[]> = {
    [r in keyof R]: R[r] extends Route
        ? FetchResponse<R[r]>
        : never;
};

/**
 * Fetch the data in parallel
 * @param paramList - The list of fetch props
 * @returns The list of data
 */
export function FetchParallelized<R extends Route[]>(paramList: MapToProps<R>): Promise<MapToDataType<R>> {
    return Promise.all(paramList.map((param) => Fetch(param))) as Promise<MapToDataType<R>>;
}
