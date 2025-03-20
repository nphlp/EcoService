import { DataType, Fetch, FetchProps, Key } from "@utils/Fetch";

/**
 * Map the props to the fetch props
 * @param paramList - The list of fetch props
 * @returns The list of fetch props
 */
type MapToProps<K extends Key[]> = { [P in keyof K]: FetchProps<K[P]> };

/**
 * Map the data type to the data type
 */
type MapToDataType<K extends Key[]> = { [P in keyof K]: K[P] extends Key ? DataType<K[P]> : never };

/**
 * Fetch the data in parallel
 * @param paramList - The list of fetch props
 * @returns The list of data
 */
export function FetchParallelized<K extends Key[]>(paramList: MapToProps<K>): Promise<MapToDataType<K>> {
    return Promise.all(paramList.map((param) => Fetch(param))) as Promise<MapToDataType<K>>;
}
