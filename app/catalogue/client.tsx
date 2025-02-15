"use client";

import { SelectProductList } from "@actions/database/Product";
import { ProductType } from "@actions/types/Product";
import Card from "@comps/server/Card";
import { useEffect, useState } from "react";

type CatalogueClientProps = {
    produitList: ProductType[] | null;
};

// Composant client
export default function CatalogueClient(props: CatalogueClientProps) {
    const produitListInit = props.produitList;

    type OrderType = "asc" | "desc" | "";

    const [produitList, setProduitList] = useState(produitListInit);
    const [order, setOrder] = useState<OrderType>("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchProduitList = async () => {
            setLoading(true);
            const newProductList = await SelectProductList({
                ...(order && { orderBy: { price: order } })
            });
            if (!newProductList) return;
            setProduitList(newProductList);
            setLoading(false);
        };
        
        fetchProduitList();
    }, [order]);

    return (
        <section>
            <div>
                <h2 className="text-lg font-semibold">Filtre</h2>
                <select
                    className="rounded-md border p-2 text-gray-700 shadow-sm"
                    onChange={(e) => setOrder(e.target.value as OrderType)}
                    value={order}
                >
                    <option value="">Non trié</option>
                    <option value="asc">Prix croissant</option>
                    <option value="desc">Prix décroissant</option>
                </select>
            </div>

            {(!loading && produitList) ? (
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
