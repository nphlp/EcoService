"use server";

import {
    AccountCommon,
    accountCommonSchema,
    AccountId,
    accountIdObjectSchema,
    AccountType,
    AccountUpdate,
    accountUpdateSchema,
    SelectAccountAmountProps,
    selectAccountAmountSchema,
    SelectAccountListProps,
    selectAccountListSchema,
} from "@actions/types/Account";
import PrismaInstance from "@lib/prisma";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { ZodError } from "zod";

/**
 * Creates a new account
 * @param props Account properties
 * @returns Created account or null
 */
export const CreateAccount = async (props: AccountCommon): Promise<AccountType | null> => {
    try {
        const data = accountCommonSchema.parse(props);

        const accountData: AccountType = await PrismaInstance.account.create({ data });

        return accountData;
    } catch (error) {
        console.error("CreateAccount -> " + (error as Error).message);
        if (error instanceof ZodError || error instanceof PrismaClientKnownRequestError) {
            return null;
        }
        throw new Error("Something went wrong...");
    }
};

/**
 * Retrieves an account by ID
 * @param props Account ID
 * @returns Found account or null
 */
export const SelectAccount = async (props: AccountId): Promise<AccountType | null> => {
    try {
        const { id } = accountIdObjectSchema.parse(props);

        const accountData: AccountType | null = await PrismaInstance.account.findUnique({
            where: { id },
        });

        return accountData;
    } catch (error) {
        console.error("SelectAccount -> " + (error as Error).message);
        if (error instanceof ZodError || error instanceof PrismaClientKnownRequestError) {
            return null;
        }
        throw new Error("Something went wrong...");
    }
};

/**
 * Retrieves a list of accounts with filters
 * @param props Filter and pagination options
 * @returns List of accounts or null
 */
export const SelectAccountList = async (props: SelectAccountListProps): Promise<AccountType[] | null> => {
    try {
        const { orderBy, take = 10, skip = 0, where } = selectAccountListSchema.parse(props);

        const accountDataList: AccountType[] = await PrismaInstance.account.findMany({
            ...(orderBy && { orderBy }),
            ...(take && { take }),
            ...(skip && { skip }),
            ...(where && { where }),
        });

        return accountDataList.length ? accountDataList : null;
    } catch (error) {
        console.error("SelectAccountList -> " + (error as Error).message);
        if (error instanceof ZodError || error instanceof PrismaClientKnownRequestError) {
            return null;
        }
        throw new Error("Something went wrong...");
    }
};

/**
 * Counts accounts with filters
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
        if (error instanceof ZodError || error instanceof PrismaClientKnownRequestError) {
            return null;
        }
        throw new Error("Something went wrong...");
    }
};

/**
 * Updates an account
 * @param props Account ID and new data
 * @returns Updated account or null
 */
export const UpdateAccount = async (props: AccountUpdate): Promise<AccountType | null> => {
    try {
        const { id, data } = accountUpdateSchema.parse(props);

        const accountData: AccountType = await PrismaInstance.account.update({
            where: { id },
            data,
        });

        return accountData;
    } catch (error) {
        console.error("UpdateAccount -> " + (error as Error).message);
        if (error instanceof ZodError || error instanceof PrismaClientKnownRequestError) {
            return null;
        }
        throw new Error("Something went wrong...");
    }
};

/**
 * Deletes an account
 * @param props Account ID
 * @returns Deleted account or null
 */
export const DeleteAccount = async (props: AccountId): Promise<AccountType | null> => {
    try {
        const { id } = accountIdObjectSchema.parse(props);

        const accountData: AccountType = await PrismaInstance.account.delete({
            where: { id },
        });

        return accountData;
    } catch (error) {
        console.error("DeleteAccount -> " + (error as Error).message);
        if (error instanceof ZodError || error instanceof PrismaClientKnownRequestError) {
            return null;
        }
        throw new Error("Something went wrong...");
    }
};
