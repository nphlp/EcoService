"use client";

import Button from "@comps/ui/button";
import ComboboxSearch, { useComboboxStates } from "@comps/ui/comboboxes/comboboxSearch";
import { createOptions, createSelectedOptions, deduplicateOptions, OptionComboType } from "@comps/ui/comboboxes/utils";
import { useFetchV2 } from "@utils/FetchV2/FetchHookV2";
import { isEqual } from "lodash";
import { FormEvent, useEffect } from "react";

type ResearchProps<T extends string | undefined> = {
    initialOptions: OptionComboType<T | undefined>[];
};

export default function Search<T extends string | undefined>(props: ResearchProps<T>) {
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
            take: 5,
        },
    });

    const { data: categoryData, isLoading: isLoadingCategory } = useFetchV2({
        route: "/category/findMany",
        params: {
            select: { slug: true, name: true },
            where: { name: { contains: query } },
            take: 5,
        },
    });

    const { data: articleData, isLoading: isLoadingArticle } = useFetchV2({
        route: "/article/findMany",
        params: {
            select: { slug: true, title: true },
            where: { title: { contains: query } },
            take: 5,
        },
    });

    const { data: diyData, isLoading: isLoadingDiy } = useFetchV2({
        route: "/diy/findMany",
        params: {
            select: { slug: true, title: true },
            where: { title: { contains: query } },
            take: 5,
        },
    });

    // ======= Updates ======= //
    useEffect(() => {
        // Required to avoid useEffect execution on initial render
        // and to keep initial options
        if (!articleData && !categoryData && !productData) return;

        // Create an options with the selected state
        const selectedOptions = createSelectedOptions(selected, options);

        // Create formatted options from the fetched data
        const productOptions = createOptions(productData, "product");
        const categoryOptions = createOptions(categoryData, "category");
        const articleOptions = createOptions(articleData, "article");
        const diyOptions = createOptions(diyData, "diy");

        // Merge options
        const mergedOptions = [
            ...selectedOptions,
            ...productOptions,
            ...categoryOptions,
            ...articleOptions,
            ...diyOptions,
        ] as OptionComboType<T>[];

        const newOptions = deduplicateOptions<T>({
            mergedOptions,
            limit: 10,
        });

        // Update options if different
        const areDifferent = !isEqual(newOptions, options);
        if (areDifferent) setOptions(newOptions);
    }, [productData, categoryData, articleData, diyData, options, setOptions, selected]);

    const isLoading = isLoadingProduct || isLoadingCategory || isLoadingArticle || isLoadingDiy;

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
