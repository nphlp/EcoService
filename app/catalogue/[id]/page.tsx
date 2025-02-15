"use client";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

interface Product {
    id: string;
    name: string;
    description: string;
    image: string;
    price: number;
}

export default function CategoryProducts() {
    const { id } = useParams();
    const [products, setProducts] = useState<Product[]>([]);
    const [categoryName, setCategoryName] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!id) return;

        fetch(`/api/categories/${id}`)
            .then((res) => res.json())
            .then((data) => {
                setProducts(data.products);
                setCategoryName(data.name);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, [id]);

    return (
        <div className="w-full">
            <h1 className="mb-4 text-2xl font-bold">
                {categoryName || "Catégorie"}
            </h1>

            {loading ? (
                <p className="text-gray-500">Chargement...</p>
            ) : (
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
                    {products.map((product) => (
                        <div
                            key={product.id}
                            className="rounded-lg bg-white p-4 shadow-md"
                        >
                            <Image
                                src={product.image}
                                alt={product.name}
                                width={200}
                                height={200}
                                className="h-auto w-full rounded-md"
                            />
                            <h3 className="mt-2 text-lg font-semibold">
                                {product.name}
                            </h3>
                            <p className="text-gray-600">
                                {product.description}
                            </p>
                            <p className="mt-2 font-bold text-blue-500">
                                {product.price} €
                            </p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
