"use client";

import ProductCard, { ProductCardSkeleton } from "@comps/PROJECT/cards/productCard";
import {
    useCategoryQueryParams,
    usePageQueryParams,
    usePriceOrderQueryParams,
    useSearchQueryParams,
    useTakeQueryParams,
} from "@comps/SHARED/queryParamsClientHooks";
import Link from "@comps/UI/button/link";
import { combo } from "@lib/combo";
import { ProductModel } from "@services/types";
import { useFetch } from "@utils/FetchHook";
import { PackageSearch } from "lucide-react";
import { useRouter } from "next/navigation";
import { MouseEvent, useContext } from "react";
import { Context } from "./context";
import { ProductSearchType, productFetchParams } from "./fetchParams";

type CatalogProps = {
    className?: string;
    initialProductList: ProductSearchType[];
};

export default function Catalog(props: CatalogProps) {
    const { className, initialProductList } = props;

    const router = useRouter();

    const { isLoading: isLoadingProductAmount } = useContext(Context);

    const { page } = usePageQueryParams();
    const { take } = useTakeQueryParams();
    const { priceOrder } = usePriceOrderQueryParams();
    const { search } = useSearchQueryParams();
    const { category } = useCategoryQueryParams();

    const { data: productList, isLoading: isLoadingProductList } = useFetch({
        route: "/internal/product/findMany",
        params: productFetchParams({ page, take, priceOrder, search, category }),
        initialData: initialProductList,
    });

    const handleClick = (e: MouseEvent<HTMLAnchorElement>, slug: ProductModel["slug"]) => {
        e.preventDefault();
        const linkElement = document.getElementById(`product-${slug}`);
        if (linkElement) {
            const current = e.target as HTMLElement;
            // Find all buttons in the link element
            const buttons = Array.from(linkElement.querySelectorAll("button"));
            // Check if the current element is a button or a child of a button
            const isButtonOrChild = buttons.some((button) => button.contains(current));
            // If the current element is not a button or a child of a button, push the link
            if (!isButtonOrChild) router.push(`/product/${slug}`);
        }
    };

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
                {productList.map((product, index) => (
                    <Link
                        key={index}
                        id={`product-${product.slug}`}
                        label={product.name}
                        href={`/product/${product.slug}`}
                        variant="none"
                        className="w-full rounded-xl"
                        onClick={(e) => handleClick(e, product.slug)}
                    >
                        <ProductCard product={product} mode="preloaded" />
                    </Link>
                ))}
            </div>
        </div>
    );
}
