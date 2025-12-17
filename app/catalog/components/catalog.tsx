"use client";

import ProductCard, { ProductCardSkeleton } from "@comps/PROJECT/cards/productCard";
import {
    useCategoryQueryParams,
    usePageQueryParams,
    usePriceOrderQueryParams,
    useSearchQueryParams,
    useTakeQueryParams,
} from "@comps/SHARED/queryParamsClientHooks";
import { combo } from "@lib/combo";
import { PackageSearch } from "lucide-react";
import { Route } from "next";
import { useContext } from "react";
import useSolid from "@/solid/solid-hook";
import { Context } from "./context";
import { ProductSearchType, productFetchParams } from "./fetchParams";

type CatalogProps = {
    className?: string;
    initialProductList: ProductSearchType[];
};

export default function Catalog(props: CatalogProps) {
    const { className, initialProductList } = props;

    const { isLoading: isLoadingProductAmount } = useContext(Context);

    const { page } = usePageQueryParams();
    const { take } = useTakeQueryParams();
    const { priceOrder } = usePriceOrderQueryParams();
    const { search } = useSearchQueryParams();
    const { category } = useCategoryQueryParams();

    const { data: productList, isLoading: isLoadingProductList } = useSolid({
        route: "/solid/product/findMany",
        params: productFetchParams({ page, take, priceOrder, search, category }),
        initialData: initialProductList,
    });

    if (isLoadingProductList || isLoadingProductAmount) {
        return (
            <div className="flex-1">
                <div className={combo("grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4", className)}>
                    {Array.from({ length: 7 }).map((_, index) => (
                        <ProductCardSkeleton key={index} />
                    ))}
                </div>
            </div>
        );
    }

    if (!productList?.length) {
        return (
            <div className={combo("flex flex-1 flex-col items-center justify-center gap-8", className)}>
                <PackageSearch className="size-24 stroke-1" />
                <div className="flex flex-col items-center text-xl">
                    <div className="font-semibold">Aucun produit n&apos;a été trouvé</div>
                    <div>pour cette recherche.</div>
                </div>
            </div>
        );
    }

    return (
        <div className="flex-1">
            <div className={combo("grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4", className)}>
                {productList.map((product) => (
                    <ProductCard
                        key={product.id}
                        href={`/product/${product.slug}` as Route}
                        product={product}
                        mode="preloaded"
                    />
                ))}
            </div>
        </div>
    );
}
