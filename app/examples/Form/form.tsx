"use client";

import Card from "@comps/server/card";
import Button from "@comps/ui/button";
import Feedback, { FeedbackMode } from "@comps/ui/feedback";
import Input from "@comps/ui/input";
import InputImage from "@comps/ui/inputImage";
import Select from "@comps/ui/select";
import SelectUp, { OptionsType } from "@comps/ui/selectUp";
import { FormEvent, useState } from "react";
import Info from "./info";

type FormProps = {
    categoryOptions: OptionsType[];
    productOptions: OptionsType[];
};

export default function Form(props: FormProps) {
    const { categoryOptions, productOptions } = props;

    const [name, setName] = useState<string>("");
    const [category, setCategory] = useState<string>("");
    const [product, setProduct] = useState<string>("");
    const [image, setImage] = useState<File | null>(null);

    const [message, setMessage] = useState("");
    const [mode, setMode] = useState<FeedbackMode>("none");
    const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);

    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        await new Promise((resolve) => setTimeout(resolve, 500));

        console.log("Name:", name, "\nCategory:", category, "\nProduct:", product, "\nImage:", image?.name);

        setMessage("Formulaire envoyé avec succès");
        setMode("success");
        setIsFeedbackOpen(true);

        setIsLoading(false);

        await new Promise((resolve) => setTimeout(resolve, 2000));

        setIsFeedbackOpen(false);
    };

    return (
        <Card className="w-[450px] space-y-4">
            <Info />
            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                <Input
                    label="Nom"
                    placeholder="Entrez votre nom"
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                    required={false}
                />
                <Select
                    label="Catégorie"
                    placeholder="Sélectionnez une catégorie"
                    options={categoryOptions}
                    onChange={(e) => setCategory(e.target.value)}
                    value={category}
                    required={false}
                />
                <SelectUp
                    label="Produit"
                    placeholder="Sélectionnez un produit"
                    options={productOptions}
                    onSelectValueChange={setProduct}
                    required={false}
                />
                <InputImage label="Image" onChange={setImage} imagePreview={image} required={false} />
                <Feedback message={message} mode={mode} isFeedbackOpen={isFeedbackOpen} />
                <div className="flex justify-center">
                    <Button type="submit" label="Envoyer" isLoading={isLoading} />
                </div>
            </form>
        </Card>
    );
}
