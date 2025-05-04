import AddressForm from "./adressForm";
import BasketProductList from "./basketProductList";
import PaymentForm from "./paymentForm";
import CheckoutButton from "./checkoutButton";
import { StripeInstance } from "@lib/stripe";

export default async function Page() {
    const calculateOrderAmount = () => {
        // TODO: make this dynamic
        return 1400;
    };

    // Create PaymentIntent as soon as the page loads
    const { client_secret: clientSecret } = await StripeInstance.paymentIntents.create({
        amount: calculateOrderAmount(),
        currency: "eur",
        payment_method_types: ["card"],
    });

    if (!clientSecret) {
        throw new Error("Something went wrong...");
    }

    return (
        <div className="flex min-h-full flex-col items-center justify-center">
            <div className="flex flex-col items-start px-5 py-18">
                <div className="flex flex-col gap-6 lg:flex-row lg:gap-15">
                    <div className="w-full space-y-6">
                        <h2 className="text-4xl font-bold">Votre panier</h2>
                        <hr className="w-full" />
                        <BasketProductList />
                    </div>
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
                </div>
            </div>
        </div>
    );
}
