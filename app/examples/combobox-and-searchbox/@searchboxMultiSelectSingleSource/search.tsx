"use client";

import Button from "@comps/UI/button/button";
import { useComboboxMultiStates } from "@comps/UI/comboboxes/comboHookStates";
import ComboboxMulti from "@comps/UI/comboboxes/comboboxMulti";
import { ComboOptionType, createComboOptions, deduplicateOptions } from "@comps/UI/comboboxes/utils";
import { useFetchV3 } from "@utils/FetchV3/FetchHookV3";
import { isEqual } from "lodash";
import { FormEvent, useEffect } from "react";

type ResearchProps = {
    initialOptions: ComboOptionType[];
};

export default function Search(props: ResearchProps) {
    const { initialOptions } = props;

    // States
    const comboboxStates = useComboboxMultiStates([], initialOptions);
    const { selected, query, options, setOptions } = comboboxStates;

    // Reactive fetch
    const { data: productData, isLoading: isLoadingProduct } = useFetchV3({
        route: "/internal/product/findMany",
        params: {
            select: { slug: true, name: true },
            where: {
                name: { contains: query },
                // Exclude already selected options from the search
                slug: { notIn: selected.map((option) => option.slug) },
            },
            take: 6,
        },
    });

    // Options updates
    useEffect(() => {
        // Required to avoid useEffect execution on initial render
        // and to keep initial options
        if (!productData) return;

        // Create formatted options from the fetched data
        const productOptions = createComboOptions(productData, { slug: "slug", name: "name" });

        // Merge options
        const mergedOptions = [...selected, ...productOptions];

        // Add "selected.length" to get selected options and 6 options more
        // Useful only if "displaySelectedValuesInDropdown" is enabled
        const newOptions = deduplicateOptions(mergedOptions, 6 + selected.length);

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
            <ComboboxMulti
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
