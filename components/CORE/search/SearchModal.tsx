"use client";

import { urlSerializer } from "@app/catalog/components/queryParamsConfig";
import ImageRatio from "@comps/server/imageRatio";
import Button from "@comps/ui/button";
import Input from "@comps/ui/input";
import { combo } from "@lib/combo";
import { useFetchV2 } from "@utils/FetchV2/FetchHookV2";
import { ArrowRightIcon, SearchIcon } from "lucide-react";
import Link from "next/link";
import { FormEvent, MouseEvent, useEffect, useRef, useState } from "react";
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
import SearchSkeleton from "./SearchSkeleton";
import { useHeaderStore } from "../header/headerStore";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

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

    const { searchOpen } = useHeaderStore();

    // Search state
    const [search, setSearch] = useState("");

    // Card height tracking
    const [currentHeight, setCurrentHeight] = useState("auto");
    const heightRef = useRef<HTMLDivElement>(null);
    const resizeObserverRef = useRef<ResizeObserver | null>(null);

    const handleClick = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(search);
    };

    const takeAmount = 3;

    // Fetch data
    const { data: productList, isLoading: isLoadingProductList } = useFetchV2({
        route: "/product/findMany",
        params: productFetchParams(search, takeAmount),
        initialData: initialResults.productList as ProductSearchType[],
    });
    const { data: productCount, isLoading: isLoadingProductCount } = useFetchV2({
        route: "/product/count",
        params: productCountParams(search),
        initialData: initialResults.productCount,
    });

    const { data: categoryList, isLoading: isLoadingCategoryList } = useFetchV2({
        route: "/category/findMany",
        params: categoryFetchParams(search, takeAmount),
        initialData: initialResults.categoryList as CategorySearchType[],
    });
    const { data: categoryCount, isLoading: isLoadingCategoryCount } = useFetchV2({
        route: "/category/count",
        params: categoryCountParams(search),
        initialData: initialResults.categoryCount,
    });

    const { data: articleList, isLoading: isLoadingArticleList } = useFetchV2({
        route: "/article/findMany",
        params: articleFetchParams(search, takeAmount),
        initialData: initialResults.articleList as ArticleSearchType[],
    });
    const { data: articleCount, isLoading: isLoadingArticleCount } = useFetchV2({
        route: "/article/count",
        params: articleCountParams(search),
        initialData: initialResults.articleCount,
    });

    const { data: diyList, isLoading: isLoadingDiyList } = useFetchV2({
        route: "/diy/findMany",
        params: diyFetchParams(search, takeAmount),
        initialData: initialResults.diyList as DiySearchType[],
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

    useEffect(() => {
        const updateHeight = () => {
            if (heightRef.current) {
                setCurrentHeight(heightRef.current.scrollHeight + "px");
            }
        };

        resizeObserverRef.current = new ResizeObserver(updateHeight);

        if (heightRef.current) {
            resizeObserverRef.current.observe(heightRef.current);
        }

        return () => {
            if (resizeObserverRef.current) {
                resizeObserverRef.current.disconnect();
            }
        };
    }, [searchOpen]);

    return (
        <div
            className={combo(
                // "bg-lime-400/20",
                "flex w-full flex-1 justify-center px-7 py-20",
                className,
            )}
        >
            <BackgroundCloseButton />
            <motion.div
                initial={{ height: "auto" }}
                animate={{ height: currentHeight }}
                transition={{
                    duration: 0.5,
                    animate: "easeInOut",
                    type: "spring",
                }}
                className={combo(
                    "relative w-1/2",
                    "rounded-2xl bg-white",
                    "border border-gray-300",
                    "shadow-[2px_2px_8px_rgba(0,0,0,0.2)]",
                    "overflow-hidden",
                )}
            >
                <div ref={heightRef} className="space-y-5 p-5">
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
                        <>
                            <Results
                                title="Produits"
                                items={{ type: "product", data: productList as ProductSearchType[] }}
                                count={productCount}
                            />
                            <Results
                                title="Catégories"
                                items={{ type: "category", data: categoryList as CategorySearchType[] }}
                                count={categoryCount}
                            />
                            <Results
                                title="Articles"
                                items={{ type: "article", data: articleList as ArticleSearchType[] }}
                                count={articleCount}
                            />
                            <Results
                                title="DIY"
                                items={{ type: "diy", data: diyList as DiySearchType[] }}
                                count={diyCount}
                            />
                        </>
                    )}
                </div>
            </motion.div>
        </div>
    );
}

type ResultsProps = {
    title: string;
    count?: number;
    items:
        | { type: "product"; data: ProductSearchType[] }
        | { type: "category"; data: CategorySearchType[] }
        | { type: "article"; data: ArticleSearchType[] }
        | { type: "diy"; data: DiySearchType[] };
};

const Results = (props: ResultsProps) => {
    const { title, count, items } = props;

    const router = useRouter();
    const { setSearchOpen } = useHeaderStore();

    const getLink = () => {
        switch (items.type) {
            case "product":
                return `/catalog`;
            case "category":
                return `/catalog`;
            case "article":
                return `/article`;
            case "diy":
                return `/diy`;
        }
    };

    const link = getLink();

    const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        setSearchOpen(false);
        router.push(link);
    };

    if (!items.data.length) {
        return null;
    }

    return (
        <div className="space-y-2">
            <div className="flex items-baseline justify-between">
                <h4 className="text-lg font-medium text-gray-500">{title}</h4>
                <Link href={link} onClick={handleClick} className="text-sm text-gray-500">
                    Voir plus {count ? `(${count})` : ""}
                </Link>
            </div>
            <hr className="border-gray-300" />
            <div className="space-y-1">
                <ItemList items={items} />
            </div>
        </div>
    );
};

type ItemListProps = {
    items:
        | { type: "product"; data: ProductSearchType[] }
        | { type: "category"; data: CategorySearchType[] }
        | { type: "article"; data: ArticleSearchType[] }
        | { type: "diy"; data: DiySearchType[] };
};

const ItemList = (props: ItemListProps) => {
    const { items } = props;

    return items.data.map((item, index) => (
        <Item key={index} item={{ type: items.type, data: item } as ItemProps["item"]} />
    ));
};

type ItemProps = {
    item:
        | { type: "product"; data: ProductSearchType }
        | { type: "category"; data: CategorySearchType }
        | { type: "article"; data: ArticleSearchType }
        | { type: "diy"; data: DiySearchType };
};

const Item = (props: ItemProps) => {
    const { item } = props;
    const { type, data } = item;

    const router = useRouter();
    const { setSearchOpen } = useHeaderStore();

    type ItemType = {
        href: string;
        imageUrl?: string;
        title: string;
        description: string;
    };

    const getItemData = (): ItemType => {
        switch (type) {
            case "product":
                return {
                    href: `/product/${data.slug}`,
                    imageUrl: data.image,
                    title: data.name,
                    description: data.description,
                };
            case "category":
                return {
                    href: urlSerializer("catalog", { category: data.slug }),
                    title: data.name,
                    description: data.description ?? "",
                };
            case "article":
                return {
                    href: `/article/${data.slug}`,
                    imageUrl: `/illustration/${data.Content[0].image}`,
                    title: data.title,
                    description: data.Content[0].content,
                };
            case "diy":
                return {
                    href: `/diy/${data.slug}`,
                    imageUrl: `/illustration/${data.Content[0].image}`,
                    title: data.title,
                    description: data.Content[0].content,
                };
        }
    };

    const { href, imageUrl, title, description } = getItemData();

    const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        setSearchOpen(false);
        router.push(href);
    };

    return (
        <Link
            href={href}
            onClick={handleClick}
            className={combo(
                "flex flex-row items-center justify-center gap-3",
                "bg-gray-100 hover:bg-gray-200",
                "rounded-md px-4 py-1.5",
                "transition-all duration-150",
                "group",
            )}
        >
            {imageUrl ? <ImageRatio src={imageUrl} alt={title} className="h-16 shrink-0 rounded" /> : null}
            <div className="flex w-full flex-col">
                <h5 className="line-clamp-1 text-lg font-medium">{title}</h5>
                <p className="line-clamp-2 text-sm text-gray-500">{description}</p>
            </div>
            <div className="px-2">
                <ArrowRightIcon className="size-6 text-gray-500 group-hover:text-black" />
            </div>
        </Link>
    );
};
