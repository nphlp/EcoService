import { OrderUpdateAction } from "@actions/OrderAction";
import { ProductUpsertAction } from "@actions/ProductAction";
import { StripeInstance } from "@lib/stripe";
import { StripeError } from "@stripe/stripe-js";
import { ResponseFormat } from "@utils/FetchConfig";
import { FetchV3 } from "@utils/FetchV3/FetchV3";
import { StringToSlug } from "@utils/StringToSlug";
import { revalidateTag } from "next/cache";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import Stripe from "stripe";

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
                break;

            case "charge.dispute.created":
                break;

            case "checkout.session.completed":
                break;

            case "file.created":
                break;

            case "payment_intent.payment_failed":
                break;

            case "payment_intent.succeeded":
                await updateOrderStatus(event.data.object as Stripe.PaymentIntent);
                break;

            case "payout.failed":
                break;

            case "payout.paid":
                break;

            case "product.created":
                await productUpsert(event.data.object as Stripe.Product);
                break;

            case "product.updated":
                await productUpsert(event.data.object as Stripe.Product);
                break;

            // Add other event handlers as needed
        }

        return NextResponse.json({ data: true }, { status: 200 });
    } catch (error) {
        // TODO: add logging
        // TODO: add replay when webhook actions fail
        console.error("Webhook error:", (error as StripeError).message);
        return NextResponse.json({ error: "Webhook handler failed" }, { status: 400 });
    }
}

const updateOrderStatus = async (paymentIntent: Stripe.PaymentIntent) => {
    const { metadata } = paymentIntent;

    const { orderId } = metadata;

    await OrderUpdateAction({
        where: { id: orderId },
        data: {
            orderStatus: "ACCEPTED",
            paymentStatus: "ACCEPTED",
        },
    });
};

const productUpsert = async (product: Stripe.Product) => {
    const defaultPrice = product.default_price as string | undefined;

    const productPrice = defaultPrice
        ? await FetchV3({
              route: "/stripe/prices/select",
              params: { id: defaultPrice },
          })
        : undefined;

    const { id, name, description, images, metadata } = product;
    const { vendorId, categoryId } = metadata;

    const image = images[0];
    const price = productPrice?.unit_amount ?? undefined;

    await ProductUpsertAction({
        where: { id: product.id },
        create: {
            id,
            name,
            slug: StringToSlug(name),
            description: description ?? "",
            image,
            price: price ?? 0,
            stock: 0,
            vendorId,
            categoryId,
        },
        update: {
            ...(name && { name }),
            ...(description && { description }),
            ...(image && { image }),
            ...(price && { price }),
            // ...(stock && { stock }),
            ...(vendorId && { vendorId }),
            ...(categoryId && { categoryId }),
        },
    });

    // Revalidate the product cache
    revalidateTag("product");
};
