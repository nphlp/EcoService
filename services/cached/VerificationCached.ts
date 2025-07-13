import VerificationService from "@services/class/VerificationClass";
import { VerificationCountProps, VerificationFindFirstProps, VerificationFindManyProps, VerificationFindUniqueProps } from "@services/types/VerificationType";
import { cacheLifeApi } from "@utils/FetchConfig";
import { unstable_cacheLife as cacheLife, unstable_cacheTag as cacheTag } from "next/cache";

export const VerificationFindManyCached = async <T extends VerificationFindManyProps>(params: T) => {
    "use cache";
    cacheLife(cacheLifeApi);
    cacheTag("/api/verification");
    return VerificationService.findMany<T>(params);
};

export const VerificationFindFirstCached = async <T extends VerificationFindFirstProps>(params: T) => {
    "use cache";
    cacheLife(cacheLifeApi);
    cacheTag("/api/verification/first");
    return VerificationService.findFirst<T>(params);
};

export const VerificationFindUniqueCached = async <T extends VerificationFindUniqueProps>(params: T) => {
    "use cache";
    cacheLife(cacheLifeApi);
    cacheTag("/api/verification/unique");
    return VerificationService.findUnique<T>(params);
};

export const VerificationCountCached = async (params: VerificationCountProps) => {
    "use cache";
    cacheLife(cacheLifeApi);
    cacheTag("/api/verification/count");
    return VerificationService.count(params);
};
