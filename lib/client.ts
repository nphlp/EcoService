import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
    baseURL: process.env.BASE_URL,
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
export type BetterSessionClient = ReturnType<typeof useSession>['data'];

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
