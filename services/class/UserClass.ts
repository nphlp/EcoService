import PrismaInstance from "@lib/prisma";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { UserCount, CountUserProps, CountUserResponse, CreateUserProps, CreateUserResponse, DeleteUserProps, DeleteUserResponse, FindManyUserProps, FindManyUserResponse, FindUniqueUserProps, FindUniqueUserResponse, UpdateUserProps, UpdateUserResponse, UpsertUserProps, UpsertUserResponse, countUserSchema, createUserSchema, deleteUserSchema, selectUserSchema, selectManyUserSchema, updateUserSchema, upsertUserSchema } from "@services/types/UserType";
import { ResponseFormat } from "@utils/FetchConfig";
import { ZodError } from "zod";

export default class UserService {
    static async create<T extends CreateUserProps>(props: T): Promise<ResponseFormat<CreateUserResponse<T>>> {
        try {
            const { data, omit, select } = createUserSchema.parse(props);

            const user = await PrismaInstance.user.create({
                data,
                
                ...(omit && { omit }),
                ...(select && { select }),
            });

            return { data: user as CreateUserResponse<T> };
        } catch (error) {
            console.error("UserService -> Create -> " + (error as Error).message);
            if (process.env.NODE_ENV === "development") {
                if (error instanceof ZodError)
                    throw new Error("UserService -> Create -> Invalid Zod params -> " + error.message);
                if (error instanceof PrismaClientKnownRequestError)
                    throw new Error("UserService -> Create -> Prisma error -> " + error.message);
                throw new Error("UserService -> Create -> " + (error as Error).message);
            }
            // TODO: add logging
            return { error: "Unable to create user..." };
        }
    }

    static async upsert<T extends UpsertUserProps>(props: T): Promise<ResponseFormat<UpsertUserResponse<T>>> {
        try {
            const { create, update, where, omit, select } = upsertUserSchema.parse(props);

            const user = await PrismaInstance.user.upsert({
                create,
                update,
                where,
                
                ...(omit && { omit }),
                ...(select && { select }),
            });

            return { data: user as UpsertUserResponse<T> };
        } catch (error) {
            console.error("UserService -> Upsert -> " + (error as Error).message);
            if (process.env.NODE_ENV === "development") {
                if (error instanceof ZodError)
                    throw new Error("UserService -> Upsert -> Invalid Zod params -> " + error.message);
                if (error instanceof PrismaClientKnownRequestError)
                    throw new Error("UserService -> Upsert -> Prisma error -> " + error.message);
                throw new Error("UserService -> Upsert -> " + (error as Error).message);
            }
            // TODO: add logging
            return { error: "Unable to upsert user..." };
        }
    }

    static async update<T extends UpdateUserProps>(props: T): Promise<ResponseFormat<UpdateUserResponse<T>>> {
        try {
            const { data, where, omit, select } = updateUserSchema.parse(props);

            const user = await PrismaInstance.user.update({
                data,
                where,
                
                ...(omit && { omit }),
                ...(select && { select }),
            });

            return { data: user as UpdateUserResponse<T> };
        } catch (error) {
            console.error("UserService -> Update -> " + (error as Error).message);
            if (process.env.NODE_ENV === "development") {
                if (error instanceof ZodError)
                    throw new Error("UserService -> Update -> Invalid Zod params -> " + error.message);
                if (error instanceof PrismaClientKnownRequestError)
                    throw new Error("UserService -> Update -> Prisma error -> " + error.message);
                throw new Error("UserService -> Update -> " + (error as Error).message);
            }
            // TODO: add logging
            return { error: "Unable to update user..." };
        }
    }

    static async delete<T extends DeleteUserProps>(props: T): Promise<ResponseFormat<DeleteUserResponse<T>>> {
        try {
            const { where, omit, select } = deleteUserSchema.parse(props);

            const user = await PrismaInstance.user.delete({
                where,
                
                ...(omit && { omit }),
                ...(select && { select }),
            });

            return { data: user as DeleteUserResponse<T> };
        } catch (error) {
            console.error("UserService -> Delete -> " + (error as Error).message);
            if (process.env.NODE_ENV === "development") {
                if (error instanceof ZodError)
                    throw new Error("UserService -> Delete -> Invalid Zod params -> " + error.message);
                if (error instanceof PrismaClientKnownRequestError)
                    throw new Error("UserService -> Delete -> Prisma error -> " + error.message);
                throw new Error("UserService -> Delete -> " + (error as Error).message);
            }
            // TODO: add logging
            return { error: "Unable to delete user..." };
        }
    }

    static async findUnique<T extends FindUniqueUserProps>(props: T): Promise<ResponseFormat<FindUniqueUserResponse<T>>> {
        try {
            const { where, omit, select } = selectUserSchema.parse(props);

            const user = await PrismaInstance.user.findUnique({
                where,
                
                ...(omit && { omit }),
                ...(select && { select }),
            });

            return { data: user as FindUniqueUserResponse<T> };
        } catch (error) {
            console.error("UserService -> FindUnique -> " + (error as Error).message);
            if (process.env.NODE_ENV === "development") {
                if (error instanceof ZodError)
                    throw new Error("UserService -> FindUnique -> Invalid Zod params -> " + error.message);
                if (error instanceof PrismaClientKnownRequestError)
                    throw new Error("UserService -> FindUnique -> Prisma error -> " + error.message);
                throw new Error("UserService -> FindUnique -> " + (error as Error).message);
            }
            // TODO: add logging
            return { error: "Unable to find user..." };
        }
    }

    static async findMany<T extends FindManyUserProps>(props: T): Promise<ResponseFormat<FindManyUserResponse<T>>> {
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
            } = selectManyUserSchema.parse(props);

            const userList = await PrismaInstance.user.findMany({
                ...(cursor && { cursor }),
                ...(distinct && { distinct }),
                
                ...(omit && { omit }),
                ...(orderBy && { orderBy }),
                ...(select && { select }),
                ...(skip && { skip }),
                ...(take && { take }),
                ...(where && { where }),
            });

            return { data: userList as FindManyUserResponse<T> };
        } catch (error) {
            console.error("UserService -> FindMany -> " + (error as Error).message);
            if (process.env.NODE_ENV === "development") {
                if (error instanceof ZodError)
                    throw new Error("UserService -> FindMany -> Invalid Zod params -> " + error.message);
                if (error instanceof PrismaClientKnownRequestError)
                    throw new Error("UserService -> FindMany -> Prisma error -> " + error.message);
                throw new Error("UserService -> FindMany -> " + (error as Error).message);
            }
            // TODO: add logging
            return { error: "Unable to find users..." };
        }
    }

    static async count(props: CountUserProps): Promise<ResponseFormat<CountUserResponse>> {
        try {
            const { cursor, orderBy, select, skip, take, where } = countUserSchema.parse(props);

            const userAmount: UserCount = await PrismaInstance.user.count({
                ...(cursor && { cursor }),
                ...(orderBy && { orderBy }),
                ...(select && { select }),
                ...(skip && { skip }),
                ...(take && { take }),
                ...(where && { where }),
            });

            return { data: userAmount };
        } catch (error) {
            console.error("UserService -> Count -> " + (error as Error).message);
            if (process.env.NODE_ENV === "development") {
                if (error instanceof ZodError)
                    throw new Error("UserService -> Count -> Invalid Zod params -> " + error.message);
                if (error instanceof PrismaClientKnownRequestError)
                    throw new Error("UserService -> Count -> Prisma error -> " + error.message);
                throw new Error("UserService -> Count -> " + (error as Error).message);
            }
            // TODO: add logging
            return { error: "Unable to count users..." };
        }
    }
}
