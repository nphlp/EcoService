import OrderService from "@services/class/OrderClass";
import { OrderCountProps, OrderFindFirstProps, OrderFindManyProps, OrderFindUniqueProps } from "@services/types/OrderType";
import { cacheLifeApi } from "@utils/FetchConfig";
import { unstable_cacheLife as cacheLife, unstable_cacheTag as cacheTag } from "next/cache";

export const OrderFindManyCached = async <T extends OrderFindManyProps>(params: T) => {
    "use cache";
    cacheLife(cacheLifeApi);
    cacheTag("/api/order");
    return OrderService.findMany<T>(params);
};

export const OrderFindFirstCached = async <T extends OrderFindFirstProps>(params: T) => {
    "use cache";
    cacheLife(cacheLifeApi);
    cacheTag("/api/order/first");
    return OrderService.findFirst<T>(params);
};

export const OrderFindUniqueCached = async <T extends OrderFindUniqueProps>(params: T) => {
    "use cache";
    cacheLife(cacheLifeApi);
    cacheTag("/api/order/unique");
    return OrderService.findUnique<T>(params);
};

export const OrderCountCached = async (params: OrderCountProps) => {
    "use cache";
    cacheLife(cacheLifeApi);
    cacheTag("/api/order/count");
    return OrderService.count(params);
};
