"use client";

import { loadStripe } from "@stripe/stripe-js";
import { useState } from "react";

interface PaymentButtonProps {
    priceId: string;
    sellerId: string;
}

export default function PaymentButton({
    priceId,
    sellerId,
}: PaymentButtonProps) {
    const [loading, setLoading] = useState(false);

    const handlePayment = async () => {
        try {
            setLoading(true);

            const requestBody = {
                price: priceId,
                sellerId: sellerId,
            };

            console.log("Sending request with body:", requestBody);

            const response = await fetch("/api/checkout", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
                body: JSON.stringify(requestBody),
                cache: "no-store",
            });

            const responseText = await response.text();
            console.log("Raw response:", responseText);

            if (!response.ok) {
                throw new Error(responseText);
            }

            let data;
            try {
                data = JSON.parse(responseText);
            } catch (error) {
                console.error("Failed to parse response:", error);
                throw new Error("Invalid response format from server");
            }

            if (data.error) {
                throw new Error(data.error);
            }

            const stripe = await loadStripe(
                process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
            );
            if (!stripe) {
                throw new Error("Stripe failed to initialize");
            }

            const result = await stripe.redirectToCheckout({
                sessionId: data.sessionId,
            });

            if (result.error) {
                throw new Error(result.error.message);
            }
        } catch (error) {
            console.error("Payment error:", error);
            alert(
                error instanceof Error
                    ? error.message
                    : "Payment failed. Please try again."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <button type="button" onClick={handlePayment} disabled={loading}>
            {loading ? "Processing..." : "Purchase Now"}
        </button>
    );
}
