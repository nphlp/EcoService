import { getSession } from "@lib/auth-server";
import { os } from "@orpc/server";
import { NextResponse } from "next/server";

/**
 * Has session middleware
 *
 * @example
 * ```ts
 * const userFindMany = os
 *     .use(requiresSession)
 *     .handler(async () => {})
 * ```
 */
const requiresSession = os.middleware(async ({ next }) => {
    const session = await getSession();

    if (!session) {
        throw new NextResponse("Unauthorized: requires to be logged in", { status: 401 });
    }

    const isAdmin = session.user.role === "ADMIN";
    const isOwner = (userToCheck: string) => session.user.id === userToCheck;
    const isOwnerOrAdmin = (userToCheck: string) => isAdmin || isOwner(userToCheck);

    return next({
        context: {
            session,
            isAdmin,
            isOwner,
            isOwnerOrAdmin,
        },
    });
});

export { requiresSession };
