import { createParser, parseAsInteger, parseAsString, parseAsStringEnum } from "nuqs/server";

/**
 * This file contains all server parsers for query parameters used in client components
 */

// Category filter
export const categoryQueryParser = parseAsString.withDefault("");

// Page filter
export const pageQueryParser = parseAsInteger.withDefault(1);

// Price order filter
export const priceOrderQueryParser = parseAsStringEnum(["asc", "desc", "not"]).withDefault("not");

// Take filter
const parseAsTake = createParser({
    parse: (queryValue: number | string) => {
        const value = Number(queryValue);
        if (value === 10 || value === 20 || value === 50 || value === 100) {
            return value;
        }
        return 10;
    },
    serialize: (value: 10 | 20 | 50 | 100) => {
        return String(value);
    },
});
export const takeQueryParser = parseAsTake.withDefault(20);

// Search filter
export const searchQueryParser = parseAsString.withDefault("");
