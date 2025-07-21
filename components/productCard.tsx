"use client";

import { ProductSearchType } from "@app/catalog/components/fetchParams";
import Card, { CardProps } from "@comps/server/card";
import ImageRatio from "@comps/ui/imageRatio";
import AddToCartIcon from "./addToCartIcon";

type ProductCardProps = {
    product: ProductSearchType;
} & CardProps;

export default function ProductCard(props: ProductCardProps) {
    const { product, ...others } = props;
    const { name, description, image, price } = product;

    return (
        <Card className="h-full overflow-hidden p-0" {...others}>
            <ImageRatio src={image} alt={name} />
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
    );
}
