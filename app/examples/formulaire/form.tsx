"use client";

import Button from "@comps/ui/button";
import Combobox, { useComboboxStates } from "@comps/ui/comboboxes/combobox";
import ComboboxMulti, { useComboboxMultiStates } from "@comps/ui/comboboxes/comboboxMulti";
// import ComboboxSearch, { useComboboxStates } from "@comps/ui/comboboxes/comboboxSearch";
import { ComboOptionType, MultiComboOptionType } from "@comps/ui/comboboxes/utils";
import Feedback, { FeedbackMode } from "@comps/ui/feedback";
import Input, { useInputState } from "@comps/ui/input";
import InputImage from "@comps/ui/inputImage";
import Select from "@comps/ui/select/select";
import { SelectOptionType } from "@comps/ui/select/utils";
import { FormEvent, useState } from "react";

type FormProps = {
    categoryOptions: SelectOptionType[];
    articleOptions: ComboOptionType[];
    productOptions: MultiComboOptionType[];
};

export default function Form(props: FormProps) {
    const { categoryOptions, articleOptions, productOptions } = props;

    // State
    const [name, setName] = useInputState();
    const [category, setCategory] = useState<string>("");
    const [image, setImage] = useState<File | null>(null);
    const comboboxStates = useComboboxStates(null, articleOptions);
    const comboboxMultiStates = useComboboxMultiStates([], productOptions);

    // Feedback
    const [message, setMessage] = useState("");
    const [mode, setMode] = useState<FeedbackMode>("none");
    const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);

    // Loading
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        // Simulate latency
        await new Promise((resolve) => setTimeout(resolve, 500));

        // Print all states
        console.log({
            input: name,
            select: category,
            combobox: comboboxStates.selected?.slug,
            comboboxMulti: comboboxMultiStates.selected.map((option) => option.slug),
            inputImage: image?.name,
        });

        // Set feedback
        setMessage("Formulaire envoyé avec succès");
        setMode("success");
        setIsFeedbackOpen(true);

        // Reset loading
        setIsLoading(false);

        // Wait for feedback reset
        await new Promise((resolve) => setTimeout(resolve, 2000));

        // Reset feedback
        setIsFeedbackOpen(false);
    };

    return (
        <form className="flex flex-col items-center justify-center gap-4" onSubmit={handleSubmit}>
            <Input
                label="Nom"
                placeholder="Entrez votre nom"
                setValue={setName}
                value={name}
                classComponent="w-full"
                required={false}
            />
            <Select
                label="Catégorie"
                placeholder="Sélectionnez une catégorie"
                options={categoryOptions}
                setSelected={setCategory}
                selected={category}
                classComponent="w-full"
                canNotBeEmpty
            />
            <Combobox
                label="Article"
                placeholder="Sélectionnez un article"
                classComponent="w-full"
                initialOptions={articleOptions}
                states={comboboxStates}
            />
            <ComboboxMulti
                label="Produits"
                placeholder="Sélectionnez plusieurs produits"
                classComponent="w-full"
                initialOptions={productOptions}
                states={comboboxMultiStates}
            />
            <InputImage
                label="Image"
                onChange={setImage}
                imagePreview={image}
                classComponent="w-full"
                required={false}
            />
            <Feedback message={message} mode={mode} isFeedbackOpen={isFeedbackOpen} />
            <div className="flex justify-center">
                <Button type="submit" label="Envoyer" isLoading={isLoading} />
            </div>
        </form>
    );
}
