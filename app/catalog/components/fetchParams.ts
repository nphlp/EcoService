import { Prisma } from "@prisma/client";
import { CategoryCountProps, CategoryFindManyProps } from "@services/types/CategoryType";
import { ProductCountProps, ProductFindManyProps } from "@services/types/ProductType";
import { SearchParamsType } from "./queryParamsConfig";

type CountType = number;

// ============== Product ============== //

type ProductSearchType = Prisma.ProductGetPayload<ReturnType<typeof productFetchParams>>;

const productFetchParams = ({
    priceOrder,
    page,
    take,
    category,
    search,
}: {
    priceOrder: SearchParamsType["priceOrder"];
    page: SearchParamsType["page"];
    take: SearchParamsType["take"];
    category: SearchParamsType["category"];
    search: SearchParamsType["search"];
}) =>
    ({
        select: {
            id: true,
            name: true,
            slug: true,
            description: true,
            image: true,
            price: true,
        },
        ...(priceOrder !== "not" && { orderBy: { price: priceOrder } }),
        ...(page > 1 && { skip: (page - 1) * take }),
        take,
        where: {
            ...(category && { Category: { slug: category } }),
            ...(search && { name: { contains: search } }),
        },
    }) satisfies ProductFindManyProps;

const productCountParams = ({ category, search }: { category: string; search: string }) =>
    ({
        where: {
            ...(category && { Category: { slug: category } }),
            ...(search && { name: { contains: search } }),
        },
    }) satisfies ProductCountProps;

// ============== Category ============== //

type CategorySearchType = Prisma.CategoryGetPayload<ReturnType<typeof categoryFetchParams>>;

const categoryFetchParams = () =>
    ({
        select: {
            name: true,
            slug: true,
        },
        orderBy: { name: "asc" as const },
    }) satisfies CategoryFindManyProps;

const categoryCountParams = (search?: string) =>
    ({
        where: {
            name: { contains: search },
        },
    }) satisfies CategoryCountProps;

// ============== Exports ============== //

export type { CategorySearchType, CountType, ProductSearchType };

export { categoryCountParams, categoryFetchParams, productCountParams, productFetchParams };
