"use client";

import Button from "@comps/ui/button";
import Input from "@comps/ui/input";
import { combo } from "@lib/combo";
import { useFetchV2 } from "@utils/FetchV2/FetchHookV2";
import { SearchIcon } from "lucide-react";
import { FormEvent, useState } from "react";
import {
    articleCountParams,
    articleFetchParams,
    ArticleSearchType,
    categoryCountParams,
    categoryFetchParams,
    CategorySearchType,
    CountType,
    diyCountParams,
    diyFetchParams,
    DiySearchType,
    productCountParams,
    productFetchParams,
    ProductSearchType,
} from "./fetchParams";
import { BackgroundCloseButton } from "./SearchPortal";
import ResultsList from "./SearchResult";
import SearchSkeleton from "./SearchSkeleton";
import { useHeaderStore } from "../header/headerStore";

export type SearchModalProps = {
    initialResults: {
        productList: ProductSearchType[];
        productCount: CountType;

        categoryList: CategorySearchType[];
        categoryCount: CountType;

        articleList: ArticleSearchType[];
        articleCount: CountType;

        diyList: DiySearchType[];
        diyCount: CountType;
    };
    className?: string;
};

export default function SearchModal(props: SearchModalProps) {
    const { initialResults, className } = props;

    // Search state
    const [search, setSearch] = useState("");

    const { setSearchOpen } = useHeaderStore();

    const handleClick = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(search);
    };

    const takeAmount = 3;

    // Fetch data
    const { data: productList, isLoading: isLoadingProductList } = useFetchV2({
        route: "/product/findMany",
        params: productFetchParams(search, takeAmount),
        initialData: initialResults.productList,
    });
    const { data: productCount, isLoading: isLoadingProductCount } = useFetchV2({
        route: "/product/count",
        params: productCountParams(search),
        initialData: initialResults.productCount,
    });

    const { data: categoryList, isLoading: isLoadingCategoryList } = useFetchV2({
        route: "/category/findMany",
        params: categoryFetchParams(search, takeAmount),
        initialData: initialResults.categoryList,
    });
    const { data: categoryCount, isLoading: isLoadingCategoryCount } = useFetchV2({
        route: "/category/count",
        params: categoryCountParams(search),
        initialData: initialResults.categoryCount,
    });

    const { data: articleList, isLoading: isLoadingArticleList } = useFetchV2({
        route: "/article/findMany",
        params: articleFetchParams(search, takeAmount),
        initialData: initialResults.articleList,
    });
    const { data: articleCount, isLoading: isLoadingArticleCount } = useFetchV2({
        route: "/article/count",
        params: articleCountParams(search),
        initialData: initialResults.articleCount,
    });

    const { data: diyList, isLoading: isLoadingDiyList } = useFetchV2({
        route: "/diy/findMany",
        params: diyFetchParams(search, takeAmount),
        initialData: initialResults.diyList,
    });
    const { data: diyCount, isLoading: isLoadingDiyCount } = useFetchV2({
        route: "/diy/count",
        params: diyCountParams(search),
        initialData: initialResults.diyCount,
    });

    const isLoading =
        isLoadingProductList ||
        isLoadingProductCount ||
        isLoadingCategoryList ||
        isLoadingCategoryCount ||
        isLoadingArticleList ||
        isLoadingArticleCount ||
        isLoadingDiyList ||
        isLoadingDiyCount;

    return (
        <div
            className={combo(
                // "bg-lime-400/20",
                "flex w-full flex-1 justify-center py-20",
                // Responsive
                "px-3 md:px-7",
                className,
            )}
        >
            <BackgroundCloseButton />
            <div
                className={combo(
                    "relative",
                    "rounded-2xl bg-white",
                    "border border-gray-300",
                    "shadow-[2px_2px_8px_rgba(0,0,0,0.2)]",
                    "overflow-hidden",
                    "space-y-5",
                    "h-fit",
                    // Responsive
                    "p-3 md:p-5",
                    "w-full md:w-2/3 lg:w-1/2",
                )}
            >
                <div className="space-y-4">
                    <div>
                        <h3 className="text-2xl font-bold">Search</h3>
                        <div className="text-sm text-gray-500">
                            Rechercher dans les produits, catégories, articles et DIY...
                        </div>
                    </div>
                    <form onSubmit={handleClick} className="flex flex-row items-center justify-center gap-2">
                        <Input
                            label="search"
                            classComponent="w-full"
                            classLabel="sr-only"
                            placeholder="Produit, catégorie, article, DIY..."
                            onKeyDown={(e) => {
                                if (e.key === "Escape") {
                                    setSearchOpen(false);
                                }
                            }}
                            setValue={setSearch}
                            value={search}
                            autoFocus
                        />
                        <Button
                            type="submit"
                            label="search"
                            variant="outline"
                            className="p-1.5"
                            baseStyleOnly={["flex", "rounded"]}
                        >
                            <SearchIcon />
                        </Button>
                    </form>
                </div>
                {isLoading ? (
                    <SearchSkeleton />
                ) : (
                    <ResultsList
                        productList={productList ?? []}
                        productCount={productCount ?? 0}
                        categoryList={categoryList ?? []}
                        categoryCount={categoryCount ?? 0}
                        articleList={articleList ?? []}
                        articleCount={articleCount ?? 0}
                        diyList={diyList ?? []}
                        diyCount={diyCount ?? 0}
                    />
                )}
            </div>
        </div>
    );
}
