"use client";

import { catalogUrlSerializer } from "@app/catalog/components/queryParams";
import Link from "next/link";
import { useHeaderStore } from "../header/headerStore";
import { ArticleSearchType, CategorySearchType, CountType, DiySearchType, ProductSearchType } from "./fetchParams";
import ItemList from "./SearchItem";
import { diyUrlSerializer } from "@app/diy/queryParams";
import { articleUrlSerializer } from "@app/article/queryParams";

type ResultsListProps = {
    productList: ProductSearchType[];
    productCount: CountType;

    categoryList: CategorySearchType[];
    categoryCount: CountType;

    articleList: ArticleSearchType[];
    articleCount: CountType;

    diyList: DiySearchType[];
    diyCount: CountType;

    search: string;
};

export default function ResultsList(props: ResultsListProps) {
    const {
        productList,
        productCount,
        categoryList,
        categoryCount,
        articleList,
        articleCount,
        diyList,
        diyCount,
        search,
    } = props;

    if (productCount + categoryCount + articleCount + diyCount === 0) {
        return (
            <div className="flex items-center justify-center">
                <div className="text-md py-5 text-gray-500">Aucun résultat trouvé pour votre recherche...</div>
            </div>
        );
    }

    return (
        <>
            <Results
                title="Produits"
                items={{ type: "product", data: productList ?? [] }}
                count={productCount}
                search={search}
            />
            <Results
                title="Catégories"
                items={{ type: "category", data: categoryList ?? [] }}
                count={categoryCount}
                search={search}
            />
            <Results
                title="Articles"
                items={{ type: "article", data: articleList ?? [] }}
                count={articleCount}
                search={search}
            />
            <Results title="DIY" items={{ type: "diy", data: diyList ?? [] }} count={diyCount} search={search} />
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
    search: string;
};

const Results = (props: ResultsProps) => {
    const { title, count, items, search } = props;

    const { setSearchOpen } = useHeaderStore();

    const getPagePath = () => {
        switch (items.type) {
            case "product":
                return catalogUrlSerializer("/catalog", { search });
            case "category":
                return catalogUrlSerializer("/catalog", { search });
            case "article":
                return articleUrlSerializer("/article", { search });
            case "diy":
                return diyUrlSerializer("/diy", { search });
        }
    };

    const handleClick = () => {
        setSearchOpen(false);
    };

    if (!items.data.length) {
        return null;
    }

    return (
        <div className="space-y-2">
            <div className="flex items-baseline justify-between">
                <h4 className="text-lg font-medium text-gray-500">{title}</h4>
                {items.type !== "category" && (
                    <Link href={getPagePath()} onClick={handleClick} className="text-sm text-gray-500">
                        Voir plus {count ? `(${count})` : ""}
                    </Link>
                )}
            </div>
            <hr className="border-gray-300" />
            <div className="space-y-1">
                <ItemList items={items} search={search} />
            </div>
        </div>
    );
};
