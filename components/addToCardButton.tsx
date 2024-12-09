"use client";

import Button from "@comps/ui/button";
import { CircleCheck, CirclePlus, CircleX, ShoppingCart } from "lucide-react";
import { ProductModel } from "@services/types";
import { useBasketStore } from "./basket/basketStore";

type AddToCartButtonProps = {
    productId: ProductModel["id"];
};

export default function AddToCartButton(props: AddToCartButtonProps) {
    const { productId } = props;

    const { basketProductList, addProductToBasket, removeProductFromBasket } = useBasketStore();

    const isInBasket = basketProductList.some((currentId) => currentId === productId);

    return (
        <Button
            type="button"
            label="add-to-basket"
            onClick={(e) => {
                e.preventDefault();
                return isInBasket ? removeProductFromBasket(productId) : addProductToBasket(productId);
            }}
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
