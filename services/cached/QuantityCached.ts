import QuantityService from "@services/class/QuantityClass";
import { QuantityCountProps, QuantityFindFirstProps, QuantityFindManyProps, QuantityFindUniqueProps } from "@services/types/QuantityType";
import { cacheLifeApi } from "@utils/FetchConfig";
import { unstable_cacheLife as cacheLife, unstable_cacheTag as cacheTag } from "next/cache";

export const QuantityFindManyCached = async <T extends QuantityFindManyProps>(params: T) => {
    "use cache";
    cacheLife(cacheLifeApi);
    cacheTag("/api/quantity");
    return QuantityService.findMany<T>(params);
};

export const QuantityFindFirstCached = async <T extends QuantityFindFirstProps>(params: T) => {
    "use cache";
    cacheLife(cacheLifeApi);
    cacheTag("/api/quantity/first");
    return QuantityService.findFirst<T>(params);
};

export const QuantityFindUniqueCached = async <T extends QuantityFindUniqueProps>(params: T) => {
    "use cache";
    cacheLife(cacheLifeApi);
    cacheTag("/api/quantity/unique");
    return QuantityService.findUnique<T>(params);
};

export const QuantityCountCached = async (params: QuantityCountProps) => {
    "use cache";
    cacheLife(cacheLifeApi);
    cacheTag("/api/quantity/count");
    return QuantityService.count(params);
};
