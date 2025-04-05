"use client";

import ProductCard from "@comps/productCard";
import Loader from "@comps/ui/loader";
import { combo } from "@lib/combo";
import { useFetchV2 } from "@utils/FetchHookV2";
import { useContext, useEffect } from "react";
import { ProductAmountFetchParams, ProductListFetchParams } from "./fetchParams";
import { CatalogContext } from "./provider";
import { useCatalogParams } from "./useCatalogParams";
import { useCatalogStore } from "./useCatalogStore";

type CatalogClientProps = {
    className?: string;
};

export default function CatalogClient(props: CatalogClientProps) {
    const { className } = props;

    const { productList: productListLocal } = useContext(CatalogContext);
    const { setDataStore } = useCatalogStore();
    const { priceOrder, page, take, category, search } = useCatalogParams();

    const { data: newProductAmount, isLoading: isLoadingProductAmount } = useFetchV2({
        route: "/product/count",
        params: ProductAmountFetchParams({ category, search }),
    });

    const { data: newProductList, isLoading: isLoadingProductList } = useFetchV2({
        route: "/product",
        params: ProductListFetchParams({ priceOrder, page, take, category, search }),
    });

    useEffect(() => {
        if (newProductList && newProductAmount) {
            setDataStore({
                productList: newProductList,
                productAmount: newProductAmount,
            });
        }
    }, [newProductAmount, newProductList, setDataStore]);

    if (isLoadingProductList || isLoadingProductAmount) {
        return (
            <div className="flex w-full flex-1 items-center justify-center">
                <Loader className="size-8 border-4" />
            </div>
        );
    }

    if (!productListLocal) {
        return (
            <div className={combo("flex size-full items-center justify-center", className)}>
                Aucun produit disponible pour le moment.
            </div>
        );
    }

    return (
        <div className={combo("grid grid-cols-1 gap-5 overflow-y-auto sm:grid-cols-2 lg:grid-cols-4", className)}>
            {productListLocal.map((produit, index) => (
                <ProductCard key={index} produit={produit} />
            ))}
        </div>
    );
}
