"use client";

import {
    SelectProductAmount,
    SelectProductList,
} from "@actions/database/Product";
import { ProductType } from "@actions/types/Product";
import Card from "@comps/server/Card";
import ImageRatio from "@comps/server/ImageRatio";
import Loader from "@comps/server/Loader";
import { combo } from "@lib/combo";
import Link from "next/link";
import { useContext, useEffect } from "react";
import { FilterContext } from "./FilterProvider";

export default function CatalogueClient() {
    const {
        productList,
        setProductList,
        setProductAmount,
        priceOrder,
        page,
        take,
        category,
        search,
    } = useContext(FilterContext);

    useEffect(() => {
        const fetch = async () => {
            const data = await SelectProductList({
                orderBy:
                    priceOrder !== "not" ? { price: priceOrder } : undefined,
                skip: page > 1 ? (page - 1) * take : undefined,
                take,
                where: {
                    ...(category && { categoryId: category }),
                    ...(search && {
                        name: {
                            contains: search
                        },
                    }),
                },
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
    }, [
        productList,
        setProductList,
        setProductAmount,
        priceOrder,
        page,
        take,
        category,
        search,
    ]);

    if (productList === "isLoading") {
        return (
            <div className="flex w-full flex-1 items-center justify-center px-4">
                <Loader className="size-8 border-4" />
            </div>
        );
    }

    return <ProductList produitList={productList} />;
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
                "grid grid-cols-1 gap-4 overflow-y-auto px-6 pb-6 sm:grid-cols-2 lg:grid-cols-4",
            )}
        >
            {produitList.map(({ id, name, image, price }, index) => (
                <Link
                    key={index}
                    href={`/produit/${id}`}
                    className="outline-none ring-transparent focus:ring-offset-2 focus-visible:ring-2 focus-visible:ring-teal-400"
                >
                    <Card className="overflow-hidden p-0" key={index}>
                        <ImageRatio src={image} alt={name} />
                        <div className="p-4">
                            <div className="text-lg font-bold">{name}</div>
                            <div className="text-sm text-gray-500">
                                {price} €
                            </div>
                        </div>
                    </Card>
                </Link>
            ))}
        </div>
    );
};
