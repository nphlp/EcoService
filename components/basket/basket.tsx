"use client";

import ButtonClient from "@comps/client/button";
import { useHeaderStore } from "@comps/header/headerStore";
import ImageRatio from "@comps/server/imageRatio";
import { combo } from "@lib/combo";
import { useFetchV2 } from "@utils/FetchHookV2";
import { motion } from "framer-motion";
import { useBasketStore } from "./basketStore";

export default function Basket() {
    const { basketOpen, setBasketOpen } = useHeaderStore();
    const { basketProductList, clearBasket } = useBasketStore();

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
                <div className="w-[400px] space-y-4 px-5 py-6">
                    <div>
                        <h3 className="text-primary w-full text-2xl font-bold">Mon Panier</h3>
                        <div className="text-xs text-gray-500">
                            Vous avez {basketProductList.length} produits dans votre panier.
                        </div>
                    </div>

                    {basketProductList.map((productId, index) => (
                        <BasketItem key={index} productId={productId} />
                    ))}

                    <div className="space-y-3">
                        <ButtonClient
                            type="button"
                            label="paiement"
                            className="w-full scale-100 rounded-full py-2 font-semibold transition-transform duration-200 hover:scale-[1.02]"
                        >
                            Acheter maintenant !
                        </ButtonClient>
                        <div className="flex justify-center">
                            <ButtonClient
                                type="button"
                                label="paiement"
                                variant="ghost"
                                className="rounded-full px-8 py-1 font-semibold"
                                onClick={() => clearBasket()}
                            >
                                Vider le panier
                            </ButtonClient>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}

type BasketItemProps = {
    productId: string;
};

const BasketItem = (props: BasketItemProps) => {
    const { productId } = props;

    const { data: product } = useFetchV2({
        route: "/product/unique",
        params: {
            where: { id: productId },
        },
    });

    if (!product) return null;

    const { name, price, image } = product;

    return (
        <div className="flex w-full flex-row gap-4">
            <ImageRatio className="w-1/3 rounded" src={image} alt="Product" />
            <div className="text-left">
                <h4 className="text-lg font-bold">{name}</h4>
                <p className="text-sm text-gray-500">{price}€</p>
            </div>
        </div>
    );
};
