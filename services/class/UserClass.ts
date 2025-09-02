import PrismaInstance from "@lib/prisma";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { UserCount, UserCountProps, UserCountResponse, UserCreateManyProps, UserCreateManyResponse, UserCreateProps, UserCreateResponse, UserDeleteManyProps, UserDeleteManyResponse, UserDeleteProps, UserDeleteResponse, UserFindFirstProps, UserFindFirstResponse, UserFindManyProps, UserFindManyResponse, UserFindUniqueProps, UserFindUniqueResponse, UserUpdateManyProps, UserUpdateManyResponse, UserUpdateProps, UserUpdateResponse, UserUpsertProps, UserUpsertResponse } from "@services/types/UserType";
import { ResponseFormat } from "@utils/FetchConfig";

export default class UserService {

    // ========== Single mutations ========== //

    static async create<T extends UserCreateProps>(props: T): Promise<ResponseFormat<UserCreateResponse<T>>> {
        try {
            const user = await PrismaInstance.user.create(props);
            return { data: user as UserCreateResponse<T> };
        } catch (error) {
            return UserService.error("create", error);
        }
    }

    static async upsert<T extends UserUpsertProps>(props: T): Promise<ResponseFormat<UserUpsertResponse<T>>> {
        try {
            const user = await PrismaInstance.user.upsert(props);
            return { data: user as UserUpsertResponse<T> };
        } catch (error) {
            return UserService.error("upsert", error);
        }
    }

    static async update<T extends UserUpdateProps>(props: T): Promise<ResponseFormat<UserUpdateResponse<T>>> {
        try {
            const user = await PrismaInstance.user.update(props);
            return { data: user as UserUpdateResponse<T> };
        } catch (error) {
            return UserService.error("update", error);
        }
    }

    static async delete<T extends UserDeleteProps>(props: T): Promise<ResponseFormat<UserDeleteResponse<T>>> {
        try {
            const user = await PrismaInstance.user.delete(props);
            return { data: user as UserDeleteResponse<T> };
        } catch (error) {
            return UserService.error("delete", error);
        }
    }

    // ========== Multiple mutations ========== //

    static async createMany(props: UserCreateManyProps): Promise<ResponseFormat<UserCreateManyResponse>> {
        try {
            const result = await PrismaInstance.user.createMany(props);
            return { data: result };
        } catch (error) {
            return UserService.error("createMany", error);
        }
    }

    static async updateMany(props: UserUpdateManyProps): Promise<ResponseFormat<UserUpdateManyResponse>> {
        try {
            const result = await PrismaInstance.user.updateMany(props);
            return { data: result };
        } catch (error) {
            return UserService.error("updateMany", error);
        }
    }

    static async deleteMany(props: UserDeleteManyProps): Promise<ResponseFormat<UserDeleteManyResponse>> {
        try {
            const result = await PrismaInstance.user.deleteMany(props);
            return { data: result };
        } catch (error) {
            return UserService.error("deleteMany", error);
        }
    }

    // ========== Single queries ========== //

    static async findFirst<T extends UserFindFirstProps>(props: T): Promise<ResponseFormat<UserFindFirstResponse<T>>> {
        try {
            const user = await PrismaInstance.user.findFirst(props);
            return { data: user as UserFindFirstResponse<T> };
        } catch (error) {
            return UserService.error("findFirst", error);
        }
    }

    static async findUnique<T extends UserFindUniqueProps>(props: T): Promise<ResponseFormat<UserFindUniqueResponse<T>>> {
        try {
            const user = await PrismaInstance.user.findUnique(props);
            return { data: user as UserFindUniqueResponse<T> };
        } catch (error) {
            return UserService.error("findUnique", error);
        }
    }

    static async findMany<T extends UserFindManyProps>(props: T): Promise<ResponseFormat<UserFindManyResponse<T>>> {
        try {
            const userList = await PrismaInstance.user.findMany(props);
            return { data: userList as UserFindManyResponse<T> };
        } catch (error) {
            return UserService.error("findMany", error);
        }
    }

    // ========== Aggregate queries ========== //

    static async count(props: UserCountProps): Promise<ResponseFormat<UserCountResponse>> {
        try {
            const userAmount: UserCount = await PrismaInstance.user.count(props);
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
