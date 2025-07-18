import {
    createParser,
    createSearchParamsCache,
    createSerializer,
    parseAsInteger,
    parseAsString,
    parseAsStringEnum,
} from "nuqs/server";

// ========== Query params types ========== //

export type SearchParamsType = {
    /** Page number (default value: `1`) */
    page: number;
    /** Items per page (default value: `20`) */
    take: 10 | 20 | 50 | 100;
    /** Price order (default value: `"not"`) */
    priceOrder: "asc" | "desc" | "not";
    /** Category (default value: `""`) */
    category: string;
    /** Search (default value: `""`) */
    search: string;
};

// ========== Query params custom parsers ========== //

const parseAsItemsPerPage = createParser({
    parse: (queryValue: number | string) => {
        const value = Number(queryValue);
        if (value === 10 || value === 20 || value === 50 || value === 100) {
            return value;
        }
        return 10;
    },
    serialize: (value: SearchParamsType["take"]) => {
        return String(value);
    },
});

// ========== Query params client parsers ========== //

export const SearchParams = {
    /** Page number (default value: `1`) */
    page: parseAsInteger.withDefault(1),
    /** Items per page (default value: `20`) */
    take: parseAsItemsPerPage.withDefault(20),
    /** Price order (default value: `"not"`) */
    priceOrder: parseAsStringEnum(["asc", "desc", "not"]).withDefault("not"),
    /** Category (default value: `""`) */
    category: parseAsString.withDefault(""),
    /** Search (default value: `""`) */
    search: parseAsString.withDefault(""),
};

// ========== Query param server parsers ========== //

export const SearchParamsCached = createSearchParamsCache(SearchParams);

/**
 * Serializer to construct an URL with query params
 * @example Create an URL like `/catalog?page=2&category=fruits`
 * ```tsx
 * const url = urlSerializer("/catalog", {
 *     page: 2,
 *     category: 'fruits'
 * });
 * ```
 */
export const urlSerializer = createSerializer(SearchParams);
