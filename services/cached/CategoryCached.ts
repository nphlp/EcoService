import CategoryService from "@services/class/CategoryClass";
import { CategoryCountProps, CategoryFindFirstProps, CategoryFindManyProps, CategoryFindUniqueProps } from "@services/types/CategoryType";
import { cacheLifeApi } from "@utils/FetchConfig";
import { unstable_cacheLife as cacheLife, unstable_cacheTag as cacheTag } from "next/cache";

export const CategoryFindManyCached = async <T extends CategoryFindManyProps>(params: T) => {
    "use cache";
    cacheLife(cacheLifeApi);
    cacheTag("/api/category");
    return CategoryService.findMany<T>(params);
};

export const CategoryFindFirstCached = async <T extends CategoryFindFirstProps>(params: T) => {
    "use cache";
    cacheLife(cacheLifeApi);
    cacheTag("/api/category/first");
    return CategoryService.findFirst<T>(params);
};

export const CategoryFindUniqueCached = async <T extends CategoryFindUniqueProps>(params: T) => {
    "use cache";
    cacheLife(cacheLifeApi);
    cacheTag("/api/category/unique");
    return CategoryService.findUnique<T>(params);
};

export const CategoryCountCached = async (params: CategoryCountProps) => {
    "use cache";
    cacheLife(cacheLifeApi);
    cacheTag("/api/category/count");
    return CategoryService.count(params);
};
