"use client";

import Modal from "@comps/ui/modal";
import { useSession } from "@lib/authClient";
import { combo } from "@lib/combo";
import { useEffect, useState } from "react";
import { updateCookieExpiration } from "../../lib/zustandCookieStorage";
import { useBasketStore } from "./basketStore";
import { LocalBasket, ServerBasket } from "./basketType";

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
            Promise.resolve(compareAndSyncBasket()).then((data) => {
                if (data !== null) {
                    setIsModalOpen(true);
                    setBasketChoices(data);
                }
            });
            // Update basket cookie expiration to match session expiration
            updateCookieExpiration("basket-cookie", session.session.expiresAt);
        }
    }, [session, compareAndSyncBasket, syncServerBasket]);

    return (
        <Modal setIsModalOpen={setIsModalOpen} isModalOpen={isModalOpen} withCross={false} className="rounded-3xl py-8">
            <div className="size-full space-y-6 text-center">
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
                            aboveTitle="Continuer avec le"
                            title="Panier actuel"
                            basket={basketChoices.localBasket}
                            onClick={() => {
                                syncServerBasket(basketChoices.serverBasket.orderId);
                                setBasketChoices(null);
                                setIsModalOpen(false);
                            }}
                        />
                        <BasketChoice
                            aboveTitle="Récupérer le"
                            title="Panier en ligne"
                            basket={basketChoices.serverBasket}
                            onClick={() => {
                                syncLocalBasket(basketChoices.serverBasket.orderId);
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
    aboveTitle: string;
    title: string;
    basket?: LocalBasket;
    className?: string;
    onClick: () => void;
};

const BasketChoice = (props: BasketChoiceProps) => {
    const { aboveTitle, title, basket, className, onClick } = props;

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
                <div className="text-xs text-gray-500">{aboveTitle}</div>
                <div className="text-xl font-bold">{title}</div>
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
