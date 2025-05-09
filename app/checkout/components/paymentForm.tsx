"use client";

import { Elements, PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { Appearance, loadStripe, StripePaymentElementOptions } from "@stripe/stripe-js";
import { FormEvent, useState } from "react";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

if (!BASE_URL) {
    throw new Error("BASE_URL is not defined");
}

const NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;

if (!NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY) {
    throw new Error("NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY is not defined");
}

// Make sure to call loadStripe outside of a component’s render to avoid
const stripePromise = loadStripe(NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

type PaymentFormProps = {
    clientSecret: string;
};

export default function PaymentForm(props: PaymentFormProps) {
    const { clientSecret } = props;

    const appearance: Appearance = {
        theme: "stripe",
    };

    return (
        <Elements stripe={stripePromise} options={{ appearance, clientSecret }}>
            <PaymentSelector />
        </Elements>
    );
}

export const PaymentSelector = () => {
    const stripe = useStripe();
    const elements = useElements();

    const [message, setMessage] = useState("");

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!stripe || !elements) return;

        const { error } = await stripe.confirmPayment({
            elements,
            confirmParams: {
                return_url: `${BASE_URL}/success`,
            },
        });

        if (error.type === "card_error" || error.type === "validation_error") {
            setMessage(error.message as string);
        } else {
            setMessage("Something went wrong...");
        }
    };

    const paymentElementOptions: StripePaymentElementOptions = {
        layout: "accordion",
    };

    return (
        <form id="payment-form" onSubmit={handleSubmit}>
            <PaymentElement id="payment-element" options={paymentElementOptions} />
            {message && <div id="payment-message">{message}</div>}
        </form>
    );
};
