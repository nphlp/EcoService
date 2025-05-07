"use client";

import ButtonClient from "@comps/client/button";
import { useHeaderStore } from "@comps/header/headerStore";
import ImageRatio from "@comps/server/imageRatio";
import Button from "@comps/ui/button";
import Link from "@comps/ui/link";
import Modal from "@comps/ui/modal";
import { useSession } from "@lib/authClient";
import { combo } from "@lib/combo";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useBasketStore } from "./basketStore";
import { BasketItem as BasketItemType } from "./basketType";

export default function Basket() {
    const { data: session } = useSession();

    const { basketOpen, setBasketOpen } = useHeaderStore();
    const { basket, compare, clearBasket, syncServerBasket } = useBasketStore();

    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        if (session) {
            Promise.resolve(compare()).then(({ serverBasket, localBasket, isSame }) => {
                console.log("==== compare ====\n", serverBasket, localBasket, isSame);
            });
        }
    }, [session, compare, syncServerBasket]);

    return (
        <div
            className={combo(
                "absolute z-50 flex size-full flex-row",
                basketOpen ? "pointer-events-auto" : "pointer-events-none",
            )}
        >
            <Modal setIsModalOpen={setIsModalOpen} isModalOpen={isModalOpen} className="w-1/2" withCross={false}>
                <div>
                    <h1>Title</h1>
                    <p>Description</p>
                </div>
                <Button label="Close" onClick={() => setIsModalOpen(false)} />
            </Modal>
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
                        <h3 className="text-eco w-full text-2xl font-bold">Mon Panier</h3>
                        <div className="text-xs text-gray-500">
                            Vous avez {basket?.items.length} produits dans votre panier.
                        </div>
                    </div>

                    {basket?.items.map((product, index) => <BasketItem key={index} product={product} />)}

                    <div className="space-y-3">
                        <Link
                            type="button"
                            label="paiement"
                            href="/checkout"
                            onClick={() => setBasketOpen(false)}
                            className="w-full scale-100 rounded-full py-2 font-semibold transition-transform duration-200 hover:scale-[1.02]"
                        >
                            Acheter maintenant !
                        </Link>
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
    product: BasketItemType;
};

const BasketItem = (props: BasketItemProps) => {
    const { product } = props;

    if (!product) return null;

    const { name, price, image, quantity } = product;

    return (
        <div className="flex w-full flex-row gap-4">
            <ImageRatio className="w-1/3 rounded" src={image} alt="Product" />
            <div className="text-left">
                <div className="text-lg font-bold">{name}</div>
                <div className="text-sm text-gray-500">{quantity} pc(s)</div>
                <div className="text-sm text-gray-500">{price}€</div>
            </div>
        </div>
    );
};
