"use client";

import { ProductType } from "@actions/types/Product";
import Card from "@comps/server/Card";
import Loader from "@comps/server/Loader";
import { combo } from "@lib/combo";
import { useQueryState } from "nuqs";
import { useEffect, useState } from "react";
import { PageParam, PriceOrderParam } from "./type";
import { SelectProductList } from "@actions/database/Product";

type CatalogueClientProps = {
    produitList: ProductType[] | null;
    take: number;
};

// Composant client
export default function CatalogueClient(props: CatalogueClientProps) {
    const { produitList: produitListInit, take } = props;

    const [produitList, setProduitList] = useState(produitListInit);
    const [loading, setLoading] = useState(false);

    // Filters, inital state are retrieved in the url
    const [priceOrder, setPriceOrder] = useQueryState(
        "priceOrder",
        PriceOrderParam["priceOrder"],
    );
    const [page, setPage] = useQueryState("page", PageParam["page"]);

    // Fetch data from database
    // TODO: optimize re-render amount
    useEffect(() => {
        (async () => {
            setLoading(true);

            const newProductList = await SelectProductList({
                ...(priceOrder !== "" && {
                    orderBy: { price: priceOrder as "asc" | "desc" },
                }),
                ...(page > 1 && {
                    skip: (page - 1) * take,
                }),
                take,
            });

            if (newProductList) {
                setProduitList(newProductList);
            }

            setLoading(false);
        })();
    }, [priceOrder, take, page]);

    console.log("Rendering");

    return (
        <div className="flex h-full flex-col justify-start gap-4 overflow-hidden">
            <div className="flex flex-row items-center justify-start gap-4 px-4">
                <select
                    className="rounded-md border p-2 text-gray-700 shadow-sm"
                    onChange={(e) => setPriceOrder(e.target.value)}
                    value={priceOrder}
                >
                    <option value="">Non trié</option>
                    <option value="asc">Prix croissant</option>
                    <option value="desc">Prix décroissant</option>
                </select>
                <select
                    className="rounded-md border p-2 text-gray-700 shadow-sm"
                    onChange={(e) => setPage(Number(e.target.value))}
                    value={page}
                >
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                </select>
            </div>

            {!loading ? (
                // TODO: Fix scroll bottom cutted edge
                <ProductList produitList={produitList} className="flex-1 space-y-4 overflow-y-auto px-4" />
            ) : (
                <div className="flex w-full flex-1 items-center justify-center px-4">
                    <Loader className="size-8 border-4" />
                </div>
            )}
        </div>
    );
}

type ProductListProps = {
    produitList: ProductType[] | null;
    className?: string;
};

const ProductList = (props: ProductListProps) => {
    const { produitList, className } = props;

    return produitList ? (
        <div className={combo(
            // "grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3",
            className)}>
            {produitList.map((produit, index) => (
                <Card key={index} className="h-[200px] rounded-xl bg-white p-4 shadow-lg">
                    <h2 className="text-lg font-semibold">{produit.name}</h2>
                    <p className="text-gray-600">Prix : {produit.price} €</p>
                </Card>
            ))}
        </div>
    ) : (
        <div className="flex size-full items-center justify-center">
            Aucun produit disponible pour le moment.
        </div>
    );
};
