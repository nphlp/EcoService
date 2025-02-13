"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

interface Category {
    id: string;
    name: string;
    description?: string;
}

export default function CategoriesPage() {
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("/api/categories")
            .then((res) => res.json())
            .then((data) => {
                setCategories(data);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, []);

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
                <h1 className="text-2xl font-bold mb-4">Catégories</h1>

                {loading ? (
                    <p className="text-gray-500">Chargement...</p>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {categories.map((category) => (
                            <Link key={category.id} href={`/categories/${category.id}`}>
                                <div className="cursor-pointer bg-blue-50 p-4 rounded-lg shadow-sm hover:bg-blue-100 transition">
                                    <h2 className="text-lg font-semibold">{category.name}</h2>
                                    <p className="text-gray-600">{category.description}</p>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
