import { customSessionClient } from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";
import { auth } from "./auth";

const NEXT_PUBLIC_BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

if (!NEXT_PUBLIC_BASE_URL) {
    throw new Error("NEXT_PUBLIC_BASE_URL environment variable is not defined");
}

export const authClient = createAuthClient({
    baseURL: NEXT_PUBLIC_BASE_URL,
    plugins: [customSessionClient<typeof auth>()],
});

export const {
    signIn,
    signUp,
    signOut,
    useSession,
    revokeSession,
    revokeOtherSessions,
    updateUser,
    changeEmail,
    changePassword,
    sendVerificationEmail,
    requestPasswordReset,
    resetPassword,
} = authClient;

/**
 * Type for the session data
 */
export type SessionClient = ReturnType<typeof useSession>["data"];

export type SessionRefetch = ReturnType<typeof useSession>["refetch"];
