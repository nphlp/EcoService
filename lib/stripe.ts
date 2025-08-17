import Stripe from "stripe";

const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY;

if (!STRIPE_SECRET_KEY) {
    throw new Error("STRIPE_SECRET_KEY environment variable is not defined");
}

/**
 * Stripe instance related to the API key in the environment variables
 */
export const StripeInstance = new Stripe(STRIPE_SECRET_KEY, {
    apiVersion: "2025-06-30.basil",
    typescript: true,
    appInfo: {
        name: "EcoService Marketplace",
        version: "0.1.0",
    },
});
