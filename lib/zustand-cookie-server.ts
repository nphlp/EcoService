import { cookies } from "next/headers";
import "server-only";
import { ZodType, z } from "zod";

/**
 * Get the Zustand cookie on the server side
 * @example
 * const basketCookie = await getZustandCookie(basketCookieName, basketCookieSchema);
 */
export const getZustandCookie = async <T>(name: string, schema: ZodType<T>): Promise<T | undefined> => {
    try {
        const cookieStore = await cookies();
        const cookieValue = cookieStore.get(name)?.value;

        if (!cookieValue) return undefined;

        const objectValue = JSON.parse(cookieValue);

        const cookieStorageSchema: ZodType<{ state: T }> = z.object({
            state: schema,
        });

        const { state } = cookieStorageSchema.parse(objectValue);

        return state;
    } catch (error) {
        throw new Error(`getZustandCookie -> ${(error as Error).message}`);
    }
};
