"use client";

import QuantityManager from "@app/checkout/components/quantityManager";
import { useHeaderStore } from "@comps/CORE/header/headerStore";
import Button from "@comps/UI/button/button";
import Link from "@comps/UI/button/link";
import Drawer from "@comps/UI/drawer/drawer";
import ImageRatio from "@comps/UI/imageRatio";
import { PanelRightClose, ShoppingCart } from "lucide-react";
import { useBasketStore } from "./basket/basketStore";
import { LocalBasketItem } from "./basket/basketType";

export default function Basket() {
    const { basketOpen, setBasketOpen } = useHeaderStore();

    return (
        <Drawer isDrawerOpen={basketOpen} setIsDrawerOpen={setBasketOpen}>
            <BasketOverlay />
        </Drawer>
    );
}

const BasketOverlay = () => {
    const { setBasketOpen } = useHeaderStore();
    const { basket, clearBothBasket } = useBasketStore();

    if (!basket?.items.length) {
        return (
            <div className="flex h-full flex-col">
                <div className="flex flex-1 flex-col items-center justify-center space-y-4">
                    <ShoppingCart className="size-14 stroke-[1.8px]" />
                    <div className="text-center">
                        <h3 className="text-primary text-xl font-semibold">Oh non...</h3>
                        <div className="text-center text-gray-500">Votre panier est vide.</div>
                    </div>
                </div>
                {/* Close button (mobile only) */}
                <Button
                    type="button"
                    label="close-basket"
                    variant="default"
                    className={{ button: "w-full py-3 sm:hidden" }}
                    onClick={() => setBasketOpen(false)}
                >
                    <PanelRightClose size={20} />
                    Fermer
                </Button>
            </div>
        );
    }

    return (
        <div className="flex h-full flex-col">
            <div className="flex-1 space-y-6 overflow-y-auto">
                <div className="space-y-1 text-center">
                    <h3 className="text-primary w-full text-2xl font-bold">Mon Panier</h3>
                    <div className="text-xs text-gray-500">
                        Vous avez {basket?.items.length} produits dans votre panier.
                    </div>
                </div>

                <div className="space-y-4">
                    {basket?.items.map((product, index) => (
                        <BasketItem key={index} product={product} />
                    ))}
                </div>

                <div className="space-y-3">
                    <Link
                        label="paiement"
                        href="/checkout"
                        onClick={() => setBasketOpen(false)}
                        className="w-full scale-100 rounded-full py-2 font-semibold transition-transform duration-200 hover:scale-[1.02]"
                    >
                        Acheter maintenant !
                    </Link>
                    <div className="flex justify-center">
                        <Button
                            type="button"
                            label="paiement"
                            variant="ghost"
                            className={{
                                button: "rounded-full bg-transparent px-8 py-1 font-semibold hover:bg-gray-200",
                            }}
                            onClick={() => clearBothBasket()}
                        >
                            Vider le panier
                        </Button>
                    </div>
                </div>
            </div>

            {/* Close button (mobile only) */}
            <Button
                type="button"
                label="close-basket"
                variant="default"
                className={{ button: "mt-4 w-full py-3 sm:hidden" }}
                onClick={() => setBasketOpen(false)}
            >
                <PanelRightClose size={20} />
                Fermer
            </Button>
        </div>
    );
};

type BasketItemProps = {
    product: LocalBasketItem;
};

const BasketItem = (props: BasketItemProps) => {
    const { product } = props;

    if (!product) return null;

    const { name, price, image } = product;

    return (
        <div className="flex w-full flex-row gap-4">
            <ImageRatio className="w-1/3 rounded" src={image} alt="Product" mode="onPageLoad" />
            <div className="text-left">
                <div className="text-lg font-bold">{name}</div>
                <QuantityManager product={product} />
                <div className="text-sm text-gray-500">{price.toFixed(2)} €</div>
            </div>
        </div>
    );
};
