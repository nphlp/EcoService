"use client";

import { SelectProductList } from "@actions/database/Product";
import { ProductType } from "@actions/types/Product";
import Card from "@comps/server/Card";
import Loader from "@comps/server/Loader";
import { useQueryState } from "nuqs";
import { useEffect, useState } from "react";
import { PageParam, PriceOrderParam } from "./type";

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
        <section className="h-full space-y-4">
            <div className="flex flex-row items-center justify-start gap-4">
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
                <ProductList produitList={produitList} />
            ) : (
                <div className="flex size-full items-center justify-center">
                    <Loader className="size-8 border-4" />
                </div>
            )}
        </section>
    );
}

type ProductListProps = {
    produitList: ProductType[] | null;
};

const ProductList = (props: ProductListProps) => {
    const { produitList } = props;

    return produitList ? (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {produitList.map((produit, index) => (
                <Card key={index} className="rounded-xl bg-white p-4 shadow-lg">
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
