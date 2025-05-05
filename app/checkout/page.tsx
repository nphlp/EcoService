import Link from "@comps/ui/link";
import { StripeInstance } from "@lib/stripe";
import { redirect } from "next/navigation";
import AddressForm from "./adressForm";
import BasketProductList from "./basketProductList";
import CheckoutButton from "./checkoutButton";
import PaymentForm from "./paymentForm";
import { getBasket } from "@lib/getBasket";

export default async function Page() {
    const basket = await getBasket();

    if (!basket) redirect("/auth?redirect=checkout");

    const totalPrice = basket.items.reduce((acc, product) => acc + product.price * product.quantity, 0) * 100;

    if (basket.items.length === 0) {
        return (
            <div className="flex min-h-full flex-col items-center justify-center">
                <div className="flex flex-col items-start space-y-6 px-5 py-18">
                    <h2 className="text-3xl font-bold">Panier</h2>
                    <p>Votre panier est vide pour le moment...</p>
                    <div className="flex w-full justify-center">
                        <Link label="Voir le catalogue" href="/catalog" />
                    </div>
                </div>
            </div>
        );
    }

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
