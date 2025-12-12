import { fromPairs, mapValues, sortBy, toPairs } from "lodash";

export const stringToSlug = (text: string) => {
    return text
        .toLowerCase()
        .replace(/œ/g, "oe")
        .replace(/æ/g, "ae")
        .replace(/ç/g, "c")
        .replace(/'/g, "-")
        .replace(/:/g, "-")
        .replace(/&/g, "et")
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/\s+/g, "-");
};

/**
 * Sort object properties deeply and return a stringified version
 *
 * @example
 * const obj = { b: 1, a: { d: 3, c: 2 } };
 * const sortedString = deepPropsSort(obj);
 * console.log(sortedString); // '{"a":{"c":2,"d":3},"b":1}'
 */
export const deepPropsSort = <T extends Record<string, unknown>>(obj?: T): string => {
    if (!obj) return JSON.stringify(obj);

    const sortObject = (value: unknown): unknown => {
        if (typeof value !== "object" || value === null || Array.isArray(value)) {
            return value;
        }

        // Convert object to array of key-value pairs
        const keyValueLevel = toPairs(value);

        // Sort keys at the current level
        const sortedKeyValues = sortBy(keyValueLevel, ([key]) => key);

        // Convert sorted key-value pairs back to an object
        const sortedObjectLevel = fromPairs(sortedKeyValues);

        // Recursively sort nested objects
        return mapValues(sortedObjectLevel, sortObject);
    };

    const sortedObject = sortObject(obj);

    // Stringify the sorted object
    return JSON.stringify(sortedObject);
};
