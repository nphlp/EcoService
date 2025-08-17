"use client";

import Button from "@comps/ui/button";
import Combobox, { useComboboxStates } from "@comps/ui/comboboxes/combobox";
import { ComboOptionType } from "@comps/ui/comboboxes/utils";
import { FormEvent } from "react";

type SearchProps = {
    initialOptions: ComboOptionType[];
};

export default function Search(props: SearchProps) {
    const { initialOptions } = props;

    const comboboxStates = useComboboxStates(null, initialOptions);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        console.log({ selected: comboboxStates.selected });
    };

    return (
        <form className="flex flex-col items-center justify-center gap-4" onSubmit={handleSubmit}>
            <Combobox
                label="Produit"
                placeholder="Sélectionnez un produit"
                classComponent="w-full"
                initialOptions={initialOptions}
                states={comboboxStates}
            />
            <div className="flex justify-center">
                <Button type="submit" label="Envoyer" />
            </div>
        </form>
    );
}
