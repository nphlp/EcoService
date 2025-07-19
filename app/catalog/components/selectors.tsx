"use client";

import Input from "@comps/ui/input";
import Select from "@comps/ui/select";
import { CategoryModel } from "@services/types";
import { SearchParamsType } from "./queryParamsConfig";
import { useCatalogParams } from "./queryParamsHook";

type SelectorsProps = {
    categoryList: CategoryModel[];
};

export default function Selectors(props: SelectorsProps) {
    const { categoryList } = props;

    // TODO: rework selectors to get a cancel cross button

    const { priceOrder, take, category, setCategory, setPage, setPriceOrder, setTake, search, setSearch } =
        useCatalogParams();

    return (
        <div className="bg-eco grid grid-cols-2 gap-5 p-6 md:grid-cols-4">
            <Select
                label="Catégorie"
                classLabel="text-white"
                options={categoryList.map((category) => ({ label: category.name, value: category.slug }))}
                onChange={(e) => {
                    const value: string = e.target.value;
                    setCategory(value);
                    setPage(1);
                }}
                value={category}
            />
            <Select
                label="Trier par prix"
                classLabel="text-white"
                options={[
                    { label: "Non trié", value: "not" },
                    { label: "Prix croissant", value: "asc" },
                    { label: "Prix décroissant", value: "desc" },
                ]}
                onChange={(e) => {
                    const value = e.target.value;
                    setPriceOrder(value as SearchParamsType["priceOrder"]);
                }}
                value={priceOrder}
            />
            <Select
                label="Produits par page"
                classLabel="text-white"
                options={[
                    { label: "10", value: "10" },
                    { label: "20", value: "20" },
                    { label: "50", value: "50" },
                    { label: "100", value: "100" },
                ]}
                onChange={(e) => {
                    const value = e.target.value;
                    setTake(Number(value) as SearchParamsType["take"]);
                    setPage(1);
                }}
                value={take}
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
