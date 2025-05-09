import { StripeInstance } from "@lib/stripe";
import { GetBasket } from "@process/basket/GetBasket";
import AddressForm from "./adressForm";
import CheckoutButton from "./checkoutButton";
import PaymentForm from "./paymentForm";
import { totalPriceInCents } from "./totalPriceInCents";

export default async function CheckoutForm() {
    const serverBasket = await GetBasket();

    if (!serverBasket) {
        return null;
    }

    const totalPrice = totalPriceInCents(serverBasket);

    // Create PaymentIntent as soon as the page loads
    const { client_secret: clientSecret } = await StripeInstance.paymentIntents.create({
        amount: totalPrice,
        currency: "eur",
        payment_method_types: ["card"],
    });

    if (!clientSecret) {
        throw new Error("Something went wrong...");
    }

    return (
        <div className="w-full space-y-16 lg:mt-5">
            <div className="space-y-4">
                <div className="text-xl font-bold">Adresse de livraison</div>
                <hr className="w-full" />
                <AddressForm />
            </div>
            <div className="space-y-4">
                <div className="text-xl font-bold">Méthode de paiement</div>
                <hr className="w-full" />
                {/* WARNING: A key is provided to ensure a complete component re-rendering to enforce security */}
                <PaymentForm key={clientSecret} clientSecret={clientSecret} />
            </div>
            <CheckoutButton />
        </div>
    );
}
