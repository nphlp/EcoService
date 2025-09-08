"use client";

import Button from "@comps/UI/button/button";
import { useComboboxStates } from "@comps/UI/comboboxes/comboHookStates";
import Combobox from "@comps/UI/comboboxes/combobox";
import { MultiSourceComboOptionType, createComboOptions, createSelectedOptions } from "@comps/UI/comboboxes/utils";
import { useFetchV3 } from "@utils/FetchV3/FetchHookV3";
import { isEqual } from "lodash";
import { FormEvent, useEffect } from "react";

type SearchProps = {
    initialOptions: MultiSourceComboOptionType[];
};

export default function Search(props: SearchProps) {
    const { initialOptions } = props;

    // States
    const comboboxStates = useComboboxStates(null, initialOptions);
    const { selected, query, options, setOptions } = comboboxStates;

    // Reactive fetches
    const { data: productData, isLoading: isLoadingProduct } = useFetchV3({
        route: "/internal/product/findMany",
        params: {
            select: { slug: true, name: true },
            where: {
                name: { contains: query },
                // Exclude already selected option from the search
                ...(selected && { slug: selected.slug }),
            },
            take: 2,
        },
    });

    const { data: categoryData, isLoading: isLoadingCategory } = useFetchV3({
        route: "/internal/category/findMany",
        params: {
            select: { slug: true, name: true },
            where: {
                name: { contains: query },
                // Exclude already selected option from the search
                ...(selected && { slug: selected.slug }),
            },
            take: 2,
        },
    });

    const { data: articleData, isLoading: isLoadingArticle } = useFetchV3({
        route: "/internal/article/findMany",
        params: {
            select: { slug: true, title: true },
            where: {
                title: { contains: query },
                // Exclude already selected option from the search
                ...(selected && { slug: selected.slug }),
            },
            take: 2,
        },
    });

    // Options updates
    useEffect(() => {
        // Required to avoid useEffect execution on initial render
        // and to keep initial options
        if (!articleData && !categoryData && !productData) return;

        // Create an options with the selected state
        const selectedOptions = createSelectedOptions(selected);

        // Create formatted options from the fetched data
        const productOptions = createComboOptions(productData, { slug: "slug", name: "name", type: "product" });
        const categoryOptions = createComboOptions(categoryData, { slug: "slug", name: "name", type: "category" });
        const articleOptions = createComboOptions(articleData, { slug: "slug", name: "title", type: "article" });

        // Merge options
        const newOptions = [...selectedOptions, ...productOptions, ...categoryOptions, ...articleOptions];

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
