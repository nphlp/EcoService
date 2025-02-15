import { GetSession } from "@lib/auth";
import { stripe } from "@lib/stripe";
import { StripeError } from "@stripe/stripe-js";
import { NextResponse } from "next/server";
import PrismaInstance from "@lib/prisma";

export async function POST(request: Request) {
    try {
        console.log("Starting onboarding process...");

        const session = await GetSession();
        if (!session?.user.id || !session?.user.email) {
            console.log("Session validation failed:", session);
            return NextResponse.json(
                {
                    error: "Unauthorized - Please log in again",
                    details: "Invalid session data",
                },
                { status: 401 }
            );
        }

        console.log("Session validated for user:", session.user.email);

        // Check if user exists in database
        const user = await PrismaInstance.user.findUnique({
            where: { id: session.user.id },
        });

        if (!user) {
            console.log("User not found in database:", session.user.id);
            return NextResponse.json(
                {
                    error: "User not found",
                    details: "User does not exist in database",
                },
                { status: 404 }
            );
        }

        console.log("User found:", user.id);
        let stripeAccountId = user.stripeConnectId;

        // If user doesn't have a Connect account, create one
        if (!stripeAccountId) {
            try {
                console.log("Creating new Stripe Connect account...");
                const account = await stripe.accounts.create({
                    type: "express",
                    country: "FR",
                    email: session.user.email,
                    capabilities: {
                        card_payments: { requested: true },
                        transfers: { requested: true },
                    },
                    business_type: "individual",
                    metadata: {
                        userId: session.user.id,
                    },
                    tos_acceptance: {
                        date: Math.floor(Date.now() / 1000),
                        ip:
                            request.headers.get("x-forwarded-for") ||
                            request.headers.get("x-real-ip") ||
                            "127.0.0.1",
                    },
                });

                stripeAccountId = account.id;
                console.log("Stripe Connect account created:", account.id);

                // Update user with the new Connect account ID
                await PrismaInstance.user.update({
                    where: { id: session.user.id },
                    data: { stripeConnectId: account.id },
                });
                console.log("User updated with Connect account ID");
            } catch (error) {
                console.error("Stripe account creation error:", error);
                console.error("Error details:", {
                    type: (error as StripeError).type,
                    message: (error as StripeError).message,
                    code: (error as StripeError).code,
                    requestId: (error as StripeError).requestId,
                });
                
                if ((error as StripeError).type === "invalid_request_error") {
                    return NextResponse.json(
                        {
                            error: "Le service est temporairement indisponible",
                            details:
                                process.env.NODE_ENV === "development"
                                    ? (error as StripeError).message
                                    : undefined,
                        },
                        { status: 503 }
                    );
                }
                throw error;
            }
        }

        console.log("Creating account onboarding link...");
        // Create account onboarding link
        const accountLinks = await stripe.accountLinks.create({
            account: stripeAccountId,
            refresh_url: `${process.env.NEXT_PUBLIC_APP_URL}/seller/onboard`,
            return_url: `${process.env.NEXT_PUBLIC_APP_URL}/seller/dashboard`,
            type: "account_onboarding",
            collect: "eventually_due",
        });

        console.log("Account link created successfully");
        return NextResponse.json({ url: accountLinks.url });
    } catch (error) {
        console.error("Onboarding error:", error);
        console.error("Full error details:", {
            type: (error as StripeError).type,
            message: (error as StripeError).message,
            code: (error as StripeError).code,
            requestId: (error as StripeError).requestId,
        });

        return NextResponse.json(
            {
                error: (error as Error).message || "Error creating Connect account",
                details:
                    process.env.NODE_ENV === "development" ? error : undefined,
            },
            { status: 500 }
        );
    }
}
