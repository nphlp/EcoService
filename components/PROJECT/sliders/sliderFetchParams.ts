import { ArticleFindManyProps, ArticleFindManyResponse } from "@services/types/ArticleType";
import { ProductFindManyProps, ProductFindManyResponse } from "@services/types/ProductType";

// Article fetch params

export const ArticleFetchParams = {
    select: {
        title: true,
        slug: true,
        createdAt: true,
        Content: {
            select: {
                content: true,
                image: true,
            },
        },
    },
    orderBy: {
        createdAt: "desc" as const,
    },
} satisfies ArticleFindManyProps;

export type ArticleListType = ArticleFindManyResponse<typeof ArticleFetchParams>;

// Product list fetch params

export const ProductFetchParams = {
    orderBy: {
        createdAt: "desc" as const,
    },
    take: 10,
} satisfies ProductFindManyProps;

export type ProductListType = ProductFindManyResponse<typeof ProductFetchParams>;
