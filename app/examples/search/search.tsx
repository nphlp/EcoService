"use client";

import Button from "@comps/ui/button";
import ComboboxSearch, { useComboboxStates } from "@comps/ui/comboboxes/comboboxSearch";
import {
    createOptions,
    createSelectedOptions,
    mergeAndDeduplicateOptions,
    OptionComboType,
} from "@comps/ui/comboboxes/utils";
import { useFetchV2 } from "@utils/FetchV2/FetchHookV2";
import { isEqual } from "lodash";
import { FormEvent, useEffect } from "react";

type ResearchProps = {
    productOptions: OptionComboType[];
};

export default function Search(props: ResearchProps) {
    const { productOptions } = props;

    // ======= State ======= //
    const comboboxStates = useComboboxStates(null, productOptions);
    const { selected, query, options, setOptions } = comboboxStates;

    // ======= Fetch ======= //
    const { data: productData, isLoading: isLoadingProduct } = useFetchV2({
        route: "/product/findMany",
        params: {
            select: { slug: true, name: true },
            where: { name: { contains: query } },
            take: 8,
        },
    });

    const { data: categoryData, isLoading: isLoadingCategory } = useFetchV2({
        route: "/category/findMany",
        params: {
            select: { slug: true, name: true },
            where: { name: { contains: query } },
            take: 8,
        },
    });

    const { data: articleData, isLoading: isLoadingArticle } = useFetchV2({
        route: "/article/findMany",
        params: {
            select: { slug: true, title: true },
            where: { title: { contains: query } },
            take: 8,
        },
    });

    // ======= Updates ======= //
    useEffect(() => {
        // Create an options with the selected state
        const selectedOptions = createSelectedOptions(selected, options);

        // Create formatted options from the fetched data
        const productOptions = createOptions(productData);
        const categoryOptions = createOptions(categoryData);
        const articleOptions = createOptions(articleData);

        // Merge options
        const optionsToMerge = [...selectedOptions, ...productOptions, ...categoryOptions, ...articleOptions];
        const newOptions = mergeAndDeduplicateOptions({ optionsToMerge, limit: 10 });

        // Update options if different
        const areDifferent = !isEqual(newOptions, options);
        if (areDifferent) setOptions(newOptions);
    }, [productData, categoryData, articleData, options, setOptions, selected]);

    const isLoading = isLoadingProduct || isLoadingCategory || isLoadingArticle;

    // ======= Form ======= //
    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        console.log({ selected });
    };

    return (
        <form className="flex flex-col items-center justify-center gap-4" onSubmit={handleSubmit}>
            <ComboboxSearch
                label="Produits"
                placeholder="Recherchez un produit"
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
