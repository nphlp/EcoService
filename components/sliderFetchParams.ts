import { FindManyArticleProps, FindManyArticleResponse } from "@services/types/ArticleType";
import { FindManyDiyProps, FindManyDiyResponse } from "@services/types/DiyType";
import { FindManyProductProps, FindManyProductResponse } from "@services/types/ProductType";

// Article or diy fetch params

export const ArticleOrDiyFetchParams = {
    select: {
        id: true,
        title: true,
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
} satisfies FindManyArticleProps | FindManyDiyProps;

export const ArticleFetchParams = ArticleOrDiyFetchParams satisfies FindManyArticleProps;
export const DiyFetchParams = ArticleOrDiyFetchParams satisfies FindManyDiyProps;

export type ArticleOrDiyListType =
    | FindManyArticleResponse<typeof ArticleOrDiyFetchParams>
    | FindManyDiyResponse<typeof ArticleOrDiyFetchParams>;

// Product list fetch params

export const ProductFetchParams = {
    orderBy: {
        createdAt: "desc" as const,
    },
    take: 10,
} satisfies FindManyProductProps;

export type ProductListType = FindManyProductResponse<typeof ProductFetchParams>;
