import AddressService from "@services/class/AddressClass";
import { AddressCountProps, AddressFindFirstProps, AddressFindManyProps, AddressFindUniqueProps } from "@services/types/AddressType";
import { cacheLifeApi } from "@utils/FetchConfig";
import { unstable_cacheLife as cacheLife, unstable_cacheTag as cacheTag } from "next/cache";

export const AddressFindManyCached = async <T extends AddressFindManyProps>(params: T) => {
    "use cache";
    cacheLife(cacheLifeApi);
    cacheTag("/api/address");
    return AddressService.findMany<T>(params);
};

export const AddressFindFirstCached = async <T extends AddressFindFirstProps>(params: T) => {
    "use cache";
    cacheLife(cacheLifeApi);
    cacheTag("/api/address/first");
    return AddressService.findFirst<T>(params);
};

export const AddressFindUniqueCached = async <T extends AddressFindUniqueProps>(params: T) => {
    "use cache";
    cacheLife(cacheLifeApi);
    cacheTag("/api/address/unique");
    return AddressService.findUnique<T>(params);
};

export const AddressCountCached = async (params: AddressCountProps) => {
    "use cache";
    cacheLife(cacheLifeApi);
    cacheTag("/api/address/count");
    return AddressService.count(params);
};
