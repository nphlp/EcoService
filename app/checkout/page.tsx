import Link from "@comps/ui/link";
import { getBasket } from "@lib/getBasket";
import { getZustandCookie } from "@comps/basket/zustandServer";
import { Basket, BasketSchema } from "@comps/basket/basketType";
import { GetSession } from "@lib/authServer";
import CheckoutForm from "./checkoutForm";
import BasketProductList from "./basketProductList";
import { totalPriceInCents } from "./totalPriceInCents";

export default async function Page() {
    const session = await GetSession();

    const basketApi = await getBasket();
    const basketCookie = await getZustandCookie<Basket>("basket-cookie", BasketSchema, "basket");

    const basket = basketApi || basketCookie;

    console.log("basketApi", basketApi);
    console.log("basketCookie", basketCookie);
    console.log("basket", basket);

    if (!basket?.items.length) {
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

    return (
        <div className="flex min-h-full flex-col items-center justify-center">
            <div className="flex flex-col items-start px-5 py-18">
                <div className="flex flex-col gap-6 lg:flex-row lg:gap-15">
                    <div className="w-full space-y-6">
                        <h2 className="text-4xl font-bold">Votre panier</h2>
                        <hr className="w-full" />
                        <BasketProductList />
                    </div>
                    {session ? (
                        <CheckoutForm totalPriceInCents={totalPriceInCents(basket)} />
                    ) : (
                        <div className="w-full space-y-6">
                            <hr className="w-full" />
                            <div className="flex flex-row items-center justify-between">
                                <div className="text-2xl">
                                    <span>Passer à </span>
                                    <span className="font-bold">l&apos;encaissement ?</span>
                                </div>
                                <Link label="Se connecter" href="/auth?redirect=checkout" />
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
