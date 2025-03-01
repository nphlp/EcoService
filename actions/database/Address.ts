"use server";

import {
    AddressCommon,
    addressCommonSchema,
    AddressId,
    addressIdObjectSchema,
    AddressType,
    AddressUpdate,
    addressUpdateSchema,
    SelectAddressAmountProps,
    selectAddressAmountSchema,
    SelectAddressListProps,
    selectAddressListSchema,
} from "@actions/types/Address";
import PrismaInstance from "@lib/prisma";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { ZodError } from "zod";

/**
 * Creates a new address
 * @param props Address properties
 * @returns Created address or null
 */
export const CreateAddress = async (props: AddressCommon): Promise<AddressType | null> => {
    try {
        const data = addressCommonSchema.parse(props);

        const addressData: AddressType = await PrismaInstance.address.create({ data });

        return addressData;
    } catch (error) {
        console.error("CreateAddress -> " + (error as Error).message);
        if (error instanceof ZodError || error instanceof PrismaClientKnownRequestError) {
            return null;
        }
        throw new Error("Something went wrong...");
    }
};

/**
 * Retrieves an address by ID
 * @param props Address ID
 * @returns Found address or null
 */
export const SelectAddress = async (props: AddressId): Promise<AddressType | null> => {
    try {
        const { id } = addressIdObjectSchema.parse(props);

        const addressData: AddressType | null = await PrismaInstance.address.findUnique({
            where: { id },
        });

        return addressData;
    } catch (error) {
        console.error("SelectAddress -> " + (error as Error).message);
        if (error instanceof ZodError || error instanceof PrismaClientKnownRequestError) {
            return null;
        }
        throw new Error("Something went wrong...");
    }
};

/**
 * Retrieves a list of addresses with filters
 * @param props Filter and pagination options
 * @returns List of addresses or null
 */
export const SelectAddressList = async (props: SelectAddressListProps): Promise<AddressType[] | null> => {
    try {
        const { orderBy, take = 10, skip = 0, where } = selectAddressListSchema.parse(props);

        const addressDataList: AddressType[] = await PrismaInstance.address.findMany({
            ...(orderBy && { orderBy }),
            ...(take && { take }),
            ...(skip && { skip }),
            ...(where && { where }),
        });

        return addressDataList.length ? addressDataList : null;
    } catch (error) {
        console.error("SelectAddressList -> " + (error as Error).message);
        if (error instanceof ZodError || error instanceof PrismaClientKnownRequestError) {
            return null;
        }
        throw new Error("Something went wrong...");
    }
};

/**
 * Counts addresses with filters
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
        if (error instanceof ZodError || error instanceof PrismaClientKnownRequestError) {
            return null;
        }
        throw new Error("Something went wrong...");
    }
};

/**
 * Updates an address
 * @param props Address ID and new data
 * @returns Updated address or null
 */
export const UpdateAddress = async (props: AddressUpdate): Promise<AddressType | null> => {
    try {
        const { id, data } = addressUpdateSchema.parse(props);

        const addressData: AddressType = await PrismaInstance.address.update({
            where: { id },
            data,
        });

        return addressData;
    } catch (error) {
        console.error("UpdateAddress -> " + (error as Error).message);
        if (error instanceof ZodError || error instanceof PrismaClientKnownRequestError) {
            return null;
        }
        throw new Error("Something went wrong...");
    }
};

/**
 * Deletes an address
 * @param props Address ID
 * @returns Deleted address or null
 */
export const DeleteAddress = async (props: AddressId): Promise<AddressType | null> => {
    try {
        const { id } = addressIdObjectSchema.parse(props);

        const addressData: AddressType = await PrismaInstance.address.delete({
            where: { id },
        });

        return addressData;
    } catch (error) {
        console.error("DeleteAddress -> " + (error as Error).message);
        if (error instanceof ZodError || error instanceof PrismaClientKnownRequestError) {
            return null;
        }
        throw new Error("Something went wrong...");
    }
};
