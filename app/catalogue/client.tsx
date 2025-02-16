"use client";

import { SelectProductList } from "@actions/database/Product";
import { ProductType } from "@actions/types/Product";
import Card from "@comps/server/Card";
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

    const fetchProduitList = async () => {
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
    };

    useEffect(() => {
        fetchProduitList();
    }, [priceOrder, page]);

    console.log("Rendering");

    return (
        <section>
            <div>
                <h2 className="text-lg font-semibold">Filtre</h2>
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

            {!loading && produitList ? (
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
                    {produitList.map((produit, index) => (
                        <Card
                            key={index}
                            className="rounded-xl bg-white p-4 shadow-lg"
                        >
                            <h2 className="text-lg font-semibold">
                                {produit.name}
                            </h2>
                            <p className="text-gray-600">
                                Prix : {produit.price} €
                            </p>
                        </Card>
                    ))}
                </div>
            ) : (
                <div className="mt-6 text-center text-gray-500">
                    Aucun produit disponible pour le moment.
                </div>
            )}
            {loading && (
                <div className="mt-6 text-center text-gray-500">
                    Chargement...
                </div>
            )}
        </section>
    );
}
