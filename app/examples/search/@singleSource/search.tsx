"use client";

import Button from "@comps/ui/button";
import ComboboxSearch, { useComboboxStates } from "@comps/ui/comboboxes/comboboxSearch";
import { createOptions, createSelectedOptions, deduplicateOptions, OptionComboType } from "@comps/ui/comboboxes/utils";
import { useFetchV2 } from "@utils/FetchV2/FetchHookV2";
import { isEqual } from "lodash";
import { FormEvent, useEffect } from "react";

type ResearchProps = {
    initialOptions: OptionComboType[];
};

export default function Search(props: ResearchProps) {
    const { initialOptions } = props;

    // ======= State ======= //
    const comboboxStates = useComboboxStates(null, initialOptions);
    const { selected, query, options, setOptions } = comboboxStates;

    // ======= Fetch ======= //
    const { data: productData, isLoading: isLoadingProduct } = useFetchV2({
        route: "/product/findMany",
        params: {
            select: { slug: true, name: true },
            where: { name: { contains: query } },
            take: 10,
        },
    });

    // ======= Updates ======= //
    useEffect(() => {
        // Required to avoid useEffect execution on initial render
        // and to keep initial options
        if (!productData) return;

        // Create an options with the selected state
        const selectedOptions = createSelectedOptions(selected, options);

        // Create formatted options from the fetched data
        const productOptions = createOptions(productData);

        // Merge options
        const mergedOptions = [...selectedOptions, ...productOptions];
        const newOptions = deduplicateOptions({ mergedOptions, limit: 10 });

        // Update options if different
        const areDifferent = !isEqual(newOptions, options);
        if (areDifferent) setOptions(newOptions);
    }, [productData, options, setOptions, selected]);

    const isLoading = isLoadingProduct;

    // ======= Form ======= //
    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        console.log({ selected });
    };

    return (
        <form className="flex flex-col items-center justify-center gap-4" onSubmit={handleSubmit}>
            <ComboboxSearch
                label="Recherchez et sélectionnez"
                placeholder="Un produit, une catégorie ou un article..."
                classComponent="w-full"
                states={comboboxStates}
                isLoading={isLoading}
            />
            <div className="flex justify-center">
                <Button type="submit" label="Envoyer" />
            </div>
        </form>
    );
}
