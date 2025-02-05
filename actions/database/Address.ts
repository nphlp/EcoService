"use server";

import Prisma from "@lib/prisma";
import {
    AddressId,
    AddressCommon,
    AddressType,
    addressCommonSchema,
    addressUpdateSchema,
    addressIdObjectSchema,
    AddressUpdate,
} from "@actions/types/Address";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

/**
 * Creates a new address in the database
 * @param props - The address properties to create
 * @returns Promise resolving to the created address or null if creation fails
 * @throws Error if an unexpected error occurs
 */
export const CreateAddress = async (
    props: AddressCommon
): Promise<AddressType | null> => {
    try {
        const data = addressCommonSchema.parse(props);

        const addressData: AddressType = await Prisma.address.create({ data });

        return addressData;
    } catch (error) {
        if (error instanceof PrismaClientKnownRequestError) {
            console.log("CreateAddress -> ", error);
            return null;
        }
        throw new Error("CreateAddress -> " + (error as Error).message);
    }
};

/**
 * Retrieves an address by its ID
 * @param props - Object containing the address ID
 * @returns Promise resolving to the found address or null if not found
 * @throws Error if an unexpected error occurs
 */
export const SelectAddress = async (props: {
    id: AddressId;
}): Promise<AddressType | null> => {
    try {
        const { id } = addressIdObjectSchema.parse(props);

        const addressData: AddressType | null = await Prisma.address.findUnique({
            where: { id },
        });

        return addressData;
    } catch (error) {
        if (error instanceof PrismaClientKnownRequestError) {
            console.log("SelectAddress -> ", error);
            return null;
        }
        throw new Error("SelectAddress -> " + (error as Error).message);
    }
};

/**
 * Retrieves all addresses from the database
 * @returns Promise resolving to an array of addresses or null if none found
 * @throws Error if an unexpected error occurs
 */
export const SelectAddressList = async (): Promise<AddressType[] | null> => {
    try {
        const addressDataList: AddressType[] = await Prisma.address.findMany();

        return addressDataList.length ? addressDataList : null;
    } catch (error) {
        if (error instanceof PrismaClientKnownRequestError) {
            console.log("SelectAddressList -> ", error);
            return null;
        }
        throw new Error("SelectAddressList -> " + (error as Error).message);
    }
};

/**
 * Updates an address's information in the database
 * @param props - Object containing the address ID and updated data
 * @returns Promise resolving to the updated address or null if update fails
 * @throws Error if an unexpected error occurs
 */
export const UpdateAddress = async (
    props: AddressUpdate
): Promise<AddressType | null> => {
    try {
        const { id, data } = addressUpdateSchema.parse(props);

        const addressData: AddressType = await Prisma.address.update({
            where: { id },
            data,
        });

        return addressData;
    } catch (error) {
        if (error instanceof PrismaClientKnownRequestError) {
            console.log("UpdateAddress -> ", error);
            return null;
        }
        throw new Error("UpdateAddress -> " + (error as Error).message);
    }
};

/**
 * Deletes an address from the database
 * @param props - Object containing the address ID to delete
 * @returns Promise resolving to the deleted address or null if deletion fails
 * @throws Error if an unexpected error occurs
 */
export const DeleteAddress = async (props: {
    id: AddressId;
}): Promise<AddressType | null> => {
    try {
        const { id } = addressIdObjectSchema.parse(props);

        const addressData: AddressType = await Prisma.address.delete({
            where: { id },
        });

        return addressData;
    } catch (error) {
        if (error instanceof PrismaClientKnownRequestError) {
            console.log("DeleteAddress -> ", error);
            return null;
        }
        throw new Error("DeleteAddress -> " + (error as Error).message);
    }
};
