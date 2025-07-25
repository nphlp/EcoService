"use client";

import { urlSerializer } from "@app/catalog/components/queryParamsConfig";
import ImageRatio from "@comps/ui/imageRatio";
import { combo } from "@lib/combo";
import { ArrowRightIcon } from "lucide-react";
import Link from "next/link";
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
};

export default function ItemList(props: ItemListProps) {
    const { items } = props;

    return items.data.map((item, index) => (
        <Item key={index} item={{ type: items.type, data: item } as ItemProps["item"]} />
    ));
}

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
                    imageUrl: data.Content[0].image,
                    title: data.title,
                    description: data.Content[0].content,
                };
            case "diy":
                return {
                    href: `/diy/${data.slug}`,
                    imageUrl: data.Content[0].image,
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
