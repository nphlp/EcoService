"use client";

import ProductCard from "@comps/productCard";
import Card from "@comps/server/card";
import Link from "@comps/ui/link";
import { combo } from "@lib/combo";
import { ProductModel } from "@services/types";
import { useFetchV2 } from "@utils/FetchV2/FetchHookV2";
import { PackageSearch } from "lucide-react";
import { useRouter } from "next/navigation";
import { MouseEvent, useContext } from "react";
import { Context } from "./context";
import { productFetchParams, ProductSearchType } from "./fetchParams";
import { useCatalogParams } from "./queryParamsHook";

type CatalogProps = {
    className?: string;
    initialProductList: ProductSearchType[];
};

export default function Catalog(props: CatalogProps) {
    const { className, initialProductList } = props;

    const router = useRouter();

    const { isLoading: isLoadingProductAmount } = useContext(Context);

    const catalogContext = useCatalogParams();

    const { data: productList, isLoading: isLoadingProductList } = useFetchV2({
        route: "/product/findMany",
        params: productFetchParams(catalogContext),
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
            <div className={combo("grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4", className)}>
                {Array.from({ length: 7 }).map((_, index) => (
                    <ProductCardSkeleton key={index} />
                ))}
            </div>
        );
    }

    if (!productList?.length) {
        return (
            <div className={combo("flex h-full flex-col items-center justify-center gap-8", className)}>
                <PackageSearch className="size-24 stroke-1" />
                <div className="flex flex-col items-center text-xl">
                    <div className="font-semibold">Aucun produit n&apos;a été trouvé</div>
                    <div>pour cette recherche.</div>
                </div>
            </div>
        );
    }

    return (
        <div className={combo("grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4", className)}>
            {productList.map((product, index) => (
                <Link
                    key={index}
                    id={`product-${product.slug}`}
                    label={product.name}
                    href={`/product/${product.slug}`}
                    variant="none"
                    baseStyle={false}
                    onClick={(e) => handleClick(e, product.slug)}
                >
                    <ProductCard product={product} />
                </Link>
            ))}
        </div>
    );
}

const ProductCardSkeleton = () => {
    return (
        <Card className="h-full overflow-hidden p-0">
            <div className="animate-shimmer aspect-[3/2]" />
            <div className="flex flex-row items-end justify-between p-5">
                <div className="w-full space-y-3">
                    <div className="w-full space-y-2">
                        <div className="animate-shimmer h-[24px] w-[50%] rounded" />
                        <div className="animate-shimmer h-[18px] w-[70%] rounded" />
                    </div>
                    <div className="animate-shimmer h-[18px] w-[20%] rounded" />
                </div>
                <div className="animate-shimmer size-[44px] shrink-0 rounded-xl" />
            </div>
        </Card>
    );
};
