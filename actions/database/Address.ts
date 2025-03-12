"use server";

import {
    AddressCommon,
    AddressId,
    AddressType,
    AddressUpdate,
    SelectAddressAmountProps,
    SelectAddressListProps,
    SelectAddressProps,
} from "@actions/types/Address";
import {
    selectAddressAmountSchema,
    selectAddressListSchema,
    selectAddressUniqueSchema,
} from "@actions/zod-sensitive/Address";
import { addressCommonSchema, addressIdObjectSchema, addressUpdateSchema } from "@actions/zod/Address";
import PrismaInstance from "@lib/prisma";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { ZodError } from "zod";

/**
 * Response type for Address mutations
 */
export type AddressMutationResponse = {
    addressData?: AddressType;
    error?: string;
};

/**
 * Creates a new address
 * @param props Address properties
 * @returns Created address or null
 */
export const CreateAddress = async (props: AddressCommon): Promise<AddressMutationResponse> => {
    try {
        const data = addressCommonSchema.parse(props);

        const addressData: AddressType = await PrismaInstance.address.create({ data });

        return { addressData };
    } catch (error) {
        console.error("CreateAddress -> " + (error as Error).message);
        if (process.env.NODE_ENV === "development") {
            if (error instanceof ZodError) throw new Error("CreateAddress -> Invalid Zod params -> " + error.message);
            if (error instanceof PrismaClientKnownRequestError)
                throw new Error("CreateAddress -> Prisma error -> " + error.message);
            throw new Error("CreateAddress -> " + (error as Error).message);
        }
        // TODO: add logging
        return { error: "Something went wrong..." };
    }
};

/**
 * Updates a address
 * @param props Address ID and new data
 * @returns Updated address or null
 */
export const UpdateAddress = async (props: AddressUpdate): Promise<AddressMutationResponse> => {
    try {
        const { id, data } = addressUpdateSchema.parse(props);
        const addressData: AddressType = await PrismaInstance.address.update({
            where: { id },
            data,
        });
        return { addressData };
    } catch (error) {
        console.error("UpdateAddress -> " + (error as Error).message);
        if (process.env.NODE_ENV === "development") {
            if (error instanceof ZodError) throw new Error("UpdateAddress -> Invalid Zod params -> " + error.message);
            if (error instanceof PrismaClientKnownRequestError)
                throw new Error("UpdateAddress -> Prisma error -> " + error.message);
            throw new Error("UpdateAddress -> " + (error as Error).message);
        }
        // TODO: add logging
        return { error: "Something went wrong..." };
    }
};

/**
 * Deletes a address
 * @param props Address ID
 * @returns Deleted address or null
 */
export const DeleteAddress = async (props: AddressId): Promise<AddressMutationResponse> => {
    try {
        const { id } = addressIdObjectSchema.parse(props);
        const addressData: AddressType = await PrismaInstance.address.delete({
            where: { id },
        });
        return { addressData };
    } catch (error) {
        console.error("DeleteAddress -> " + (error as Error).message);
        if (process.env.NODE_ENV === "development") {
            if (error instanceof ZodError) throw new Error("DeleteAddress -> Invalid Zod params -> " + error.message);
            if (error instanceof PrismaClientKnownRequestError)
                throw new Error("DeleteAddress -> Prisma error -> " + error.message);
            throw new Error("DeleteAddress -> " + (error as Error).message);
        }
        // TODO: add logging
        return { error: "Something went wrong..." };
    }
};

/**
 * Retrieves a address by ID or another filter (no caching) \
 * WARNING: do not use this for fetching data -> use API routes with caching instead
 * @param props Address ID or other filter (name, description...)
 * @returns Found address or null
 */
export const SelectAddress = async (props: SelectAddressProps): Promise<AddressType | null> => {
    try {
        const { where, select } = selectAddressUniqueSchema.parse(props);
        const addressData: AddressType | null = await PrismaInstance.address.findUnique({
            where,
            ...(select && { select }),
        });
        return addressData;
    } catch (error) {
        console.error("SelectAddress -> " + (error as Error).message);
        if (process.env.NODE_ENV === "development") {
            if (error instanceof ZodError) throw new Error("SelectAddress -> Invalid Zod params -> " + error.message);
            if (error instanceof PrismaClientKnownRequestError)
                throw new Error("SelectAddress -> Prisma error -> " + error.message);
            throw new Error("SelectAddress -> " + (error as Error).message);
        }
        // TODO: add logging
        return null;
    }
};

/**
 * Retrieves a list of addresses with filters (no caching) \
 * WARNING: do not use this for fetching data -> use API routes with caching instead
 * @param props Filter and pagination options
 * @returns List of addresses or null
 */
export const SelectAddressList = async (props: SelectAddressListProps): Promise<AddressType[] | null> => {
    try {
        const { select, orderBy, take = 10, skip = 0, where } = selectAddressListSchema.parse(props);

        const addressDataList: AddressType[] = await PrismaInstance.address.findMany({
            ...(select && { select }),
            ...(orderBy && { orderBy }),
            ...(take && { take }),
            ...(skip && { skip }),
            ...(where && { where }),
        });
        return addressDataList.length ? addressDataList : null;
    } catch (error) {
        console.error("SelectAddressList -> " + (error as Error).message);
        if (process.env.NODE_ENV === "development") {
            if (error instanceof ZodError) throw new Error("SelectAddressList -> Invalid Zod params -> " + error.message);
            if (error instanceof PrismaClientKnownRequestError)
                throw new Error("SelectAddressList -> Prisma error -> " + error.message);
            throw new Error("SelectAddressList -> " + (error as Error).message);
        }
        // TODO: add logging
        return null;
    }
};

/**
 * Counts addresses with filters (no caching) \
 * WARNING: do not use this for fetching data -> use API routes with caching instead
 * @param props Filter options
 * @returns Count of addresses or null
 */
export const SelectAddressAmount = async (props: SelectAddressAmountProps): Promise<number | null> => {
    try {
        const { where } = selectAddressAmountSchema.parse(props);

        const addressAmount = await PrismaInstance.address.count({
            ...(where && { where }),
        });

        return addressAmount;
    } catch (error) {
        console.error("SelectAddressAmount -> " + (error as Error).message);
        if (process.env.NODE_ENV === "development") {
            if (error instanceof ZodError) throw new Error("SelectAddressAmount -> Invalid Zod params -> " + error.message);
            if (error instanceof PrismaClientKnownRequestError)
                throw new Error("SelectAddressAmount -> Prisma error -> " + error.message);
            throw new Error("SelectAddressAmount -> " + (error as Error).message);
        }
        // TODO: add logging
        return null;
    }
};
