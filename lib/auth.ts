import { SelectUniqueUser } from "@actions/UserAction";
import PrismaInstance from "@lib/prisma";
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { customSession } from "better-auth/plugins";
import { headers } from "next/headers";
import { SendEmail } from "./plunk";

const NEXT_PUBLIC_BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

if (!NEXT_PUBLIC_BASE_URL) {
    throw new Error("NEXT_PUBLIC_BASE_URL environment variable is not defined");
}

export const auth = betterAuth({
    database: prismaAdapter(PrismaInstance, {
        provider: "mysql",
    }),
    trustedOrigins: [`${NEXT_PUBLIC_BASE_URL}/auth`],
    emailAndPassword: {
        enabled: true,
    },
    emailVerification: {
        sendOnSignUp: true,
        autoSignInAfterVerification: true,
        sendVerificationEmail: async ({ user, url }) => {
            // Send email template
            await SendEmail({
                subject: `Welcome ${user.name}! Let's verify your email.`,
                email: user.email,
                buttonUrl: url,
            });
        },
    },
    user: {
        changeEmail: {
            enabled: true,
            sendChangeEmailVerification: async ({ newEmail, url, user }) => {
                // Send email template
                await SendEmail({
                    subject: `Hey ${user.name}! Let's verify your new email.`,
                    email: newEmail,
                    buttonUrl: url,
                    changingEmail: true,
                });
            },
        },
    },
    session: {
        expiresIn: 60 * 60 * 2, // 2 hours
        updateAge: 60 * 20, // 20 minutes
        // cookieCache: {
        //     enabled: true,
        //     maxAge: 60 * 5
        // }
    },
    plugins: [
        customSession(async ({ session, user }) => {
            const userData = await SelectUniqueUser({ where: { id: user.id } });
            if (!userData) {
                throw new Error("User not found");
            }
            return {
                user: {
                    ...user,
                    lastname: userData.lastname,
                    role: userData.role,
                },
                session,
            };
        }),
        // twoFactor({
        //     twoFactorPage: "/two-factor" // the page to redirect if a user need to verify 2nd factor
        // }) // TODO: Add two factor authentication
    ],
    advanced: {
        ipAddress: {
            disableIpTracking: false,
            ipAddressHeaders: ["x-forwarded-for", "x-real-ip", "x-client-ip"],
        },
    },
});

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
