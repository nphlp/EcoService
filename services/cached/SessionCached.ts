import SessionService from "@services/class/SessionClass";
import { SessionCountProps, SessionFindFirstProps, SessionFindManyProps, SessionFindUniqueProps } from "@services/types/SessionType";
import { cacheLifeApi } from "@utils/FetchConfig";
import { unstable_cacheLife as cacheLife, unstable_cacheTag as cacheTag } from "next/cache";

export const SessionFindManyCached = async <T extends SessionFindManyProps>(params: T) => {
    "use cache";
    cacheLife(cacheLifeApi);
    cacheTag("/api/session");
    return SessionService.findMany<T>(params);
};

export const SessionFindFirstCached = async <T extends SessionFindFirstProps>(params: T) => {
    "use cache";
    cacheLife(cacheLifeApi);
    cacheTag("/api/session/first");
    return SessionService.findFirst<T>(params);
};

export const SessionFindUniqueCached = async <T extends SessionFindUniqueProps>(params: T) => {
    "use cache";
    cacheLife(cacheLifeApi);
    cacheTag("/api/session/unique");
    return SessionService.findUnique<T>(params);
};

export const SessionCountCached = async (params: SessionCountProps) => {
    "use cache";
    cacheLife(cacheLifeApi);
    cacheTag("/api/session/count");
    return SessionService.count(params);
};
