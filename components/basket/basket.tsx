"use client";

import ButtonClient from "@comps/client/button";
import { useHeaderStore } from "@comps/header/headerStore";
import ImageRatio from "@comps/server/imageRatio";
import Link from "@comps/ui/link";
import Modal from "@comps/ui/modal";
import { useSession } from "@lib/authClient";
import { combo } from "@lib/combo";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useBasketStore } from "./basketStore";
import { BasketItem as BasketItemType, Basket as BasketType } from "./basketType";
import { updateCookieExpiration } from "./zustandCookieStorage";
import QuantityManager from "@app/checkout/quatityManager";

export default function Basket() {
    const { data: session } = useSession();

    const { basketOpen, setBasketOpen } = useHeaderStore();
    const { basket, compare, clearBasket, syncServerBasket, syncLocalBasket } = useBasketStore();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [basketChoices, setBasketChoices] = useState<{
        serverBasket: BasketType;
        localBasket: BasketType;
    } | null>(null);

    // Compare and update basket if needed
    useEffect(() => {
        if (session) {
            Promise.resolve(compare()).then((data) => {
                if (data !== null) {
                    setIsModalOpen(true);
                    setBasketChoices(data);
                }
            });
            // Update basket cookie expiration to match session expiration
            updateCookieExpiration("basket-cookie", session.session.expiresAt);
        }
    }, [session, compare, syncServerBasket]);

    return (
        <>
            <div>
                <Modal
                    setIsModalOpen={setIsModalOpen}
                    isModalOpen={isModalOpen}
                    withCross={false}
                    className="rounded-3xl py-8"
                >
                    <div className="size-full space-y-6">
                        <div className="text-4xl font-bold">Mon panier</div>
                        <div className="text-sm text-gray-700">
                            Le panier de votre <span className="font-bold">navigateur</span> est différent de votre
                            panier <span className="font-bold">en ligne</span>.
                        </div>
                        <div className="text-lg font-bold">Avec lequel souhaitez-vous continuer ?</div>
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                            <BasketChoice
                                basket={basketChoices?.serverBasket}
                                onClick={() => {
                                    syncLocalBasket();
                                    setBasketChoices(null);
                                    setIsModalOpen(false);
                                }}
                            />
                            <BasketChoice
                                basket={basketChoices?.localBasket}
                                onClick={() => {
                                    syncServerBasket();
                                    setBasketChoices(null);
                                    setIsModalOpen(false);
                                }}
                            />
                        </div>
                    </div>
                </Modal>
            </div>
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
        </>
    );
}

type BasketItemProps = {
    product: BasketItemType;
};

const BasketItem = (props: BasketItemProps) => {
    const { product } = props;

    if (!product) return null;

    const { name, price, image } = product;

    return (
        <div className="flex w-full flex-row gap-4">
            <ImageRatio className="w-1/3 rounded" src={image} alt="Product" />
            <div className="text-left">
                <div className="text-lg font-bold">{name}</div>
                <QuantityManager product={product} />
                <div className="text-sm text-gray-500">{price}€</div>
            </div>
        </div>
    );
};

type BasketChoiceProps = {
    basket?: BasketType;
    className?: string;
    onClick: () => void;
};

const BasketChoice = (props: BasketChoiceProps) => {
    const { basket, className, onClick } = props;

    if (!basket) return null;

    return (
        <button
            type="button"
            onClick={onClick}
            className={combo(
                "flex flex-col gap-3",
                "rounded-xl border p-6",
                "shadow-sm hover:shadow-lg",
                "cursor-pointer",
                "scale-100 hover:scale-[1.02]",
                "transition-all duration-200",
                className,
            )}
        >
            <div>
                <div className="text-xs text-gray-500">Continer avec</div>
                <div className="text-xl font-bold">Panier en ligne</div>
            </div>
            <div>{basket?.items.length} produits</div>
            <div>
                {basket?.items.map((item, index) => (
                    <div key={index} className="flex flex-row items-baseline justify-between gap-2 text-nowrap">
                        <div>{item.name}</div>
                        <div className="text-sm text-gray-500">{item.quantity} pc(s)</div>
                    </div>
                ))}
            </div>
        </button>
    );
};
