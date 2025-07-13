import FruitService from "@services/class/FruitClass";
import { FruitCountProps, FruitFindFirstProps, FruitFindManyProps, FruitFindUniqueProps } from "@services/types/FruitType";

export const FruitFindManyServer = async <T extends FruitFindManyProps>(params: T) => {
    const { data, error } = await FruitService.findMany<T>(params);
    if (error || data === undefined) throw new Error(error ?? "Something went wrong...");
    return data;
};

export const FruitFindFirstServer = async <T extends FruitFindFirstProps>(params: T) => {
    const { data, error } = await FruitService.findFirst<T>(params);
    if (error || data === undefined) throw new Error(error ?? "Something went wrong...");
    return data;
};

export const FruitFindUniqueServer = async <T extends FruitFindUniqueProps>(params: T) => {
    const { data, error } = await FruitService.findUnique<T>(params);
    if (error || data === undefined) throw new Error(error ?? "Something went wrong...");
    return data;
};

export const FruitCountServer = async (params: FruitCountProps) => {
    const { data, error } = await FruitService.count(params);
    if (error || data === undefined) throw new Error(error ?? "Something went wrong...");
    return data;
}; 