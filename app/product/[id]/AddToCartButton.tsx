"use client";

import { useBasketStore } from "@comps/Basket/BasketStore";
import ButtonClient from "@comps/client/Button";
import { ProductRelationsComplete } from "@services/index";

type AddToCartButtonProps = {
    product: ProductRelationsComplete;
    stock: number;
};

export default function AddToCartButton(props: AddToCartButtonProps) {
    const { product, stock } = props;
    const { basketProductList, addProductToBasket, removeProductFromBasket } = useBasketStore();

    const isInBasket = basketProductList.some((p) => p.id === product.id);

    const handleClick = () => {
        if (isInBasket) {
            removeProductFromBasket(product);
        } else {
            addProductToBasket(product);
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