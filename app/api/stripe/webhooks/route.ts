import { StripeInstance } from "@lib/stripe";
import { StripeError } from "@stripe/stripe-js";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { ResponseFormat } from "@utils/FetchConfig";

const STRIPE_WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET;

if (!STRIPE_WEBHOOK_SECRET) {
    throw new Error("STRIPE_WEBHOOK_SECRET environment variable is not defined");
}

export type StripeWebhookResponse = boolean;

/**
 * Route for handling Stripe webhooks
 * @param request - The request object
 * @returns A JSON response indicating the webhook was received
 */
export async function POST(request: Request): Promise<NextResponse<ResponseFormat<StripeWebhookResponse>>> {
    try {
        // Get the body of the request
        const body = await request.text();

        // Get the signature of the request
        const headersAwaited = await headers();
        const signature = headersAwaited.get("stripe-signature");

        // If the signature or the secret is not provided, return an error
        if (!signature) {
            return NextResponse.json({ error: "No signature or secret provided" }, { status: 400 });
        }

        // Construct the event
        const event = StripeInstance.webhooks.constructEvent(body, signature, STRIPE_WEBHOOK_SECRET as string);

        // Log the event
        console.log("=============>> EVENT\n", event.type);

        // Manage the event
        switch (event.type) {
            case "account.updated":
                // const account = event.data.object;
                // if (account.details_submitted && account.charges_enabled) {
                // await PrismaInstance.user.update({
                //     where: { stripeConnectId: account.id },
                //     data: {
                //         isOnboarded: true,
                //         isSeller: true,
                //     },
                // });
                // console.log("RSeller onboarding completed:", account.id);
                // }
                console.log("Account updated");
                break;

            case "charge.dispute.created":
                console.log("Charge dispute created");
                break;

            case "checkout.session.completed":
                console.log("Checkout completed");
                break;

            case "file.created":
                console.log("file.created");
                break;

            case "payment_intent.payment_failed":
                console.log("payment_intent.payment_failed");
                break;

            case "payment_intent.succeeded":
                console.log("payment_intent.succeeded");
                break;

            case "payout.failed":
                console.log("payout.failed");
                break;

            case "payout.paid":
                console.log("payout.paid");
                break;

            case "product.created":
                console.log("product.created");
                // TODO: revalidate products cache
                break;

            case "product.updated":
                console.log("product.updated");
                // TODO: revalidate products cache
                break;

            // Add other event handlers as needed
        }

        return NextResponse.json({ data: true }, { status: 200 });
    } catch (error) {
        console.error("Webhook error:", (error as StripeError).message);
        return NextResponse.json({ error: "Webhook handler failed" }, { status: 400 });
    }
}
