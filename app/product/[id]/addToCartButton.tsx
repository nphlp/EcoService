"use client";

import { ProductType } from "@app/product/[id]/fetchParams";
import { useBasketStore } from "@comps/basket/basketStore";
import ButtonClient from "@comps/client/button";

type AddToCartButtonProps = {
    product: ProductType;
    stock: number;
};

export default function AddToCartButton(props: AddToCartButtonProps) {
    const { product, stock } = props;

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
        <ButtonClient
            type="button"
            disabled={stock === 0}
            className="w-full"
            label={stock === 0 ? "Indisponible" : isInBasket(product.id) ? "Retirer du panier" : "Ajouter au panier"}
            onClick={handleClick}
        >
            {stock === 0 ? "Indisponible" : isInBasket(product.id) ? "Retirer du panier" : "Ajouter au panier"}
        </ButtonClient>
    );
}
