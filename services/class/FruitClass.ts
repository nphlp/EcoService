import PrismaInstance from "@lib/prisma";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { FruitCount, CountFruitProps, CountFruitResponse, CreateManyFruitProps, CreateManyFruitResponse, CreateFruitProps, CreateFruitResponse, DeleteManyFruitProps, DeleteManyFruitResponse, DeleteFruitProps, DeleteFruitResponse, FindFirstFruitProps, FindFirstFruitResponse, FindManyFruitProps, FindManyFruitResponse, FindUniqueFruitProps, FindUniqueFruitResponse, UpdateManyFruitProps, UpdateManyFruitResponse, UpdateFruitProps, UpdateFruitResponse, UpsertFruitProps, UpsertFruitResponse, countFruitSchema, createManyFruitSchema, createFruitSchema, deleteManyFruitSchema, deleteFruitSchema, selectFirstFruitSchema, selectManyFruitSchema, selectUniqueFruitSchema, updateManyFruitSchema, updateFruitSchema, upsertFruitSchema } from "@services/types/FruitType";
import { ResponseFormat } from "@utils/FetchConfig";
import { ZodError } from "zod";

export default class FruitService {

    // ========== Single mutations ========== //

    static async create<T extends CreateFruitProps>(props: T): Promise<ResponseFormat<CreateFruitResponse<T>>> {
        try {
            const parsedProps = createFruitSchema.parse(props);
            const fruit = await PrismaInstance.fruit.create(parsedProps);
            return { data: fruit as CreateFruitResponse<T> };
        } catch (error) {
            return FruitService.error("create", error);
        }
    }

    static async upsert<T extends UpsertFruitProps>(props: T): Promise<ResponseFormat<UpsertFruitResponse<T>>> {
        try {
            const parsedProps = upsertFruitSchema.parse(props);
            const fruit = await PrismaInstance.fruit.upsert(parsedProps);
            return { data: fruit as UpsertFruitResponse<T> };
        } catch (error) {
            return FruitService.error("upsert", error);
        }
    }

    static async update<T extends UpdateFruitProps>(props: T): Promise<ResponseFormat<UpdateFruitResponse<T>>> {
        try {
            const parsedProps = updateFruitSchema.parse(props);
            const fruit = await PrismaInstance.fruit.update(parsedProps);
            return { data: fruit as UpdateFruitResponse<T> };
        } catch (error) {
            return FruitService.error("update", error);
        }
    }

    static async delete<T extends DeleteFruitProps>(props: T): Promise<ResponseFormat<DeleteFruitResponse<T>>> {
        try {
            const parsedProps = deleteFruitSchema.parse(props);
            const fruit = await PrismaInstance.fruit.delete(parsedProps);
            return { data: fruit as DeleteFruitResponse<T> };
        } catch (error) {
            return FruitService.error("delete", error);
        }
    }

    // ========== Multiple mutations ========== //

    static async createMany(props: CreateManyFruitProps): Promise<ResponseFormat<CreateManyFruitResponse>> {
        try {
            const parsedProps = createManyFruitSchema.parse(props);
            const result = await PrismaInstance.fruit.createMany(parsedProps);
            return { data: result };
        } catch (error) {
            return FruitService.error("createMany", error);
        }
    }

    static async updateMany(props: UpdateManyFruitProps): Promise<ResponseFormat<UpdateManyFruitResponse>> {
        try {
            const parsedProps = updateManyFruitSchema.parse(props);
            const result = await PrismaInstance.fruit.updateMany(parsedProps);
            return { data: result };
        } catch (error) {
            return FruitService.error("updateMany", error);
        }
    }

    static async deleteMany(props: DeleteManyFruitProps): Promise<ResponseFormat<DeleteManyFruitResponse>> {
        try {
            const parsedProps = deleteManyFruitSchema.parse(props);
            const result = await PrismaInstance.fruit.deleteMany(parsedProps);
            return { data: result };
        } catch (error) {
            return FruitService.error("deleteMany", error);
        }
    }

    // ========== Single queries ========== //

    static async findFirst<T extends FindFirstFruitProps>(props: T): Promise<ResponseFormat<FindFirstFruitResponse<T>>> {
        try {
            const parsedProps = selectFirstFruitSchema.parse(props);
            const fruit = await PrismaInstance.fruit.findFirst(parsedProps);
            return { data: fruit as FindFirstFruitResponse<T> };
        } catch (error) {
            return FruitService.error("findFirst", error);
        }
    }

    static async findUnique<T extends FindUniqueFruitProps>(props: T): Promise<ResponseFormat<FindUniqueFruitResponse<T>>> {
        try {
            const parsedProps = selectUniqueFruitSchema.parse(props);
            const fruit = await PrismaInstance.fruit.findUnique(parsedProps);
            return { data: fruit as FindUniqueFruitResponse<T> };
        } catch (error) {
            return FruitService.error("findUnique", error);
        }
    }

    static async findMany<T extends FindManyFruitProps>(props: T): Promise<ResponseFormat<FindManyFruitResponse<T>>> {
        try {
            const parsedProps = selectManyFruitSchema.parse(props);
            const { skip = 0, take = 10 } = parsedProps;
            const fruitList = await PrismaInstance.fruit.findMany({ skip, take, ...parsedProps });
            return { data: fruitList as FindManyFruitResponse<T> };
        } catch (error) {
            return FruitService.error("findMany", error);
        }
    }

    // ========== Aggregate queries ========== //

    static async count(props: CountFruitProps): Promise<ResponseFormat<CountFruitResponse>> {
        try {
            const parsedProps = countFruitSchema.parse(props);
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
