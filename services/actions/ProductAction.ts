"use server";

import { requiresSafeMessage } from "@permissions/requiresSafeMessage";
import ProductService from "@services/class/ProductClass";
import { ProductCountProps, ProductCountResponse, ProductCreateManyProps, ProductCreateManyResponse, ProductCreateProps, ProductCreateResponse, ProductDeleteManyProps, ProductDeleteManyResponse, ProductDeleteProps, ProductDeleteResponse, ProductFindFirstProps, ProductFindFirstResponse, ProductFindManyProps, ProductFindManyResponse, ProductFindUniqueProps, ProductFindUniqueResponse, ProductUpdateManyProps, ProductUpdateManyResponse, ProductUpdateProps, ProductUpdateResponse, ProductUpsertProps, ProductUpsertResponse } from "@services/types/ProductType";

// ========== Single mutations ========== //

export const ProductCreateAction = async <T extends ProductCreateProps>(props: T, disableSafeMessage: boolean = false): Promise<ProductCreateResponse<T>> => {
    try {
        await requiresSafeMessage(disableSafeMessage, "ProductCreateAction", "Product", "create");
        const { data, error } = await ProductService.create(props);
        if (!data || error) throw new Error(error);
        return data;
    } catch (error) {
        throw new Error("ProductCreateAction -> " + (error as Error).message);
    }
};

export const ProductUpsertAction = async <T extends ProductUpsertProps>(props: T, disableSafeMessage: boolean = false): Promise<ProductUpsertResponse<T>> => {
    try {
        await requiresSafeMessage(disableSafeMessage, "ProductUpsertAction", "Product", "upsert");
        const { data, error } = await ProductService.upsert(props);
        if (!data || error) throw new Error(error);
        return data;
    } catch (error) {
        throw new Error("ProductUpsertAction -> " + (error as Error).message);
    }
};

export const ProductUpdateAction = async <T extends ProductUpdateProps>(props: T, disableSafeMessage: boolean = false): Promise<ProductUpdateResponse<T>> => {
    try {
        await requiresSafeMessage(disableSafeMessage, "ProductUpdateAction", "Product", "update");
        const { data, error } = await ProductService.update(props);
        if (!data || error) throw new Error(error);
        return data;
    } catch (error) {
        throw new Error("ProductUpdateAction -> " + (error as Error).message);
    }
};

export const ProductDeleteAction = async <T extends ProductDeleteProps>(props: T, disableSafeMessage: boolean = false): Promise<ProductDeleteResponse<T>> => {
    try {
        await requiresSafeMessage(disableSafeMessage, "ProductDeleteAction", "Product", "delete");
        const { data, error } = await ProductService.delete(props);
        if (!data || error) throw new Error(error);
        return data;
    } catch (error) {
        throw new Error("ProductDeleteAction -> " + (error as Error).message);
    }
};

// ========== Multiple mutations ========== //

export const ProductCreateManyAction = async (props: ProductCreateManyProps, disableSafeMessage: boolean = false): Promise<ProductCreateManyResponse> => {
    try {
        await requiresSafeMessage(disableSafeMessage, "ProductCreateManyAction", "Product", "createMany");
        const { data, error } = await ProductService.createMany(props);
        if (!data || error) throw new Error(error);
        return data;
    } catch (error) {
        throw new Error("ProductCreateManyAction -> " + (error as Error).message);
    }
};

export const ProductUpdateManyAction = async (props: ProductUpdateManyProps, disableSafeMessage: boolean = false): Promise<ProductUpdateManyResponse> => {
    try {
        await requiresSafeMessage(disableSafeMessage, "ProductUpdateManyAction", "Product", "updateMany");
        const { data, error } = await ProductService.updateMany(props);
        if (!data || error) throw new Error(error);
        return data;
    } catch (error) {
        throw new Error("ProductUpdateManyAction -> " + (error as Error).message);
    }
};

export const ProductDeleteManyAction = async (props: ProductDeleteManyProps, disableSafeMessage: boolean = false): Promise<ProductDeleteManyResponse> => {
    try {
        await requiresSafeMessage(disableSafeMessage, "ProductDeleteManyAction", "Product", "deleteMany");
        const { data, error } = await ProductService.deleteMany(props);
        if (!data || error) throw new Error(error);
        return data;
    } catch (error) {
        throw new Error("ProductDeleteManyAction -> " + (error as Error).message);
    }
};

// ========== Single queries ========== //

/**
 * WARNING: do not use this for fetching data -> use API routes with caching instead
 */
export const ProductFindFirstAction = async <T extends ProductFindFirstProps>(
    props: T,
    disableSafeMessage: boolean = false
): Promise<ProductFindFirstResponse<T>> => {
    try {
        await requiresSafeMessage(disableSafeMessage, "ProductFindFirstAction", "Product", "findFirst");
        const { data, error } = await ProductService.findFirst(props);
        if (error) throw new Error(error);
        return data ?? null;
    } catch (error) {
        throw new Error("ProductFindFirstAction -> " + (error as Error).message);
    }
};

/**
 * WARNING: do not use this for fetching data -> use API routes with caching instead
 */
export const ProductFindUniqueAction = async <T extends ProductFindUniqueProps>(
    props: T,
    disableSafeMessage: boolean = false
): Promise<ProductFindUniqueResponse<T>> => {
    try {
        await requiresSafeMessage(disableSafeMessage, "ProductFindUniqueAction", "Product", "findUnique");
        const { data, error } = await ProductService.findUnique(props);
        if (error) throw new Error(error);
        return data ?? null;
    } catch (error) {
        throw new Error("ProductFindUniqueAction -> " + (error as Error).message);
    }
};

/**
 * WARNING: do not use this for fetching data -> use API routes with caching instead
 */
export const ProductFindManyAction = async <T extends ProductFindManyProps>(
    props: T,
    disableSafeMessage: boolean = false
): Promise<ProductFindManyResponse<T>> => {
    try {
        await requiresSafeMessage(disableSafeMessage, "ProductFindManyAction", "Product", "findMany");
        const { data, error } = await ProductService.findMany(props);
        if (!data || error) throw new Error(error);
        return data;
    } catch (error) {
        throw new Error("ProductFindManyAction -> " + (error as Error).message);
    }
};

// ========== Aggregate queries ========== //

/**
 * WARNING: do not use this for fetching data -> use API routes with caching instead
 */
export const ProductCountAction = async (props: ProductCountProps, disableSafeMessage: boolean = false): Promise<ProductCountResponse> => {
    try {
        await requiresSafeMessage(disableSafeMessage, "ProductCountAction", "Product", "count");
        const { data, error } = await ProductService.count(props);
        if (!data || error) throw new Error(error);
        return data;
    } catch (error) {
        throw new Error("ProductCountAction -> " + (error as Error).message);
    }
};
