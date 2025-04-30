import PrismaInstance from "@lib/prisma";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { AccountCount, CountAccountProps, CountAccountResponse, CreateAccountProps, CreateAccountResponse, DeleteAccountProps, DeleteAccountResponse, FindManyAccountProps, FindManyAccountResponse, FindUniqueAccountProps, FindUniqueAccountResponse, UpdateAccountProps, UpdateAccountResponse, UpsertAccountProps, UpsertAccountResponse, countAccountSchema, createAccountSchema, deleteAccountSchema, selectAccountSchema, selectManyAccountSchema, updateAccountSchema, upsertAccountSchema } from "@services/types/AccountType";
import { ResponseFormat } from "@utils/FetchConfig";
import { ZodError } from "zod";

export default class AccountService {
    static async create<T extends CreateAccountProps>(props: T): Promise<ResponseFormat<CreateAccountResponse<T>>> {
        try {
            const { data, omit, select } = createAccountSchema.parse(props);

            const account = await PrismaInstance.account.create({
                data,
                
                ...(omit && { omit }),
                ...(select && { select }),
            });

            return { data: account as CreateAccountResponse<T> };
        } catch (error) {
            console.error("AccountService -> Create -> " + (error as Error).message);
            if (process.env.NODE_ENV === "development") {
                if (error instanceof ZodError)
                    throw new Error("AccountService -> Create -> Invalid Zod params -> " + error.message);
                if (error instanceof PrismaClientKnownRequestError)
                    throw new Error("AccountService -> Create -> Prisma error -> " + error.message);
                throw new Error("AccountService -> Create -> " + (error as Error).message);
            }
            // TODO: add logging
            return { error: "Unable to create account..." };
        }
    }

    static async upsert<T extends UpsertAccountProps>(props: T): Promise<ResponseFormat<UpsertAccountResponse<T>>> {
        try {
            const { create, update, where, omit, select } = upsertAccountSchema.parse(props);

            const account = await PrismaInstance.account.upsert({
                create,
                update,
                where,
                
                ...(omit && { omit }),
                ...(select && { select }),
            });

            return { data: account as UpsertAccountResponse<T> };
        } catch (error) {
            console.error("AccountService -> Upsert -> " + (error as Error).message);
            if (process.env.NODE_ENV === "development") {
                if (error instanceof ZodError)
                    throw new Error("AccountService -> Upsert -> Invalid Zod params -> " + error.message);
                if (error instanceof PrismaClientKnownRequestError)
                    throw new Error("AccountService -> Upsert -> Prisma error -> " + error.message);
                throw new Error("AccountService -> Upsert -> " + (error as Error).message);
            }
            // TODO: add logging
            return { error: "Unable to upsert account..." };
        }
    }

    static async update<T extends UpdateAccountProps>(props: T): Promise<ResponseFormat<UpdateAccountResponse<T>>> {
        try {
            const { data, where, omit, select } = updateAccountSchema.parse(props);

            const account = await PrismaInstance.account.update({
                data,
                where,
                
                ...(omit && { omit }),
                ...(select && { select }),
            });

            return { data: account as UpdateAccountResponse<T> };
        } catch (error) {
            console.error("AccountService -> Update -> " + (error as Error).message);
            if (process.env.NODE_ENV === "development") {
                if (error instanceof ZodError)
                    throw new Error("AccountService -> Update -> Invalid Zod params -> " + error.message);
                if (error instanceof PrismaClientKnownRequestError)
                    throw new Error("AccountService -> Update -> Prisma error -> " + error.message);
                throw new Error("AccountService -> Update -> " + (error as Error).message);
            }
            // TODO: add logging
            return { error: "Unable to update account..." };
        }
    }

    static async delete<T extends DeleteAccountProps>(props: T): Promise<ResponseFormat<DeleteAccountResponse<T>>> {
        try {
            const { where, omit, select } = deleteAccountSchema.parse(props);

            const account = await PrismaInstance.account.delete({
                where,
                
                ...(omit && { omit }),
                ...(select && { select }),
            });

            return { data: account as DeleteAccountResponse<T> };
        } catch (error) {
            console.error("AccountService -> Delete -> " + (error as Error).message);
            if (process.env.NODE_ENV === "development") {
                if (error instanceof ZodError)
                    throw new Error("AccountService -> Delete -> Invalid Zod params -> " + error.message);
                if (error instanceof PrismaClientKnownRequestError)
                    throw new Error("AccountService -> Delete -> Prisma error -> " + error.message);
                throw new Error("AccountService -> Delete -> " + (error as Error).message);
            }
            // TODO: add logging
            return { error: "Unable to delete account..." };
        }
    }

    static async findUnique<T extends FindUniqueAccountProps>(props: T): Promise<ResponseFormat<FindUniqueAccountResponse<T>>> {
        try {
            const { where, omit, select } = selectAccountSchema.parse(props);

            const account = await PrismaInstance.account.findUnique({
                where,
                
                ...(omit && { omit }),
                ...(select && { select }),
            });

            return { data: account as FindUniqueAccountResponse<T> };
        } catch (error) {
            console.error("AccountService -> FindUnique -> " + (error as Error).message);
            if (process.env.NODE_ENV === "development") {
                if (error instanceof ZodError)
                    throw new Error("AccountService -> FindUnique -> Invalid Zod params -> " + error.message);
                if (error instanceof PrismaClientKnownRequestError)
                    throw new Error("AccountService -> FindUnique -> Prisma error -> " + error.message);
                throw new Error("AccountService -> FindUnique -> " + (error as Error).message);
            }
            // TODO: add logging
            return { error: "Unable to find account..." };
        }
    }

    static async findMany<T extends FindManyAccountProps>(props: T): Promise<ResponseFormat<FindManyAccountResponse<T>>> {
        try {
            const {
                cursor,
                distinct,
                
                omit,
                orderBy,
                select,
                skip = 0,
                take = 10,
                where,
            } = selectManyAccountSchema.parse(props);

            const accountList = await PrismaInstance.account.findMany({
                ...(cursor && { cursor }),
                ...(distinct && { distinct }),
                
                ...(omit && { omit }),
                ...(orderBy && { orderBy }),
                ...(select && { select }),
                ...(skip && { skip }),
                ...(take && { take }),
                ...(where && { where }),
            });

            return { data: accountList as FindManyAccountResponse<T> };
        } catch (error) {
            console.error("AccountService -> FindMany -> " + (error as Error).message);
            if (process.env.NODE_ENV === "development") {
                if (error instanceof ZodError)
                    throw new Error("AccountService -> FindMany -> Invalid Zod params -> " + error.message);
                if (error instanceof PrismaClientKnownRequestError)
                    throw new Error("AccountService -> FindMany -> Prisma error -> " + error.message);
                throw new Error("AccountService -> FindMany -> " + (error as Error).message);
            }
            // TODO: add logging
            return { error: "Unable to find accounts..." };
        }
    }

    static async count(props: CountAccountProps): Promise<ResponseFormat<CountAccountResponse>> {
        try {
            const { cursor, orderBy, select, skip, take, where } = countAccountSchema.parse(props);

            const accountAmount: AccountCount = await PrismaInstance.account.count({
                ...(cursor && { cursor }),
                ...(orderBy && { orderBy }),
                ...(select && { select }),
                ...(skip && { skip }),
                ...(take && { take }),
                ...(where && { where }),
            });

            return { data: accountAmount };
        } catch (error) {
            console.error("AccountService -> Count -> " + (error as Error).message);
            if (process.env.NODE_ENV === "development") {
                if (error instanceof ZodError)
                    throw new Error("AccountService -> Count -> Invalid Zod params -> " + error.message);
                if (error instanceof PrismaClientKnownRequestError)
                    throw new Error("AccountService -> Count -> Prisma error -> " + error.message);
                throw new Error("AccountService -> Count -> " + (error as Error).message);
            }
            // TODO: add logging
            return { error: "Unable to count accounts..." };
        }
    }
}
