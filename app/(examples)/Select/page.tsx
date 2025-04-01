"use client";

import Button from "@comps/ui/Button";
import Feedback from "@comps/ui/Feedback";
import Input from "@comps/ui/Input";
import InputImage from "@comps/ui/InputImage";
import Select from "@comps/ui/Select";
import SelectUp from "@comps/ui/SelectUp";
import { useFetchV2 } from "@utils/FetchHookV2";
import { useState } from "react";

export default function Page() {

    const [image, setImage] = useState<File | null>(null);

    const { data: categoryList } = useFetchV2({
        fetchOnFirstRender: true,
        route: "/category",
        params: {
            select: {
                id: true,
                name: true,
            },
        },
    });

    const categoryOptions = categoryList?.map(({ id, name }) => ({
        label: name,
        value: id,
    })) ?? [];

    return (
        <div className="flex min-h-screen items-center justify-center">
            <form className="flex flex-col gap-4 w-[350px]">
                <Input label="Nom" placeholder="Entrez votre nom" />
                <Select label="Genre" placeholder="Sélectionnez un genre" options={categoryOptions} />
                <SelectUp label="Catégorie" placeholder="Sélectionnez une catégorie" options={categoryOptions} />
                <InputImage label="Image" onChange={setImage} imagePreview={image} />
                <Feedback message="Remplissez le formulaire" mode="info" />
                <Button label="Envoyer" />
            </form>
        </div>
    );
}
