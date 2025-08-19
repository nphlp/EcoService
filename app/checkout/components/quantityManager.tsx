"use client";

import { useBasketStore } from "@comps/CORE/basket/basketStore";
import { LocalBasketItem } from "@comps/CORE/basket/basketType";
import Button from "@comps/UI/button";
import { Minus, Plus, Trash } from "lucide-react";

type QuantityManagerProps = {
    product: LocalBasketItem;
};

export default function QuantityManager(props: QuantityManagerProps) {
    const { product } = props;
    const { productId, quantity } = product;

    const { updateProductInBasket, removeProductFromBasket } = useBasketStore();

    const handleMinus = () => {
        if (quantity > 1) {
            updateProductInBasket(productId, quantity - 1);
        } else if (quantity === 1) {
            removeProductFromBasket(productId);
        }
    };

    const handlePlus = () => {
        updateProductInBasket(productId, quantity + 1);
    };

    return (
        <div className="flex flex-row items-center gap-2">
            <Button
                label="Minus"
                variant="outline"
                baseStyleOnly={["flex", "rounded"]}
                className="p-0.5"
                onClick={handleMinus}
            >
                {quantity > 1 ? <Minus className="size-3" /> : <Trash className="size-3" />}
            </Button>
            <div>{product.quantity} pc(s)</div>
            <Button
                label="Plus"
                variant="outline"
                baseStyleOnly={["flex", "rounded"]}
                className="p-0.5"
                onClick={handlePlus}
            >
                <Plus className="size-3" />
            </Button>
        </div>
    );
}
