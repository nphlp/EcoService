"use client";

import Button from "@comps/ui/button";
import { useComboboxMultiStates } from "@comps/ui/comboboxes/comboHookStates";
import ComboboxMulti from "@comps/ui/comboboxes/comboboxMulti";
import { MultiSourceComboOptionType } from "@comps/ui/comboboxes/utils";
import { FormEvent } from "react";

type SearchProps = {
    initialOptions: MultiSourceComboOptionType[];
};

export default function Search(props: SearchProps) {
    const { initialOptions } = props;

    const comboboxStates = useComboboxMultiStates([], initialOptions);

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
            />
            <div className="flex justify-center">
                <Button type="submit" label="Envoyer" />
            </div>
        </form>
    );
}
