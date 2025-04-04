"use client";

import { CreateStripeProductProcess } from "@/process/createStripeProduct";
import Card from "@comps/server/card";
import Button from "@comps/ui/button";
import Feedback, { FeedbackMode } from "@comps/ui/feedback";
import Input from "@comps/ui/input";
import InputImage from "@comps/ui/inputImage";
import Select from "@comps/ui/select";
import { combo } from "@lib/combo";
import { FindManyCategoryProps, FindManyCategoryResponse } from "@services/types";
import { authorizedFileSize, authorizedFormats } from "@utils/ImageValidation";
import { useState } from "react";

type ProductCreationFormPros = {
    categoryList: FindManyCategoryResponse<FindManyCategoryProps>    ;
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

    const [mode, setMode] = useState<FeedbackMode>("none");
    const [message, setMessage] = useState<string>("");
    const [isFeedbackOpen, setIsFeedbackOpen] = useState<boolean>(false);
    const handleImageChange = (file: File | null) => {
        // If no file, return
        if (!file) return setImage(null);

        // If the file extension is not authorized, return
        if (!authorizedFormats.includes(file.type.replace("image/", ""))) {
            setMode("warning");
            setMessage("Format de l'image non autorisé");
            setIsFeedbackOpen(true);
            return;
        }

        // Check if the file size is too big (1MB)
        if (file.size > authorizedFileSize) {
            setMode("warning");
            setMessage("La taille de l'image est trop grande");
            setIsFeedbackOpen(true);
            return;
        }

        // Set the image
        setImage(file);
    };

    const handleSubmit = async () => {
        try {
            setIsLoading(true);

            if (!name || !description || !price || !categoryId || !image) {
                setMode("warning");
                setMessage("Veuillez remplir tous les champs");
                setIsFeedbackOpen(true);
                return;
            }

            const { status, message } = await CreateStripeProductProcess({
                name,
                description,
                price,
                categoryId,
                image,
            });

            if (status) {
                setMode("success");
                setMessage(message);
                setIsFeedbackOpen(true);
            } else {
                setMode("error");
                setMessage(message);
                setIsFeedbackOpen(true);
            }
        } catch {
            setMode("error");
            setMessage("Une erreur est survenue...");
            setIsFeedbackOpen(true);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Card className="rounded-3xl border border-white/15 bg-white/5 p-8 text-white backdrop-blur-lg md:w-[600px]">
            <form className="space-y-8">
                <Input
                    label="Nom du produit"
                    type="text"
                    variant="dark"
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                    autoFocus
                />

                <Input
                    label="Description"
                    type="text"
                    variant="dark"
                    onChange={(e) => setDescription(e.target.value)}
                    value={description}
                />

                <Input
                    label="Prix"
                    type="number"
                    variant="dark"
                    min="0"
                    onChange={(e) => setPrice(e.target.value)}
                    value={price}
                />

                {/* TODO: why the select is smaller than the input ? */}
                <Select
                    label="Catégorie"
                    variant="dark"
                    placeholder="Sélectionnez une catégorie"
                    options={categoryList.map((category) => ({
                        label: category.name,
                        value: category.id,
                    }))}
                    onChange={(e) => setCategoryId(e.target.value)}
                    value={categoryId}
                />

                <InputImage label="Image" onChange={handleImageChange} imagePreview={image} />

                <Feedback message={message} mode={mode} isFeedbackOpen={isFeedbackOpen} />

                <div className="flex justify-center">
                    <Button
                        type="button"
                        className={combo("bg-cyan-400 text-gray-800", "hover:bg-cyan-300", "focus:ring-white")}
                        label="Créer le produit"
                        loadingLabel="Enregistrement..."
                        isLoading={isLoading}
                        loaderColor="primary"
                        onClick={handleSubmit}
                    >
                        Créer le produit
                    </Button>
                </div>
            </form>
        </Card>
    );
}
