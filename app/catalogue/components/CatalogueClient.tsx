"use client";

import { SelectProductAmount, SelectProductList } from "@actions/database/Product";
import Loader from "@comps/server/Loader";
import { useContext, useEffect } from "react";
import { FilterContext } from "./FilterProvider";
import Card from "@comps/server/Card";
import { combo } from "@lib/combo";
import { ProductType } from "@actions/types/Product";

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
            className="flex-1 overflow-y-auto px-4"
        />
    );
}

type ProductListProps = {
    produitList: ProductType[] | null;
    className?: string;
};

const ProductList = (props: ProductListProps) => {
    const { produitList, className } = props;

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
                "grid grid-cols-2 gap-4 lg:grid-cols-4",
                className,
            )}
        >
            {produitList.map((produit, index) => (
                <Card
                    key={index}
                    className="h-[200px] rounded-xl bg-white p-4 shadow-lg"
                >
                    <h2 className="text-lg font-semibold">{produit.name}</h2>
                    <p className="text-gray-600">Prix : {produit.price} €</p>
                </Card>
            ))}
        </div>
    );
};
