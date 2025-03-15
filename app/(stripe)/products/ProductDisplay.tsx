"use client";

import ButtonClient from "@comps/client/Button";
import Image from "next/image";

interface Product {
    id: string;
    name: string;
    description: string;
    images: string[];
    default_price: {
        id: string;
        unit_amount: number;
        currency: string;
    };
    category?: {
        id: string;
        name: string;
    };
}

function getImageUrl(imageUrl: string) {
    if (imageUrl.includes("/v1/files/")) {
        const fileId = imageUrl.split("/").pop();
        return `https://files.stripe.com/links/${fileId}`;
    }
    return imageUrl;
}

type ProductDisplayProps = {
    stripeProductList: Product[];
};

export default function ProductDisplay(props: ProductDisplayProps) {
    const { stripeProductList } = props;

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Section */}
            <div className="bg-gradient-to-br from-[#0A0A2C] to-[#1a1a4b] text-white">
                <div className="mx-auto max-w-7xl px-4 py-24">
                    <h1 className="text-center text-5xl font-bold leading-tight md:text-6xl">
                        <div>
                            <span className="text-[#5CEBDF]">Découvrez</span>
                            <span> nos produits</span>
                        </div>
                        <div>
                            <span>écologiques </span>
                            <span className="text-[#5CEBDF]">innovants</span>
                        </div>
                    </h1>
                    <p className="mx-auto mt-6 max-w-2xl text-center text-xl text-gray-300">
                        Des produits durables pour un avenir plus vert
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-8 p-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {stripeProductList.map((product) => (
                    <div key={product.id} className="flex flex-col items-center">
                        <div className="w-full overflow-hidden rounded-lg">
                            {product.images?.[0] ? (
                                <div className="relative aspect-[3/2] w-full">
                                    <Image
                                        src={getImageUrl(product.images[0])}
                                        alt={product.name}
                                        fill
                                        className="object-cover"
                                        unoptimized
                                    />
                                </div>
                            ) : (
                                <div className="relative flex aspect-[3/2] w-full items-center justify-center rounded-lg bg-gray-100">
                                    <span className="text-gray-400">No image</span>
                                </div>
                            )}
                        </div>
                        <div className="mt-4 text-center">
                            <h3 className="text-xl text-primary">{product.name}</h3>
                            <p className="mt-1 text-lg">{(product.default_price?.unit_amount || 0) / 100}€</p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="flex items-center justify-center">
                <ButtonClient type="link" href="/create-product" label="create product">
                    Créer un produit
                </ButtonClient>
            </div>
        </div>
    );
}
