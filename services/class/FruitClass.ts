import PrismaInstance from "@lib/prisma";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { FruitCount, FruitCountProps, FruitCountResponse, FruitCreateManyProps, FruitCreateManyResponse, FruitCreateProps, FruitCreateResponse, FruitDeleteManyProps, FruitDeleteManyResponse, FruitDeleteProps, FruitDeleteResponse, FruitFindFirstProps, FruitFindFirstResponse, FruitFindManyProps, FruitFindManyResponse, FruitFindUniqueProps, FruitFindUniqueResponse, FruitUpdateManyProps, FruitUpdateManyResponse, FruitUpdateProps, FruitUpdateResponse, FruitUpsertProps, FruitUpsertResponse } from "@services/types/FruitType";
import { ResponseFormat } from "@utils/FetchConfig";

export default class FruitService {

    // ========== Single mutations ========== //

    static async create<T extends FruitCreateProps>(props: T): Promise<ResponseFormat<FruitCreateResponse<T>>> {
        try {
            const fruit = await PrismaInstance.fruit.create(props);
            return { data: fruit as FruitCreateResponse<T> };
        } catch (error) {
            return FruitService.error("create", error);
        }
    }

    static async upsert<T extends FruitUpsertProps>(props: T): Promise<ResponseFormat<FruitUpsertResponse<T>>> {
        try {
            const fruit = await PrismaInstance.fruit.upsert(props);
            return { data: fruit as FruitUpsertResponse<T> };
        } catch (error) {
            return FruitService.error("upsert", error);
        }
    }

    static async update<T extends FruitUpdateProps>(props: T): Promise<ResponseFormat<FruitUpdateResponse<T>>> {
        try {
            const fruit = await PrismaInstance.fruit.update(props);
            return { data: fruit as FruitUpdateResponse<T> };
        } catch (error) {
            return FruitService.error("update", error);
        }
    }

    static async delete<T extends FruitDeleteProps>(props: T): Promise<ResponseFormat<FruitDeleteResponse<T>>> {
        try {
            const fruit = await PrismaInstance.fruit.delete(props);
            return { data: fruit as FruitDeleteResponse<T> };
        } catch (error) {
            return FruitService.error("delete", error);
        }
    }

    // ========== Multiple mutations ========== //

    static async createMany(props: FruitCreateManyProps): Promise<ResponseFormat<FruitCreateManyResponse>> {
        try {
            const result = await PrismaInstance.fruit.createMany(props);
            return { data: result };
        } catch (error) {
            return FruitService.error("createMany", error);
        }
    }

    static async updateMany(props: FruitUpdateManyProps): Promise<ResponseFormat<FruitUpdateManyResponse>> {
        try {
            const result = await PrismaInstance.fruit.updateMany(props);
            return { data: result };
        } catch (error) {
            return FruitService.error("updateMany", error);
        }
    }

    static async deleteMany(props: FruitDeleteManyProps): Promise<ResponseFormat<FruitDeleteManyResponse>> {
        try {
            const result = await PrismaInstance.fruit.deleteMany(props);
            return { data: result };
        } catch (error) {
            return FruitService.error("deleteMany", error);
        }
    }

    // ========== Single queries ========== //

    static async findFirst<T extends FruitFindFirstProps>(props: T): Promise<ResponseFormat<FruitFindFirstResponse<T>>> {
        try {
            const fruit = await PrismaInstance.fruit.findFirst(props);
            return { data: fruit as FruitFindFirstResponse<T> };
        } catch (error) {
            return FruitService.error("findFirst", error);
        }
    }

    static async findUnique<T extends FruitFindUniqueProps>(props: T): Promise<ResponseFormat<FruitFindUniqueResponse<T>>> {
        try {
            const fruit = await PrismaInstance.fruit.findUnique(props);
            return { data: fruit as FruitFindUniqueResponse<T> };
        } catch (error) {
            return FruitService.error("findUnique", error);
        }
    }

    static async findMany<T extends FruitFindManyProps>(props: T): Promise<ResponseFormat<FruitFindManyResponse<T>>> {
        try {
            const fruitList = await PrismaInstance.fruit.findMany(props);
            return { data: fruitList as FruitFindManyResponse<T> };
        } catch (error) {
            return FruitService.error("findMany", error);
        }
    }

    // ========== Aggregate queries ========== //

    static async count(props: FruitCountProps): Promise<ResponseFormat<FruitCountResponse>> {
        try {
            const fruitAmount: FruitCount = await PrismaInstance.fruit.count(props);
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
