import CategoryService from "@services/class/CategoryClass";
import { CategoryCountProps, CategoryFindFirstProps, CategoryFindManyProps, CategoryFindUniqueProps } from "@services/types/CategoryType";

export const CategoryFindManyServer = async <T extends CategoryFindManyProps>(params: T) => {
    const { data, error } = await CategoryService.findMany<T>(params);
    if (error || data === undefined) throw new Error(error ?? "Something went wrong...");
    return data;
};

export const CategoryFindFirstServer = async <T extends CategoryFindFirstProps>(params: T) => {
    const { data, error } = await CategoryService.findFirst<T>(params);
    if (error || data === undefined) throw new Error(error ?? "Something went wrong...");
    return data;
};

export const CategoryFindUniqueServer = async <T extends CategoryFindUniqueProps>(params: T) => {
    const { data, error } = await CategoryService.findUnique<T>(params);
    if (error || data === undefined) throw new Error(error ?? "Something went wrong...");
    return data;
};

export const CategoryCountServer = async (params: CategoryCountProps) => {
    const { data, error } = await CategoryService.count(params);
    if (error || data === undefined) throw new Error(error ?? "Something went wrong...");
    return data;
}; 