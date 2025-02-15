// import Link from "next/link";
import { SelectCategoryList } from "@actions/database/Categories";
import CategoriesClient from "./client";

// Composant server
export default async function CategoriesPage() {
    const categorieList = await SelectCategoryList({ order: "asc" });

    return (
        <div className="w-full">
            <h1 className="mb-4 text-2xl font-bold">Catégories</h1>

            {/* On pourrait afficher les catégories ici directement et ne pas utiliser de client */}
            <CategoriesClient categorieList={categorieList} />

            {/* <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {categorieList.map((category) => (
                    <Link key={category.id} href={`/categories/${category.id}`}>
                        <div className="cursor-pointer rounded-lg bg-blue-50 p-4 shadow-sm transition hover:bg-blue-100">
                            <h2 className="text-lg font-semibold">
                                {category.name}
                            </h2>
                            <p className="text-gray-600">
                                {category.description}
                            </p>
                        </div>
                    </Link>
                ))}
            </div> */}
        </div>
    );
}
