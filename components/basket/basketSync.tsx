"use client";

import Modal from "@comps/ui/modal";
import { useSession } from "@lib/authClient";
import { useEffect, useState } from "react";
import { useBasketStore } from "./basketStore";
import { LocalBasket, ServerBasket } from "./basketType";
import { updateCookieExpiration } from "./zustandCookieStorage";
import { combo } from "@lib/combo";

export default function BasketSync() {
    const { data: session } = useSession();

    const { compareAndSyncBasket, syncServerBasket, syncLocalBasket } = useBasketStore();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [basketChoices, setBasketChoices] = useState<{
        serverBasket: ServerBasket;
        localBasket: LocalBasket;
    } | null>(null);

    // Compare and update basket if needed
    useEffect(() => {
        if (session) {
            console.log("==> Compare and sync basket");

            Promise.resolve(compareAndSyncBasket()).then((data) => {
                if (data !== null) {
                    setIsModalOpen(true);
                    setBasketChoices(data);
                    console.log("==> Basket choices\n", data);
                }
            });
            // Update basket cookie expiration to match session expiration
            updateCookieExpiration("basket-cookie", session.session.expiresAt);
        }
    }, [session, compareAndSyncBasket, syncServerBasket]);

    return (
        <Modal setIsModalOpen={setIsModalOpen} isModalOpen={isModalOpen} withCross={false} className="rounded-3xl py-8">
            <div className="size-full space-y-6">
                <div className="text-4xl font-bold">Mon panier</div>
                <div className="text-sm text-gray-700">
                    <span>Le panier de votre </span>
                    <span className="font-bold">navigateur</span>
                    <span> est différent de votre panier </span>
                    <span className="font-bold">en ligne</span>.
                </div>
                <div className="text-lg font-bold">Avec lequel souhaitez-vous continuer ?</div>
                {basketChoices ? (
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                        <BasketChoice
                            basket={basketChoices.serverBasket}
                            onClick={() => {
                                syncLocalBasket(basketChoices.serverBasket.orderId);
                                setBasketChoices(null);
                                setIsModalOpen(false);
                            }}
                        />
                        <BasketChoice
                            basket={basketChoices.localBasket}
                            onClick={() => {
                                syncServerBasket(basketChoices.serverBasket.orderId);
                                setBasketChoices(null);
                                setIsModalOpen(false);
                            }}
                        />
                    </div>
                ) : null}
            </div>
        </Modal>
    );
}

type BasketChoiceProps = {
    basket?: LocalBasket;
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
