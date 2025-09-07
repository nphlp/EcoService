import PrismaInstance from "@lib/prisma";
import { Prisma } from "@prisma/client";
import { GetResult, InternalArgs, PrismaClientOptions } from "@prisma/client/runtime/library";
import { cacheLifeApi } from "@utils/FetchConfig";
import { unstable_cacheLife as cacheLife, unstable_cacheTag as cacheTag } from "next/cache";

// ========== Types ========== //

export type ArticleFindManyProps<T extends Prisma.ArticleFindManyArgs> = Prisma.SelectSubset<
    T,
    Prisma.ArticleFindManyArgs
>;
export type ArticleFindManyResponse<T extends Prisma.ArticleFindManyArgs> = GetResult<
    Prisma.$ArticlePayload<InternalArgs>,
    T,
    "findMany",
    PrismaClientOptions
>;

export type ArticleFindFirstProps<T extends Prisma.ArticleFindFirstArgs> = Prisma.SelectSubset<
    T,
    Prisma.ArticleFindFirstArgs
>;
export type ArticleFindFirstResponse<T extends Prisma.ArticleFindFirstArgs> = GetResult<
    Prisma.$ArticlePayload<InternalArgs>,
    T,
    "findFirst",
    PrismaClientOptions
>;

export type ArticleFindUniqueProps<T extends Prisma.ArticleFindUniqueArgs> = Prisma.SelectSubset<
    T,
    Prisma.ArticleFindUniqueArgs
>;
export type ArticleFindUniqueResponse<T extends Prisma.ArticleFindUniqueArgs> = GetResult<
    Prisma.$ArticlePayload<InternalArgs>,
    T,
    "findUnique",
    PrismaClientOptions
>;

export type ArticleCountProps<T extends Prisma.ArticleCountArgs> = Prisma.SelectSubset<T, Prisma.ArticleCountArgs>;
export type ArticleCountResponse<T extends Prisma.ArticleCountArgs> =
    // eslint-disable-next-line
    T extends { select: any }
        ? T["select"] extends true
            ? number
            : Prisma.GetScalarType<T["select"], Prisma.ArticleCountAggregateOutputType>
        : number;

// ========== Services ========== //

export const ArticleFindManyCached = async <T extends Prisma.ArticleFindManyArgs>(
    params: ArticleFindManyProps<T>,
): Promise<ArticleFindManyResponse<T>> => {
    "use cache";

    cacheLife(cacheLifeApi);
    cacheTag(
        // All services
        "services",
        // All article services
        "article",
        // All findMany services
        "findMany",
        // All article findMany services
        "article-findMany",
        // This specific services
        `article-findMany-${JSON.stringify(params)}`,
    );

    return PrismaInstance.article.findMany(params);
};

export const ArticleFindFirstCached = async <T extends Prisma.ArticleFindFirstArgs>(
    params: ArticleFindFirstProps<T>,
): Promise<ArticleFindFirstResponse<T>> => {
    "use cache";

    cacheLife(cacheLifeApi);
    cacheTag(
        // All services
        "services",
        // All article services
        "article",
        // All findFirst services
        "findFirst",
        // All article findFirst services
        "article-findFirst",
        // This specific services
        `article-findFirst-${JSON.stringify(params)}`,
    );

    return PrismaInstance.article.findFirst(params);
};

export const ArticleFindUniqueCached = async <T extends Prisma.ArticleFindUniqueArgs>(
    params: ArticleFindUniqueProps<T>,
): Promise<ArticleFindUniqueResponse<T>> => {
    "use cache";

    cacheLife(cacheLifeApi);
    cacheTag(
        // All services
        "services",
        // All article services
        "article",
        // All findUnique services
        "findUnique",
        // All article findUnique services
        "article-findUnique",
        // This specific services
        `article-findUnique-${JSON.stringify(params)}`,
    );

    return PrismaInstance.article.findUnique(params);
};

export const ArticleCountCached = async <T extends Prisma.ArticleCountArgs>(
    params: ArticleCountProps<T>,
): Promise<ArticleCountResponse<T>> => {
    "use cache";

    cacheLife(cacheLifeApi);
    cacheTag(
        // All services
        "services",
        // All article services
        "article",
        // All count services
        "count",
        // All article count services
        "article-count",
        // This specific services
        `article-count-${JSON.stringify(params)}`,
    );

    return PrismaInstance.article.count(params);
};
