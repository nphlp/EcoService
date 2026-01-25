"use client";

import Button from "@comps/UI/button/button";
import Card from "@comps/UI/card";
import Feedback, { FeedbackMode } from "@comps/UI/feedback";
import Input from "@comps/UI/input/input";
import InputImage from "@comps/UI/inputImage";
import Select from "@comps/UI/select/select";
import { createSelectOptions } from "@comps/UI/select/utils";
import { Prisma } from "@prisma/client/client";
import { authorizedFileSize, authorizedFormats } from "@utils/image-validation";
import { useState } from "react";
import Stripe from "stripe";
import { UpdateProductInStripeProcess } from "@/process/UpdateProductInStripeProcess";

type ProductEditFormProps = {
    product: Stripe.Product;
    currentPrice: number;
    categoryList: Prisma.CategoryGetPayload<{ select: { id: true; name: true } }>[];
};

export default function ProductEditForm(props: ProductEditFormProps) {
    const { product, currentPrice, categoryList } = props;

    // Input states (initialized with current product data)
    const [name, setName] = useState<string>(product.name);
    const [description, setDescription] = useState<string>(product.description ?? "");
    const [price, setPrice] = useState<string>(currentPrice.toString());
    const [categoryId, setCategoryId] = useState<string>(product.metadata?.categoryId ?? "");
    const [image, setImage] = useState<File | null>(null);

    // Feedback
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [mode, setMode] = useState<FeedbackMode>("none");
    const [message, setMessage] = useState<string>("");
    const [isFeedbackOpen, setIsFeedbackOpen] = useState<boolean>(false);

    const handleImageChange = (file: File | null) => {
        if (!file) return setImage(null);

        if (!authorizedFormats.includes(file.type.replace("image/", ""))) {
            setMode("warning");
            setMessage("Format de l'image non autorisé");
            setIsFeedbackOpen(true);
            return;
        }

        if (file.size > authorizedFileSize) {
            setMode("warning");
            setMessage("La taille de l'image est trop grande");
            setIsFeedbackOpen(true);
            return;
        }

        setImage(file);
    };

    const handleSubmit = async () => {
        try {
            setIsLoading(true);

            if (!name || !description || !price || !categoryId) {
                setMode("warning");
                setMessage("Veuillez remplir tous les champs");
                setIsFeedbackOpen(true);
                return;
            }

            const { status, message } = await UpdateProductInStripeProcess({
                productId: product.id,
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

    // Get current image URL
    const currentImageUrl = product.images?.[0] ?? product.metadata?.localImage ?? "";

    return (
        <Card className="rounded-3xl p-8 md:w-[600px]">
            <form className="space-y-4">
                <Input label="Nom du produit" type="text" setValue={setName} value={name} autoFocus />

                <Input label="Description" type="text" setValue={setDescription} value={description} />

                <Input label="Prix" type="number" min="0" setValue={setPrice} value={price} />

                <Select
                    label="Catégorie"
                    placeholder="Sélectionnez une catégorie"
                    options={createSelectOptions(categoryList, { label: "name", slug: "id" })}
                    setSelected={setCategoryId}
                    selected={categoryId}
                />

                <InputImage
                    label="Image"
                    onChange={handleImageChange}
                    imagePreview={image}
                    existingImageUrl={!image ? currentImageUrl : undefined}
                />

                <Feedback message={message} mode={mode} isFeedbackOpen={isFeedbackOpen} />

                <div className="flex justify-center">
                    <Button type="button" label="Mettre à jour le produit" isLoading={isLoading} onClick={handleSubmit}>
                        Mettre à jour le produit
                    </Button>
                </div>
            </form>
        </Card>
    );
}
