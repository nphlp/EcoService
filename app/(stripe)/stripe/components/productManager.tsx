"use client";

import ButtonClient from "@comps/client/button";
import Card from "@comps/server/card";
import { combo } from "@lib/combo";
import { Filter } from "lucide-react";
import Image from "next/image";
import { FormEvent, useEffect, useRef, useState } from "react";

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

interface Category {
    id: string;
    name: string;
    description?: string;
}

function getImageUrl(imageUrl: string) {
    if (imageUrl.includes("/v1/files/")) {
        const fileId = imageUrl.split("/").pop();
        return `https://files.stripe.com/links/${fileId}`;
    }
    return imageUrl;
}

export default function ProductManager() {
    const [products, setProducts] = useState<Product[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(false);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [editingProduct, setEditingProduct] = useState<Product | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [showCategoryForm, setShowCategoryForm] = useState(false);
    const [newCategory, setNewCategory] = useState({ name: "", description: "" });
    const [categoryLoading, setCategoryLoading] = useState(false);

    const [formData, setFormData] = useState({
        name: "",
        description: "",
        amount: "",
        currency: "eur",
        image: null as File | null,
        categoryId: "",
    });

    useEffect(() => {
        fetchProducts();
        fetchCategories();
    }, []);

    useEffect(() => {
        if (editingProduct) {
            setFormData({
                name: editingProduct.name,
                description: editingProduct.description,
                amount: ((editingProduct.default_price?.unit_amount || 0) / 100).toString(),
                currency: "eur",
                image: null,
                categoryId: editingProduct.category?.id || "",
            });
        }
    }, [editingProduct]);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setFormData({ ...formData, image: file });
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const fetchProducts = async () => {
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
            alert("Error fetching products. Please try again.");
        }
    };

    const fetchCategories = async () => {
        try {
            const response = await fetch("/api/categories");
            if (!response.ok) {
                throw new Error("Failed to fetch categories");
            }
            const data = await response.json();
            setCategories(data.data || []);
        } catch (error) {
            console.error("Error fetching categories:", error);
            setCategories([]);
        }
    };

    // const editProduct = (product: Product) => {
    //     setEditingProduct(product);
    //     window.scrollTo({ top: 0, behavior: "smooth" });
    // };

    const createProduct = async (e: FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            // Validate required fields
            if (
                !formData.name.trim() ||
                !formData.description.trim() ||
                !formData.amount.trim() ||
                !formData.categoryId
            ) {
                throw new Error("Veuillez remplir tous les champs obligatoires et sélectionner une catégorie");
            }

            const formDataToSend = new FormData();
            formDataToSend.append("name", formData.name);
            formDataToSend.append("description", formData.description);
            formDataToSend.append("amount", formData.amount);
            formDataToSend.append("currency", "eur");
            formDataToSend.append("categoryId", formData.categoryId);
            if (formData.image) {
                formDataToSend.append("image", formData.image);
            }

            const response = await fetch(
                editingProduct ? `/api/stripe/products/${editingProduct.id}` : "/api/stripe/products",
                {
                    method: editingProduct ? "PUT" : "POST",
                    body: formDataToSend,
                },
            );

            const data = await response.json();

            if (!response.ok) throw new Error(data.error || "Failed to save product");

            // Reset form
            setFormData({
                name: "",
                description: "",
                amount: "",
                currency: "eur",
                image: null,
                categoryId: "",
            });
            setImagePreview(null);
            setEditingProduct(null);
            if (fileInputRef.current) {
                fileInputRef.current.value = "";
            }

            await fetchProducts();
            alert(editingProduct ? "Product updated successfully!" : "Product created successfully!");
        } catch (error) {
            console.error("Error saving product:", error);
            alert("Failed to save product: " + (error as Error).message);
        } finally {
            setLoading(false);
        }
    };

    const createCategory = async (e: React.FormEvent) => {
        e.preventDefault();
        setCategoryLoading(true);

        try {
            // Create a POST endpoint for categories if it doesn't exist
            const response = await fetch("/api/categories", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newCategory),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || "Failed to create category");
            }

            await fetchCategories();
            setNewCategory({ name: "", description: "" });
            setShowCategoryForm(false);
            alert("Category created successfully!");
        } catch (error) {
            console.error("Error creating category:", error);
            alert("Failed to create category: " + (error as Error).message);
        } finally {
            setCategoryLoading(false);
        }
    };

    // const deleteProduct = async (productId: string) => {
    //     if (!confirm("Are you sure you want to delete this product?")) {
    //         return;
    //     }

    //     try {
    //         const response = await fetch(`/api/products/${productId}`, {
    //             method: "DELETE",
    //         });

    //         if (!response.ok) {
    //             throw new Error("Failed to delete product");
    //         }

    //         // Refresh the products list
    //         await fetchProducts();
    //     } catch (error) {
    //         console.error("Error deleting product:", error);
    //         alert("Failed to delete product");
    //     }
    // };

    return (
        <div className="h-full bg-gray-50">
            {/* Hero Section */}
            <div className="bg-gradient-to-br from-[#0A0A2C] to-[#1a1a4b] text-white">
                <div className="mx-auto max-w-7xl px-4 py-24">
                    <h1 className="text-center text-5xl leading-tight font-bold md:text-6xl">
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
                {/* Filter Section */}
                <div className="mb-12 flex items-center justify-between">
                    <h2 className="text-3xl font-bold text-gray-900">Nos Services</h2>
                    <ButtonClient
                        type="button"
                        label="Filtrer"
                        className="flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-2 text-gray-700 shadow-sm transition-all hover:shadow-md"
                    >
                        <Filter className="size-5" />
                        <span className="font-medium">Filtrer</span>
                    </ButtonClient>
                </div>

                {/* Product Grid */}
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
                                <h3 className="text-primary text-xl">{product.name}</h3>
                                <p className="mt-1 text-lg">{(product.default_price?.unit_amount || 0) / 100}€</p>
                            </div>
                        </div>
                    ))}

                    {(!products || products.length === 0) && (
                        <div className="col-span-full py-12 text-center">
                            <p className="text-lg text-gray-600">Aucun produit disponible pour le moment.</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Create/Edit Form Section */}
            <div className="mt-24 bg-gradient-to-br from-[#0A0A2C] to-[#1a1a4b] text-white">
                <div className="mx-auto max-w-4xl px-4 py-24">
                    <Card className="rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-lg">
                        <form onSubmit={createProduct} className="space-y-8">
                            <div>
                                <label htmlFor="name" className="mb-2 text-lg font-medium text-white">
                                    Nom du service
                                </label>
                                <input
                                    id="name"
                                    value={formData.name}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                        setFormData({
                                            ...formData,
                                            name: e.target.value,
                                        })
                                    }
                                    className={combo(
                                        "w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-white",
                                        "focus:border-transparent focus:ring-2 focus:ring-[#5CEBDF] focus:outline-none",
                                        "placeholder:text-gray-400",
                                    )}
                                    required
                                />
                            </div>

                            <div>
                                <label htmlFor="description" className="mb-2 text-lg font-medium text-white">
                                    Description
                                </label>
                                <textarea
                                    id="description"
                                    value={formData.description}
                                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                                        setFormData({
                                            ...formData,
                                            description: e.target.value,
                                        })
                                    }
                                    className={combo(
                                        "w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-white",
                                        "focus:border-transparent focus:ring-2 focus:ring-[#5CEBDF] focus:outline-none",
                                        "min-h-[120px] placeholder:text-gray-400",
                                    )}
                                    required
                                />
                            </div>

                            <div>
                                <label htmlFor="amount" className="mb-2 text-lg font-medium text-white">
                                    Prix
                                </label>
                                <div className="relative">
                                    <input
                                        id="amount"
                                        type="number"
                                        step="0.01"
                                        value={formData.amount}
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                            setFormData({
                                                ...formData,
                                                amount: e.target.value,
                                            })
                                        }
                                        className={combo(
                                            "w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3 pl-10 text-white",
                                            "focus:border-transparent focus:ring-2 focus:ring-[#5CEBDF] focus:outline-none",
                                            "placeholder:text-gray-400",
                                        )}
                                        required
                                    />
                                    <span className="absolute top-1/2 left-4 -translate-y-1/2 text-gray-400">€</span>
                                </div>
                            </div>

                            <div>
                                <div className="mb-2 flex items-center justify-between">
                                    <label htmlFor="category" className="text-lg font-medium text-white">
                                        Catégorie
                                    </label>
                                    <button
                                        type="button"
                                        onClick={() => setShowCategoryForm(!showCategoryForm)}
                                        className="text-sm text-[#5CEBDF] hover:underline"
                                    >
                                        {showCategoryForm ? "Annuler" : "+ Ajouter une catégorie"}
                                    </button>
                                </div>

                                {showCategoryForm ? (
                                    <div className="mb-4 rounded-xl border border-white/20 bg-white/10 p-4">
                                        <h4 className="mb-3 text-lg font-medium text-white">Nouvelle catégorie</h4>
                                        <form onSubmit={createCategory} className="space-y-4">
                                            <div>
                                                <label
                                                    htmlFor="categoryName"
                                                    className="mb-1 block text-sm text-gray-300"
                                                >
                                                    Nom
                                                </label>
                                                <input
                                                    id="categoryName"
                                                    value={newCategory.name}
                                                    onChange={(e) =>
                                                        setNewCategory({ ...newCategory, name: e.target.value })
                                                    }
                                                    className={combo(
                                                        "w-full rounded-xl border border-white/20 bg-white/10 px-4 py-2 text-white",
                                                        "focus:border-transparent focus:ring-2 focus:ring-[#5CEBDF] focus:outline-none",
                                                        "placeholder:text-gray-400",
                                                    )}
                                                    required
                                                />
                                            </div>
                                            <div>
                                                <label
                                                    htmlFor="categoryDescription"
                                                    className="mb-1 block text-sm text-gray-300"
                                                >
                                                    Description (optionnel)
                                                </label>
                                                <input
                                                    id="categoryDescription"
                                                    value={newCategory.description}
                                                    onChange={(e) =>
                                                        setNewCategory({ ...newCategory, description: e.target.value })
                                                    }
                                                    className={combo(
                                                        "w-full rounded-xl border border-white/20 bg-white/10 px-4 py-2 text-white",
                                                        "focus:border-transparent focus:ring-2 focus:ring-[#5CEBDF] focus:outline-none",
                                                        "placeholder:text-gray-400",
                                                    )}
                                                />
                                            </div>
                                            <div className="flex justify-end">
                                                <ButtonClient
                                                    type="submit"
                                                    label="Créer la catégorie"
                                                    loadingLabel="Création..."
                                                    isLoading={categoryLoading}
                                                    className="bg-[#5CEBDF] px-4 py-2 text-sm font-medium text-[#0A0A2C]"
                                                >
                                                    Créer la catégorie
                                                </ButtonClient>
                                            </div>
                                        </form>
                                    </div>
                                ) : (
                                    <select
                                        id="category"
                                        value={formData.categoryId}
                                        onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
                                        className={combo(
                                            "w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-white",
                                            "focus:border-transparent focus:ring-2 focus:ring-[#5CEBDF] focus:outline-none",
                                            "placeholder:text-gray-400",
                                        )}
                                        required
                                    >
                                        <option value="" disabled>
                                            Sélectionnez une catégorie
                                        </option>
                                        {categories.map((category) => (
                                            <option key={category.id} value={category.id}>
                                                {category.name}
                                            </option>
                                        ))}
                                    </select>
                                )}
                                {categories.length === 0 && !showCategoryForm && (
                                    <p className="mt-2 text-sm text-gray-400">
                                        Aucune catégorie disponible. Veuillez en créer une.
                                    </p>
                                )}
                            </div>

                            <div>
                                <label htmlFor="image" className="mb-2 text-lg font-medium text-white">
                                    Image
                                </label>
                                <div className="mt-2 flex w-full items-center justify-center">
                                    <label className="flex w-full cursor-pointer flex-col items-center rounded-xl border border-dashed border-white/20 bg-white/10 px-4 py-6 transition-colors hover:bg-white/[0.12]">
                                        <div className="flex flex-col items-center">
                                            <svg
                                                className="size-8 text-gray-400"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth="2"
                                                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                                                />
                                            </svg>
                                            <p className="mt-2 text-sm text-gray-400">
                                                Glissez une image ou cliquez pour sélectionner
                                            </p>
                                        </div>
                                        <input
                                            id="image"
                                            ref={fileInputRef}
                                            type="file"
                                            accept="image/*"
                                            onChange={handleImageChange}
                                            className="hidden"
                                            required={!editingProduct}
                                        />
                                    </label>
                                </div>
                                {imagePreview && (
                                    <div className="relative mt-4 aspect-video w-full overflow-hidden rounded-xl">
                                        <Image src={imagePreview} alt="Preview" fill className="object-cover" />
                                    </div>
                                )}
                            </div>

                            <div className="flex gap-4 pt-4">
                                <ButtonClient
                                    type="submit"
                                    label={editingProduct ? "Mettre à jour" : "Créer"}
                                    loadingLabel="Enregistrement..."
                                    isLoading={loading}
                                    // className={combo(
                                    //     "rounded-xl bg-[#5CEBDF] px-8 py-3 text-lg font-medium text-[#0A0A2C]",
                                    //     "hover:bg-[#4CD9CD] focus:outline-none focus:ring-2 focus:ring-[#5CEBDF] focus:ring-offset-2 focus:ring-offset-[#0A0A2C]",
                                    //     "transition-all disabled:cursor-not-allowed disabled:opacity-50"
                                    // )}
                                >
                                    {editingProduct ? "Mettre à jour" : "Créer"}
                                </ButtonClient>
                                {editingProduct && (
                                    <ButtonClient
                                        type="button"
                                        label="Annuler"
                                        onClick={() => {
                                            setEditingProduct(null);
                                            setFormData({
                                                name: "",
                                                description: "",
                                                amount: "",
                                                currency: "eur",
                                                image: null,
                                                categoryId: "",
                                            });
                                            setImagePreview(null);
                                        }}
                                        // className={combo(
                                        //     "rounded-xl border border-white/20 px-8 py-3 text-lg font-medium text-white",
                                        //     "hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#0A0A2C]",
                                        //     "transition-all"
                                        // )}
                                    >
                                        Annuler
                                    </ButtonClient>
                                )}
                            </div>
                        </form>
                    </Card>
                </div>
            </div>

            {/* Footer Section */}
            <div className="bg-[#0A0A2C]">
                <div className="mx-auto max-w-7xl px-4 py-24">
                    <div className="grid grid-cols-1 gap-16 md:grid-cols-3">
                        <div>
                            <h3 className="mb-6 text-2xl font-bold text-[#5CEBDF]">À propos</h3>
                            <p className="text-gray-300">
                                Notre mission est de faciliter l&apos;accès aux services écologiques pour un avenir plus
                                durable.
                            </p>
                        </div>
                        <div>
                            <h3 className="mb-6 text-2xl font-bold text-[#5CEBDF]">Contact</h3>
                            <p className="text-gray-300">
                                Email: contact@ecoservice.com
                                <br />
                                Tél: +33 1 23 45 67 89
                            </p>
                        </div>
                        <div>
                            <h3 className="mb-6 text-2xl font-bold text-[#5CEBDF]">Suivez-nous</h3>
                            <div className="flex gap-4">{/* Add social media icons here */}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
