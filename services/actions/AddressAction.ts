"use server";

import AddressService from "@services/class/AddressClass";
import { AddressCountProps, AddressCountResponse, AddressCreateManyProps, AddressCreateManyResponse, AddressCreateProps, AddressCreateResponse, AddressDeleteManyProps, AddressDeleteManyResponse, AddressDeleteProps, AddressDeleteResponse, AddressFindFirstProps, AddressFindFirstResponse, AddressFindManyProps, AddressFindManyResponse, AddressFindUniqueProps, AddressFindUniqueResponse, AddressUpdateManyProps, AddressUpdateManyResponse, AddressUpdateProps, AddressUpdateResponse, AddressUpsertProps, AddressUpsertResponse } from "@services/types/AddressType";

// ========== Single mutations ========== //

export const AddressCreateAction = async <T extends AddressCreateProps>(props: T): Promise<AddressCreateResponse<T>> => {
    try {
        const { data, error } = await AddressService.create(props);
        if (!data || error) throw new Error(error);
        return data;
    } catch (error) {
        throw new Error("AddressCreate -> " + (error as Error).message);
    }
};

export const AddressUpsertAction = async <T extends AddressUpsertProps>(props: T): Promise<AddressUpsertResponse<T>> => {
    try {
        const { data, error } = await AddressService.upsert(props);
        if (!data || error) throw new Error(error);
        return data;
    } catch (error) {
        throw new Error("AddressUpsert -> " + (error as Error).message);
    }
};

export const AddressUpdateAction = async <T extends AddressUpdateProps>(props: T): Promise<AddressUpdateResponse<T>> => {
    try {
        const { data, error } = await AddressService.update(props);
        if (!data || error) throw new Error(error);
        return data;
    } catch (error) {
        throw new Error("AddressUpdate -> " + (error as Error).message);
    }
};

export const AddressDeleteAction = async <T extends AddressDeleteProps>(props: T): Promise<AddressDeleteResponse<T>> => {
    try {
        const { data, error } = await AddressService.delete(props);
        if (!data || error) throw new Error(error);
        return data;
    } catch (error) {
        throw new Error("AddressDelete -> " + (error as Error).message);
    }
};

// ========== Multiple mutations ========== //

export const AddressCreateManyAction = async (props: AddressCreateManyProps): Promise<AddressCreateManyResponse> => {
    try {
        const { data, error } = await AddressService.createMany(props);
        if (!data || error) throw new Error(error);
        return data;
    } catch (error) {
        throw new Error("AddressCreateMany -> " + (error as Error).message);
    }
};

export const AddressUpdateManyAction = async (props: AddressUpdateManyProps): Promise<AddressUpdateManyResponse> => {
    try {
        const { data, error } = await AddressService.updateMany(props);
        if (!data || error) throw new Error(error);
        return data;
    } catch (error) {
        throw new Error("AddressUpdateMany -> " + (error as Error).message);
    }
};

export const AddressDeleteManyAction = async (props: AddressDeleteManyProps): Promise<AddressDeleteManyResponse> => {
    try {
        const { data, error } = await AddressService.deleteMany(props);
        if (!data || error) throw new Error(error);
        return data;
    } catch (error) {
        throw new Error("AddressDeleteMany -> " + (error as Error).message);
    }
};

// ========== Single queries ========== //

/**
 * WARNING: do not use this for fetching data -> use API routes with caching instead
 */
export const AddressFindFirstAction = async <T extends AddressFindFirstProps>(
    props: T
): Promise<AddressFindFirstResponse<T>> => {
    try {
        const { data, error } = await AddressService.findFirst(props);
        if (error) throw new Error(error);
        return data ?? null;
    } catch (error) {
        throw new Error("AddressFindFirst -> " + (error as Error).message);
    }
};

/**
 * WARNING: do not use this for fetching data -> use API routes with caching instead
 */
export const AddressFindUniqueAction = async <T extends AddressFindUniqueProps>(
    props: T
): Promise<AddressFindUniqueResponse<T>> => {
    try {
        const { data, error } = await AddressService.findUnique(props);
        if (error) throw new Error(error);
        return data ?? null;
    } catch (error) {
        throw new Error("AddressFindUnique -> " + (error as Error).message);
    }
};

/**
 * WARNING: do not use this for fetching data -> use API routes with caching instead
 */
export const AddressFindManyAction = async <T extends AddressFindManyProps>(
    props: T
): Promise<AddressFindManyResponse<T>> => {
    try {
        const { data, error } = await AddressService.findMany(props);
        if (!data || error) throw new Error(error);
        return data;
    } catch (error) {
        throw new Error("AddressFindMany -> " + (error as Error).message);
    }
};

// ========== Aggregate queries ========== //

/**
 * WARNING: do not use this for fetching data -> use API routes with caching instead
 */
export const AddressCountAction = async (props: AddressCountProps): Promise<AddressCountResponse> => {
    try {
        const { data, error } = await AddressService.count(props);
        if (!data || error) throw new Error(error);
        return data;
    } catch (error) {
        throw new Error("AddressCount -> " + (error as Error).message);
    }
};
