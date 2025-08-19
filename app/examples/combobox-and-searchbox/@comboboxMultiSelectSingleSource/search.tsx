"use client";

import Button from "@comps/UI/button";
import { useComboboxMultiStates } from "@comps/UI/comboboxes/comboHookStates";
import ComboboxMulti from "@comps/UI/comboboxes/comboboxMulti";
import { ComboOptionType } from "@comps/UI/comboboxes/utils";
import { FormEvent } from "react";

type SearchProps = {
    initialOptions: ComboOptionType[];
};

export default function Search(props: SearchProps) {
    const { initialOptions } = props;

    // States
    const comboboxStates = useComboboxMultiStates([], initialOptions);

    // Form submission
    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        console.log({ selected: comboboxStates.selected });
    };

    return (
        <form className="flex flex-col items-center justify-center gap-4" onSubmit={handleSubmit}>
            <ComboboxMulti
                label="Produit"
                placeholder="Sélectionnez un produit"
                classComponent="w-full"
                initialOptions={initialOptions}
                states={comboboxStates}
                displaySelectedValuesInDropdown
            />
            <div className="flex justify-center">
                <Button type="submit" label="Envoyer" />
            </div>
        </form>
    );
}
