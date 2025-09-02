import PrismaInstance from "@lib/prisma";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { QuantityCount, QuantityCountProps, QuantityCountResponse, QuantityCreateManyProps, QuantityCreateManyResponse, QuantityCreateProps, QuantityCreateResponse, QuantityDeleteManyProps, QuantityDeleteManyResponse, QuantityDeleteProps, QuantityDeleteResponse, QuantityFindFirstProps, QuantityFindFirstResponse, QuantityFindManyProps, QuantityFindManyResponse, QuantityFindUniqueProps, QuantityFindUniqueResponse, QuantityUpdateManyProps, QuantityUpdateManyResponse, QuantityUpdateProps, QuantityUpdateResponse, QuantityUpsertProps, QuantityUpsertResponse } from "@services/types/QuantityType";
import { ResponseFormat } from "@utils/FetchConfig";

export default class QuantityService {

    // ========== Single mutations ========== //

    static async create<T extends QuantityCreateProps>(props: T): Promise<ResponseFormat<QuantityCreateResponse<T>>> {
        try {
            const quantity = await PrismaInstance.quantity.create(props);
            return { data: quantity as QuantityCreateResponse<T> };
        } catch (error) {
            return QuantityService.error("create", error);
        }
    }

    static async upsert<T extends QuantityUpsertProps>(props: T): Promise<ResponseFormat<QuantityUpsertResponse<T>>> {
        try {
            const quantity = await PrismaInstance.quantity.upsert(props);
            return { data: quantity as QuantityUpsertResponse<T> };
        } catch (error) {
            return QuantityService.error("upsert", error);
        }
    }

    static async update<T extends QuantityUpdateProps>(props: T): Promise<ResponseFormat<QuantityUpdateResponse<T>>> {
        try {
            const quantity = await PrismaInstance.quantity.update(props);
            return { data: quantity as QuantityUpdateResponse<T> };
        } catch (error) {
            return QuantityService.error("update", error);
        }
    }

    static async delete<T extends QuantityDeleteProps>(props: T): Promise<ResponseFormat<QuantityDeleteResponse<T>>> {
        try {
            const quantity = await PrismaInstance.quantity.delete(props);
            return { data: quantity as QuantityDeleteResponse<T> };
        } catch (error) {
            return QuantityService.error("delete", error);
        }
    }

    // ========== Multiple mutations ========== //

    static async createMany(props: QuantityCreateManyProps): Promise<ResponseFormat<QuantityCreateManyResponse>> {
        try {
            const result = await PrismaInstance.quantity.createMany(props);
            return { data: result };
        } catch (error) {
            return QuantityService.error("createMany", error);
        }
    }

    static async updateMany(props: QuantityUpdateManyProps): Promise<ResponseFormat<QuantityUpdateManyResponse>> {
        try {
            const result = await PrismaInstance.quantity.updateMany(props);
            return { data: result };
        } catch (error) {
            return QuantityService.error("updateMany", error);
        }
    }

    static async deleteMany(props: QuantityDeleteManyProps): Promise<ResponseFormat<QuantityDeleteManyResponse>> {
        try {
            const result = await PrismaInstance.quantity.deleteMany(props);
            return { data: result };
        } catch (error) {
            return QuantityService.error("deleteMany", error);
        }
    }

    // ========== Single queries ========== //

    static async findFirst<T extends QuantityFindFirstProps>(props: T): Promise<ResponseFormat<QuantityFindFirstResponse<T>>> {
        try {
            const quantity = await PrismaInstance.quantity.findFirst(props);
            return { data: quantity as QuantityFindFirstResponse<T> };
        } catch (error) {
            return QuantityService.error("findFirst", error);
        }
    }

    static async findUnique<T extends QuantityFindUniqueProps>(props: T): Promise<ResponseFormat<QuantityFindUniqueResponse<T>>> {
        try {
            const quantity = await PrismaInstance.quantity.findUnique(props);
            return { data: quantity as QuantityFindUniqueResponse<T> };
        } catch (error) {
            return QuantityService.error("findUnique", error);
        }
    }

    static async findMany<T extends QuantityFindManyProps>(props: T): Promise<ResponseFormat<QuantityFindManyResponse<T>>> {
        try {
            const quantityList = await PrismaInstance.quantity.findMany(props);
            return { data: quantityList as QuantityFindManyResponse<T> };
        } catch (error) {
            return QuantityService.error("findMany", error);
        }
    }

    // ========== Aggregate queries ========== //

    static async count(props: QuantityCountProps): Promise<ResponseFormat<QuantityCountResponse>> {
        try {
            const quantityAmount: QuantityCount = await PrismaInstance.quantity.count(props);
            return { data: quantityAmount };
        } catch (error) {
            return QuantityService.error("count", error);
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
