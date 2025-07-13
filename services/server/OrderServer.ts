import OrderService from "@services/class/OrderClass";
import { OrderCountProps, OrderFindFirstProps, OrderFindManyProps, OrderFindUniqueProps } from "@services/types/OrderType";

export const OrderFindManyServer = async <T extends OrderFindManyProps>(params: T) => {
    const { data, error } = await OrderService.findMany<T>(params);
    if (error || data === undefined) throw new Error(error ?? "Something went wrong...");
    return data;
};

export const OrderFindFirstServer = async <T extends OrderFindFirstProps>(params: T) => {
    const { data, error } = await OrderService.findFirst<T>(params);
    if (error || data === undefined) throw new Error(error ?? "Something went wrong...");
    return data;
};

export const OrderFindUniqueServer = async <T extends OrderFindUniqueProps>(params: T) => {
    const { data, error } = await OrderService.findUnique<T>(params);
    if (error || data === undefined) throw new Error(error ?? "Something went wrong...");
    return data;
};

export const OrderCountServer = async (params: OrderCountProps) => {
    const { data, error } = await OrderService.count(params);
    if (error || data === undefined) throw new Error(error ?? "Something went wrong...");
    return data;
}; 