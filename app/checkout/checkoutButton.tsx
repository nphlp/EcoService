"use client";

import { useBasketStore } from "@comps/basket/basketStore";
import Button from "@comps/ui/button";

export default function CheckoutButton() {
    const { basketProductList } = useBasketStore();

    const totalPrice = basketProductList.reduce((acc, product) => acc + product.price * product.quantity, 0);

    return (
        <div className="flex w-full flex-row items-end justify-between gap-4">
            <div>
                <div className="text-sm text-gray-500">Total</div>
                <div className="text-2xl font-bold">{totalPrice.toFixed(2)} €</div>
            </div>
            <Button label="Commander" className="px-12 text-lg" />
        </div>
    );
}
