"use client";

import { ProductType } from "@app/product/[slug]/fetchParams";
import dynamic from "next/dynamic";

// Prevent undefined window error due to Leaflet import
const AddToCartButton = dynamic(() => import("./addToCartButton"), { ssr: false });

type AddToCartButtonWrapperProps = {
    product: ProductType;
    stock: number;
};

export default function AddToCartButtonWrapper(props: AddToCartButtonWrapperProps) {
    const { product, stock } = props;

    return <AddToCartButton product={product} stock={stock} />;
}
