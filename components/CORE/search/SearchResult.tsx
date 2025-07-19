"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { MouseEvent } from "react";
import { useHeaderStore } from "../header/headerStore";
import { ArticleSearchType, CategorySearchType, CountType, DiySearchType, ProductSearchType } from "./fetchParams";
import ItemList from "./SearchItem";

type ResultsListProps = {
    productList: ProductSearchType[];
    productCount: CountType;

    categoryList: CategorySearchType[];
    categoryCount: CountType;

    articleList: ArticleSearchType[];
    articleCount: CountType;

    diyList: DiySearchType[];
    diyCount: CountType;
};

export default function ResultsList(props: ResultsListProps) {
    const { productList, productCount, categoryList, categoryCount, articleList, articleCount, diyList, diyCount } =
        props;

    if (productCount + categoryCount + articleCount + diyCount === 0) {
        return (
            <div className="flex items-center justify-center">
                <div className="text-md py-5 text-gray-500">Aucun résultat trouvé pour votre recherche...</div>
            </div>
        );
    }

    return (
        <>
            <Results title="Produits" items={{ type: "product", data: productList ?? [] }} count={productCount} />
            <Results title="Catégories" items={{ type: "category", data: categoryList ?? [] }} count={categoryCount} />
            <Results title="Articles" items={{ type: "article", data: articleList ?? [] }} count={articleCount} />
            <Results title="DIY" items={{ type: "diy", data: diyList ?? [] }} count={diyCount} />
        </>
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
