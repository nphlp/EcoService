"use server";

import AddressService from "@services/class/AddressClass";
import { CountAddressProps, CountAddressResponse, CreateManyAddressProps, CreateManyAddressResponse, CreateAddressProps, CreateAddressResponse, DeleteManyAddressProps, DeleteManyAddressResponse, DeleteAddressProps, DeleteAddressResponse, FindFirstAddressProps, FindFirstAddressResponse, FindManyAddressProps, FindManyAddressResponse, FindUniqueAddressProps, FindUniqueAddressResponse, UpdateManyAddressProps, UpdateManyAddressResponse, UpdateAddressProps, UpdateAddressResponse, UpsertAddressProps, UpsertAddressResponse } from "@services/types/AddressType";

// ========== Single mutations ========== //

export const CreateAddress = async <T extends CreateAddressProps>(props: T): Promise<CreateAddressResponse<T>> => {
    try {
        const { data, error } = await AddressService.create(props);
        if (!data || error) throw new Error(error);
        return data;
    } catch (error) {
        throw new Error("CreateAddress -> " + (error as Error).message);
    }
};

export const UpsertAddress = async <T extends UpsertAddressProps>(props: T): Promise<UpsertAddressResponse<T>> => {
    try {
        const { data, error } = await AddressService.upsert(props);
        if (!data || error) throw new Error(error);
        return data;
    } catch (error) {
        throw new Error("UpsertAddress -> " + (error as Error).message);
    }
};

export const UpdateAddress = async <T extends UpdateAddressProps>(props: T): Promise<UpdateAddressResponse<T>> => {
    try {
        const { data, error } = await AddressService.update(props);
        if (!data || error) throw new Error(error);
        return data;
    } catch (error) {
        throw new Error("UpdateAddress -> " + (error as Error).message);
    }
};

export const DeleteAddress = async <T extends DeleteAddressProps>(props: T): Promise<DeleteAddressResponse<T>> => {
    try {
        const { data, error } = await AddressService.delete(props);
        if (!data || error) throw new Error(error);
        return data;
    } catch (error) {
        throw new Error("DeleteAddress -> " + (error as Error).message);
    }
};

// ========== Multiple mutations ========== //

export const CreateManyAddress = async (props: CreateManyAddressProps): Promise<CreateManyAddressResponse> => {
    try {
        const { data, error } = await AddressService.createMany(props);
        if (!data || error) throw new Error(error);
        return data;
    } catch (error) {
        throw new Error("CreateManyAddress -> " + (error as Error).message);
    }
};

export const UpdateManyAddress = async (props: UpdateManyAddressProps): Promise<UpdateManyAddressResponse> => {
    try {
        const { data, error } = await AddressService.updateMany(props);
        if (!data || error) throw new Error(error);
        return data;
    } catch (error) {
        throw new Error("UpdateManyAddress -> " + (error as Error).message);
    }
};

export const DeleteManyAddress = async (props: DeleteManyAddressProps): Promise<DeleteManyAddressResponse> => {
    try {
        const { data, error } = await AddressService.deleteMany(props);
        if (!data || error) throw new Error(error);
        return data;
    } catch (error) {
        throw new Error("DeleteManyAddress -> " + (error as Error).message);
    }
};

// ========== Single queries ========== //

/**
 * WARNING: do not use this for fetching data -> use API routes with caching instead
 */
export const SelectFirstAddress = async <T extends FindFirstAddressProps>(
    props: T
): Promise<FindFirstAddressResponse<T>> => {
    try {
        const { data, error } = await AddressService.findFirst(props);
        if (error) throw new Error(error);
        return data ?? null;
    } catch (error) {
        throw new Error("SelectFirstAddress -> " + (error as Error).message);
    }
};

/**
 * WARNING: do not use this for fetching data -> use API routes with caching instead
 */
export const SelectUniqueAddress = async <T extends FindUniqueAddressProps>(
    props: T
): Promise<FindUniqueAddressResponse<T>> => {
    try {
        const { data, error } = await AddressService.findUnique(props);
        if (error) throw new Error(error);
        return data ?? null;
    } catch (error) {
        throw new Error("SelectUniqueAddress -> " + (error as Error).message);
    }
};

/**
 * WARNING: do not use this for fetching data -> use API routes with caching instead
 */
export const SelectAddressList = async <T extends FindManyAddressProps>(
    props: T
): Promise<FindManyAddressResponse<T>> => {
    try {
        const { data, error } = await AddressService.findMany(props);
        if (!data || error) throw new Error(error);
        return data;
    } catch (error) {
        throw new Error("SelectAddressList -> " + (error as Error).message);
    }
};

// ========== Aggregate queries ========== //

/**
 * WARNING: do not use this for fetching data -> use API routes with caching instead
 */
export const SelectAddressAmount = async (props: CountAddressProps): Promise<CountAddressResponse> => {
    try {
        const { data, error } = await AddressService.count(props);
        if (!data || error) throw new Error(error);
        return data;
    } catch (error) {
        throw new Error("SelectAddressAmount -> " + (error as Error).message);
    }
};
