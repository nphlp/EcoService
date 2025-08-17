"use client";

import { ProductType } from "@app/product/[slug]/fetchParams";
import { useBasketStore } from "@comps/basket/basketStore";
import Button from "@comps/ui/button";
import { combo } from "@lib/combo";

type AddToCartButtonProps = {
    product: ProductType;
    stock: number;
    className?: string;
};

export default function AddToCartButton(props: AddToCartButtonProps) {
    const { product, stock, className } = props;

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
            disabled={stock === 0}
            className={combo("w-full", className)}
            label={stock === 0 ? "Indisponible" : isInBasket(product.id) ? "Retirer du panier" : "Ajouter au panier"}
            onClick={handleClick}
        >
            {stock === 0 ? "Indisponible" : isInBasket(product.id) ? "Retirer du panier" : "Ajouter au panier"}
        </Button>
    );
}
