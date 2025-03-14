"use client";

import { Filter } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import ButtonClient from "@comps/client/Button";

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

export default function ProductDisplay() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        setLoading(true);
        try {
            const response = await fetch("/api/stripe/products");
            if (!response.ok) {
                if (response.status === 401) {
                    alert("Please log in to view products");
                    return;
                }
                throw new Error("Failed to fetch products");
            }
            const data = await response.json();
            setProducts(data.data || []);
        } catch (error) {
            console.error("Error fetching products:", error);
            setProducts([]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Section */}
            <div className="bg-gradient-to-br from-[#0A0A2C] to-[#1a1a4b] text-white">
                <div className="mx-auto max-w-7xl px-4 py-24">
                    <h1 className="text-center text-5xl font-bold leading-tight md:text-6xl">
                        <span className="text-[#5CEBDF]">Découvrez</span> nos
                        <br />
                        services écologiques
                        <br />
                        <span className="text-[#5CEBDF]">innovants</span>
                    </h1>
                    <p className="mx-auto mt-6 max-w-2xl text-center text-xl text-gray-300">
                        Des solutions durables pour un avenir plus vert
                    </p>
                </div>
            </div>

            {/* Main Content */}
            <div className="mx-auto max-w-7xl px-4 py-16">
                {/* Filter and Create Section */}
                <div className="mb-12 flex items-center justify-between">
                    <h2 className="text-3xl font-bold text-gray-900">Nos Services</h2>
                    <div className="flex items-center gap-4">
                        <ButtonClient
                            type="button"
                            label="Filtrer"
                            className="flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-2 text-gray-700 shadow-sm transition-all hover:shadow-md"
                        >
                            <Filter className="size-5" />
                            <span className="font-medium">Filtrer</span>
                        </ButtonClient>
                    </div>
                </div>

                {/* Product Grid */}
                {loading ? (
                    <div className="flex items-center justify-center py-12">
                        <div className="size-8 animate-spin rounded-full border-4 border-[#5CEBDF] border-t-transparent"></div>
                        <span className="ml-3 text-lg text-gray-700">Chargement...</span>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {(products || []).map((product) => (
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
                        
                        {(!products || products.length === 0) && (
                            <div className="col-span-full py-12 text-center">
                                <p className="text-lg text-gray-600">Aucun produit disponible pour le moment.</p>
                                <Link href="/create-product" className="mt-4 inline-block text-primary hover:underline">
                                    Créer votre premier service
                                </Link>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
} 