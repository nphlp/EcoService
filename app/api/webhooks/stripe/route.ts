import { stripe } from "@lib/stripe";
import prisma from "@lib/prisma";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    const body = await request.text();

    // const signature = headers().get("stripe-signature");
    const headersAwaited = await headers();
    const signature = headersAwaited.get("stripe-signature");

    if (!signature) {
        return NextResponse.json(
            { error: "No signature provided" },
            { status: 400 }
        );
    }

    try {
        const event = stripe.webhooks.constructEvent(
            body,
            signature,
            process.env.STRIPE_WEBHOOK_SECRET!
        );

        console.log("Webhook event received:", event.type);

        switch (event.type) {
            case "account.updated":
                const account = event.data.object;
                if (account.details_submitted && account.charges_enabled) {
                    await prisma.user.updateMany({
                        where: { stripeConnectId: account.id },
                        data: {
                            isOnboarded: true,
                            isSeller: true,
                        },
                    });
                    console.log("Seller onboarding completed:", account.id);
                }
                break;

            case "checkout.session.completed":
                // Handle successful checkout
                console.log("Checkout completed");
                break;

            // Add other event handlers as needed
        }

        return NextResponse.json({ received: true });
    } catch (error) {
        console.error("Webhook error:", error);
        return NextResponse.json(
            { error: "Webhook handler failed" },
            { status: 400 }
        );
    }
}
