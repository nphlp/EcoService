"use client";

import { useBasketStore } from "@comps/basket/basketStore";
import { LocalBasketItem } from "@comps/basket/basketType";
import ImageRatio from "@comps/ui/imageRatio";
import { combo } from "@lib/combo";
import QuantityManager from "./quantityManager";

export default function CheckoutProductList() {
    const { basket } = useBasketStore();

    return (
        <div className="flex w-[600px] flex-col gap-4">
            {basket?.items.map((product, index) => (
                <CheckoutProductItem key={index} index={index} product={product} />
            ))}
        </div>
    );
}

type CheckoutProductProps = {
    index: number;
    product: LocalBasketItem;
};

const CheckoutProductItem = (props: CheckoutProductProps) => {
    const { index, product } = props;

    const totalPrice = Number((product.price * product.quantity).toFixed(2));

    return (
        <div
            className={combo(
                "flex flex-row items-start justify-between gap-8 rounded-xl",
                index % 2 === 0 && "bg-gray-50",
            )}
        >
            <ImageRatio src={product.image} alt={product.name} className="w-1/3 rounded-lg" priority />
            <div className="flex w-2/3 flex-col items-end gap-2 py-2 pr-4">
                <div className="text-right">
                    <div className="text-2xl font-semibold">{product.name}</div>
                    <div className="line-clamp-2 text-xs text-gray-500">{product.description}</div>
                </div>
                <div className="flex flex-row items-center gap-4">
                    <QuantityManager product={product} />
                    <div className="text-sm text-gray-500">x</div>
                    <div>{product.price.toFixed(2)} €</div>
                </div>
                <div className="flex flex-row items-baseline gap-2">
                    <div className="text-2xs text-gray-500">TTC</div>
                    <div className="text-lg font-semibold text-gray-800">{totalPrice.toFixed(2)} €</div>
                </div>
            </div>
        </div>
    );
};
