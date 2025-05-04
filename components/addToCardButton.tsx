"use client";

import Button from "@comps/ui/button";
import { CircleCheck, CirclePlus, CircleX, ShoppingCart } from "lucide-react";
import { ProductModel } from "@services/types";
import { useBasketStore } from "./basket/basketStore";

type AddToCartButtonProps = {
    product: ProductModel;
};

export default function AddToCartButton(props: AddToCartButtonProps) {
    const { product } = props;

    const { basketProductList, addProductToBasket, removeProductFromBasket } = useBasketStore();

    const isInBasket = basketProductList.some(({ id }) => id === product.id);

    const handleClick = () => {
        if (isInBasket) {
            removeProductFromBasket(product.id);
        } else {
            addProductToBasket({
                id: product.id,
                name: product.name,
                description: product.description,
                price: product.price,
                image: product.image,
                quantity: 1,
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
            {isInBasket ? (
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
