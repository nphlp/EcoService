/**
 * Overload for array of objects
 */
function projection<T extends object, K extends keyof T>(data: T[], fields: K[]): Pick<T, K>[];

/**
 * Overload for single object
 */
function projection<T extends object, K extends keyof T>(data: T, fields: K[]): Pick<T, K>;

/**
 * Keep only the required fields in an object or array of objects
 */
function projection<T extends object, K extends keyof T>(data: T | T[], fields: K[]): Pick<T, K> | Pick<T, K>[] {
    const isArray = Array.isArray(data);

    if (isArray) {
        return data.map((item) => Object.fromEntries(fields.map((field) => [field, item[field]])) as Pick<T, K>);
    }

    return Object.fromEntries(fields.map((field) => [field, data[field]])) as Pick<T, K>;
}

export default projection;
