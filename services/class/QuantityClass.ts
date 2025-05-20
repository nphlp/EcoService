import PrismaInstance from "@lib/prisma";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { QuantityCount, QuantityCountProps, QuantityCountResponse, QuantityCountSchema, QuantityCreateManyProps, QuantityCreateManyResponse, QuantityCreateManySchema, QuantityCreateProps, QuantityCreateResponse, QuantityCreateSchema, QuantityDeleteManyProps, QuantityDeleteManyResponse, QuantityDeleteManySchema, QuantityDeleteProps, QuantityDeleteResponse, QuantityDeleteSchema, QuantityFindFirstProps, QuantityFindFirstResponse, QuantityFindFirstSchema, QuantityFindManyProps, QuantityFindManyResponse, QuantityFindManySchema, QuantityFindUniqueProps, QuantityFindUniqueResponse, QuantityFindUniqueSchema, QuantityUpdateManyProps, QuantityUpdateManyResponse, QuantityUpdateManySchema, QuantityUpdateProps, QuantityUpdateResponse, QuantityUpdateSchema, QuantityUpsertProps, QuantityUpsertResponse, QuantityUpsertSchema } from "@services/types/QuantityType";
import { ResponseFormat } from "@utils/FetchConfig";
import { ZodError } from "zod";

export default class QuantityService {

    // ========== Single mutations ========== //

    static async create<T extends QuantityCreateProps>(props: T): Promise<ResponseFormat<QuantityCreateResponse<T>>> {
        try {
            const parsedProps = QuantityCreateSchema.parse(props);
            const quantity = await PrismaInstance.quantity.create(parsedProps);
            return { data: quantity as QuantityCreateResponse<T> };
        } catch (error) {
            return QuantityService.error("create", error);
        }
    }

    static async upsert<T extends QuantityUpsertProps>(props: T): Promise<ResponseFormat<QuantityUpsertResponse<T>>> {
        try {
            const parsedProps = QuantityUpsertSchema.parse(props);
            const quantity = await PrismaInstance.quantity.upsert(parsedProps);
            return { data: quantity as QuantityUpsertResponse<T> };
        } catch (error) {
            return QuantityService.error("upsert", error);
        }
    }

    static async update<T extends QuantityUpdateProps>(props: T): Promise<ResponseFormat<QuantityUpdateResponse<T>>> {
        try {
            const parsedProps = QuantityUpdateSchema.parse(props);
            const quantity = await PrismaInstance.quantity.update(parsedProps);
            return { data: quantity as QuantityUpdateResponse<T> };
        } catch (error) {
            return QuantityService.error("update", error);
        }
    }

    static async delete<T extends QuantityDeleteProps>(props: T): Promise<ResponseFormat<QuantityDeleteResponse<T>>> {
        try {
            const parsedProps = QuantityDeleteSchema.parse(props);
            const quantity = await PrismaInstance.quantity.delete(parsedProps);
            return { data: quantity as QuantityDeleteResponse<T> };
        } catch (error) {
            return QuantityService.error("delete", error);
        }
    }

    // ========== Multiple mutations ========== //

    static async createMany(props: QuantityCreateManyProps): Promise<ResponseFormat<QuantityCreateManyResponse>> {
        try {
            const parsedProps = QuantityCreateManySchema.parse(props);
            const result = await PrismaInstance.quantity.createMany(parsedProps);
            return { data: result };
        } catch (error) {
            return QuantityService.error("createMany", error);
        }
    }

    static async updateMany(props: QuantityUpdateManyProps): Promise<ResponseFormat<QuantityUpdateManyResponse>> {
        try {
            const parsedProps = QuantityUpdateManySchema.parse(props);
            const result = await PrismaInstance.quantity.updateMany(parsedProps);
            return { data: result };
        } catch (error) {
            return QuantityService.error("updateMany", error);
        }
    }

    static async deleteMany(props: QuantityDeleteManyProps): Promise<ResponseFormat<QuantityDeleteManyResponse>> {
        try {
            const parsedProps = QuantityDeleteManySchema.parse(props);
            const result = await PrismaInstance.quantity.deleteMany(parsedProps);
            return { data: result };
        } catch (error) {
            return QuantityService.error("deleteMany", error);
        }
    }

    // ========== Single queries ========== //

    static async findFirst<T extends QuantityFindFirstProps>(props: T): Promise<ResponseFormat<QuantityFindFirstResponse<T>>> {
        try {
            const parsedProps = QuantityFindFirstSchema.parse(props);
            const quantity = await PrismaInstance.quantity.findFirst(parsedProps);
            return { data: quantity as QuantityFindFirstResponse<T> };
        } catch (error) {
            return QuantityService.error("findFirst", error);
        }
    }

    static async findUnique<T extends QuantityFindUniqueProps>(props: T): Promise<ResponseFormat<QuantityFindUniqueResponse<T>>> {
        try {
            const parsedProps = QuantityFindUniqueSchema.parse(props);
            const quantity = await PrismaInstance.quantity.findUnique(parsedProps);
            return { data: quantity as QuantityFindUniqueResponse<T> };
        } catch (error) {
            return QuantityService.error("findUnique", error);
        }
    }

    static async findMany<T extends QuantityFindManyProps>(props: T): Promise<ResponseFormat<QuantityFindManyResponse<T>>> {
        try {
            const parsedProps = QuantityFindManySchema.parse(props);
            const { skip = 0, take = 10 } = parsedProps;
            const quantityList = await PrismaInstance.quantity.findMany({ skip, take, ...parsedProps });
            return { data: quantityList as QuantityFindManyResponse<T> };
        } catch (error) {
            return QuantityService.error("findMany", error);
        }
    }

    // ========== Aggregate queries ========== //

    static async count(props: QuantityCountProps): Promise<ResponseFormat<QuantityCountResponse>> {
        try {
            const parsedProps = QuantityCountSchema.parse(props);
            const quantityAmount: QuantityCount = await PrismaInstance.quantity.count(parsedProps);
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
