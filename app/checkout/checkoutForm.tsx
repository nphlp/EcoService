import { StripeInstance } from "@lib/stripe";
import AddressForm from "./adressForm";
import CheckoutButton from "./checkoutButton";
import PaymentForm from "./paymentForm";

type CheckoutFormProps = {
    totalPriceInCents: number;
};

export default async function CheckoutForm(props: CheckoutFormProps) {
    const { totalPriceInCents } = props;

    // Create PaymentIntent as soon as the page loads
    const { client_secret: clientSecret } = await StripeInstance.paymentIntents.create({
        amount: totalPriceInCents,
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
                <PaymentForm clientSecret={clientSecret} />
            </div>
            <CheckoutButton />
        </div>
    );
}
