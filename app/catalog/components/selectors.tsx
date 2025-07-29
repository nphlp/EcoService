"use client";

import Input from "@comps/ui/input";
import Select from "@comps/ui/select/select";
import { createSelectOptions } from "@comps/ui/select/utils";
import { CategorySearchType } from "./fetchParams";
import { SearchParamsType } from "./queryParamsConfig";
import { useCatalogParams } from "./queryParamsHook";

type SelectorsProps = {
    categoryList: CategorySearchType[];
};

export default function Selectors(props: SelectorsProps) {
    const { categoryList } = props;

    const { priceOrder, take, category, setCategory, setPage, setPriceOrder, setTake, search, setSearch } =
        useCatalogParams();

    return (
        <div className="bg-primary grid grid-cols-2 gap-5 p-6 md:grid-cols-4">
            <Select
                label="Catégorie"
                classLabel="text-white"
                options={createSelectOptions(categoryList, { label: "name", slug: "slug" })}
                setSelected={(value) => {
                    setCategory(value);
                    setPage(1);
                }}
                selected={category}
            />
            <Select
                label="Trier par prix"
                placeholder="Non trié"
                classLabel="text-white"
                options={[
                    { label: "Prix croissant", slug: "asc" },
                    { label: "Prix décroissant", slug: "desc" },
                ]}
                setSelected={(value) => {
                    setPriceOrder(value as SearchParamsType["priceOrder"]);
                }}
                selected={priceOrder}
            />
            <Select
                label="Produits par page"
                classLabel="text-white"
                options={[
                    { label: "10", slug: "10" },
                    { label: "20", slug: "20" },
                    { label: "50", slug: "50" },
                    { label: "100", slug: "100" },
                ]}
                setSelected={(value) => {
                    setTake(Number(value) as SearchParamsType["take"]);
                    setPage(1);
                }}
                selected={String(take)}
                canNotBeEmpty
            />
            <Input
                label="Rechercher"
                placeholder="Rechercher"
                classLabel="text-white"
                value={search}
                setValue={setSearch}
            />
        </div>
    );
}
