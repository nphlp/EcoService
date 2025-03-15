"use client";

import { CreateStripeProduct } from "@actions/process/CreateStripeProduct";
import { CompleteCategory } from "@actions/zod-generated";
import Card from "@comps/server/Card";
import FeedbackClient, { FeedbackMode } from "@comps/ui/Feedback";
import { combo } from "@lib/combo";
import Button from "@ui/Button";
import Input from "@ui/Input";
import InputImage from "@ui/InputImage";
import Select from "@ui/Select";
import { useState } from "react";

type ProductCreationFormPros = {
    categoryList: CompleteCategory[];
};

export default function ProductCreationForm(props: ProductCreationFormPros) {
    const { categoryList } = props;

    // Input states
    const [name, setName] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [price, setPrice] = useState<string>("");
    const [categoryId, setCategoryId] = useState<string>("");
    const [image, setImage] = useState<File | null>(null);

    // Feedback
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [mode, setMode] = useState<FeedbackMode>("");
    const [message, setMessage] = useState<string>("");

    const createProduct = async () => {
        try {
            setIsLoading(true);

            const { status, message } = await CreateStripeProduct({
                name,
                description,
                price,
                stock: 0,
                vendorId: "",
                categoryId,
                image,
            });

            if (!status) {
                setMode("error");
                setMessage(message);
                return;
            }

            setMode("success");
            setMessage(message);
        } catch {
            setMode("error");
            setMessage("Une erreur est survenue...");
        } finally {
            setIsLoading(false);
        }
    };

    // const createProduct = async (e: React.FormEvent) => {
    //     e.preventDefault();
    //     setIsLoading(true);
    //     console.log("Creating product...", formData);

    //     try {
    //         // Validate required fields
    //         if (
    //             !formData.name.trim() ||
    //             !formData.description.trim() ||
    //             !formData.amount.trim() ||
    //             !formData.categoryId
    //         ) {
    //             throw new Error("Veuillez remplir tous les champs obligatoires et sélectionner une catégorie");
    //         }

    //         const formDataToSend = new FormData();
    //         formDataToSend.append("name", formData.name);
    //         formDataToSend.append("description", formData.description);
    //         formDataToSend.append("amount", formData.amount);
    //         formDataToSend.append("currency", "eur");
    //         formDataToSend.append("categoryId", formData.categoryId);
    //         if (formData.image) {
    //             formDataToSend.append("image", formData.image);
    //         }

    //         console.log("Sending request to API...");
    //         const response = await fetch(
    //             editingProduct ? `/api/stripe/products/${editingProduct.id}` : "/api/stripe/products",
    //             {
    //                 method: editingProduct ? "PUT" : "POST",
    //                 body: formDataToSend,
    //             },
    //         );

    //         console.log("API response status:", response.status);
    //         const data = await response.json();
    //         console.log("API response data:", data);

    //         if (!response.ok) {
    //             if (response.status === 401) {
    //                 alert("Vous devez être connecté pour créer un produit. Veuillez vous connecter et réessayer.");
    //                 return;
    //             }
    //             throw new Error(data.error || "Échec de la sauvegarde du produit");
    //         }

    //         // Reset form
    //         setFormData({
    //             name: "",
    //             description: "",
    //             amount: "",
    //             currency: "eur",
    //             image: null,
    //             categoryId: "",
    //         });
    //         setImagePreview(null);
    //         setEditingProduct(null);
    //         if (fileInputRef.current) {
    //             fileInputRef.current.value = "";
    //         }

    //         alert(editingProduct ? "Produit mis à jour avec succès!" : "Produit créé avec succès!");
    //         // Redirect to products page after successful creation
    //         window.location.href = "/products";
    //     } catch (error) {
    //         console.error("Error saving product:", error);
    //         alert("Échec de la sauvegarde du produit: " + (error as Error).message);
    //     } finally {
    //         setIsLoading(false);
    //     }
    // };

    return (
        <Card className="rounded-3xl border border-white/15 bg-white/5 p-8 backdrop-blur-lg md:w-[600px]">
            <form className="space-y-8">
                <Input label="Nom du produit" type="text" value={name} onChange={(e) => setName(e.target.value)} />

                <Input
                    label="Description"
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />

                <Input label="Prix" type="number" min="0" value={price} onChange={(e) => setPrice(e.target.value)} />

                <Select
                    label="Catégorie"
                    placeholder="Sélectionnez une catégorie"
                    options={categoryList.map((category) => ({
                        label: category.name,
                        value: category.id,
                    }))}
                    onChange={(e) => setCategoryId(e.target.value)}
                    value={categoryId}
                />

                <InputImage label="Image" onChange={setImage} imagePreview={image} />

                <FeedbackClient message={message} mode={mode} />

                <div className="flex justify-center">
                    <Button
                        type="submit"
                        className={combo("bg-cyan-400 text-gray-800", "hover:bg-cyan-300")}
                        label="Créer le produit"
                        onClick={createProduct}
                        loadingLabel="Enregistrement..."
                        isLoading={isLoading}
                    >
                        Créer le produit
                    </Button>
                </div>
            </form>
        </Card>
    );
}
