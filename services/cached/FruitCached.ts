import FruitService from "@services/class/FruitClass";
import { FruitCountProps, FruitFindFirstProps, FruitFindManyProps, FruitFindUniqueProps } from "@services/types/FruitType";
import { cacheLifeApi } from "@utils/FetchConfig";
import { unstable_cacheLife as cacheLife, unstable_cacheTag as cacheTag } from "next/cache";

export const FruitFindManyCached = async <T extends FruitFindManyProps>(params: T) => {
    "use cache";
    cacheLife(cacheLifeApi);
    cacheTag("/api/fruit");
    return FruitService.findMany<T>(params);
};

export const FruitFindFirstCached = async <T extends FruitFindFirstProps>(params: T) => {
    "use cache";
    cacheLife(cacheLifeApi);
    cacheTag("/api/fruit/first");
    return FruitService.findFirst<T>(params);
};

export const FruitFindUniqueCached = async <T extends FruitFindUniqueProps>(params: T) => {
    "use cache";
    cacheLife(cacheLifeApi);
    cacheTag("/api/fruit/unique");
    return FruitService.findUnique<T>(params);
};

export const FruitCountCached = async (params: FruitCountProps) => {
    "use cache";
    cacheLife(cacheLifeApi);
    cacheTag("/api/fruit/count");
    return FruitService.count(params);
};
