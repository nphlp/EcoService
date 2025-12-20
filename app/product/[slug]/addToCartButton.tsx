"use client";

import { ProductType } from "@app/product/[slug]/fetchParams";
import { useBasketStore } from "@comps/CORE/basket/basketStore";
import Button from "@comps/UI/button/button";
import { useMounted } from "@utils/use-mounted";

type AddToCartButtonProps = {
    product: ProductType;
    stock: number;
    className?: string;
};

export default function AddToCartButton(props: AddToCartButtonProps) {
    const { product, stock, className } = props;

    const { addProductToBasket, removeProductFromBasket } = useBasketStore();

    // Use zustand subscription to prevent reactCompiler memoryzing
    const isInBasket = useBasketStore((state) => state.isInBasket(product.id));

    const handleClick = async () => {
        if (isInBasket) {
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

    // Prevent hydration mismatch
    const mounted = useMounted();
    if (!mounted) return <AddToCardButtonSkeleton />;

    return (
        <Button
            type="button"
            disabled={stock === 0}
            className={{ button: className }}
            label={stock === 0 ? "Indisponible" : isInBasket ? "Retirer du panier" : "Ajouter au panier"}
            onClick={handleClick}
        >
            {stock === 0 ? "Indisponible" : isInBasket ? "Retirer du panier" : "Ajouter au panier"}
        </Button>
    );
}

const AddToCardButtonSkeleton = () => {
    return (
        <div className="animate-pulse rounded-lg bg-black p-2.5">
            <div className="flex justify-center">
                <div className="h-4 w-32 rounded bg-gray-200" />
            </div>
        </div>
    );
};
