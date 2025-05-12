import { FindManyCategoryProps } from "@services/types";
import { CountProductProps, FindManyProductProps } from "@services/types/ProductType";
import { SearchParamsType } from "./searchParams";

// Product amount fetch params

type ProductAmountFetchParams = {
    category: string;
    search: string;
};

export const ProductAmountFetchParams = ({ category, search }: ProductAmountFetchParams): CountProductProps => ({
    where: {
        ...(category && { Category: { slug: category } }),
        ...(search && { name: { contains: search } }),
    },
});

// Product list fetch params

type ProductListFetchParams = {
    priceOrder: SearchParamsType["priceOrder"];
    page: SearchParamsType["page"];
    take: SearchParamsType["take"];
    category: SearchParamsType["category"];
    search: SearchParamsType["search"];
};

export const ProductListFetchParams = ({
    priceOrder,
    page,
    take,
    category,
    search,
}: ProductListFetchParams): FindManyProductProps => ({
    ...(priceOrder !== "not" && { orderBy: { price: priceOrder } }),
    ...(page > 1 && { skip: (page - 1) * take }),
    take,
    where: {
        ...(category && { Category: { slug: category } }),
        ...(search && { name: { contains: search } }),
    },
});

// Category list fetch params

export const CategoryListFetchParams: FindManyCategoryProps = { orderBy: { name: "asc" as const } };
