import ProductService from "@services/class/ProductClass";
import { ProductCountProps, ProductFindFirstProps, ProductFindManyProps, ProductFindUniqueProps } from "@services/types/ProductType";

export const ProductFindManyServer = async <T extends ProductFindManyProps>(params: T) => {
    const { data, error } = await ProductService.findMany<T>(params);
    if (error || data === undefined) throw new Error(error ?? "Something went wrong...");
    return data;
};

export const ProductFindFirstServer = async <T extends ProductFindFirstProps>(params: T) => {
    const { data, error } = await ProductService.findFirst<T>(params);
    if (error || data === undefined) throw new Error(error ?? "Something went wrong...");
    return data;
};

export const ProductFindUniqueServer = async <T extends ProductFindUniqueProps>(params: T) => {
    const { data, error } = await ProductService.findUnique<T>(params);
    if (error || data === undefined) throw new Error(error ?? "Something went wrong...");
    return data;
};

export const ProductCountServer = async (params: ProductCountProps) => {
    const { data, error } = await ProductService.count(params);
    if (error || data === undefined) throw new Error(error ?? "Something went wrong...");
    return data;
}; 