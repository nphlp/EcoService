"use client";

import { AddProductToStripeProcess } from "@/process/AddProductToStripeProcess";
import Card from "@comps/server/card";
import Button from "@comps/ui/button";
import Feedback, { FeedbackMode } from "@comps/ui/feedback";
import Input from "@comps/ui/input";
import InputImage from "@comps/ui/inputImage";
import Select from "@comps/ui/select/select";
import { createSelectOptions } from "@comps/ui/select/utils";
import { Prisma } from "@prisma/client";
import { authorizedFileSize, authorizedFormats } from "@utils/ImageValidation";
import { useState } from "react";

type ProductCreationFormPros = {
    categoryList: Prisma.CategoryGetPayload<{ select: { id: true; name: true } }>[];
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

            const { status, message } = await AddProductToStripeProcess({
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

                // Reset the form
                setName("");
                setDescription("");
                setPrice("");
                setCategoryId("");
                setImage(null);
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
        <Card className="rounded-3xl p-8 backdrop-blur-lg md:w-[600px]">
            <form className="space-y-4">
                <Input label="Nom du produit" type="text" setValue={setName} value={name} autoFocus />

                <Input label="Description" type="text" setValue={setDescription} value={description} />

                <Input label="Prix" type="number" min="0" setValue={setPrice} value={price} />

                {/* TODO: why the select is smaller than the input ? */}
                <Select
                    label="Catégorie"
                    placeholder="Sélectionnez une catégorie"
                    options={createSelectOptions(categoryList, { label: "name", slug: "id" })}
                    setSelected={setCategoryId}
                    selected={categoryId}
                />

                <InputImage label="Image" onChange={handleImageChange} imagePreview={image} />

                <Feedback message={message} mode={mode} isFeedbackOpen={isFeedbackOpen} />

                <div className="flex justify-center">
                    <Button type="button" label="Créer le produit" isLoading={isLoading} onClick={handleSubmit}>
                        Créer le produit
                    </Button>
                </div>
            </form>
        </Card>
    );
}
