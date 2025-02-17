import {
    createParser,
    createSearchParamsCache,
    createSerializer,
    parseAsInteger,
    parseAsString,
    parseAsStringEnum,
} from "nuqs/server";

// ========================= //
//    Query params types     //
// ========================= //

export type PageParamType = {
    page: number;
};

export type ItemsPerPageParamType = {
    take: 10 | 20 | 50 | 100;
};

export type PriceOrderParamType = {
    priceOrder: "asc" | "desc" | "not";
};

export type CategoryParamType = {
    category: string;
};

export type QueryParamType = PageParamType & PriceOrderParamType & ItemsPerPageParamType & CategoryParamType;

// ============================= //
//        Custom parsers         //
// ============================= //

const parseAsItemsPerPage = createParser({
    parse: (queryValue: number | string) => {
        const value = Number(queryValue);
        if (value === 10 || value === 20 || value === 50 || value === 100) {
            return value;
        }
        return 10;
    },
    serialize: (value: ItemsPerPageParamType["take"]) => {
        return String(value);
    }
});

// ============================= //
//  Query params client parsers  //
// ============================= //

export const PageParam = {
    page: parseAsInteger.withDefault(1),
};

export const ItemsPerPageParam = {
    take: parseAsItemsPerPage.withDefault(10),
};

export const PriceOrderParam = {
    priceOrder: parseAsStringEnum(["asc", "desc", "not"]).withDefault("not"),
};

export const CategoryParam = {
    category: parseAsString.withDefault(""),
};

export const QueryParam = {
    ...PageParam,
    ...ItemsPerPageParam,
    ...PriceOrderParam,
    ...CategoryParam,
};

// ============================= //
//   Query param server parsers  //
// ============================= //

export const queryParamCached = createSearchParamsCache(QueryParam);

export const urlSerializer = createSerializer(QueryParam);
