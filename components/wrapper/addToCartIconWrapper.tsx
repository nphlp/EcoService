"use client";

import { ProductModel } from "@services/types";
import dynamic from "next/dynamic";

// Prevent undefined window error due to Leaflet import
const AddToCartIcon = dynamic(() => import("../addToCartIcon"), { ssr: false });

type AddToCartIconWrapperProps = {
    product: ProductModel;
};

export default function AddToCartIconWrapper(props: AddToCartIconWrapperProps) {
    const { product } = props;

    return <AddToCartIcon product={product} />;
}
