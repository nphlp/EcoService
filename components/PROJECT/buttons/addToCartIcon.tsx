"use client";

import { ProductSearchType } from "@app/catalog/components/fetchParams";
import { useBasketStore } from "@comps/CORE/basket/basketStore";
import Button from "@comps/UI/button/button";
import { useMounted } from "@utils/use-mounted";
import { CircleCheck, CirclePlus, CircleX, ShoppingCart } from "lucide-react";
import { RefObject } from "react";

type AddToCartIconProps = {
    product: ProductSearchType;
    ref?: RefObject<HTMLButtonElement | null>;
};

export default function AddToCartIcon(props: AddToCartIconProps) {
    const { product, ref } = props;

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
    if (!mounted) return <AddToCardIconSkeleton />;

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

const AddToCardIconSkeleton = () => {
    return (
        <div className="animate-pulse rounded-xl bg-black p-2.5">
            <div className="size-6 rounded bg-gray-200" />
        </div>
    );
};
