import { ArticleFindManyProps, ArticleFindManyResponse } from "@services/types/ArticleType";
import { DiyFindManyProps, DiyFindManyResponse } from "@services/types/DiyType";
import { ProductFindManyProps, ProductFindManyResponse } from "@services/types/ProductType";

// Article or diy fetch params

export const ArticleOrDiyFetchParams = {
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
        Author: {
            select: {
                name: true,
            },
        },
    },
    orderBy: {
        createdAt: "desc" as const,
    },
} satisfies ArticleFindManyProps | DiyFindManyProps;

export const ArticleFetchParams = ArticleOrDiyFetchParams satisfies ArticleFindManyProps;
export const DiyFetchParams = ArticleOrDiyFetchParams satisfies DiyFindManyProps;

export type ArticleOrDiyListType =
    | ArticleFindManyResponse<typeof ArticleOrDiyFetchParams>
    | DiyFindManyResponse<typeof ArticleOrDiyFetchParams>;

// Product list fetch params

export const ProductFetchParams = {
    orderBy: {
        createdAt: "desc" as const,
    },
    take: 10,
} satisfies ProductFindManyProps;

export type ProductListType = ProductFindManyResponse<typeof ProductFetchParams>;
