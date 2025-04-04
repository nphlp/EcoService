"use client";

import { useBasketStore } from "@comps/basket/basketStore";
import ButtonClient from "@comps/client/button";
import { ProductType } from "./fetchParams";

type AddToCartButtonProps = {
    product: ProductType;
    stock: number;
};

export default function AddToCartButton(props: AddToCartButtonProps) {
    const { product, stock } = props;
    const { basketProductList, addProductToBasket, removeProductFromBasket } = useBasketStore();

    const isInBasket = basketProductList.some((id) => id === product.id);

    const handleClick = () => {
        if (isInBasket) {
            removeProductFromBasket(product.id);
        } else {
            addProductToBasket(product.id);
        }
    };

    return (
        <ButtonClient 
            type="button" 
            disabled={stock === 0}
            className="w-full"
            label={stock === 0 ? 'Indisponible' : isInBasket ? 'Retirer du panier' : 'Ajouter au panier'}
            onClick={handleClick}
        >
            {stock === 0 ? 'Indisponible' : isInBasket ? 'Retirer du panier' : 'Ajouter au panier'}
        </ButtonClient>
    );
} 