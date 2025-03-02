import { createSearchParamsCache, createSerializer, parseAsBoolean, parseAsInteger, parseAsString } from "nuqs/server";

// ========================= //
//    Query params types     //
// ========================= //

export type PageParamType = {
    page: number;
};

export type TypeParamType = {
    type: "all" | "concert" | "spectacle";
};

export type CheckedParamType = {
    checked: boolean;
};

export type QueryParamType = PageParamType & TypeParamType & CheckedParamType;

// ============================= //
//  Query params client parsers  //
// ============================= //

export const PageParam = {
    page: parseAsInteger.withDefault(1),
};

export const TypeParam = {
    type: parseAsString.withDefault("all"),
};

export const CheckedParam = {
    checked: parseAsBoolean.withDefault(false),
};

export const QueryParam = {
    ...PageParam,
    ...TypeParam,
    ...CheckedParam,
};

// ============================= //
//   Query param server parsers  //
// ============================= //

export const queryParamCached = createSearchParamsCache(QueryParam);

export const urlSerializer = createSerializer(QueryParam);
