"use server";

import ProductService from "@services/class/ProductClass";
import { ProductCountProps, ProductCountResponse, ProductCreateManyProps, ProductCreateManyResponse, ProductCreateProps, ProductCreateResponse, ProductDeleteManyProps, ProductDeleteManyResponse, ProductDeleteProps, ProductDeleteResponse, ProductFindFirstProps, ProductFindFirstResponse, ProductFindManyProps, ProductFindManyResponse, ProductFindUniqueProps, ProductFindUniqueResponse, ProductUpdateManyProps, ProductUpdateManyResponse, ProductUpdateProps, ProductUpdateResponse, ProductUpsertProps, ProductUpsertResponse } from "@services/types/ProductType";

// ========== Single mutations ========== //

export const ProductCreateAction = async <T extends ProductCreateProps>(props: T): Promise<ProductCreateResponse<T>> => {
    try {
        const { data, error } = await ProductService.create(props);
        if (!data || error) throw new Error(error);
        return data;
    } catch (error) {
        throw new Error("ProductCreate -> " + (error as Error).message);
    }
};

export const ProductUpsertAction = async <T extends ProductUpsertProps>(props: T): Promise<ProductUpsertResponse<T>> => {
    try {
        const { data, error } = await ProductService.upsert(props);
        if (!data || error) throw new Error(error);
        return data;
    } catch (error) {
        throw new Error("ProductUpsert -> " + (error as Error).message);
    }
};

export const ProductUpdateAction = async <T extends ProductUpdateProps>(props: T): Promise<ProductUpdateResponse<T>> => {
    try {
        const { data, error } = await ProductService.update(props);
        if (!data || error) throw new Error(error);
        return data;
    } catch (error) {
        throw new Error("ProductUpdate -> " + (error as Error).message);
    }
};

export const ProductDeleteAction = async <T extends ProductDeleteProps>(props: T): Promise<ProductDeleteResponse<T>> => {
    try {
        const { data, error } = await ProductService.delete(props);
        if (!data || error) throw new Error(error);
        return data;
    } catch (error) {
        throw new Error("ProductDelete -> " + (error as Error).message);
    }
};

// ========== Multiple mutations ========== //

export const ProductCreateManyAction = async (props: ProductCreateManyProps): Promise<ProductCreateManyResponse> => {
    try {
        const { data, error } = await ProductService.createMany(props);
        if (!data || error) throw new Error(error);
        return data;
    } catch (error) {
        throw new Error("ProductCreateMany -> " + (error as Error).message);
    }
};

export const ProductUpdateManyAction = async (props: ProductUpdateManyProps): Promise<ProductUpdateManyResponse> => {
    try {
        const { data, error } = await ProductService.updateMany(props);
        if (!data || error) throw new Error(error);
        return data;
    } catch (error) {
        throw new Error("ProductUpdateMany -> " + (error as Error).message);
    }
};

export const ProductDeleteManyAction = async (props: ProductDeleteManyProps): Promise<ProductDeleteManyResponse> => {
    try {
        const { data, error } = await ProductService.deleteMany(props);
        if (!data || error) throw new Error(error);
        return data;
    } catch (error) {
        throw new Error("ProductDeleteMany -> " + (error as Error).message);
    }
};

// ========== Single queries ========== //

/**
 * WARNING: do not use this for fetching data -> use API routes with caching instead
 */
export const ProductFindFirstAction = async <T extends ProductFindFirstProps>(
    props: T
): Promise<ProductFindFirstResponse<T>> => {
    try {
        const { data, error } = await ProductService.findFirst(props);
        if (error) throw new Error(error);
        return data ?? null;
    } catch (error) {
        throw new Error("ProductFindFirst -> " + (error as Error).message);
    }
};

/**
 * WARNING: do not use this for fetching data -> use API routes with caching instead
 */
export const ProductFindUniqueAction = async <T extends ProductFindUniqueProps>(
    props: T
): Promise<ProductFindUniqueResponse<T>> => {
    try {
        const { data, error } = await ProductService.findUnique(props);
        if (error) throw new Error(error);
        return data ?? null;
    } catch (error) {
        throw new Error("ProductFindUnique -> " + (error as Error).message);
    }
};

/**
 * WARNING: do not use this for fetching data -> use API routes with caching instead
 */
export const ProductFindManyAction = async <T extends ProductFindManyProps>(
    props: T
): Promise<ProductFindManyResponse<T>> => {
    try {
        const { data, error } = await ProductService.findMany(props);
        if (!data || error) throw new Error(error);
        return data;
    } catch (error) {
        throw new Error("ProductFindMany -> " + (error as Error).message);
    }
};

// ========== Aggregate queries ========== //

/**
 * WARNING: do not use this for fetching data -> use API routes with caching instead
 */
export const ProductCountAction = async (props: ProductCountProps): Promise<ProductCountResponse> => {
    try {
        const { data, error } = await ProductService.count(props);
        if (!data || error) throw new Error(error);
        return data;
    } catch (error) {
        throw new Error("ProductCount -> " + (error as Error).message);
    }
};
