import { ArticleFindManyProps, ArticleFindManyResponse } from "@services/types/ArticleType";

// Case 1: Does not include author
const params = {
    orderBy: { createdAt: "desc" as const },
    take: 3,
} satisfies ArticleFindManyProps;

// Case 2: Includes author
const paramsWithAuthor = {
    include: {
        Author: {
            select: {
                name: true,
            },
        },
    },
    ...params,
} satisfies ArticleFindManyProps;

// Article fetch params
export const ArticleFetchParams = ({ includeAuthor }: { includeAuthor: boolean }) =>
    includeAuthor ? paramsWithAuthor : params;

// Article
export type ArticleFetchResponse = ArticleFindManyResponse<typeof params>;
// Article with author
export type ArticleAuthorFetchResponse = ArticleFindManyResponse<typeof paramsWithAuthor>;
