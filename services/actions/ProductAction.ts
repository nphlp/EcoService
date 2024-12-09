"use server";

import ProductService from "@services/class/ProductClass";
import { CountProductProps, CountProductResponse, CreateProductProps, CreateProductResponse, DeleteProductProps, DeleteProductResponse, FindManyProductProps, FindManyProductResponse, FindUniqueProductProps, FindUniqueProductResponse, UpdateProductProps, UpdateProductResponse, UpsertProductProps, UpsertProductResponse } from "@services/types/ProductType";

export const CreateProduct = async <T extends CreateProductProps>(props: T): Promise<CreateProductResponse<T>> => {
    try {
        const { data, error } = await ProductService.create(props);
        if (!data || error) throw new Error(error);
        return data;
    } catch (error) {
        throw new Error("CreateProduct -> " + (error as Error).message);
    }
};

export const UpsertProduct = async <T extends UpsertProductProps>(props: T): Promise<UpsertProductResponse<T>> => {
    try {
        const { data, error } = await ProductService.upsert(props);
        if (!data || error) throw new Error(error);
        return data;
    } catch (error) {
        throw new Error("UpsertProduct -> " + (error as Error).message);
    }
};

export const UpdateProduct = async <T extends UpdateProductProps>(props: T): Promise<UpdateProductResponse<T>> => {
    try {
        const { data, error } = await ProductService.update(props);
        if (!data || error) throw new Error(error);
        return data;
    } catch (error) {
        throw new Error("UpdateProduct -> " + (error as Error).message);
    }
};

export const DeleteProduct = async <T extends DeleteProductProps>(props: T): Promise<DeleteProductResponse<T>> => {
    try {
        const { data, error } = await ProductService.delete(props);
        if (!data || error) throw new Error(error);
        return data;
    } catch (error) {
        throw new Error("DeleteProduct -> " + (error as Error).message);
    }
};

/**
 * WARNING: do not use this for fetching data -> use API routes with caching instead
 */
export const SelectProduct = async <T extends FindUniqueProductProps>(
    props: T
): Promise<FindUniqueProductResponse<T>> => {
    try {
        const { data, error } = await ProductService.findUnique(props);
        if (error) throw new Error(error);
        return data ?? null;
    } catch (error) {
        throw new Error("SelectProduct -> " + (error as Error).message);
    }
};

/**
 * WARNING: do not use this for fetching data -> use API routes with caching instead
 */
export const SelectProductList = async <T extends FindManyProductProps>(
    props: T
): Promise<FindManyProductResponse<T>> => {
    try {
        const { data, error } = await ProductService.findMany(props);
        if (!data || error) throw new Error(error);
        return data;
    } catch (error) {
        throw new Error("SelectProductList -> " + (error as Error).message);
    }
};

/**
 * WARNING: do not use this for fetching data -> use API routes with caching instead
 */
export const SelectProductAmount = async (props: CountProductProps): Promise<CountProductResponse> => {
    try {
        const { data, error } = await ProductService.count(props);
        if (!data || error) throw new Error(error);
        return data;
    } catch (error) {
        throw new Error("SelectProductAmount -> " + (error as Error).message);
    }
};
