import {
    categoryQueryParser,
    pageQueryParser,
    priceOrderQueryParser,
    searchQueryParser,
    takeQueryParser,
} from "@comps/SHARED/queryParamsServerParsers";
import { createSearchParamsCache, createSerializer } from "nuqs/server";

/**
 * Server parsers structure for query parameters for the catalog
 */
export const catalogQueryParams = {
    /** Page number (default value: `1`) */
    page: pageQueryParser,
    /** Items per page (default value: `20`) */
    take: takeQueryParser,
    /** Price order (default value: `"not"`) */
    priceOrder: priceOrderQueryParser,
    /** Category (default value: `""`) */
    category: categoryQueryParser,
    /** Search (default value: `""`) */
    search: searchQueryParser,
};

/**
 * Utility function to parse and cache catalog query parameters server side
 */
export const catalogQueryParamsCached = createSearchParamsCache(catalogQueryParams);

export type CatalogQueryParamsCachedType = Awaited<ReturnType<typeof catalogQueryParamsCached.parse>>;

/**
 * Serializer to construct an URL with query params
 */
export const catalogUrlSerializer = createSerializer(catalogQueryParams);
