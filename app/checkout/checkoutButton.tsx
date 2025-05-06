"use client";

import { useBasketStore } from "@comps/basket/basketStore";
import Button from "@comps/ui/button";
import { totalPriceInCents } from "./totalPriceInCents";

export default function CheckoutButton() {
    const { basket } = useBasketStore();

    if (!basket) return null;

    const totalPrice = totalPriceInCents(basket) / 100;
    const units = totalPrice?.toString().split(".")[0];
    const cents = totalPrice?.toString().split(".")[1];

    return (
        <div className="flex w-full flex-row items-end justify-between gap-4">
            <div>
                <div className="text-sm text-gray-500">Total TTC</div>
                <div className="flex flex-row items-baseline font-bold text-gray-800">
                    <div className="text-2xl">{units}</div>
                    <div className="text-base">.{cents} €</div>
                </div>
            </div>
            <Button label="Commander" className="px-12 text-lg" />
        </div>
    );
}
