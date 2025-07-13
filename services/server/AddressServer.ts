import AddressService from "@services/class/AddressClass";
import { AddressCountProps, AddressFindFirstProps, AddressFindManyProps, AddressFindUniqueProps } from "@services/types/AddressType";

export const AddressFindManyServer = async <T extends AddressFindManyProps>(params: T) => {
    const { data, error } = await AddressService.findMany<T>(params);
    if (error || data === undefined) throw new Error(error ?? "Something went wrong...");
    return data;
};

export const AddressFindFirstServer = async <T extends AddressFindFirstProps>(params: T) => {
    const { data, error } = await AddressService.findFirst<T>(params);
    if (error || data === undefined) throw new Error(error ?? "Something went wrong...");
    return data;
};

export const AddressFindUniqueServer = async <T extends AddressFindUniqueProps>(params: T) => {
    const { data, error } = await AddressService.findUnique<T>(params);
    if (error || data === undefined) throw new Error(error ?? "Something went wrong...");
    return data;
};

export const AddressCountServer = async (params: AddressCountProps) => {
    const { data, error } = await AddressService.count(params);
    if (error || data === undefined) throw new Error(error ?? "Something went wrong...");
    return data;
}; 