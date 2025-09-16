import { pageQueryParser, searchQueryParser } from "@comps/SHARED/queryParamsServerParsers";
import { createSearchParamsCache, createSerializer } from "nuqs/server";

/**
 * Server parsers structure for query parameters for the catalog
 */
export const articleQueryParams = {
    /** Search (default value: `""`) */
    search: searchQueryParser,
    /** Page number (default value: `1`) */
    page: pageQueryParser,
};

/**
 * Utility function to parse and cache catalog query parameters server side
 */
export const articleQueryParamsCached = createSearchParamsCache(articleQueryParams);

export type ArticleQueryParamsCachedType = Awaited<ReturnType<typeof articleQueryParamsCached.parse>>;

/**
 * Serializer to construct an URL with query params
 */
export const articleUrlSerializer = createSerializer(articleQueryParams);
