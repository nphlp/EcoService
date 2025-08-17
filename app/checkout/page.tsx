import CheckoutGenerator from "@app/checkout/components/checkoutGenerator";
import CheckoutProductList from "@app/checkout/components/checkoutProductList";
import { LocalBasket, localBasketSchema } from "@comps/basket/basketType";
import Link from "@comps/ui/link";
import { GetSession } from "@lib/authServer";
import { getZustandCookie } from "@lib/zustandServer";

export default async function Page() {
    const session = await GetSession();

    const localBasket = await getZustandCookie<LocalBasket>("basket-cookie", localBasketSchema, "basket");

    if (!localBasket?.items.length) {
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
                <div className="space-y-6">
                    <div className="w-full space-y-6">
                        <h2 className="text-4xl font-bold">Votre panier</h2>
                        <hr className="w-full" />
                        <CheckoutProductList />
                    </div>
                    {session ? (
                        <CheckoutGenerator />
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
