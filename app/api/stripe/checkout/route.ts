import { GetSession } from "@lib/auth";
import PrismaInstance from "@lib/prisma";
import { NextResponse } from "next/server";
import { StripeInstance } from "@lib/stripe";

export async function POST(request: Request) {
    try {
        console.log("Received checkout request");

        const session = await GetSession();
        if (!session) {
            console.log("No session found");
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }
        console.log("Session found:", session.user.email);

        let body;
        try {
            const text = await request.text();
            console.log("Raw request body:", text);
            body = JSON.parse(text);
            console.log("Parsed request body:", body);
        } catch (error) {
            console.error("Error parsing request body:", error);
            return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
        }

        if (!body || !body.price || !body.sellerId) {
            console.log("Missing required fields in body:", body);
            return NextResponse.json({ error: "Missing required fields: price and sellerId" }, { status: 400 });
        }

        const { price, sellerId } = body;

        console.log("Looking up seller:", sellerId);
        const seller = await PrismaInstance.user.findUnique({
            where: { id: sellerId },
        });

        if (!seller?.stripeConnectId) {
            console.log("Invalid seller or missing stripeConnectId:", seller);
            return NextResponse.json({ error: "Invalid seller" }, { status: 400 });
        }
        console.log("Found seller with stripeConnectId");

        console.log("Creating Stripe checkout session");
        const stripeSession = await StripeInstance.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: [
                {
                    price: price,
                    quantity: 1,
                },
            ],
            mode: "payment",
            success_url: `${process.env.BASE_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${process.env.BASE_URL}`,
            customer_email: session.user.email,
            payment_intent_data: {
                application_fee_amount: 123,
                transfer_data: {
                    destination: seller.stripeConnectId,
                },
            },
        });
        console.log("Created Stripe session:", stripeSession.id);

        return NextResponse.json({ sessionId: stripeSession.id });
    } catch (error) {
        console.error("Checkout error:", error);
        return NextResponse.json(
            { error: (error as Error).message || "Error creating checkout session" },
            { status: 500 },
        );
    }
}
