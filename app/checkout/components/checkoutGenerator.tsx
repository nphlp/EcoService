import { StripeInstance } from "@lib/stripe";
import { GetOrCreateBasket } from "@process/basket/GetOrCreateBasket";
import CheckoutProvider from "./checkoutForm";
import { totalPriceInCents } from "./totalPriceInCents";

export default async function CheckoutGenerator() {
    const serverBasket = await GetOrCreateBasket();

    if (!serverBasket) {
        return null;
    }

    const totalPrice = totalPriceInCents(serverBasket);

    // Create PaymentIntent as soon as the page loads
    const { client_secret: clientSecret } = await StripeInstance.paymentIntents.create({
        amount: totalPrice,
        currency: "eur",
        payment_method_types: ["card"],
        metadata: {
            orderId: serverBasket.orderId,
        },
    });

    if (!clientSecret) {
        throw new Error("Something went wrong...");
    }

    // WARNING: A key is provided to ensure a complete component re-rendering to enforce security
    return <CheckoutProvider key={clientSecret} clientSecret={clientSecret} />;
}
