import { createAuthClient } from "better-auth/react";
import { customSessionClient } from "better-auth/client/plugins";
import { auth } from "./auth";

export const authClient = createAuthClient({
    baseURL: process.env.BASE_URL,
    plugins: [customSessionClient<typeof auth>()],
});

export const {
    signIn,
    signUp,
    signOut,
    useSession,
    updateUser,
    changeEmail,
    listSessions,
    revokeSession,
    revokeOtherSessions,
    revokeSessions,
} = authClient;

/**
 * Type for the session data
 */
export type BetterSessionClient = ReturnType<typeof useSession>["data"];

/**
 * Type for the session list
 */
export type SessionList = {
    id: string;
    token: string;
    expiresAt: Date;
    ipAddress: string | null;
    userAgent: string | null;
    userId: string;
    createdAt: Date;
    updatedAt: Date;
};
