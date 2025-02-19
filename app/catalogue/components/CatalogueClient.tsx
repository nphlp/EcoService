"use client";

import { SelectProductAmount, SelectProductList } from "@actions/database/Product";
import { ProductType } from "@actions/types/Product";
import Card from "@comps/server/Card";
import Loader from "@comps/server/Loader";
import { combo } from "@lib/combo";
import { useContext, useEffect } from "react";
import { FilterContext } from "./FilterProvider";

export default function CatalogueClient() {
    const { productList, setProductList, setProductAmount, priceOrder, page, take, category } =
        useContext(FilterContext);

    useEffect(() => {
        const fetch = async () => {
            const data = await SelectProductList({
                orderBy: priceOrder !== "not" ? { price: priceOrder } : undefined,
                skip: page > 1 ? (page - 1) * take : undefined,
                take,
                where: category ? { categoryId: category } : undefined,
            });

            const productAmount = await SelectProductAmount({
                where: category ? { categoryId: category } : undefined,
            });
            if (!productAmount) {
                throw new Error("We don't have any product...");
            }

            setProductList(data);
            setProductAmount(productAmount);
        };

        if (productList === "isLoading") {
            fetch();
        }
    }, [productList, setProductList, setProductAmount, priceOrder, page, take, category]);

    if (productList === "isLoading") {
        return (
            <div className="flex w-full flex-1 items-center justify-center px-4">
                <Loader className="size-8 border-4" />
            </div>
        );
    }

    // TODO: Fix scroll bottom cutted edge
    return (
        <ProductList
            produitList={productList}
        />
    );
}

type ProductListProps = {
    produitList: ProductType[] | null;
};

const ProductList = (props: ProductListProps) => {
    const { produitList } = props;

    if (!produitList) {
        return (
            <div className="flex size-full items-center justify-center">
                Aucun produit disponible pour le moment.
            </div>
        );
    }

    return (
        <div
            className={combo(
                "grid flex-1 grid-cols-2 gap-4 overflow-y-auto px-6 pb-6 lg:grid-cols-4",
            )}
        >
            {produitList.map((produit, index) => (
                <Card
                    key={index}
                    className="h-[200px] rounded-xl bg-white shadow-lg"
                >
                    <h2 className="text-lg font-semibold">{produit.name}</h2>
                    <p className="text-gray-600">Prix : {produit.price} €</p>
                </Card>
            ))}
        </div>
    );
};
