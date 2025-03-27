import PrismaInstance from "@lib/prisma";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { QuantityCount, CountQuantityProps, CountQuantityResponse, CreateQuantityProps, CreateQuantityResponse, DeleteQuantityProps, DeleteQuantityResponse, FindManyQuantityProps, FindManyQuantityResponse, FindUniqueQuantityProps, FindUniqueQuantityResponse, UpdateQuantityProps, UpdateQuantityResponse, UpsertQuantityProps, UpsertQuantityResponse, countQuantitySchema, createQuantitySchema, deleteQuantitySchema, selectQuantitySchema, selectManyQuantitySchema, updateQuantitySchema, upsertQuantitySchema } from "@services/types/QuantityType";
import { ResponseFormat } from "@utils/FetchV2";
import { ZodError } from "zod";

export default class QuantityService {
    static async create<T extends CreateQuantityProps>(props: T): Promise<ResponseFormat<CreateQuantityResponse<T>>> {
        try {
            const { data, include, omit, select } = createQuantitySchema.parse(props);

            const quantity = await PrismaInstance.quantity.create({
                data,
                ...(include && { include }),
                ...(omit && { omit }),
                ...(select && { select }),
            });

            return { data: quantity as CreateQuantityResponse<T> };
        } catch (error) {
            console.error("QuantityService -> Create -> " + (error as Error).message);
            if (process.env.NODE_ENV === "development") {
                if (error instanceof ZodError)
                    throw new Error("QuantityService -> Create -> Invalid Zod params -> " + error.message);
                if (error instanceof PrismaClientKnownRequestError)
                    throw new Error("QuantityService -> Create -> Prisma error -> " + error.message);
                throw new Error("QuantityService -> Create -> " + (error as Error).message);
            }
            // TODO: add logging
            return { error: "Unable to create quantity..." };
        }
    }

    static async upsert<T extends UpsertQuantityProps>(props: T): Promise<ResponseFormat<UpsertQuantityResponse<T>>> {
        try {
            const { create, update, where, include, omit, select } = upsertQuantitySchema.parse(props);

            const quantity = await PrismaInstance.quantity.upsert({
                create,
                update,
                where,
                ...(include && { include }),
                ...(omit && { omit }),
                ...(select && { select }),
            });

            return { data: quantity as UpsertQuantityResponse<T> };
        } catch (error) {
            console.error("QuantityService -> Upsert -> " + (error as Error).message);
            if (process.env.NODE_ENV === "development") {
                if (error instanceof ZodError)
                    throw new Error("QuantityService -> Upsert -> Invalid Zod params -> " + error.message);
                if (error instanceof PrismaClientKnownRequestError)
                    throw new Error("QuantityService -> Upsert -> Prisma error -> " + error.message);
                throw new Error("QuantityService -> Upsert -> " + (error as Error).message);
            }
            // TODO: add logging
            return { error: "Unable to upsert quantity..." };
        }
    }

    static async update<T extends UpdateQuantityProps>(props: T): Promise<ResponseFormat<UpdateQuantityResponse<T>>> {
        try {
            const { data, where, include, omit, select } = updateQuantitySchema.parse(props);

            const quantity = await PrismaInstance.quantity.update({
                data,
                where,
                ...(include && { include }),
                ...(omit && { omit }),
                ...(select && { select }),
            });

            return { data: quantity as UpdateQuantityResponse<T> };
        } catch (error) {
            console.error("QuantityService -> Update -> " + (error as Error).message);
            if (process.env.NODE_ENV === "development") {
                if (error instanceof ZodError)
                    throw new Error("QuantityService -> Update -> Invalid Zod params -> " + error.message);
                if (error instanceof PrismaClientKnownRequestError)
                    throw new Error("QuantityService -> Update -> Prisma error -> " + error.message);
                throw new Error("QuantityService -> Update -> " + (error as Error).message);
            }
            // TODO: add logging
            return { error: "Unable to update quantity..." };
        }
    }

    static async delete<T extends DeleteQuantityProps>(props: T): Promise<ResponseFormat<DeleteQuantityResponse<T>>> {
        try {
            const { where, include, omit, select } = deleteQuantitySchema.parse(props);

            const quantity = await PrismaInstance.quantity.delete({
                where,
                ...(include && { include }),
                ...(omit && { omit }),
                ...(select && { select }),
            });

            return { data: quantity as DeleteQuantityResponse<T> };
        } catch (error) {
            console.error("QuantityService -> Delete -> " + (error as Error).message);
            if (process.env.NODE_ENV === "development") {
                if (error instanceof ZodError)
                    throw new Error("QuantityService -> Delete -> Invalid Zod params -> " + error.message);
                if (error instanceof PrismaClientKnownRequestError)
                    throw new Error("QuantityService -> Delete -> Prisma error -> " + error.message);
                throw new Error("QuantityService -> Delete -> " + (error as Error).message);
            }
            // TODO: add logging
            return { error: "Unable to delete quantity..." };
        }
    }

    static async findUnique<T extends FindUniqueQuantityProps>(props: T): Promise<ResponseFormat<FindUniqueQuantityResponse<T>>> {
        try {
            const { where, include, omit, select } = selectQuantitySchema.parse(props);

            const quantity = await PrismaInstance.quantity.findUnique({
                where,
                ...(include && { include }),
                ...(omit && { omit }),
                ...(select && { select }),
            });

            return { data: quantity as FindUniqueQuantityResponse<T> };
        } catch (error) {
            console.error("QuantityService -> FindUnique -> " + (error as Error).message);
            if (process.env.NODE_ENV === "development") {
                if (error instanceof ZodError)
                    throw new Error("QuantityService -> FindUnique -> Invalid Zod params -> " + error.message);
                if (error instanceof PrismaClientKnownRequestError)
                    throw new Error("QuantityService -> FindUnique -> Prisma error -> " + error.message);
                throw new Error("QuantityService -> FindUnique -> " + (error as Error).message);
            }
            // TODO: add logging
            return { error: "Unable to find quantity..." };
        }
    }

    static async findMany<T extends FindManyQuantityProps>(props: T): Promise<ResponseFormat<FindManyQuantityResponse<T>>> {
        try {
            const {
                cursor,
                distinct,
                include,
                omit,
                orderBy,
                select,
                skip = 0,
                take = 10,
                where,
            } = selectManyQuantitySchema.parse(props);

            const quantityList = await PrismaInstance.quantity.findMany({
                ...(cursor && { cursor }),
                ...(distinct && { distinct }),
                ...(include && { include }),
                ...(omit && { omit }),
                ...(orderBy && { orderBy }),
                ...(select && { select }),
                ...(skip && { skip }),
                ...(take && { take }),
                ...(where && { where }),
            });

            return { data: quantityList as FindManyQuantityResponse<T> };
        } catch (error) {
            console.error("QuantityService -> FindMany -> " + (error as Error).message);
            if (process.env.NODE_ENV === "development") {
                if (error instanceof ZodError)
                    throw new Error("QuantityService -> FindMany -> Invalid Zod params -> " + error.message);
                if (error instanceof PrismaClientKnownRequestError)
                    throw new Error("QuantityService -> FindMany -> Prisma error -> " + error.message);
                throw new Error("QuantityService -> FindMany -> " + (error as Error).message);
            }
            // TODO: add logging
            return { error: "Unable to find quantitys..." };
        }
    }

    static async count(props: CountQuantityProps): Promise<ResponseFormat<CountQuantityResponse>> {
        try {
            const { cursor, orderBy, select, skip, take, where } = countQuantitySchema.parse(props);

            const quantityAmount: QuantityCount = await PrismaInstance.quantity.count({
                ...(cursor && { cursor }),
                ...(orderBy && { orderBy }),
                ...(select && { select }),
                ...(skip && { skip }),
                ...(take && { take }),
                ...(where && { where }),
            });

            return { data: quantityAmount };
        } catch (error) {
            console.error("QuantityService -> Count -> " + (error as Error).message);
            if (process.env.NODE_ENV === "development") {
                if (error instanceof ZodError)
                    throw new Error("QuantityService -> Count -> Invalid Zod params -> " + error.message);
                if (error instanceof PrismaClientKnownRequestError)
                    throw new Error("QuantityService -> Count -> Prisma error -> " + error.message);
                throw new Error("QuantityService -> Count -> " + (error as Error).message);
            }
            // TODO: add logging
            return { error: "Unable to count quantitys..." };
        }
    }
}
