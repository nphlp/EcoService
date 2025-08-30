"use client";

import { catalogUrlSerializer } from "@app/catalog/components/queryParams";
import Button from "@comps/UI/button/button";
import Input from "@comps/UI/input/input";
import Modal from "@comps/UI/modal/modal";
import { combo } from "@lib/combo";
import { useFetchV2 } from "@utils/FetchV2/FetchHookV2";
import { SearchIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useRef, useState } from "react";
import { useHeaderStore } from "../header/headerStore";
import ResultsList from "./SearchResult";
import SearchSkeleton from "./SearchSkeleton";
import {
    ArticleSearchType,
    CategorySearchType,
    CountType,
    DiySearchType,
    ProductSearchType,
    articleCountParams,
    articleFetchParams,
    categoryCountParams,
    categoryFetchParams,
    diyCountParams,
    diyFetchParams,
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

        diyList: DiySearchType[];
        diyCount: CountType;
    };
};

export default function SearchModal(props: SearchModalProps) {
    const { initialResults } = props;

    const router = useRouter();

    // Modal state
    const { searchOpen, setSearchOpen } = useHeaderStore();

    // Input ref
    const inputRef = useRef<HTMLInputElement>(null);

    // Search state
    const [search, setSearch] = useState("");

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

    // CMD + K listener
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.metaKey && e.key === "k") {
                setSearchOpen(true);
            }
        };

        if (!searchOpen) {
            window.addEventListener("keydown", handleKeyDown);
        }

        return () => {
            if (!searchOpen) {
                window.removeEventListener("keydown", handleKeyDown);
            }
        };
    }, [searchOpen, setSearchOpen]);

    useEffect(() => {
        if (searchOpen) {
            setSearch("");
            inputRef.current?.focus();
        }
    }, [searchOpen]);

    return (
        <Modal
            className={{
                cardContainer: combo(
                    "flex justify-center py-20",
                    // Responsive
                    "px-3 md:px-7",
                    "w-full md:w-2/3 lg:w-1/2",
                ),
                card: combo(
                    "h-fit w-full space-y-5",
                    // Responsive
                    "p-3 md:p-5",
                ),
            }}
            isModalOpen={searchOpen}
            setIsModalOpen={setSearchOpen}
            fixedToTop
        >
            <div className="space-y-4">
                <div>
                    <h3 className="text-2xl font-bold">Search</h3>
                    <div className="text-sm text-gray-500">
                        Rechercher dans les produits, catégories, articles et DIY...
                    </div>
                </div>
                <form onSubmit={handleSubmit} className="flex flex-row items-center justify-center gap-2">
                    <Input
                        ref={inputRef}
                        label="search"
                        className={{ component: "w-full", label: "sr-only" }}
                        placeholder="Produit, catégorie, article, DIY..."
                        onKeyDown={(e) => {
                            if (e.key === "Escape") {
                                setSearchOpen(false);
                            }
                        }}
                        setValue={setSearch}
                        value={search}
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
                    diyList={diyList ?? []}
                    diyCount={diyCount ?? 0}
                    search={search}
                />
            )}
        </Modal>
    );
}
