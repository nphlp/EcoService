import PrismaInstance from "@lib/prisma";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { AccountCount, CountAccountProps, CountAccountResponse, CreateManyAccountProps, CreateManyAccountResponse, CreateAccountProps, CreateAccountResponse, DeleteManyAccountProps, DeleteManyAccountResponse, DeleteAccountProps, DeleteAccountResponse, FindFirstAccountProps, FindFirstAccountResponse, FindManyAccountProps, FindManyAccountResponse, FindUniqueAccountProps, FindUniqueAccountResponse, UpdateManyAccountProps, UpdateManyAccountResponse, UpdateAccountProps, UpdateAccountResponse, UpsertAccountProps, UpsertAccountResponse, countAccountSchema, createManyAccountSchema, createAccountSchema, deleteManyAccountSchema, deleteAccountSchema, selectFirstAccountSchema, selectManyAccountSchema, selectUniqueAccountSchema, updateManyAccountSchema, updateAccountSchema, upsertAccountSchema } from "@services/types/AccountType";
import { ResponseFormat } from "@utils/FetchConfig";
import { ZodError } from "zod";

export default class AccountService {

    // ========== Single mutations ========== //

    static async create<T extends CreateAccountProps>(props: T): Promise<ResponseFormat<CreateAccountResponse<T>>> {
        try {
            const parsedProps = createAccountSchema.parse(props);
            const account = await PrismaInstance.account.create(parsedProps);
            return { data: account as CreateAccountResponse<T> };
        } catch (error) {
            return AccountService.error("create", error);
        }
    }

    static async upsert<T extends UpsertAccountProps>(props: T): Promise<ResponseFormat<UpsertAccountResponse<T>>> {
        try {
            const parsedProps = upsertAccountSchema.parse(props);
            const account = await PrismaInstance.account.upsert(parsedProps);
            return { data: account as UpsertAccountResponse<T> };
        } catch (error) {
            return AccountService.error("upsert", error);
        }
    }

    static async update<T extends UpdateAccountProps>(props: T): Promise<ResponseFormat<UpdateAccountResponse<T>>> {
        try {
            const parsedProps = updateAccountSchema.parse(props);
            const account = await PrismaInstance.account.update(parsedProps);
            return { data: account as UpdateAccountResponse<T> };
        } catch (error) {
            return AccountService.error("update", error);
        }
    }

    static async delete<T extends DeleteAccountProps>(props: T): Promise<ResponseFormat<DeleteAccountResponse<T>>> {
        try {
            const parsedProps = deleteAccountSchema.parse(props);
            const account = await PrismaInstance.account.delete(parsedProps);
            return { data: account as DeleteAccountResponse<T> };
        } catch (error) {
            return AccountService.error("delete", error);
        }
    }

    // ========== Multiple mutations ========== //

    static async createMany(props: CreateManyAccountProps): Promise<ResponseFormat<CreateManyAccountResponse>> {
        try {
            const parsedProps = createManyAccountSchema.parse(props);
            const result = await PrismaInstance.account.createMany(parsedProps);
            return { data: result };
        } catch (error) {
            return AccountService.error("createMany", error);
        }
    }

    static async updateMany(props: UpdateManyAccountProps): Promise<ResponseFormat<UpdateManyAccountResponse>> {
        try {
            const parsedProps = updateManyAccountSchema.parse(props);
            const result = await PrismaInstance.account.updateMany(parsedProps);
            return { data: result };
        } catch (error) {
            return AccountService.error("updateMany", error);
        }
    }

    static async deleteMany(props: DeleteManyAccountProps): Promise<ResponseFormat<DeleteManyAccountResponse>> {
        try {
            const parsedProps = deleteManyAccountSchema.parse(props);
            const result = await PrismaInstance.account.deleteMany(parsedProps);
            return { data: result };
        } catch (error) {
            return AccountService.error("deleteMany", error);
        }
    }

    // ========== Single queries ========== //

    static async findFirst<T extends FindFirstAccountProps>(props: T): Promise<ResponseFormat<FindFirstAccountResponse<T>>> {
        try {
            const parsedProps = selectFirstAccountSchema.parse(props);
            const account = await PrismaInstance.account.findFirst(parsedProps);
            return { data: account as FindFirstAccountResponse<T> };
        } catch (error) {
            return AccountService.error("findFirst", error);
        }
    }

    static async findUnique<T extends FindUniqueAccountProps>(props: T): Promise<ResponseFormat<FindUniqueAccountResponse<T>>> {
        try {
            const parsedProps = selectUniqueAccountSchema.parse(props);
            const account = await PrismaInstance.account.findUnique(parsedProps);
            return { data: account as FindUniqueAccountResponse<T> };
        } catch (error) {
            return AccountService.error("findUnique", error);
        }
    }

    static async findMany<T extends FindManyAccountProps>(props: T): Promise<ResponseFormat<FindManyAccountResponse<T>>> {
        try {
            const parsedProps = selectManyAccountSchema.parse(props);
            const { skip = 0, take = 10 } = parsedProps;
            const accountList = await PrismaInstance.account.findMany({ skip, take, ...parsedProps });
            return { data: accountList as FindManyAccountResponse<T> };
        } catch (error) {
            return AccountService.error("findMany", error);
        }
    }

    // ========== Aggregate queries ========== //

    static async count(props: CountAccountProps): Promise<ResponseFormat<CountAccountResponse>> {
        try {
            const parsedProps = countAccountSchema.parse(props);
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
