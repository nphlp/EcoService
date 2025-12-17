"use client";

import { ProductSearchType } from "@app/catalog/components/fetchParams";
import Link from "@comps/UI/button/link";
import Card from "@comps/UI/card";
import ImageRatio, { ImageRatioProps } from "@comps/UI/imageRatio";
import { Route } from "next";
import AddToCartIcon from "../buttons/addToCartIcon";

type ProductCardProps = {
    href: Route;
    product: ProductSearchType;
    mode: ImageRatioProps["mode"];
};

export default function ProductCard(props: ProductCardProps) {
    const { href, product, mode } = props;
    const { name, description, image, price } = product;

    return (
        <Link label={name} href={href} variant="none" className="size-full rounded-xl p-2">
            <Card className="size-full overflow-hidden p-0">
                <ImageRatio src={image} alt={name} mode={mode} />
                <div className="flex flex-row items-end justify-between gap-1 p-5">
                    <div className="space-y-2">
                        <div>
                            <h2 className="line-clamp-1 text-xl font-bold">{name}</h2>
                            <div className="line-clamp-1 text-sm text-gray-500">{description}</div>
                        </div>
                        <div className="font-bold text-nowrap text-gray-500">{price.toFixed(2)} €</div>
                    </div>
                    <AddToCartIcon product={product} />
                </div>
            </Card>
        </Link>
    );
}

export const ProductCardSkeleton = () => {
    return (
        <Card className="size-full overflow-hidden p-0">
            <div className="animate-shimmer aspect-3/2" />
            <div className="flex flex-row items-end justify-between gap-1 p-5">
                <div className="w-full space-y-2">
                    <div className="w-full space-y-1">
                        <div className="animate-shimmer h-6.5 w-[70%] rounded" />
                        <div className="animate-shimmer h-4.5 w-[80%] rounded" />
                    </div>
                    <div className="animate-shimmer h-6 w-[30%] rounded" />
                </div>
                <div className="animate-shimmer size-11 shrink-0 rounded-xl" />
            </div>
        </Card>
    );
};
