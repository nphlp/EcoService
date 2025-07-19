import { Prisma } from "@prisma/client";
import {
    ArticleCountProps,
    ArticleFindManyProps,
    CategoryCountProps,
    CategoryFindManyProps,
    DiyCountProps,
    DiyFindManyProps,
    ProductCountProps,
    ProductFindManyProps,
} from "@services/types";

type CountType = number;

// ============== Product ============== //

type ProductSearchType = Prisma.ProductGetPayload<ReturnType<typeof productFetchParams>>;

const productFetchParams = (search?: string, take: number = 3) =>
    ({
        select: {
            name: true,
            slug: true,
            description: true,
            image: true,
        },
        take,
        where: {
            name: { contains: search },
        },
    }) satisfies ProductFindManyProps;

const productCountParams = (search?: string) =>
    ({
        where: {
            name: { contains: search },
        },
    }) satisfies ProductCountProps;

// ============== Category ============== //

type CategorySearchType = Prisma.CategoryGetPayload<ReturnType<typeof categoryFetchParams>>;

const categoryFetchParams = (search?: string, take: number = 3) =>
    ({
        select: {
            name: true,
            slug: true,
            description: true,
        },
        take,
        where: {
            name: { contains: search },
        },
    }) satisfies CategoryFindManyProps;

const categoryCountParams = (search?: string) =>
    ({
        where: {
            name: { contains: search },
        },
    }) satisfies CategoryCountProps;

// ============== Article ============== //

type ArticleSearchType = Prisma.ArticleGetPayload<ReturnType<typeof articleFetchParams>>;

const articleFetchParams = (search?: string, take: number = 3) =>
    ({
        select: {
            title: true,
            slug: true,
            Content: {
                select: {
                    image: true,
                    content: true,
                },
            },
        },
        take,
        where: {
            title: { contains: search },
        },
    }) satisfies ArticleFindManyProps;

const articleCountParams = (search?: string) =>
    ({
        where: {
            title: { contains: search },
        },
    }) satisfies ArticleCountProps;

// ============== Diy ============== //

type DiySearchType = Prisma.DiyGetPayload<ReturnType<typeof diyFetchParams>>;

const diyFetchParams = (search?: string, take: number = 3) =>
    ({
        select: {
            title: true,
            slug: true,
            Content: {
                select: {
                    image: true,
                    content: true,
                },
            },
        },
        take,
        where: {
            title: { contains: search },
        },
    }) satisfies DiyFindManyProps;

const diyCountParams = (search?: string) =>
    ({
        where: {
            title: { contains: search },
        },
    }) satisfies DiyCountProps;

// ============== Exports ============== //

export type { ArticleSearchType, CategorySearchType, DiySearchType, ProductSearchType, CountType };

export {
    articleCountParams,
    articleFetchParams,
    categoryCountParams,
    categoryFetchParams,
    diyCountParams,
    diyFetchParams,
    productCountParams,
    productFetchParams,
};
