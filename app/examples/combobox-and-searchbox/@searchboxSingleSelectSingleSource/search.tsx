"use client";

import Button from "@comps/ui/button";
import { useComboboxStates } from "@comps/ui/comboboxes/comboHookStates";
import Combobox from "@comps/ui/comboboxes/combobox";
import { ComboOptionType, createComboOptions, createSelectedOptions } from "@comps/ui/comboboxes/utils";
import { useFetchV2 } from "@utils/FetchV2/FetchHookV2";
import { isEqual } from "lodash";
import { FormEvent, useEffect } from "react";

type SearchProps = {
    initialOptions: ComboOptionType[];
};

export default function Search(props: SearchProps) {
    const { initialOptions } = props;

    // States
    const comboboxStates = useComboboxStates(null, initialOptions);
    const { selected, query, options, setOptions } = comboboxStates;

    // Reactive fetch
    const { data: productData, isLoading: isLoadingProduct } = useFetchV2({
        route: "/product/findMany",
        params: {
            select: { slug: true, name: true },
            where: {
                name: { contains: query },
                // Exclude already selected option from the search
                ...(selected && { slug: selected.slug }),
            },
            take: 6,
        },
    });

    // Options updates
    useEffect(() => {
        // Required to avoid useEffect execution on initial render
        // and to keep initial options
        if (!productData) return;

        // Create an options array from the selected state
        const selectedOptions = createSelectedOptions(selected);

        // Create formatted options from the fetched data
        const productOptions = createComboOptions(productData, { slug: "slug", name: "name" });

        // Merge options
        const newOptions = [...selectedOptions, ...productOptions];

        // Update options if different
        const areDifferent = !isEqual(newOptions, options);
        if (areDifferent) setOptions(newOptions);
    }, [productData, options, setOptions, selected]);

    const isLoading = isLoadingProduct;

    // Form submission
    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        console.log({ selected });
    };

    return (
        <form className="flex flex-col items-center justify-center gap-4" onSubmit={handleSubmit}>
            <Combobox
                label="Recherchez et sélectionnez"
                placeholder="Un produit, une catégorie ou un article..."
                classComponent="w-full"
                initialOptions={initialOptions}
                states={comboboxStates}
                isLoading={isLoading}
            />
            <div className="flex justify-center">
                <Button type="submit" label="Envoyer" />
            </div>
        </form>
    );
}
