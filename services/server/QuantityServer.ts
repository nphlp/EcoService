import QuantityService from "@services/class/QuantityClass";
import { QuantityCountProps, QuantityFindFirstProps, QuantityFindManyProps, QuantityFindUniqueProps } from "@services/types/QuantityType";

export const QuantityFindManyServer = async <T extends QuantityFindManyProps>(params: T) => {
    const { data, error } = await QuantityService.findMany<T>(params);
    if (error || data === undefined) throw new Error(error ?? "Something went wrong...");
    return data;
};

export const QuantityFindFirstServer = async <T extends QuantityFindFirstProps>(params: T) => {
    const { data, error } = await QuantityService.findFirst<T>(params);
    if (error || data === undefined) throw new Error(error ?? "Something went wrong...");
    return data;
};

export const QuantityFindUniqueServer = async <T extends QuantityFindUniqueProps>(params: T) => {
    const { data, error } = await QuantityService.findUnique<T>(params);
    if (error || data === undefined) throw new Error(error ?? "Something went wrong...");
    return data;
};

export const QuantityCountServer = async (params: QuantityCountProps) => {
    const { data, error } = await QuantityService.count(params);
    if (error || data === undefined) throw new Error(error ?? "Something went wrong...");
    return data;
}; 