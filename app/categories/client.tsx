"use client";

import { SelectCategoryList } from "@actions/database/Categories";
import { CategoryType } from "@actions/types/Category";
import Link from "next/link";
import { useState } from "react";

type CategoriesClientProps = {
    categorieList: CategoryType[] | null;
};

// Composant client
export default function CategoriesClient(props: CategoriesClientProps) {
    const { categorieList } = props;

    const [categories, setCategories] = useState(categorieList);
    const [loading, setLoading] = useState(false);
    const [order, setOrder] = useState<"asc" | "desc">("asc");

    const handleClick = async () => {
        // Active le loader
        setLoading(true);

        // Récupère les catégories sur le serveur
        const data = await SelectCategoryList({ order });

        // Met à jour les catégories sur la page
        setCategories(data);

        // Stock l'ordre de tri actuel pour le prochain clic
        setOrder(order === "asc" ? "desc" : "asc");

        // Désactive le loader
        setLoading(false);
    };

    return loading ? (
        <p className="text-gray-500">Chargement...</p>
    ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {categories ? categories.map((category) => (
                <Link key={category.id} href={`/categories/${category.id}`}>
                    <div className="cursor-pointer rounded-lg bg-blue-50 p-4 shadow-sm transition hover:bg-blue-100">
                        <h2 className="text-lg font-semibold">
                            {category.name}
                        </h2>
                        <p className="text-gray-600">{category.description}</p>
                    </div>
                </Link>
            ))
        :
        <div>Il n&apos;y a pas de catégories.</div>
        }
            <div className="col-span-2 flex justify-center">
                <button
                    className="rounded bg-gray-100 px-3 py-1"
                    type="button"
                    onClick={handleClick}
                >
                    Inverser l&apos;ordre
                </button>
            </div>
        </div>
    );
}
