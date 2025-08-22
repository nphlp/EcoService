"use client";

import { catalogUrlSerializer } from "@app/catalog/components/queryParams";
import Button from "@comps/UI/button/button";
import Input from "@comps/UI/input/input";
import { combo } from "@lib/combo";
import { useFetchV2 } from "@utils/FetchV2/FetchHookV2";
import { SearchIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { useHeaderStore } from "../header/headerStore";
import { BackgroundCloseButton } from "./SearchPortal";
import ResultsList from "./SearchResult";
import SearchSkeleton from "./SearchSkeleton";
import {
    ArticleSearchType,
    CategorySearchType,
    CountType,
    ProductSearchType,
    articleCountParams,
    articleFetchParams,
    categoryCountParams,
    categoryFetchParams,
    productCountParams,
    productFetchParams,
} from "./fetchParams";

export type SearchModalProps = {
    initialResults: {
        productList: ProductSearchType[];
        productCount: CountType;

        categoryList: CategorySearchType[];
        categoryCount: CountType;

        articleList: ArticleSearchType[];
        articleCount: CountType;
    };
    className?: string;
};

export default function SearchModal(props: SearchModalProps) {
    const { initialResults, className } = props;

    const router = useRouter();

    // Search state
    const [search, setSearch] = useState("");

    const { setSearchOpen } = useHeaderStore();

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const urlSearch = catalogUrlSerializer("catalog", { search });
        router.push(urlSearch);

        setSearchOpen(false);
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

    const isLoading =
        isLoadingProductList ||
        isLoadingProductCount ||
        isLoadingCategoryList ||
        isLoadingCategoryCount ||
        isLoadingArticleList ||
        isLoadingArticleCount;

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
                            Rechercher dans les produits, catégories et articles...
                        </div>
                    </div>
                    <form onSubmit={handleSubmit} className="flex flex-row items-center justify-center gap-2">
                        <Input
                            label="search"
                            className={{ component: "w-full", label: "sr-only" }}
                            placeholder="Produit, catégorie, article..."
                            onKeyDown={(e) => {
                                if (e.key === "Escape") {
                                    setSearchOpen(false);
                                }
                            }}
                            setValue={setSearch}
                            value={search}
                            autoFocus
                        />
                        <Button type="submit" label="search" variant="outline" className={{ button: "p-1.5" }}>
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
                        search={search}
                    />
                )}
            </div>
        </div>
    );
}
