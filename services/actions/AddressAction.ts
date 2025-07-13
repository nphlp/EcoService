"use server";

import { requiresSafeMessage } from "@permissions/requiresSafeMessage";
import AddressService from "@services/class/AddressClass";
import { AddressCountProps, AddressCountResponse, AddressCreateManyProps, AddressCreateManyResponse, AddressCreateProps, AddressCreateResponse, AddressDeleteManyProps, AddressDeleteManyResponse, AddressDeleteProps, AddressDeleteResponse, AddressFindFirstProps, AddressFindFirstResponse, AddressFindManyProps, AddressFindManyResponse, AddressFindUniqueProps, AddressFindUniqueResponse, AddressUpdateManyProps, AddressUpdateManyResponse, AddressUpdateProps, AddressUpdateResponse, AddressUpsertProps, AddressUpsertResponse } from "@services/types/AddressType";

// ========== Single mutations ========== //

export const AddressCreateAction = async <T extends AddressCreateProps>(props: T, disableSafeMessage: boolean = false): Promise<AddressCreateResponse<T>> => {
    try {
        await requiresSafeMessage(disableSafeMessage, "AddressCreateAction", "Address", "create");
        const { data, error } = await AddressService.create(props);
        if (!data || error) throw new Error(error);
        return data;
    } catch (error) {
        throw new Error("AddressCreateAction -> " + (error as Error).message);
    }
};

export const AddressUpsertAction = async <T extends AddressUpsertProps>(props: T, disableSafeMessage: boolean = false): Promise<AddressUpsertResponse<T>> => {
    try {
        await requiresSafeMessage(disableSafeMessage, "AddressUpsertAction", "Address", "upsert");
        const { data, error } = await AddressService.upsert(props);
        if (!data || error) throw new Error(error);
        return data;
    } catch (error) {
        throw new Error("AddressUpsertAction -> " + (error as Error).message);
    }
};

export const AddressUpdateAction = async <T extends AddressUpdateProps>(props: T, disableSafeMessage: boolean = false): Promise<AddressUpdateResponse<T>> => {
    try {
        await requiresSafeMessage(disableSafeMessage, "AddressUpdateAction", "Address", "update");
        const { data, error } = await AddressService.update(props);
        if (!data || error) throw new Error(error);
        return data;
    } catch (error) {
        throw new Error("AddressUpdateAction -> " + (error as Error).message);
    }
};

export const AddressDeleteAction = async <T extends AddressDeleteProps>(props: T, disableSafeMessage: boolean = false): Promise<AddressDeleteResponse<T>> => {
    try {
        await requiresSafeMessage(disableSafeMessage, "AddressDeleteAction", "Address", "delete");
        const { data, error } = await AddressService.delete(props);
        if (!data || error) throw new Error(error);
        return data;
    } catch (error) {
        throw new Error("AddressDeleteAction -> " + (error as Error).message);
    }
};

// ========== Multiple mutations ========== //

export const AddressCreateManyAction = async (props: AddressCreateManyProps, disableSafeMessage: boolean = false): Promise<AddressCreateManyResponse> => {
    try {
        await requiresSafeMessage(disableSafeMessage, "AddressCreateManyAction", "Address", "createMany");
        const { data, error } = await AddressService.createMany(props);
        if (!data || error) throw new Error(error);
        return data;
    } catch (error) {
        throw new Error("AddressCreateManyAction -> " + (error as Error).message);
    }
};

export const AddressUpdateManyAction = async (props: AddressUpdateManyProps, disableSafeMessage: boolean = false): Promise<AddressUpdateManyResponse> => {
    try {
        await requiresSafeMessage(disableSafeMessage, "AddressUpdateManyAction", "Address", "updateMany");
        const { data, error } = await AddressService.updateMany(props);
        if (!data || error) throw new Error(error);
        return data;
    } catch (error) {
        throw new Error("AddressUpdateManyAction -> " + (error as Error).message);
    }
};

export const AddressDeleteManyAction = async (props: AddressDeleteManyProps, disableSafeMessage: boolean = false): Promise<AddressDeleteManyResponse> => {
    try {
        await requiresSafeMessage(disableSafeMessage, "AddressDeleteManyAction", "Address", "deleteMany");
        const { data, error } = await AddressService.deleteMany(props);
        if (!data || error) throw new Error(error);
        return data;
    } catch (error) {
        throw new Error("AddressDeleteManyAction -> " + (error as Error).message);
    }
};

// ========== Single queries ========== //

/**
 * WARNING: do not use this for fetching data -> use API routes with caching instead
 */
export const AddressFindFirstAction = async <T extends AddressFindFirstProps>(
    props: T,
    disableSafeMessage: boolean = false
): Promise<AddressFindFirstResponse<T>> => {
    try {
        await requiresSafeMessage(disableSafeMessage, "AddressFindFirstAction", "Address", "findFirst");
        const { data, error } = await AddressService.findFirst(props);
        if (error) throw new Error(error);
        return data ?? null;
    } catch (error) {
        throw new Error("AddressFindFirstAction -> " + (error as Error).message);
    }
};

/**
 * WARNING: do not use this for fetching data -> use API routes with caching instead
 */
export const AddressFindUniqueAction = async <T extends AddressFindUniqueProps>(
    props: T,
    disableSafeMessage: boolean = false
): Promise<AddressFindUniqueResponse<T>> => {
    try {
        await requiresSafeMessage(disableSafeMessage, "AddressFindUniqueAction", "Address", "findUnique");
        const { data, error } = await AddressService.findUnique(props);
        if (error) throw new Error(error);
        return data ?? null;
    } catch (error) {
        throw new Error("AddressFindUniqueAction -> " + (error as Error).message);
    }
};

/**
 * WARNING: do not use this for fetching data -> use API routes with caching instead
 */
export const AddressFindManyAction = async <T extends AddressFindManyProps>(
    props: T,
    disableSafeMessage: boolean = false
): Promise<AddressFindManyResponse<T>> => {
    try {
        await requiresSafeMessage(disableSafeMessage, "AddressFindManyAction", "Address", "findMany");
        const { data, error } = await AddressService.findMany(props);
        if (!data || error) throw new Error(error);
        return data;
    } catch (error) {
        throw new Error("AddressFindManyAction -> " + (error as Error).message);
    }
};

// ========== Aggregate queries ========== //

/**
 * WARNING: do not use this for fetching data -> use API routes with caching instead
 */
export const AddressCountAction = async (props: AddressCountProps, disableSafeMessage: boolean = false): Promise<AddressCountResponse> => {
    try {
        await requiresSafeMessage(disableSafeMessage, "AddressCountAction", "Address", "count");
        const { data, error } = await AddressService.count(props);
        if (!data || error) throw new Error(error);
        return data;
    } catch (error) {
        throw new Error("AddressCountAction -> " + (error as Error).message);
    }
};
