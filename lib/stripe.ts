import Stripe from "stripe";

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;

if (!stripeSecretKey) {
    throw new Error("STRIPE_SECRET_KEY is not set in environment variables");
}

/**
 * Stripe instance related to the API key in the environment variables
 */
export const StripeInstance = new Stripe(stripeSecretKey, {
    apiVersion: "2025-02-24.acacia",
    typescript: true,
    appInfo: {
        name: "EcoService Marketplace",
        version: "0.1.0",
    },
});
