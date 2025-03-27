import PrismaInstance from "@lib/prisma";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { FruitCount, CountFruitProps, CountFruitResponse, CreateFruitProps, CreateFruitResponse, DeleteFruitProps, DeleteFruitResponse, FindManyFruitProps, FindManyFruitResponse, FindUniqueFruitProps, FindUniqueFruitResponse, UpdateFruitProps, UpdateFruitResponse, UpsertFruitProps, UpsertFruitResponse, countFruitSchema, createFruitSchema, deleteFruitSchema, selectFruitSchema, selectManyFruitSchema, updateFruitSchema, upsertFruitSchema } from "@services/types/FruitType";
import { ResponseFormat } from "@utils/FetchConfig";
import { ZodError } from "zod";

export default class FruitService {
    static async create<T extends CreateFruitProps>(props: T): Promise<ResponseFormat<CreateFruitResponse<T>>> {
        try {
            const { data, omit, select } = createFruitSchema.parse(props);

            const fruit = await PrismaInstance.fruit.create({
                data,
                
                ...(omit && { omit }),
                ...(select && { select }),
            });

            return { data: fruit as CreateFruitResponse<T> };
        } catch (error) {
            console.error("FruitService -> Create -> " + (error as Error).message);
            if (process.env.NODE_ENV === "development") {
                if (error instanceof ZodError)
                    throw new Error("FruitService -> Create -> Invalid Zod params -> " + error.message);
                if (error instanceof PrismaClientKnownRequestError)
                    throw new Error("FruitService -> Create -> Prisma error -> " + error.message);
                throw new Error("FruitService -> Create -> " + (error as Error).message);
            }
            // TODO: add logging
            return { error: "Unable to create fruit..." };
        }
    }

    static async upsert<T extends UpsertFruitProps>(props: T): Promise<ResponseFormat<UpsertFruitResponse<T>>> {
        try {
            const { create, update, where, omit, select } = upsertFruitSchema.parse(props);

            const fruit = await PrismaInstance.fruit.upsert({
                create,
                update,
                where,
                
                ...(omit && { omit }),
                ...(select && { select }),
            });

            return { data: fruit as UpsertFruitResponse<T> };
        } catch (error) {
            console.error("FruitService -> Upsert -> " + (error as Error).message);
            if (process.env.NODE_ENV === "development") {
                if (error instanceof ZodError)
                    throw new Error("FruitService -> Upsert -> Invalid Zod params -> " + error.message);
                if (error instanceof PrismaClientKnownRequestError)
                    throw new Error("FruitService -> Upsert -> Prisma error -> " + error.message);
                throw new Error("FruitService -> Upsert -> " + (error as Error).message);
            }
            // TODO: add logging
            return { error: "Unable to upsert fruit..." };
        }
    }

    static async update<T extends UpdateFruitProps>(props: T): Promise<ResponseFormat<UpdateFruitResponse<T>>> {
        try {
            const { data, where, omit, select } = updateFruitSchema.parse(props);

            const fruit = await PrismaInstance.fruit.update({
                data,
                where,
                
                ...(omit && { omit }),
                ...(select && { select }),
            });

            return { data: fruit as UpdateFruitResponse<T> };
        } catch (error) {
            console.error("FruitService -> Update -> " + (error as Error).message);
            if (process.env.NODE_ENV === "development") {
                if (error instanceof ZodError)
                    throw new Error("FruitService -> Update -> Invalid Zod params -> " + error.message);
                if (error instanceof PrismaClientKnownRequestError)
                    throw new Error("FruitService -> Update -> Prisma error -> " + error.message);
                throw new Error("FruitService -> Update -> " + (error as Error).message);
            }
            // TODO: add logging
            return { error: "Unable to update fruit..." };
        }
    }

    static async delete<T extends DeleteFruitProps>(props: T): Promise<ResponseFormat<DeleteFruitResponse<T>>> {
        try {
            const { where, omit, select } = deleteFruitSchema.parse(props);

            const fruit = await PrismaInstance.fruit.delete({
                where,
                
                ...(omit && { omit }),
                ...(select && { select }),
            });

            return { data: fruit as DeleteFruitResponse<T> };
        } catch (error) {
            console.error("FruitService -> Delete -> " + (error as Error).message);
            if (process.env.NODE_ENV === "development") {
                if (error instanceof ZodError)
                    throw new Error("FruitService -> Delete -> Invalid Zod params -> " + error.message);
                if (error instanceof PrismaClientKnownRequestError)
                    throw new Error("FruitService -> Delete -> Prisma error -> " + error.message);
                throw new Error("FruitService -> Delete -> " + (error as Error).message);
            }
            // TODO: add logging
            return { error: "Unable to delete fruit..." };
        }
    }

    static async findUnique<T extends FindUniqueFruitProps>(props: T): Promise<ResponseFormat<FindUniqueFruitResponse<T>>> {
        try {
            const { where, omit, select } = selectFruitSchema.parse(props);

            const fruit = await PrismaInstance.fruit.findUnique({
                where,
                
                ...(omit && { omit }),
                ...(select && { select }),
            });

            return { data: fruit as FindUniqueFruitResponse<T> };
        } catch (error) {
            console.error("FruitService -> FindUnique -> " + (error as Error).message);
            if (process.env.NODE_ENV === "development") {
                if (error instanceof ZodError)
                    throw new Error("FruitService -> FindUnique -> Invalid Zod params -> " + error.message);
                if (error instanceof PrismaClientKnownRequestError)
                    throw new Error("FruitService -> FindUnique -> Prisma error -> " + error.message);
                throw new Error("FruitService -> FindUnique -> " + (error as Error).message);
            }
            // TODO: add logging
            return { error: "Unable to find fruit..." };
        }
    }

    static async findMany<T extends FindManyFruitProps>(props: T): Promise<ResponseFormat<FindManyFruitResponse<T>>> {
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
            } = selectManyFruitSchema.parse(props);

            const fruitList = await PrismaInstance.fruit.findMany({
                ...(cursor && { cursor }),
                ...(distinct && { distinct }),
                
                ...(omit && { omit }),
                ...(orderBy && { orderBy }),
                ...(select && { select }),
                ...(skip && { skip }),
                ...(take && { take }),
                ...(where && { where }),
            });

            return { data: fruitList as FindManyFruitResponse<T> };
        } catch (error) {
            console.error("FruitService -> FindMany -> " + (error as Error).message);
            if (process.env.NODE_ENV === "development") {
                if (error instanceof ZodError)
                    throw new Error("FruitService -> FindMany -> Invalid Zod params -> " + error.message);
                if (error instanceof PrismaClientKnownRequestError)
                    throw new Error("FruitService -> FindMany -> Prisma error -> " + error.message);
                throw new Error("FruitService -> FindMany -> " + (error as Error).message);
            }
            // TODO: add logging
            return { error: "Unable to find fruits..." };
        }
    }

    static async count(props: CountFruitProps): Promise<ResponseFormat<CountFruitResponse>> {
        try {
            const { cursor, orderBy, select, skip, take, where } = countFruitSchema.parse(props);

            const fruitAmount: FruitCount = await PrismaInstance.fruit.count({
                ...(cursor && { cursor }),
                ...(orderBy && { orderBy }),
                ...(select && { select }),
                ...(skip && { skip }),
                ...(take && { take }),
                ...(where && { where }),
            });

            return { data: fruitAmount };
        } catch (error) {
            console.error("FruitService -> Count -> " + (error as Error).message);
            if (process.env.NODE_ENV === "development") {
                if (error instanceof ZodError)
                    throw new Error("FruitService -> Count -> Invalid Zod params -> " + error.message);
                if (error instanceof PrismaClientKnownRequestError)
                    throw new Error("FruitService -> Count -> Prisma error -> " + error.message);
                throw new Error("FruitService -> Count -> " + (error as Error).message);
            }
            // TODO: add logging
            return { error: "Unable to count fruits..." };
        }
    }
}
