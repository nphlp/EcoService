import PrismaInstance from "@lib/prisma";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { AccountCount, AccountCountProps, AccountCountResponse, AccountCountSchema, AccountCreateManyProps, AccountCreateManyResponse, AccountCreateManySchema, AccountCreateProps, AccountCreateResponse, AccountCreateSchema, AccountDeleteManyProps, AccountDeleteManyResponse, AccountDeleteManySchema, AccountDeleteProps, AccountDeleteResponse, AccountDeleteSchema, AccountFindFirstProps, AccountFindFirstResponse, AccountFindFirstSchema, AccountFindManyProps, AccountFindManyResponse, AccountFindManySchema, AccountFindUniqueProps, AccountFindUniqueResponse, AccountFindUniqueSchema, AccountUpdateManyProps, AccountUpdateManyResponse, AccountUpdateManySchema, AccountUpdateProps, AccountUpdateResponse, AccountUpdateSchema, AccountUpsertProps, AccountUpsertResponse, AccountUpsertSchema } from "@services/types/AccountType";
import { ResponseFormat } from "@utils/FetchConfig";
import { ZodError } from "zod";

export default class AccountService {

    // ========== Single mutations ========== //

    static async create<T extends AccountCreateProps>(props: T): Promise<ResponseFormat<AccountCreateResponse<T>>> {
        try {
            const parsedProps = AccountCreateSchema.parse(props);
            const account = await PrismaInstance.account.create(parsedProps);
            return { data: account as AccountCreateResponse<T> };
        } catch (error) {
            return AccountService.error("create", error);
        }
    }

    static async upsert<T extends AccountUpsertProps>(props: T): Promise<ResponseFormat<AccountUpsertResponse<T>>> {
        try {
            const parsedProps = AccountUpsertSchema.parse(props);
            const account = await PrismaInstance.account.upsert(parsedProps);
            return { data: account as AccountUpsertResponse<T> };
        } catch (error) {
            return AccountService.error("upsert", error);
        }
    }

    static async update<T extends AccountUpdateProps>(props: T): Promise<ResponseFormat<AccountUpdateResponse<T>>> {
        try {
            const parsedProps = AccountUpdateSchema.parse(props);
            const account = await PrismaInstance.account.update(parsedProps);
            return { data: account as AccountUpdateResponse<T> };
        } catch (error) {
            return AccountService.error("update", error);
        }
    }

    static async delete<T extends AccountDeleteProps>(props: T): Promise<ResponseFormat<AccountDeleteResponse<T>>> {
        try {
            const parsedProps = AccountDeleteSchema.parse(props);
            const account = await PrismaInstance.account.delete(parsedProps);
            return { data: account as AccountDeleteResponse<T> };
        } catch (error) {
            return AccountService.error("delete", error);
        }
    }

    // ========== Multiple mutations ========== //

    static async createMany(props: AccountCreateManyProps): Promise<ResponseFormat<AccountCreateManyResponse>> {
        try {
            const parsedProps = AccountCreateManySchema.parse(props);
            const result = await PrismaInstance.account.createMany(parsedProps);
            return { data: result };
        } catch (error) {
            return AccountService.error("createMany", error);
        }
    }

    static async updateMany(props: AccountUpdateManyProps): Promise<ResponseFormat<AccountUpdateManyResponse>> {
        try {
            const parsedProps = AccountUpdateManySchema.parse(props);
            const result = await PrismaInstance.account.updateMany(parsedProps);
            return { data: result };
        } catch (error) {
            return AccountService.error("updateMany", error);
        }
    }

    static async deleteMany(props: AccountDeleteManyProps): Promise<ResponseFormat<AccountDeleteManyResponse>> {
        try {
            const parsedProps = AccountDeleteManySchema.parse(props);
            const result = await PrismaInstance.account.deleteMany(parsedProps);
            return { data: result };
        } catch (error) {
            return AccountService.error("deleteMany", error);
        }
    }

    // ========== Single queries ========== //

    static async findFirst<T extends AccountFindFirstProps>(props: T): Promise<ResponseFormat<AccountFindFirstResponse<T>>> {
        try {
            const parsedProps = AccountFindFirstSchema.parse(props);
            const account = await PrismaInstance.account.findFirst(parsedProps);
            return { data: account as AccountFindFirstResponse<T> };
        } catch (error) {
            return AccountService.error("findFirst", error);
        }
    }

    static async findUnique<T extends AccountFindUniqueProps>(props: T): Promise<ResponseFormat<AccountFindUniqueResponse<T>>> {
        try {
            const parsedProps = AccountFindUniqueSchema.parse(props);
            const account = await PrismaInstance.account.findUnique(parsedProps);
            return { data: account as AccountFindUniqueResponse<T> };
        } catch (error) {
            return AccountService.error("findUnique", error);
        }
    }

    static async findMany<T extends AccountFindManyProps>(props: T): Promise<ResponseFormat<AccountFindManyResponse<T>>> {
        try {
            const parsedProps = AccountFindManySchema.parse(props);
            const { skip = 0, take = 10 } = parsedProps;
            const accountList = await PrismaInstance.account.findMany({ skip, take, ...parsedProps });
            return { data: accountList as AccountFindManyResponse<T> };
        } catch (error) {
            return AccountService.error("findMany", error);
        }
    }

    // ========== Aggregate queries ========== //

    static async count(props: AccountCountProps): Promise<ResponseFormat<AccountCountResponse>> {
        try {
            const parsedProps = AccountCountSchema.parse(props);
            const accountAmount: AccountCount = await PrismaInstance.account.count(parsedProps);
            return { data: accountAmount };
        } catch (error) {
            return AccountService.error("count", error);
        }
    }

    // ========== Error handling ========== //

    static async error(methodName: string, error: unknown): Promise<{error: string}> {
        if (process.env.NODE_ENV === "development") {
            const serviceName = this.constructor.name;
            const message = (error as Error).message;
            if (error instanceof ZodError){
                const zodMessage = serviceName + " -> " + methodName + " -> Invalid Zod params -> " + error.message;
                console.error(zodMessage);
                throw new Error(zodMessage);
            } else if (error instanceof PrismaClientKnownRequestError){
                const prismaMessage = serviceName + " -> " + methodName + " -> Prisma error -> " + error.message;
                console.error(prismaMessage);
                throw new Error(prismaMessage);
            } else {
                const errorMessage = serviceName + " -> " + methodName + " -> " + message;
                console.error(errorMessage);
                throw new Error(errorMessage);
            }
        }
        // TODO: add logging
        return { error: "Something went wrong..." };
    }
}
