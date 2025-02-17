"use client";

import { SelectProductList } from "@actions/database/Product";
import { ProductType } from "@actions/types/Product";
import Loader from "@comps/server/Loader";
import { useContext, useEffect, useState } from "react";
import { FilterContext } from "./FilterProvider";
import ProductList from "./ProductList";

type CatalogueClientProps = {
    produitList: ProductType[] | null;
};

// Composant client
export default function CatalogueClient(props: CatalogueClientProps) {
    const { produitList: produitListInit } = props;

    const [produitList, setProduitList] = useState(produitListInit);
    const [loading, setLoading] = useState(false);

    const { priceOrder, page, take } = useContext(FilterContext);

    // Fetch data from database
    // TODO: optimize re-render amount
    // TODO: add middleware to protect server actions
    useEffect(() => {
        (async () => {
            setLoading(true);

            const newProductList = await SelectProductList({
                ...(priceOrder !== "not" && {
                    orderBy: { price: priceOrder },
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

    if (loading) {
        return (
            <div className="flex w-full flex-1 items-center justify-center px-4">
                <Loader className="size-8 border-4" />
            </div>
        );
    }

    // TODO: Fix scroll bottom cutted edge
    return (
        <ProductList
            produitList={produitList}
            className="flex-1 space-y-4 overflow-y-auto px-4"
        />
    );
}
