import { CategoryFindManyProps } from "@services/types/CategoryType";
import { ProductCountProps, ProductFindManyProps } from "@services/types/ProductType";
import { SearchParamsType } from "./queryParamsConfig";

// Product amount fetch params

type ProductAmountFetchParams = {
    category: string;
    search: string;
};

export const ProductAmountFetchParams = ({ category, search }: ProductAmountFetchParams): ProductCountProps => ({
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
}: ProductListFetchParams): ProductFindManyProps => ({
    ...(priceOrder !== "not" && { orderBy: { price: priceOrder } }),
    ...(page > 1 && { skip: (page - 1) * take }),
    take,
    where: {
        ...(category && { Category: { slug: category } }),
        ...(search && { name: { contains: search } }),
    },
});

// Category list fetch params

export const CategoryListFetchParams: CategoryFindManyProps = { orderBy: { name: "asc" as const } };
