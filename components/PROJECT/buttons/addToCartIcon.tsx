"use client";

import { ProductSearchType } from "@app/catalog/components/fetchParams";
import { useBasketStore } from "@comps/CORE/basket/basketStore";
import Button from "@comps/UI/button/button";
import { CircleCheck, CirclePlus, CircleX, ShoppingCart } from "lucide-react";
import { RefObject } from "react";

type AddToCartIconProps = {
    product: ProductSearchType;
    ref?: RefObject<HTMLButtonElement | null>;
};

export default function AddToCartIcon(props: AddToCartIconProps) {
    const { product, ref } = props;

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
            ref={ref}
            className={{
                button: "group relative size-fit rounded-xl p-2.5 transition-all duration-300 hover:scale-105",
            }}
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
