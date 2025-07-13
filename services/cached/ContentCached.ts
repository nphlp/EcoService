import ContentService from "@services/class/ContentClass";
import { ContentCountProps, ContentFindFirstProps, ContentFindManyProps, ContentFindUniqueProps } from "@services/types/ContentType";
import { cacheLifeApi } from "@utils/FetchConfig";
import { unstable_cacheLife as cacheLife, unstable_cacheTag as cacheTag } from "next/cache";

export const ContentFindManyCached = async <T extends ContentFindManyProps>(params: T) => {
    "use cache";
    cacheLife(cacheLifeApi);
    cacheTag("/api/content");
    return ContentService.findMany<T>(params);
};

export const ContentFindFirstCached = async <T extends ContentFindFirstProps>(params: T) => {
    "use cache";
    cacheLife(cacheLifeApi);
    cacheTag("/api/content/first");
    return ContentService.findFirst<T>(params);
};

export const ContentFindUniqueCached = async <T extends ContentFindUniqueProps>(params: T) => {
    "use cache";
    cacheLife(cacheLifeApi);
    cacheTag("/api/content/unique");
    return ContentService.findUnique<T>(params);
};

export const ContentCountCached = async (params: ContentCountProps) => {
    "use cache";
    cacheLife(cacheLifeApi);
    cacheTag("/api/content/count");
    return ContentService.count(params);
};
