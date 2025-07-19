"use server";

import { BetterSessionServer, GetSession } from "../lib/authServer";
import { Roles } from "./permissionsType";

/**
 * Check if the user has one of the given roles
 */
export const hasRole = async (roles: Roles[]): Promise<BetterSessionServer | null> => {
    // Get session
    const session = await GetSession();

    // Get role
    const role = session?.user.role;
    if (!role) return null;

    // Check if the user has the given role
    const hasRole = roles.includes(role);

    if (!hasRole) return null;

    return session;
};
