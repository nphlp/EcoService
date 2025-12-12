import { headers } from "next/headers";
import "server-only";
import { auth } from "./auth";

export const getSession = async () => {
    const session = await auth.api.getSession({
        headers: await headers(),
    });
    return session;
};

export type Session = Awaited<ReturnType<typeof getSession>>;

export const getSessionList = async () => {
    const sessionList = await auth.api.listSessions({
        headers: await headers(),
    });
    return sessionList;
};

export type SessionList = Awaited<ReturnType<typeof getSessionList>>;
