import ArticleService from "@services/class/ArticleClass";
import { ArticleCountProps, ArticleFindFirstProps, ArticleFindManyProps, ArticleFindUniqueProps } from "@services/types/ArticleType";
import { cacheLifeApi } from "@utils/FetchConfig";
import { unstable_cacheLife as cacheLife, unstable_cacheTag as cacheTag } from "next/cache";

export const ArticleFindManyCached = async <T extends ArticleFindManyProps>(params: T) => {
    "use cache";
    cacheLife(cacheLifeApi);
    cacheTag("/api/article");
    return ArticleService.findMany<T>(params);
};

export const ArticleFindFirstCached = async <T extends ArticleFindFirstProps>(params: T) => {
    "use cache";
    cacheLife(cacheLifeApi);
    cacheTag("/api/article/first");
    return ArticleService.findFirst<T>(params);
};

export const ArticleFindUniqueCached = async <T extends ArticleFindUniqueProps>(params: T) => {
    "use cache";
    cacheLife(cacheLifeApi);
    cacheTag("/api/article/unique");
    return ArticleService.findUnique<T>(params);
};

export const ArticleCountCached = async (params: ArticleCountProps) => {
    "use cache";
    cacheLife(cacheLifeApi);
    cacheTag("/api/article/count");
    return ArticleService.count(params);
};
