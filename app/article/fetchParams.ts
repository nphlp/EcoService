import { Prisma } from "@prisma/client/client";
import { ArticleCountProps, ArticleFindManyProps } from "@services/types";
import { ArticleQueryParamsCachedType } from "./queryParams";

type CountType = number;

// ============== Article ============== //

type ArticleSearchType = Prisma.ArticleGetPayload<ReturnType<typeof articleFetchParams>>;

const articleFetchParams = ({ page, search = "" }: ArticleQueryParamsCachedType) =>
    ({
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
        take: 6,
        skip: (page - 1) * 6,
        orderBy: {
            createdAt: "desc",
        },
        where: {
            OR: [
                { title: { contains: search } },
                { slug: { contains: search } },
                {
                    Content: {
                        some: {
                            content: { contains: search },
                        },
                    },
                },
                {
                    Author: {
                        name: { contains: search },
                    },
                },
            ],
        },
    }) satisfies ArticleFindManyProps;

const articleCountParams = ({ search = "" }: { search: string }) =>
    ({
        where: {
            OR: [
                { title: { contains: search } },
                { slug: { contains: search } },
                {
                    Content: {
                        some: {
                            content: { contains: search },
                        },
                    },
                },
                {
                    Author: {
                        name: { contains: search },
                    },
                },
            ],
        },
    }) satisfies ArticleCountProps;

// ============== Exports ============== //

export type { CountType, ArticleSearchType };

export { articleCountParams, articleFetchParams };
