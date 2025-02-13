"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";

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
        <div className="min-h-screen bg-gray-100 p-6">
            <div className="max-w-6xl mx-auto bg-white shadow-md rounded-lg p-6">
                <h1 className="text-2xl font-bold mb-4">{categoryName || "Catégorie"}</h1>

                {loading ? (
                    <p className="text-gray-500">Chargement...</p>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                        {products.map((product) => (
                            <div key={product.id} className="bg-white p-4 rounded-lg shadow-md">
                                <Image src={product.image} alt={product.name} width={200} height={200} className="w-full h-auto rounded-md" />
                                <h3 className="text-lg font-semibold mt-2">{product.name}</h3>
                                <p className="text-gray-600">{product.description}</p>
                                <p className="text-blue-500 font-bold mt-2">{product.price} €</p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
