"use client";

import { CategoryType } from "@actions/types/Category";
import { combo } from "@lib/combo";
import { ChangeEventHandler, ReactNode, useContext } from "react";
import { CatalogContext } from "./contextProvider";
import { ItemsPerPageParamType, PriceOrderParamType } from "./filterTypes";
import { useCatalogParams } from "./useCatalogParams";

type SelectorsClientProps = {
    categoryList: CategoryType[];
};

export default function SelectorsClient(props: SelectorsClientProps) {
    const { categoryList } = props;

    const { productAmountLocal } = useContext(CatalogContext);
    const { priceOrder, page, take, category, setCategory, setPage, setPriceOrder, setTake } = useCatalogParams();

    const divClass = "w-full space-y-2";
    const labelClass = "text-sm text-gray-500 text-gray-200 ";
    const selectClass = "rounded-md border p-2 text-gray-700 shadow-sm w-full";

    return (
        <div className="grid grid-cols-2 gap-4 bg-primary px-6 py-4 md:grid-cols-4">
            <Select
                label="Catégorie"
                divClass={divClass}
                labelClass={labelClass}
                selectClass={selectClass}
                onChange={(e) => {
                    setPage(1);
                    setCategory(e.target.value);
                }}
                value={category}
            >
                <option value="">Toutes</option>
                {categoryList.map((category, index) => (
                    <option key={index} value={category.id}>
                        {category.name}
                    </option>
                ))}
            </Select>
            <Select
                label="Trier par prix"
                divClass={divClass}
                labelClass={labelClass}
                selectClass={selectClass}
                onChange={(e) => {
                    setPriceOrder(e.target.value as PriceOrderParamType["priceOrder"]);
                }}
                value={priceOrder}
            >
                <option value="not">Non trié</option>
                <option value="asc">Prix croissant</option>
                <option value="desc">Prix décroissant</option>
            </Select>
            <Select
                label="Page"
                divClass={divClass}
                labelClass={labelClass}
                selectClass={selectClass}
                onChange={(e) => {
                    setPage(Number(e.target.value));
                }}
                value={page}
            >
                {Array.from({ length: Math.ceil((productAmountLocal ?? 1) / take) }, (_, index) => (
                    <option key={index + 1} value={index + 1}>
                        {index + 1}
                    </option>
                ))}
            </Select>
            <Select
                label="Produits par page"
                divClass={divClass}
                labelClass={labelClass}
                selectClass={selectClass}
                onChange={(e) => {
                    setPage(1);
                    setTake(Number(e.target.value) as ItemsPerPageParamType["take"]);
                }}
                value={take}
            >
                <option value="10">10</option>
                <option value="20">20</option>
                <option value="50">50</option>
                <option value="100">100</option>
            </Select>
        </div>
    );
}

type SelectProps = {
    label: string;
    onChange: ChangeEventHandler<HTMLSelectElement>;
    value: string | number;
    divClass?: string;
    labelClass?: string;
    selectClass?: string;
    children: ReactNode;
};

const Select = (props: SelectProps) => {
    const { label, onChange, value, divClass, labelClass, selectClass, children } = props;

    return (
        <label className={combo(divClass)}>
            <div className={combo("text-sm text-gray-500", labelClass)}>{label}</div>
            <select
                className={combo("rounded-md border p-2 text-gray-700 shadow-sm", selectClass)}
                onChange={onChange}
                value={value}
            >
                {children}
            </select>
        </label>
    );
};
