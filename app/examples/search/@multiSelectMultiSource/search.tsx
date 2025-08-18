"use client";

import Button from "@comps/ui/button";
import { useComboboxSearchMultiStates } from "@comps/ui/comboboxes/comboHookStates";
import ComboboxSearchMulti from "@comps/ui/comboboxes/comboboxSearchMulti";
import { MultiSourceComboOptionType, createComboOptions, deduplicateOptions } from "@comps/ui/comboboxes/utils";
import { useFetchV2 } from "@utils/FetchV2/FetchHookV2";
import { isEqual } from "lodash";
import { FormEvent, useEffect } from "react";

type SearchProps = {
    initialOptions: MultiSourceComboOptionType[];
};

export default function Search(props: SearchProps) {
    const { initialOptions } = props;

    // ======= State ======= //
    const comboboxStates = useComboboxSearchMultiStates([], initialOptions);
    const { selected, query, options, setOptions } = comboboxStates;

    // ======= Fetch ======= //
    const { data: productData, isLoading: isLoadingProduct } = useFetchV2({
        route: "/product/findMany",
        params: {
            select: { slug: true, name: true },
            where: {
                name: { contains: query },
                // Exclude already selected options from the search
                slug: { notIn: selected.map((option) => option.slug) },
            },
            take: 10,
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
            take: 10,
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
            take: 10,
        },
    });

    const { data: diyData, isLoading: isLoadingDiy } = useFetchV2({
        route: "/diy/findMany",
        params: {
            select: { slug: true, title: true },
            where: {
                title: { contains: query },
                // Exclude already selected options from the search
                slug: { notIn: selected.map((option) => option.slug) },
            },
            take: 10,
        },
    });

    // ======= Updates ======= //
    useEffect(() => {
        // Required to avoid useEffect execution on initial render
        // and to keep initial options
        if (!productData) return;

        // Create formatted options from the fetched data
        const productOptions = createComboOptions(productData, { slug: "slug", name: "name", type: "product" });
        const categoryOptions = createComboOptions(categoryData, { slug: "slug", name: "name", type: "category" });
        const articleOptions = createComboOptions(articleData, { slug: "slug", name: "title", type: "article" });
        const diyOptions = createComboOptions(diyData, { slug: "slug", name: "title", type: "diy" });

        // Merge options
        const mergedOptions = [...selected, ...productOptions, ...categoryOptions, ...articleOptions, ...diyOptions];

        // Add selected length to get 10 options more
        const newOptions = deduplicateOptions(mergedOptions, 10 + selected.length);

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
            <ComboboxSearchMulti
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
