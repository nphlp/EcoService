"use client";

import { FilterContext } from "./FilterProvider";

import { useContext } from "react";

type FilterSelectClientProps = {
    productAmount: number;
};

export default function FilterSelectClient(props: FilterSelectClientProps) {
    const { productAmount } = props;

    const { priceOrder, setPriceOrder, page, setPage, take, setTake } =
        useContext(FilterContext);

    const pageAmount = Math.ceil(productAmount / take);

    return (
        <div className="flex flex-row items-center justify-start gap-4 px-4">
            <label>
                <div className="text-sm text-gray-500">Trier par prix</div>
                <select
                    className="rounded-md border p-2 text-gray-700 shadow-sm"
                    onChange={(e) =>
                        setPriceOrder(e.target.value as "asc" | "desc" | "not")
                    }
                    value={priceOrder}
                >
                    <option value="not">Non trié</option>
                    <option value="asc">Prix croissant</option>
                    <option value="desc">Prix décroissant</option>
                </select>
            </label>
            <label>
                <div className="text-sm text-gray-500">Page</div>
                <select
                    className="rounded-md border p-2 text-gray-700 shadow-sm"
                    onChange={(e) => setPage(Number(e.target.value))}
                    value={page}
                >
                    {Array.from({ length: pageAmount }, (_, index) => (
                        <option key={index + 1} value={index + 1}>
                            {index + 1}
                        </option>
                    ))}
                </select>
            </label>
            <label>
                <div className="text-sm text-gray-500">Produits par page</div>
                <select
                    className="rounded-md border p-2 text-gray-700 shadow-sm"
                    onChange={(e) =>
                        setTake(Number(e.target.value) as 10 | 20 | 50 | 100)
                    }
                    value={take}
                >
                    <option value="10">10</option>
                    <option value="20">20</option>
                    <option value="50">50</option>
                    <option value="100">100</option>
                </select>
            </label>
        </div>
    );
}
