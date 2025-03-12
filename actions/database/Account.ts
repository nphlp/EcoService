"use server";

import {
    AccountCommon,
    AccountId,
    AccountType,
    AccountUpdate,
    SelectAccountAmountProps,
    SelectAccountListProps,
    SelectAccountProps,
} from "@actions/types/Account";
import {
    selectAccountAmountSchema,
    selectAccountListSchema,
    selectAccountUniqueSchema,
} from "@actions/zod-sensitive/Account";
import { accountCommonSchema, accountIdObjectSchema, accountUpdateSchema } from "@actions/zod/Account";
import PrismaInstance from "@lib/prisma";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { ZodError } from "zod";

/**
 * Response type for Account mutations
 */
export type AccountMutationResponse = {
    accountData?: AccountType;
    error?: string;
};

/**
 * Creates a new account
 * @param props Account properties
 * @returns Created account or null
 */
export const CreateAccount = async (props: AccountCommon): Promise<AccountMutationResponse> => {
    try {
        const data = accountCommonSchema.parse(props);

        const accountData: AccountType = await PrismaInstance.account.create({ data });

        return { accountData };
    } catch (error) {
        console.error("CreateAccount -> " + (error as Error).message);
        if (process.env.NODE_ENV === "development") {
            if (error instanceof ZodError) throw new Error("CreateAccount -> Invalid Zod params -> " + error.message);
            if (error instanceof PrismaClientKnownRequestError)
                throw new Error("CreateAccount -> Prisma error -> " + error.message);
            throw new Error("CreateAccount -> " + (error as Error).message);
        }
        // TODO: add logging
        return { error: "Something went wrong..." };
    }
};

/**
 * Updates a account
 * @param props Account ID and new data
 * @returns Updated account or null
 */
export const UpdateAccount = async (props: AccountUpdate): Promise<AccountMutationResponse> => {
    try {
        const { id, data } = accountUpdateSchema.parse(props);
        const accountData: AccountType = await PrismaInstance.account.update({
            where: { id },
            data,
        });
        return { accountData };
    } catch (error) {
        console.error("UpdateAccount -> " + (error as Error).message);
        if (process.env.NODE_ENV === "development") {
            if (error instanceof ZodError) throw new Error("UpdateAccount -> Invalid Zod params -> " + error.message);
            if (error instanceof PrismaClientKnownRequestError)
                throw new Error("UpdateAccount -> Prisma error -> " + error.message);
            throw new Error("UpdateAccount -> " + (error as Error).message);
        }
        // TODO: add logging
        return { error: "Something went wrong..." };
    }
};

/**
 * Deletes a account
 * @param props Account ID
 * @returns Deleted account or null
 */
export const DeleteAccount = async (props: AccountId): Promise<AccountMutationResponse> => {
    try {
        const { id } = accountIdObjectSchema.parse(props);
        const accountData: AccountType = await PrismaInstance.account.delete({
            where: { id },
        });
        return { accountData };
    } catch (error) {
        console.error("DeleteAccount -> " + (error as Error).message);
        if (process.env.NODE_ENV === "development") {
            if (error instanceof ZodError) throw new Error("DeleteAccount -> Invalid Zod params -> " + error.message);
            if (error instanceof PrismaClientKnownRequestError)
                throw new Error("DeleteAccount -> Prisma error -> " + error.message);
            throw new Error("DeleteAccount -> " + (error as Error).message);
        }
        // TODO: add logging
        return { error: "Something went wrong..." };
    }
};

/**
 * Retrieves a account by ID or another filter (no caching) \
 * WARNING: do not use this for fetching data -> use API routes with caching instead
 * @param props Account ID or other filter (name, description...)
 * @returns Found account or null
 */
export const SelectAccount = async (props: SelectAccountProps): Promise<AccountType | null> => {
    try {
        const { where, select } = selectAccountUniqueSchema.parse(props);
        const accountData: AccountType | null = await PrismaInstance.account.findUnique({
            where,
            ...(select && { select }),
        });
        return accountData;
    } catch (error) {
        console.error("SelectAccount -> " + (error as Error).message);
        if (process.env.NODE_ENV === "development") {
            if (error instanceof ZodError) throw new Error("SelectAccount -> Invalid Zod params -> " + error.message);
            if (error instanceof PrismaClientKnownRequestError)
                throw new Error("SelectAccount -> Prisma error -> " + error.message);
            throw new Error("SelectAccount -> " + (error as Error).message);
        }
        // TODO: add logging
        return null;
    }
};

/**
 * Retrieves a list of accounts with filters (no caching) \
 * WARNING: do not use this for fetching data -> use API routes with caching instead
 * @param props Filter and pagination options
 * @returns List of accounts or null
 */
export const SelectAccountList = async (props: SelectAccountListProps): Promise<AccountType[] | null> => {
    try {
        const { select, orderBy, take = 10, skip = 0, where } = selectAccountListSchema.parse(props);

        const accountDataList: AccountType[] = await PrismaInstance.account.findMany({
            ...(select && { select }),
            ...(orderBy && { orderBy }),
            ...(take && { take }),
            ...(skip && { skip }),
            ...(where && { where }),
        });
        return accountDataList.length ? accountDataList : null;
    } catch (error) {
        console.error("SelectAccountList -> " + (error as Error).message);
        if (process.env.NODE_ENV === "development") {
            if (error instanceof ZodError) throw new Error("SelectAccountList -> Invalid Zod params -> " + error.message);
            if (error instanceof PrismaClientKnownRequestError)
                throw new Error("SelectAccountList -> Prisma error -> " + error.message);
            throw new Error("SelectAccountList -> " + (error as Error).message);
        }
        // TODO: add logging
        return null;
    }
};

/**
 * Counts accounts with filters (no caching) \
 * WARNING: do not use this for fetching data -> use API routes with caching instead
 * @param props Filter options
 * @returns Count of accounts or null
 */
export const SelectAccountAmount = async (props: SelectAccountAmountProps): Promise<number | null> => {
    try {
        const { where } = selectAccountAmountSchema.parse(props);

        const accountAmount = await PrismaInstance.account.count({
            ...(where && { where }),
        });

        return accountAmount;
    } catch (error) {
        console.error("SelectAccountAmount -> " + (error as Error).message);
        if (process.env.NODE_ENV === "development") {
            if (error instanceof ZodError) throw new Error("SelectAccountAmount -> Invalid Zod params -> " + error.message);
            if (error instanceof PrismaClientKnownRequestError)
                throw new Error("SelectAccountAmount -> Prisma error -> " + error.message);
            throw new Error("SelectAccountAmount -> " + (error as Error).message);
        }
        // TODO: add logging
        return null;
    }
};
