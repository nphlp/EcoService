"use server";

import Prisma from "@lib/prisma";
import {
    AccountId,
    AccountCommon,
    AccountType,
    accountCommonSchema,
    accountUpdateSchema,
    accountIdObjectSchema,
    AccountUpdate,
} from "@actions/types/Account";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

/**
 * Creates a new account in the database
 * @param props - The account properties to create
 * @returns Promise resolving to the created account or null if creation fails
 * @throws Error if an unexpected error occurs
 */
export const CreateAccount = async (
    props: AccountCommon
): Promise<AccountType | null> => {
    try {
        const data = accountCommonSchema.parse(props);

        const accountData: AccountType = await Prisma.account.create({ data });

        return accountData;
    } catch (error) {
        if (error instanceof PrismaClientKnownRequestError) {
            console.log("CreateAccount -> ", error);
            return null;
        }
        throw new Error("CreateAccount -> " + (error as Error).message);
    }
};

/**
 * Retrieves an account by its ID
 * @param props - Object containing the account ID
 * @returns Promise resolving to the found account or null if not found
 * @throws Error if an unexpected error occurs
 */
export const SelectAccount = async (props: {
    id: AccountId;
}): Promise<AccountType | null> => {
    try {
        const { id } = accountIdObjectSchema.parse(props);

        const accountData: AccountType | null = await Prisma.account.findUnique({
            where: { id },
        });

        return accountData;
    } catch (error) {
        if (error instanceof PrismaClientKnownRequestError) {
            console.log("SelectAccount -> ", error);
            return null;
        }
        throw new Error("SelectAccount -> " + (error as Error).message);
    }
};

/**
 * Retrieves all accounts from the database
 * @returns Promise resolving to an array of accounts or null if none found
 * @throws Error if an unexpected error occurs
 */
export const SelectAccountList = async (): Promise<AccountType[] | null> => {
    try {
        const accountDataList: AccountType[] = await Prisma.account.findMany();

        return accountDataList.length ? accountDataList : null;
    } catch (error) {
        if (error instanceof PrismaClientKnownRequestError) {
            console.log("SelectAccountList -> ", error);
            return null;
        }
        throw new Error("SelectAccountList -> " + (error as Error).message);
    }
};

/**
 * Updates an account's information in the database
 * @param props - Object containing the account ID and updated data
 * @returns Promise resolving to the updated account or null if update fails
 * @throws Error if an unexpected error occurs
 */
export const UpdateAccount = async (
    props: AccountUpdate
): Promise<AccountType | null> => {
    try {
        const { id, data } = accountUpdateSchema.parse(props);

        const accountData: AccountType = await Prisma.account.update({
            where: { id },
            data,
        });

        return accountData;
    } catch (error) {
        if (error instanceof PrismaClientKnownRequestError) {
            console.log("UpdateAccount -> ", error);
            return null;
        }
        throw new Error("UpdateAccount -> " + (error as Error).message);
    }
};

/**
 * Deletes an account from the database
 * @param props - Object containing the account ID to delete
 * @returns Promise resolving to the deleted account or null if deletion fails
 * @throws Error if an unexpected error occurs
 */
export const DeleteAccount = async (props: {
    id: AccountId;
}): Promise<AccountType | null> => {
    try {
        const { id } = accountIdObjectSchema.parse(props);

        const accountData: AccountType = await Prisma.account.delete({
            where: { id },
        });

        return accountData;
    } catch (error) {
        if (error instanceof PrismaClientKnownRequestError) {
            console.log("DeleteAccount -> ", error);
            return null;
        }
        throw new Error("DeleteAccount -> " + (error as Error).message);
    }
};
