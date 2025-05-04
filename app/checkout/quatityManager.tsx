"use client";

import { useBasketStore } from "@comps/basket/basketStore";
import Button from "@comps/ui/button";
import { Minus, Plus } from "lucide-react";
import { BasketProduct } from "@comps/basket/basketStore";

type QuantityManagerProps = {
    product: BasketProduct;
};

export default function QuantityManager(props: QuantityManagerProps) {
    const { product } = props;

    const { updateProductQuantity } = useBasketStore();

    const handleMinus = () => {
        if (product.quantity > 1) {
            updateProductQuantity(product.id, product.quantity - 1);
        }
    };

    const handlePlus = () => {
        updateProductQuantity(product.id, product.quantity + 1);
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
                <Minus className="size-3" />
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
