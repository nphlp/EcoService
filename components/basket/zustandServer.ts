import "server-only";
import { cookies } from "next/headers";

/**
 * Get the Zustand cookie on the server side
 * @param name - The name of the cookie
 * @returns The value of the cookie
 */
export const getZustandCookie = async (name: string): Promise<string | null> => {
    const cookieStore = await cookies();
    const value = cookieStore.get(name)?.value;
    return value ? JSON.parse(decodeURIComponent(value)) : null;
};
