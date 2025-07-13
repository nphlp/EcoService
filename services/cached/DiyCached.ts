import DiyService from "@services/class/DiyClass";
import { DiyCountProps, DiyFindFirstProps, DiyFindManyProps, DiyFindUniqueProps } from "@services/types/DiyType";
import { cacheLifeApi } from "@utils/FetchConfig";
import { unstable_cacheLife as cacheLife, unstable_cacheTag as cacheTag } from "next/cache";

export const DiyFindManyCached = async <T extends DiyFindManyProps>(params: T) => {
    "use cache";
    cacheLife(cacheLifeApi);
    cacheTag("/api/diy");
    return DiyService.findMany<T>(params);
};

export const DiyFindFirstCached = async <T extends DiyFindFirstProps>(params: T) => {
    "use cache";
    cacheLife(cacheLifeApi);
    cacheTag("/api/diy/first");
    return DiyService.findFirst<T>(params);
};

export const DiyFindUniqueCached = async <T extends DiyFindUniqueProps>(params: T) => {
    "use cache";
    cacheLife(cacheLifeApi);
    cacheTag("/api/diy/unique");
    return DiyService.findUnique<T>(params);
};

export const DiyCountCached = async (params: DiyCountProps) => {
    "use cache";
    cacheLife(cacheLifeApi);
    cacheTag("/api/diy/count");
    return DiyService.count(params);
};
