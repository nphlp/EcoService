"use client";

import Button from "@comps/UI/button";
import { useComboboxStates } from "@comps/UI/comboboxes/comboHookStates";
import Combobox from "@comps/UI/comboboxes/combobox";
import { MultiSourceComboOptionType } from "@comps/UI/comboboxes/utils";
import { FormEvent } from "react";

type SearchProps = {
    initialOptions: MultiSourceComboOptionType[];
};

export default function Search(props: SearchProps) {
    const { initialOptions } = props;

    // States
    const comboboxStates = useComboboxStates(null, initialOptions);

    // Form submission
    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        console.log({ selected: comboboxStates.selected });
    };

    return (
        <form className="flex flex-col items-center justify-center gap-4" onSubmit={handleSubmit}>
            <Combobox
                label="Multi Source"
                placeholder="Sélectionnez un élément"
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
