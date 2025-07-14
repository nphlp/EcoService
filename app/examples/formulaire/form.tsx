"use client";

import Button from "@comps/ui/button";
import Combobox, { OptionComboType } from "@comps/ui/combobox";
import ComboboxMulti, { OptionComboMultiType } from "@comps/ui/comboboxMulti";
import Feedback, { FeedbackMode } from "@comps/ui/feedback";
import Input from "@comps/ui/input";
import InputImage from "@comps/ui/inputImage";
import Select from "@comps/ui/select";
import { FormEvent, useState } from "react";
import { OptionShadCnType } from "./comboboxShadCn";

type FormProps = {
    categoryOptions: OptionShadCnType[];
    articleOptions: OptionComboType[];
    productOptions: OptionComboMultiType[];
};

export default function Form(props: FormProps) {
    const { categoryOptions, articleOptions, productOptions } = props;

    // State
    const [name, setName] = useState<string>("");
    const [category, setCategory] = useState<string>("");
    const [image, setImage] = useState<File | null>(null);

    // Combobox
    const initialSelection: string | null = null; // Get this from server
    const initialOption: OptionComboType[] = articleOptions; // Get this from server
    const [query, setQuery] = useState<string>("");
    const [selected, setSelected] = useState<string | null>(initialSelection);
    const [options, setOptions] = useState<OptionComboType[]>(initialOption);

    // ComboboxMulti
    const initialSelections: string[] = []; // Get this from server
    const initialOptions: OptionComboMultiType[] = productOptions; // Get this from server
    const [queryMulti, setQueryMulti] = useState<string>("");
    const [selectedMulti, setSelectedMulti] = useState<string[]>(initialSelections);
    const [optionsMulti, setOptionsMulti] = useState<OptionComboMultiType[]>(initialOptions);

    // Feedback
    const [message, setMessage] = useState("");
    const [mode, setMode] = useState<FeedbackMode>("none");
    const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);

    // Loading
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        await new Promise((resolve) => setTimeout(resolve, 500));

        const data = {
            input: name,
            select: category,
            combobox: selected,
            comboboxMulti: selectedMulti,
            inputImage: image?.name,
        };

        console.log(data);

        setMessage("Formulaire envoyé avec succès");
        setMode("success");
        setIsFeedbackOpen(true);

        setIsLoading(false);

        await new Promise((resolve) => setTimeout(resolve, 2000));

        setIsFeedbackOpen(false);
    };

    return (
        <form className="flex flex-col items-center justify-center gap-4" onSubmit={handleSubmit}>
            <Input
                label="Nom"
                placeholder="Entrez votre nom"
                onChange={(e) => setName(e.target.value)}
                value={name}
                classComponent="w-full"
                required={false}
            />
            <Select
                label="Catégorie"
                placeholder="Sélectionnez une catégorie"
                options={categoryOptions}
                onChange={(e) => setCategory(e.target.value)}
                value={category}
                classComponent="w-full"
                required={false}
            />
            <Combobox
                label="Article"
                placeholder="Sélectionnez un article"
                classComponent="w-full"
                initialOption={articleOptions}
                query={query}
                setQuery={setQuery}
                selected={selected}
                setSelected={setSelected}
                options={options}
                setOptions={setOptions}
            />
            <ComboboxMulti
                label="Produits"
                placeholder="Sélectionnez des produits"
                classComponent="w-full"
                initialOptions={productOptions}
                query={queryMulti}
                setQuery={setQueryMulti}
                selected={selectedMulti}
                setSelected={setSelectedMulti}
                options={optionsMulti}
                setOptions={setOptionsMulti}
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
