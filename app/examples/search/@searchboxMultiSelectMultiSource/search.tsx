"use client";

import Button from "@comps/ui/button";
import { useComboboxMultiStates } from "@comps/ui/comboboxes/comboHookStates";
import ComboboxMulti from "@comps/ui/comboboxes/comboboxMulti";
import { MultiSourceComboOptionType, createComboOptions, deduplicateOptions } from "@comps/ui/comboboxes/utils";
import { useFetchV2 } from "@utils/FetchV2/FetchHookV2";
import { isEqual } from "lodash";
import { FormEvent, useEffect } from "react";

type SearchProps = {
    initialOptions: MultiSourceComboOptionType[];
};

export default function Search(props: SearchProps) {
    const { initialOptions } = props;

    // States
    const comboboxStates = useComboboxMultiStates([], initialOptions);
    const { selected, query, options, setOptions } = comboboxStates;

    // Reactive fetches
    const { data: productData, isLoading: isLoadingProduct } = useFetchV2({
        route: "/product/findMany",
        params: {
            select: { slug: true, name: true },
            where: {
                name: { contains: query },
                // Exclude already selected options from the search
                slug: { notIn: selected.map((option) => option.slug) },
            },
            take: 2,
        },
    });

    const { data: categoryData, isLoading: isLoadingCategory } = useFetchV2({
        route: "/category/findMany",
        params: {
            select: { slug: true, name: true },
            where: {
                name: { contains: query },
                // Exclude already selected options from the search
                slug: { notIn: selected.map((option) => option.slug) },
            },
            take: 2,
        },
    });

    const { data: articleData, isLoading: isLoadingArticle } = useFetchV2({
        route: "/article/findMany",
        params: {
            select: { slug: true, title: true },
            where: {
                title: { contains: query },
                // Exclude already selected options from the search
                slug: { notIn: selected.map((option) => option.slug) },
            },
            take: 2,
        },
    });

    // Options updates
    useEffect(() => {
        // Required to avoid useEffect execution on initial render
        // and to keep initial options
        if (!productData) return;

        // Create formatted options from the fetched data
        const productOptions = createComboOptions(productData, { slug: "slug", name: "name", type: "product" });
        const categoryOptions = createComboOptions(categoryData, { slug: "slug", name: "name", type: "category" });
        const articleOptions = createComboOptions(articleData, { slug: "slug", name: "title", type: "article" });

        // Merge options
        const mergedOptions = [...selected, ...productOptions, ...categoryOptions, ...articleOptions];

        // Add "selected.length" to get selected options and 6 options more
        // Useful only if "displaySelectedValuesInDropdown" is enabled
        const newOptions = deduplicateOptions(mergedOptions, 6 + selected.length);

        // Update options if different
        const areDifferent = !isEqual(newOptions, options);
        if (areDifferent) setOptions(newOptions);
    }, [productData, categoryData, articleData, options, setOptions, selected]);

    const isLoading = isLoadingProduct || isLoadingCategory || isLoadingArticle;

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
