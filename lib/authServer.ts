"use server";

import { headers } from "next/headers";
import { auth } from "./auth";

/**
 * Get the session from server side
 */
export const GetSession = async () => {
    const session = await auth.api.getSession({
        headers: await headers(),
    });
    return session;
};

/**
 * Type for the session data
 */
export type BetterSessionServer = Awaited<ReturnType<typeof GetSession>>;

/**
 * Get the session list from server side
 */
export const GetSessionList = async () => {
    const sessionList = await auth.api.listSessions({
        headers: await headers(),
    });
    return sessionList;
};

/**
 * Type for the session list
 */
export type BetterSessionListServer = Awaited<ReturnType<typeof GetSessionList>>;
