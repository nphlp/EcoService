import {
    createSearchParamsCache,
    createSerializer,
    parseAsInteger,
    parseAsString,
} from "nuqs/server";

// ========================= //
//    Query params types     //
// ========================= //

export type PageParamType = {
    page: number;
};

export type PriceOrderParamType = {
    priceOrder: "asc" | "desc" | "";
};

export type QueryParamType = PageParamType & PriceOrderParamType;

// ============================= //
//  Query params client parsers  //
// ============================= //

export const PageParam = {
    page: parseAsInteger.withDefault(1),
};

export const PriceOrderParam = {
    priceOrder: parseAsString.withDefault(""),
};

export const QueryParam = {
    ...PageParam,
    ...PriceOrderParam,
};

// ============================= //
//   Query param server parsers  //
// ============================= //

export const queryParamCached = createSearchParamsCache(QueryParam);

export const urlSerializer = createSerializer(QueryParam);
