import PrismaInstance from "@lib/prisma";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { AccountCount, AccountCountProps, AccountCountResponse, AccountCreateManyProps, AccountCreateManyResponse, AccountCreateProps, AccountCreateResponse, AccountDeleteManyProps, AccountDeleteManyResponse, AccountDeleteProps, AccountDeleteResponse, AccountFindFirstProps, AccountFindFirstResponse, AccountFindManyProps, AccountFindManyResponse, AccountFindUniqueProps, AccountFindUniqueResponse, AccountUpdateManyProps, AccountUpdateManyResponse, AccountUpdateProps, AccountUpdateResponse, AccountUpsertProps, AccountUpsertResponse } from "@services/types/AccountType";
import { ResponseFormat } from "@utils/FetchConfig";

export default class AccountService {

    // ========== Single mutations ========== //

    static async create<T extends AccountCreateProps>(props: T): Promise<ResponseFormat<AccountCreateResponse<T>>> {
        try {
            const account = await PrismaInstance.account.create(props);
            return { data: account as AccountCreateResponse<T> };
        } catch (error) {
            return AccountService.error("create", error);
        }
    }

    static async upsert<T extends AccountUpsertProps>(props: T): Promise<ResponseFormat<AccountUpsertResponse<T>>> {
        try {
            const account = await PrismaInstance.account.upsert(props);
            return { data: account as AccountUpsertResponse<T> };
        } catch (error) {
            return AccountService.error("upsert", error);
        }
    }

    static async update<T extends AccountUpdateProps>(props: T): Promise<ResponseFormat<AccountUpdateResponse<T>>> {
        try {
            const account = await PrismaInstance.account.update(props);
            return { data: account as AccountUpdateResponse<T> };
        } catch (error) {
            return AccountService.error("update", error);
        }
    }

    static async delete<T extends AccountDeleteProps>(props: T): Promise<ResponseFormat<AccountDeleteResponse<T>>> {
        try {
            const account = await PrismaInstance.account.delete(props);
            return { data: account as AccountDeleteResponse<T> };
        } catch (error) {
            return AccountService.error("delete", error);
        }
    }

    // ========== Multiple mutations ========== //

    static async createMany(props: AccountCreateManyProps): Promise<ResponseFormat<AccountCreateManyResponse>> {
        try {
            const result = await PrismaInstance.account.createMany(props);
            return { data: result };
        } catch (error) {
            return AccountService.error("createMany", error);
        }
    }

    static async updateMany(props: AccountUpdateManyProps): Promise<ResponseFormat<AccountUpdateManyResponse>> {
        try {
            const result = await PrismaInstance.account.updateMany(props);
            return { data: result };
        } catch (error) {
            return AccountService.error("updateMany", error);
        }
    }

    static async deleteMany(props: AccountDeleteManyProps): Promise<ResponseFormat<AccountDeleteManyResponse>> {
        try {
            const result = await PrismaInstance.account.deleteMany(props);
            return { data: result };
        } catch (error) {
            return AccountService.error("deleteMany", error);
        }
    }

    // ========== Single queries ========== //

    static async findFirst<T extends AccountFindFirstProps>(props: T): Promise<ResponseFormat<AccountFindFirstResponse<T>>> {
        try {
            const account = await PrismaInstance.account.findFirst(props);
            return { data: account as AccountFindFirstResponse<T> };
        } catch (error) {
            return AccountService.error("findFirst", error);
        }
    }

    static async findUnique<T extends AccountFindUniqueProps>(props: T): Promise<ResponseFormat<AccountFindUniqueResponse<T>>> {
        try {
            const account = await PrismaInstance.account.findUnique(props);
            return { data: account as AccountFindUniqueResponse<T> };
        } catch (error) {
            return AccountService.error("findUnique", error);
        }
    }

    static async findMany<T extends AccountFindManyProps>(props: T): Promise<ResponseFormat<AccountFindManyResponse<T>>> {
        try {
            const accountList = await PrismaInstance.account.findMany(props);
            return { data: accountList as AccountFindManyResponse<T> };
        } catch (error) {
            return AccountService.error("findMany", error);
        }
    }

    // ========== Aggregate queries ========== //

    static async count(props: AccountCountProps): Promise<ResponseFormat<AccountCountResponse>> {
        try {
            const accountAmount: AccountCount = await PrismaInstance.account.count(props);
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
            if (error instanceof PrismaClientKnownRequestError){
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
