"use client";

import { ProductSearchType } from "@app/catalog/components/fetchParams";
import Button from "@comps/ui/button";
import { CircleCheck, CirclePlus, CircleX, ShoppingCart } from "lucide-react";
import { useBasketStore } from "./basket/basketStore";

type AddToCartIconProps = {
    product: ProductSearchType;
};

export default function AddToCartIcon(props: AddToCartIconProps) {
    const { product } = props;

    const { isInBasket, addProductToBasket, removeProductFromBasket } = useBasketStore();

    const handleClick = async () => {
        if (isInBasket(product.id)) {
            removeProductFromBasket(product.id);
        } else {
            addProductToBasket({
                productId: product.id,
                name: product.name,
                description: product.description,
                price: product.price,
                image: product.image,
            });
        }
    };

    return (
        <Button
            type="button"
            label="add-to-basket"
            onClick={handleClick}
            baseStyleOnly={["outline"]}
            className="group relative size-fit rounded-xl p-[10px] transition-all duration-300 hover:scale-105"
        >
            {isInBasket(product.id) ? (
                <>
                    <CircleCheck className="group-hover:hidden" />
                    <CircleX className="hidden group-hover:block" />
                </>
            ) : (
                <>
                    <CirclePlus className="absolute translate-x-[45%] translate-y-[-35%] scale-[0.8] fill-white stroke-black stroke-[3px]" />
                    <ShoppingCart />
                </>
            )}
        </Button>
    );
}
