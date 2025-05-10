"use client";

import { useBasketStore } from "@comps/basket/basketStore";
import Button from "@comps/ui/button";
import { Elements, PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { Appearance, loadStripe, StripePaymentElementOptions } from "@stripe/stripe-js";
import { FormEvent, useState } from "react";
import AddressForm from "./adressForm";
import { totalPriceInCents } from "./totalPriceInCents";

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

type CheckoutProviderProps = {
    clientSecret: string;
};

export default function CheckoutProvider(props: CheckoutProviderProps) {
    const { clientSecret } = props;

    const appearance: Appearance = {
        theme: "stripe",
    };

    return (
        <Elements stripe={stripePromise} options={{ appearance, clientSecret }}>
            <CheckoutForm />
        </Elements>
    );
}

const CheckoutForm = () => {
    const paymentElementOptions: StripePaymentElementOptions = {
        layout: "accordion",
    };

    const stripe = useStripe();
    const elements = useElements();

    const [message, setMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);

        if (!stripe || !elements) return;

        const { error } = await stripe.confirmPayment({
            elements,
            confirmParams: {
                return_url: `${BASE_URL}/checkout/success`,
            },
        });

        if (error.type === "card_error" || error.type === "validation_error") {
            setMessage(error.message as string);
        } else {
            setMessage("Something went wrong...");
        }

        setIsLoading(false);
    };

    return (
        <form id="payment-form" onSubmit={handleSubmit} className="w-full space-y-16 lg:mt-5">
            <div className="space-y-4">
                <div className="text-xl font-bold">Adresse de livraison</div>
                <hr className="w-full" />
                <AddressForm />
            </div>
            <div className="space-y-4">
                <div className="text-xl font-bold">Méthode de paiement</div>
                <hr className="w-full" />
                <PaymentElement id="payment-element" options={paymentElementOptions} />
                {message && <div id="payment-message">{message}</div>}
            </div>
            <CheckoutButton isLoading={isLoading} />
        </form>
    );
};

type CheckoutButtonProps = {
    isLoading: boolean;
};

const CheckoutButton = (props: CheckoutButtonProps) => {
    const { isLoading } = props;

    const { basket } = useBasketStore();

    if (!basket) return null;

    const totalPrice = totalPriceInCents(basket) / 100;
    const units = totalPrice?.toString().split(".")[0];
    const cents = totalPrice?.toString().split(".")[1];

    return (
        <div className="flex w-full flex-row items-end justify-between gap-4">
            <div>
                <div className="text-sm text-gray-500">Total TTC</div>
                <div className="flex flex-row items-baseline font-bold text-gray-800">
                    <div className="text-2xl">{units}</div>
                    <div className="text-base">.{cents} €</div>
                </div>
            </div>
            <Button id="submit" type="submit" label="Commander" className="px-12 text-lg" isLoading={isLoading} />
        </div>
    );
};
