"use client";

import { catalogUrlSerializer } from "@app/catalog/components/queryParams";
import Link from "@comps/UI/button/link";
import ImageRatio from "@comps/UI/imageRatio";
import { combo } from "@lib/combo";
import { StringToSlug } from "@utils/StringToSlug";
import { ArrowRightIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { MouseEvent } from "react";
import { useHeaderStore } from "../header/headerStore";
import { ArticleSearchType, CategorySearchType, DiySearchType, ProductSearchType } from "./fetchParams";

type ItemListProps = {
    items:
        | { type: "product"; data: ProductSearchType[] }
        | { type: "category"; data: CategorySearchType[] }
        | { type: "article"; data: ArticleSearchType[] }
        | { type: "diy"; data: DiySearchType[] };
    search: string;
};

export default function ItemList(props: ItemListProps) {
    const { items, search } = props;

    return items.data.map((item, index) => (
        <Item key={index} item={{ type: items.type, data: item } as ItemProps["item"]} search={search} />
    ));
}

type ItemProps = {
    item:
        | { type: "product"; data: ProductSearchType }
        | { type: "category"; data: CategorySearchType }
        | { type: "article"; data: ArticleSearchType }
        | { type: "diy"; data: DiySearchType };
    search: string;
};

const Item = (props: ItemProps) => {
    const { item, search } = props;
    const { type, data } = item;

    const router = useRouter();
    const { setSearchOpen } = useHeaderStore();

    const highlightQuery = (optionName: string, query: string, textMaxLength: number) => {
        // Slugify the option name and the query
        const nameSlug = StringToSlug(optionName);
        const querySlug = StringToSlug(query);

        // Find the index of the query in the option name
        const queryStartIndex = nameSlug.indexOf(querySlug);
        const queryEndIndex = queryStartIndex + querySlug.length;

        // If the query index is after the end of the text, set an offset to center the query in the text
        const textStartIndex = queryEndIndex >= textMaxLength ? Math.floor(queryEndIndex - textMaxLength / 2) : 0;

        // Add ellipsis if needed
        const ellipsisBefore = textStartIndex > 0 ? "..." : "";

        // Slice the option name into before, highlighted and after
        return {
            complete: optionName,
            before: ellipsisBefore + optionName.slice(textStartIndex, queryStartIndex),
            highlighted: optionName.slice(queryStartIndex, queryEndIndex),
            after: optionName.slice(queryEndIndex),
        };
    };

    type ItemType = {
        href: string;
        imageUrl?: string;
        title: {
            complete: string;
            before: string;
            highlighted: string;
            after: string;
        };
        description: {
            complete: string;
            before: string;
            highlighted: string;
            after: string;
        };
    };

    const getItemData = (): ItemType => {
        switch (type) {
            case "product":
                return {
                    href: `/product/${data.slug}`,
                    imageUrl: data.image,
                    title: highlightQuery(data.name, search, 30),
                    description: highlightQuery(data.description, search, 70),
                };
            case "category":
                return {
                    href: catalogUrlSerializer("/catalog", { category: data.slug }),
                    title: highlightQuery(data.name, search, 30),
                    description: highlightQuery(data.description ?? "", search, 70),
                };
            case "article":
                const joinedArticleContent = data.Content.map((item) => item.content).join(" ");
                return {
                    href: `/article/${data.slug}`,
                    imageUrl: data.Content[0].image,
                    title: highlightQuery(data.title, search, 30),
                    description: highlightQuery(joinedArticleContent, search, 70),
                };
            case "diy":
                const joinedDiyContent = data.Content.map((item) => item.content).join(" ");
                return {
                    href: `/diy/${data.slug}`,
                    imageUrl: data.Content[0].image,
                    title: highlightQuery(data.title, search, 30),
                    description: highlightQuery(joinedDiyContent, search, 70),
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
            label={title.complete}
            variant="none"
            href={href}
            onClick={handleClick}
            className={combo("group", "w-full gap-4", "bg-gray-100 hover:bg-gray-200", "rounded-md px-4 py-1.5")}
        >
            {imageUrl ? <ImageRatio src={imageUrl} alt={title.complete} className="h-16 shrink-0 rounded" /> : null}
            <div className="flex w-full flex-col">
                <h5 className="line-clamp-1 text-lg font-medium">
                    <span>{title.before}</span>
                    <span className="rounded-sm bg-amber-200 font-bold">{title.highlighted}</span>
                    <span>{title.after}</span>
                </h5>
                <p className="line-clamp-2 text-sm text-gray-500">
                    <span>{description.before}</span>
                    <span className="rounded-sm bg-amber-200 font-bold">{description.highlighted}</span>
                    <span>{description.after}</span>
                </p>
            </div>
            <div className="px-2">
                <ArrowRightIcon className="size-6 text-gray-500 group-hover:text-black" />
            </div>
        </Link>
    );
};
