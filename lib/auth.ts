import { SelectUser } from "@actions/database/User";
import PrismaInstance from "@lib/prisma";
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { customSession } from "better-auth/plugins";
import { headers } from "next/headers";
import { SendEmail } from "./plunk";

const baseUrl = process.env.BASE_URL;

export const auth = betterAuth({
    database: prismaAdapter(PrismaInstance, {
        provider: "mysql",
    }),
    trustedOrigins: [`${baseUrl}/auth`],
    emailAndPassword: {
        enabled: true,
    },
    emailVerification: {
        sendOnSignUp: true,
        autoSignInAfterVerification: true,
        sendVerificationEmail: async ({ user, token }) => {
            const callbackURL = "/profile";
            const urlToken =
                baseUrl + "/api/auth/verify-email?token=" + token + "&callbackURL=" + baseUrl + callbackURL;

            // Send email template
            await SendEmail({
                subject: "Welcome! Let's verify your email.",
                email: user.email,
                url: urlToken,
            });
        },
    },
    user: {
        changeEmail: {
            enabled: true,
            sendChangeEmailVerification: async ({ newEmail, token }) => {
                const callbackURL = "/profile";
                const urlToken =
                    baseUrl + "/api/auth/verify-email?token=" + token + "&callbackURL=" + baseUrl + callbackURL;

                // Send email template
                await SendEmail({
                    subject: "Hey! Let's verify your new email.",
                    email: newEmail,
                    url: urlToken,
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
            const userData = await SelectUser({ where: { id: user.id } });
            if (!userData) {
                throw new Error("User not found");
            }
            return {
                user: {
                    ...user,
                    role: userData.role,
                },
                session,
            };
        }),
        // twoFactor({ 
        //     twoFactorPage: "/two-factor" // the page to redirect if a user need to verify 2nd factor
        // }) // TODO: Add two factor authentication
    ],
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
