import { DataResponse, Fetch, FetchProps } from "./Fetch";
import { Routes } from "./Routes";

/**
 * The type of the fetch parameters
 */
type TypeOfFetchProps = Array<FetchProps<keyof Routes>>;

/**
 * The type of the result of the FetchParallelized function
 * @param T - The type of the fetch parameters
 * @returns The type of the result of the FetchParallelized function
 */
type FetchParallelizedResult<T extends TypeOfFetchProps> = {
  [K in keyof T]: T[K] extends FetchProps<infer R> ? DataResponse<R>["data"] : never;
};

/**
 * Fetch multiple routes in parallel
 * @param paramList - The list of fetch parameters
 * @returns The list of fetched data with proper types for each route
 */
export async function FetchParallelized<T extends Array<FetchProps<keyof Routes>>>(
  paramList: [...T]
): Promise<FetchParallelizedResult<T>> {
    const promiseList = paramList.map((param) => Fetch(param));

    const results = await Promise.all(promiseList);

    return results as FetchParallelizedResult<T>;
}