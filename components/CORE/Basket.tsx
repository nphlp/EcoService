"use client";

import QuantityManager from "@app/checkout/components/quantityManager";
import { useHeaderStore } from "@comps/CORE/header/headerStore";
import Button from "@comps/UI/button/button";
import Link from "@comps/UI/button/link";
import ImageRatio from "@comps/UI/imageRatio";
import { combo } from "@lib/combo";
import { ShoppingCart } from "lucide-react";
import { motion } from "motion/react";
import { useBasketStore } from "./basket/basketStore";
import { LocalBasketItem } from "./basket/basketType";

export default function Basket() {
    const { basketOpen, setBasketOpen } = useHeaderStore();

    return (
        <div
            className={combo(
                "absolute z-50 flex size-full flex-row",
                basketOpen ? "pointer-events-auto" : "pointer-events-none",
            )}
        >
            <motion.div
                initial={{ opacity: 0 }}
                animate={{
                    opacity: basketOpen ? 0.4 : 0,
                }}
                transition={{ duration: 0.3 }}
                className="w-full bg-black"
            >
                <button type="button" onClick={() => setBasketOpen(false)} className="size-full"></button>
            </motion.div>
            <motion.div
                initial={{ width: 0 }}
                animate={{ width: basketOpen ? "400px" : 0 }}
                transition={{ duration: 0.3 }}
                className="bg-gray-100"
            >
                <div className="absolute top-0 h-3 w-full bg-gradient-to-b from-gray-300 to-transparent" />
                <BasketOverlay />
            </motion.div>
        </div>
    );
}

const BasketOverlay = () => {
    const { setBasketOpen } = useHeaderStore();
    const { basket, clearBothBasket } = useBasketStore();

    if (!basket?.items.length) {
        return (
            <div className="flex h-full w-[400px] flex-col items-center justify-center space-y-4 px-5 py-6">
                <ShoppingCart className="size-14 stroke-[1.8px]" />
                <div className="text-center">
                    <h3 className="text-primary text-xl font-semibold">Oh non...</h3>
                    <div className="text-center text-gray-500">Votre panier est vide.</div>
                </div>
            </div>
        );
    }

    return (
        <div className="w-[400px] space-y-4 px-5 py-6">
            <div className="space-y-1 text-center">
                <h3 className="text-primary w-full text-2xl font-bold">Mon Panier</h3>
                <div className="text-xs text-gray-500">
                    Vous avez {basket?.items.length} produits dans votre panier.
                </div>
            </div>

            {basket?.items.map((product, index) => (
                <BasketItem key={index} product={product} />
            ))}

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
                        className={{ button: "bg-transprent rounded-full px-8 py-1 font-semibold" }}
                        onClick={() => clearBothBasket()}
                    >
                        Vider le panier
                    </Button>
                </div>
            </div>
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
