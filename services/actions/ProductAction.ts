"use server";

import ProductService from "@services/class/ProductClass";
import { CountProductProps, CountProductResponse, CreateManyProductProps, CreateManyProductResponse, CreateProductProps, CreateProductResponse, DeleteManyProductProps, DeleteManyProductResponse, DeleteProductProps, DeleteProductResponse, FindFirstProductProps, FindFirstProductResponse, FindManyProductProps, FindManyProductResponse, FindUniqueProductProps, FindUniqueProductResponse, UpdateManyProductProps, UpdateManyProductResponse, UpdateProductProps, UpdateProductResponse, UpsertProductProps, UpsertProductResponse } from "@services/types/ProductType";

// ========== Single mutations ========== //

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

// ========== Multiple mutations ========== //

export const CreateManyProduct = async (props: CreateManyProductProps): Promise<CreateManyProductResponse> => {
    try {
        const { data, error } = await ProductService.createMany(props);
        if (!data || error) throw new Error(error);
        return data;
    } catch (error) {
        throw new Error("CreateManyProduct -> " + (error as Error).message);
    }
};

export const UpdateManyProduct = async (props: UpdateManyProductProps): Promise<UpdateManyProductResponse> => {
    try {
        const { data, error } = await ProductService.updateMany(props);
        if (!data || error) throw new Error(error);
        return data;
    } catch (error) {
        throw new Error("UpdateManyProduct -> " + (error as Error).message);
    }
};

export const DeleteManyProduct = async (props: DeleteManyProductProps): Promise<DeleteManyProductResponse> => {
    try {
        const { data, error } = await ProductService.deleteMany(props);
        if (!data || error) throw new Error(error);
        return data;
    } catch (error) {
        throw new Error("DeleteManyProduct -> " + (error as Error).message);
    }
};

// ========== Single queries ========== //

/**
 * WARNING: do not use this for fetching data -> use API routes with caching instead
 */
export const SelectFirstProduct = async <T extends FindFirstProductProps>(
    props: T
): Promise<FindFirstProductResponse<T>> => {
    try {
        const { data, error } = await ProductService.findFirst(props);
        if (error) throw new Error(error);
        return data ?? null;
    } catch (error) {
        throw new Error("SelectFirstProduct -> " + (error as Error).message);
    }
};

/**
 * WARNING: do not use this for fetching data -> use API routes with caching instead
 */
export const SelectUniqueProduct = async <T extends FindUniqueProductProps>(
    props: T
): Promise<FindUniqueProductResponse<T>> => {
    try {
        const { data, error } = await ProductService.findUnique(props);
        if (error) throw new Error(error);
        return data ?? null;
    } catch (error) {
        throw new Error("SelectUniqueProduct -> " + (error as Error).message);
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

// ========== Aggregate queries ========== //

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
