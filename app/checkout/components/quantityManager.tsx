"use client";

import { useBasketStore } from "@comps/basket/basketStore";
import { BasketItem } from "@comps/basket/basketType";
import Button from "@comps/ui/button";
import { Minus, Plus, Trash } from "lucide-react";

type QuantityManagerProps = {
    product: BasketItem;
};

export default function QuantityManager(props: QuantityManagerProps) {
    const { product } = props;
    const { productId, quantity } = product;

    const { updateProductQuantity, removeProductFromBasket } = useBasketStore();

    const handleMinus = () => {
        if (quantity > 1) {
            updateProductQuantity(productId, quantity - 1);
        } else if (quantity === 1) {
            removeProductFromBasket(productId);
        }
    };

    const handlePlus = () => {
        updateProductQuantity(productId, quantity + 1);
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
