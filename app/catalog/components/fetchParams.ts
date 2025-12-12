import { Prisma } from "@prisma/client/client";
import { CategoryFindManyProps } from "@services/types/CategoryType";
import { ProductCountProps, ProductFindManyProps } from "@services/types/ProductType";
import { CatalogQueryParamsCachedType } from "./queryParams";

type CountType = number;

// ============== Product ============== //

type ProductSearchType = Prisma.ProductGetPayload<ReturnType<typeof productFetchParams>>;

const productFetchParams = ({ priceOrder, page, take, category, search }: CatalogQueryParamsCachedType) =>
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
            ...(search && {
                OR: [
                    { name: { contains: search } },
                    { slug: { contains: search } },
                    { description: { contains: search } },
                ],
            }),
        },
    }) satisfies ProductFindManyProps;

const productCountParams = ({ category, search }: { category: string; search: string }) =>
    ({
        where: {
            ...(category && { Category: { slug: category } }),
            ...(search && {
                OR: [
                    { name: { contains: search } },
                    { slug: { contains: search } },
                    { description: { contains: search } },
                ],
            }),
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

// ============== Exports ============== //

export type { CategorySearchType, CountType, ProductSearchType };

export { categoryFetchParams, productCountParams, productFetchParams };
