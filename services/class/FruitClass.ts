import PrismaInstance from "@lib/prisma";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { FruitCount, FruitCountProps, FruitCountResponse, FruitCountSchema, FruitCreateManyProps, FruitCreateManyResponse, FruitCreateManySchema, FruitCreateProps, FruitCreateResponse, FruitCreateSchema, FruitDeleteManyProps, FruitDeleteManyResponse, FruitDeleteManySchema, FruitDeleteProps, FruitDeleteResponse, FruitDeleteSchema, FruitFindFirstProps, FruitFindFirstResponse, FruitFindFirstSchema, FruitFindManyProps, FruitFindManyResponse, FruitFindManySchema, FruitFindUniqueProps, FruitFindUniqueResponse, FruitFindUniqueSchema, FruitUpdateManyProps, FruitUpdateManyResponse, FruitUpdateManySchema, FruitUpdateProps, FruitUpdateResponse, FruitUpdateSchema, FruitUpsertProps, FruitUpsertResponse, FruitUpsertSchema } from "@services/types/FruitType";
import { ResponseFormat } from "@utils/FetchConfig";
import { ZodError } from "zod";

export default class FruitService {

    // ========== Single mutations ========== //

    static async create<T extends FruitCreateProps>(props: T): Promise<ResponseFormat<FruitCreateResponse<T>>> {
        try {
            const parsedProps = FruitCreateSchema.parse(props);
            const fruit = await PrismaInstance.fruit.create(parsedProps);
            return { data: fruit as FruitCreateResponse<T> };
        } catch (error) {
            return FruitService.error("create", error);
        }
    }

    static async upsert<T extends FruitUpsertProps>(props: T): Promise<ResponseFormat<FruitUpsertResponse<T>>> {
        try {
            const parsedProps = FruitUpsertSchema.parse(props);
            const fruit = await PrismaInstance.fruit.upsert(parsedProps);
            return { data: fruit as FruitUpsertResponse<T> };
        } catch (error) {
            return FruitService.error("upsert", error);
        }
    }

    static async update<T extends FruitUpdateProps>(props: T): Promise<ResponseFormat<FruitUpdateResponse<T>>> {
        try {
            const parsedProps = FruitUpdateSchema.parse(props);
            const fruit = await PrismaInstance.fruit.update(parsedProps);
            return { data: fruit as FruitUpdateResponse<T> };
        } catch (error) {
            return FruitService.error("update", error);
        }
    }

    static async delete<T extends FruitDeleteProps>(props: T): Promise<ResponseFormat<FruitDeleteResponse<T>>> {
        try {
            const parsedProps = FruitDeleteSchema.parse(props);
            const fruit = await PrismaInstance.fruit.delete(parsedProps);
            return { data: fruit as FruitDeleteResponse<T> };
        } catch (error) {
            return FruitService.error("delete", error);
        }
    }

    // ========== Multiple mutations ========== //

    static async createMany(props: FruitCreateManyProps): Promise<ResponseFormat<FruitCreateManyResponse>> {
        try {
            const parsedProps = FruitCreateManySchema.parse(props);
            const result = await PrismaInstance.fruit.createMany(parsedProps);
            return { data: result };
        } catch (error) {
            return FruitService.error("createMany", error);
        }
    }

    static async updateMany(props: FruitUpdateManyProps): Promise<ResponseFormat<FruitUpdateManyResponse>> {
        try {
            const parsedProps = FruitUpdateManySchema.parse(props);
            const result = await PrismaInstance.fruit.updateMany(parsedProps);
            return { data: result };
        } catch (error) {
            return FruitService.error("updateMany", error);
        }
    }

    static async deleteMany(props: FruitDeleteManyProps): Promise<ResponseFormat<FruitDeleteManyResponse>> {
        try {
            const parsedProps = FruitDeleteManySchema.parse(props);
            const result = await PrismaInstance.fruit.deleteMany(parsedProps);
            return { data: result };
        } catch (error) {
            return FruitService.error("deleteMany", error);
        }
    }

    // ========== Single queries ========== //

    static async findFirst<T extends FruitFindFirstProps>(props: T): Promise<ResponseFormat<FruitFindFirstResponse<T>>> {
        try {
            const parsedProps = FruitFindFirstSchema.parse(props);
            const fruit = await PrismaInstance.fruit.findFirst(parsedProps);
            return { data: fruit as FruitFindFirstResponse<T> };
        } catch (error) {
            return FruitService.error("findFirst", error);
        }
    }

    static async findUnique<T extends FruitFindUniqueProps>(props: T): Promise<ResponseFormat<FruitFindUniqueResponse<T>>> {
        try {
            const parsedProps = FruitFindUniqueSchema.parse(props);
            const fruit = await PrismaInstance.fruit.findUnique(parsedProps);
            return { data: fruit as FruitFindUniqueResponse<T> };
        } catch (error) {
            return FruitService.error("findUnique", error);
        }
    }

    static async findMany<T extends FruitFindManyProps>(props: T): Promise<ResponseFormat<FruitFindManyResponse<T>>> {
        try {
            const parsedProps = FruitFindManySchema.parse(props);
            const { skip = 0, take = 10 } = parsedProps;
            const fruitList = await PrismaInstance.fruit.findMany({ skip, take, ...parsedProps });
            return { data: fruitList as FruitFindManyResponse<T> };
        } catch (error) {
            return FruitService.error("findMany", error);
        }
    }

    // ========== Aggregate queries ========== //

    static async count(props: FruitCountProps): Promise<ResponseFormat<FruitCountResponse>> {
        try {
            const parsedProps = FruitCountSchema.parse(props);
            const fruitAmount: FruitCount = await PrismaInstance.fruit.count(parsedProps);
            return { data: fruitAmount };
        } catch (error) {
            return FruitService.error("count", error);
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
