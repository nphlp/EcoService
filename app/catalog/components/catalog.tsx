"use client";

import ProductCard from "@comps/productCard";
import Link from "@comps/ui/link";
import Loader from "@comps/ui/loader";
import { combo } from "@lib/combo";
import { ProductModel } from "@services/types";
import { useFetchV2 } from "@utils/FetchV2/FetchHookV2";
import { useRouter } from "next/navigation";
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

    const router = useRouter();

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

    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, productId: ProductModel["id"]) => {
        e.preventDefault();
        const linkElement = document.getElementById(`product-${productId}`);
        if (linkElement) {
            const current = e.target as HTMLElement;
            // Find all buttons in the link element
            const buttons = Array.from(linkElement.querySelectorAll("button"));
            // Check if the current element is a button or a child of a button
            const isButtonOrChild = buttons.some((button) => button.contains(current));
            // If the current element is not a button or a child of a button, push the link
            if (!isButtonOrChild) router.push(`/product/${productId}`);
        }
    };

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
                <Loader className="size-8" />
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
            {productListLocal.map((product, index) => (
                <Link
                    key={index}
                    id={`product-${product.id}`}
                    label={product.name}
                    href={`/product/${product.id}`}
                    variant="none"
                    baseStyle={false}
                    onClick={(e) => handleClick(e, product.id)}
                >
                    <ProductCard product={product} />
                </Link>
            ))}
        </div>
    );
}
