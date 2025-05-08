import PrismaInstance from "@lib/prisma";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { UserCount, CountUserProps, CountUserResponse, CreateManyUserProps, CreateManyUserResponse, CreateUserProps, CreateUserResponse, DeleteManyUserProps, DeleteManyUserResponse, DeleteUserProps, DeleteUserResponse, FindFirstUserProps, FindFirstUserResponse, FindManyUserProps, FindManyUserResponse, FindUniqueUserProps, FindUniqueUserResponse, UpdateManyUserProps, UpdateManyUserResponse, UpdateUserProps, UpdateUserResponse, UpsertUserProps, UpsertUserResponse, countUserSchema, createManyUserSchema, createUserSchema, deleteManyUserSchema, deleteUserSchema, selectFirstUserSchema, selectManyUserSchema, selectUniqueUserSchema, updateManyUserSchema, updateUserSchema, upsertUserSchema } from "@services/types/UserType";
import { ResponseFormat } from "@utils/FetchConfig";
import { ZodError } from "zod";

export default class UserService {

    // ========== Single mutations ========== //

    static async create<T extends CreateUserProps>(props: T): Promise<ResponseFormat<CreateUserResponse<T>>> {
        try {
            const parsedProps = createUserSchema.parse(props);
            const user = await PrismaInstance.user.create(parsedProps);
            return { data: user as CreateUserResponse<T> };
        } catch (error) {
            return UserService.error("create", error);
        }
    }

    static async upsert<T extends UpsertUserProps>(props: T): Promise<ResponseFormat<UpsertUserResponse<T>>> {
        try {
            const parsedProps = upsertUserSchema.parse(props);
            const user = await PrismaInstance.user.upsert(parsedProps);
            return { data: user as UpsertUserResponse<T> };
        } catch (error) {
            return UserService.error("upsert", error);
        }
    }

    static async update<T extends UpdateUserProps>(props: T): Promise<ResponseFormat<UpdateUserResponse<T>>> {
        try {
            const parsedProps = updateUserSchema.parse(props);
            const user = await PrismaInstance.user.update(parsedProps);
            return { data: user as UpdateUserResponse<T> };
        } catch (error) {
            return UserService.error("update", error);
        }
    }

    static async delete<T extends DeleteUserProps>(props: T): Promise<ResponseFormat<DeleteUserResponse<T>>> {
        try {
            const parsedProps = deleteUserSchema.parse(props);
            const user = await PrismaInstance.user.delete(parsedProps);
            return { data: user as DeleteUserResponse<T> };
        } catch (error) {
            return UserService.error("delete", error);
        }
    }

    // ========== Multiple mutations ========== //

    static async createMany(props: CreateManyUserProps): Promise<ResponseFormat<CreateManyUserResponse>> {
        try {
            const parsedProps = createManyUserSchema.parse(props);
            const result = await PrismaInstance.user.createMany(parsedProps);
            return { data: result };
        } catch (error) {
            return UserService.error("createMany", error);
        }
    }

    static async updateMany(props: UpdateManyUserProps): Promise<ResponseFormat<UpdateManyUserResponse>> {
        try {
            const parsedProps = updateManyUserSchema.parse(props);
            const result = await PrismaInstance.user.updateMany(parsedProps);
            return { data: result };
        } catch (error) {
            return UserService.error("updateMany", error);
        }
    }

    static async deleteMany(props: DeleteManyUserProps): Promise<ResponseFormat<DeleteManyUserResponse>> {
        try {
            const parsedProps = deleteManyUserSchema.parse(props);
            const result = await PrismaInstance.user.deleteMany(parsedProps);
            return { data: result };
        } catch (error) {
            return UserService.error("deleteMany", error);
        }
    }

    // ========== Single queries ========== //

    static async findFirst<T extends FindFirstUserProps>(props: T): Promise<ResponseFormat<FindFirstUserResponse<T>>> {
        try {
            const parsedProps = selectFirstUserSchema.parse(props);
            const user = await PrismaInstance.user.findFirst(parsedProps);
            return { data: user as FindFirstUserResponse<T> };
        } catch (error) {
            return UserService.error("findFirst", error);
        }
    }

    static async findUnique<T extends FindUniqueUserProps>(props: T): Promise<ResponseFormat<FindUniqueUserResponse<T>>> {
        try {
            const parsedProps = selectUniqueUserSchema.parse(props);
            const user = await PrismaInstance.user.findUnique(parsedProps);
            return { data: user as FindUniqueUserResponse<T> };
        } catch (error) {
            return UserService.error("findUnique", error);
        }
    }

    static async findMany<T extends FindManyUserProps>(props: T): Promise<ResponseFormat<FindManyUserResponse<T>>> {
        try {
            const parsedProps = selectManyUserSchema.parse(props);
            const { skip = 0, take = 10 } = parsedProps;
            const userList = await PrismaInstance.user.findMany({ skip, take, ...parsedProps });
            return { data: userList as FindManyUserResponse<T> };
        } catch (error) {
            return UserService.error("findMany", error);
        }
    }

    // ========== Aggregate queries ========== //

    static async count(props: CountUserProps): Promise<ResponseFormat<CountUserResponse>> {
        try {
            const parsedProps = countUserSchema.parse(props);
            const userAmount: UserCount = await PrismaInstance.user.count(parsedProps);
            return { data: userAmount };
        } catch (error) {
            return UserService.error("count", error);
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
