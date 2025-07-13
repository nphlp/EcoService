import { BetterSessionServer } from "@lib/authServer";
import { Methods, Models, Roles, WhereHimOnly } from "./permissionsType";

/**
 * Get role from session \
 * Return `NON_LOGGED` if no session
 */
export const getRole = (session: BetterSessionServer): Roles => session?.user.role ?? "NON_LOGGED";

/**
 * Get model from pathname
 *
 * @example-1
 * ```ts
 * Request: `/api/internal/user`
 * Return: `User`
 * ```
 *
 * @example-2
 * ```ts
 * Request: `/api/internal/account`
 * Return: `Account`
 * ```
 */
export const getModel = (pathname: string): Models | null => {
    const model = pathname.split("/")[3];
    if (!model) return null;
    return (model.charAt(0).toUpperCase() + model.slice(1)) as Models;
};

/**
 * Get method from pathname
 *
 * @example-1
 * ```ts
 * Request: `/api/internal/user/findMany`
 * Return: `findMany`
 * ```
 *
 * @example-2
 * ```ts
 * Request: `/api/internal/user/findUnique?params={where:{id:"12"}}`
 * Session: userId: `12`
 * Return: `findUnique-HO`
 * ```
 */
export const getMethodFromPathname = (
    pathname: string,
    params: WhereHimOnly,
    session: BetterSessionServer,
): Methods => {
    // Extract method from pathname
    const method = pathname.split("/")[4] as Methods;

    // Construct method for him only
    const methodForHimOnly = (method + "-HO") as Methods;

    const userId: string | null = session?.user.id ?? null;
    const whereId: string | undefined = params?.where?.id ?? params?.where?.userId;

    // Check if userId is used in where request clause
    const isForHimOnly = whereId === userId;

    // Return method
    return isForHimOnly ? methodForHimOnly : method;
};
