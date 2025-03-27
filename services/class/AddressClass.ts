import PrismaInstance from "@lib/prisma";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { AddressCount, CountAddressProps, CountAddressResponse, CreateAddressProps, CreateAddressResponse, DeleteAddressProps, DeleteAddressResponse, FindManyAddressProps, FindManyAddressResponse, FindUniqueAddressProps, FindUniqueAddressResponse, UpdateAddressProps, UpdateAddressResponse, UpsertAddressProps, UpsertAddressResponse, countAddressSchema, createAddressSchema, deleteAddressSchema, selectAddressSchema, selectManyAddressSchema, updateAddressSchema, upsertAddressSchema } from "@services/types/AddressType";
import { ResponseFormat } from "@utils/FetchV2";
import { ZodError } from "zod";

export default class AddressService {
    static async create<T extends CreateAddressProps>(props: T): Promise<ResponseFormat<CreateAddressResponse<T>>> {
        try {
            const { data, include, omit, select } = createAddressSchema.parse(props);

            const address = await PrismaInstance.address.create({
                data,
                ...(include && { include }),
                ...(omit && { omit }),
                ...(select && { select }),
            });

            return { data: address as CreateAddressResponse<T> };
        } catch (error) {
            console.error("AddressService -> Create -> " + (error as Error).message);
            if (process.env.NODE_ENV === "development") {
                if (error instanceof ZodError)
                    throw new Error("AddressService -> Create -> Invalid Zod params -> " + error.message);
                if (error instanceof PrismaClientKnownRequestError)
                    throw new Error("AddressService -> Create -> Prisma error -> " + error.message);
                throw new Error("AddressService -> Create -> " + (error as Error).message);
            }
            // TODO: add logging
            return { error: "Unable to create address..." };
        }
    }

    static async upsert<T extends UpsertAddressProps>(props: T): Promise<ResponseFormat<UpsertAddressResponse<T>>> {
        try {
            const { create, update, where, include, omit, select } = upsertAddressSchema.parse(props);

            const address = await PrismaInstance.address.upsert({
                create,
                update,
                where,
                ...(include && { include }),
                ...(omit && { omit }),
                ...(select && { select }),
            });

            return { data: address as UpsertAddressResponse<T> };
        } catch (error) {
            console.error("AddressService -> Upsert -> " + (error as Error).message);
            if (process.env.NODE_ENV === "development") {
                if (error instanceof ZodError)
                    throw new Error("AddressService -> Upsert -> Invalid Zod params -> " + error.message);
                if (error instanceof PrismaClientKnownRequestError)
                    throw new Error("AddressService -> Upsert -> Prisma error -> " + error.message);
                throw new Error("AddressService -> Upsert -> " + (error as Error).message);
            }
            // TODO: add logging
            return { error: "Unable to upsert address..." };
        }
    }

    static async update<T extends UpdateAddressProps>(props: T): Promise<ResponseFormat<UpdateAddressResponse<T>>> {
        try {
            const { data, where, include, omit, select } = updateAddressSchema.parse(props);

            const address = await PrismaInstance.address.update({
                data,
                where,
                ...(include && { include }),
                ...(omit && { omit }),
                ...(select && { select }),
            });

            return { data: address as UpdateAddressResponse<T> };
        } catch (error) {
            console.error("AddressService -> Update -> " + (error as Error).message);
            if (process.env.NODE_ENV === "development") {
                if (error instanceof ZodError)
                    throw new Error("AddressService -> Update -> Invalid Zod params -> " + error.message);
                if (error instanceof PrismaClientKnownRequestError)
                    throw new Error("AddressService -> Update -> Prisma error -> " + error.message);
                throw new Error("AddressService -> Update -> " + (error as Error).message);
            }
            // TODO: add logging
            return { error: "Unable to update address..." };
        }
    }

    static async delete<T extends DeleteAddressProps>(props: T): Promise<ResponseFormat<DeleteAddressResponse<T>>> {
        try {
            const { where, include, omit, select } = deleteAddressSchema.parse(props);

            const address = await PrismaInstance.address.delete({
                where,
                ...(include && { include }),
                ...(omit && { omit }),
                ...(select && { select }),
            });

            return { data: address as DeleteAddressResponse<T> };
        } catch (error) {
            console.error("AddressService -> Delete -> " + (error as Error).message);
            if (process.env.NODE_ENV === "development") {
                if (error instanceof ZodError)
                    throw new Error("AddressService -> Delete -> Invalid Zod params -> " + error.message);
                if (error instanceof PrismaClientKnownRequestError)
                    throw new Error("AddressService -> Delete -> Prisma error -> " + error.message);
                throw new Error("AddressService -> Delete -> " + (error as Error).message);
            }
            // TODO: add logging
            return { error: "Unable to delete address..." };
        }
    }

    static async findUnique<T extends FindUniqueAddressProps>(props: T): Promise<ResponseFormat<FindUniqueAddressResponse<T>>> {
        try {
            const { where, include, omit, select } = selectAddressSchema.parse(props);

            const address = await PrismaInstance.address.findUnique({
                where,
                ...(include && { include }),
                ...(omit && { omit }),
                ...(select && { select }),
            });

            return { data: address as FindUniqueAddressResponse<T> };
        } catch (error) {
            console.error("AddressService -> FindUnique -> " + (error as Error).message);
            if (process.env.NODE_ENV === "development") {
                if (error instanceof ZodError)
                    throw new Error("AddressService -> FindUnique -> Invalid Zod params -> " + error.message);
                if (error instanceof PrismaClientKnownRequestError)
                    throw new Error("AddressService -> FindUnique -> Prisma error -> " + error.message);
                throw new Error("AddressService -> FindUnique -> " + (error as Error).message);
            }
            // TODO: add logging
            return { error: "Unable to find address..." };
        }
    }

    static async findMany<T extends FindManyAddressProps>(props: T): Promise<ResponseFormat<FindManyAddressResponse<T>>> {
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
            } = selectManyAddressSchema.parse(props);

            const addressList = await PrismaInstance.address.findMany({
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

            return { data: addressList as FindManyAddressResponse<T> };
        } catch (error) {
            console.error("AddressService -> FindMany -> " + (error as Error).message);
            if (process.env.NODE_ENV === "development") {
                if (error instanceof ZodError)
                    throw new Error("AddressService -> FindMany -> Invalid Zod params -> " + error.message);
                if (error instanceof PrismaClientKnownRequestError)
                    throw new Error("AddressService -> FindMany -> Prisma error -> " + error.message);
                throw new Error("AddressService -> FindMany -> " + (error as Error).message);
            }
            // TODO: add logging
            return { error: "Unable to find addresss..." };
        }
    }

    static async count(props: CountAddressProps): Promise<ResponseFormat<CountAddressResponse>> {
        try {
            const { cursor, orderBy, select, skip, take, where } = countAddressSchema.parse(props);

            const addressAmount: AddressCount = await PrismaInstance.address.count({
                ...(cursor && { cursor }),
                ...(orderBy && { orderBy }),
                ...(select && { select }),
                ...(skip && { skip }),
                ...(take && { take }),
                ...(where && { where }),
            });

            return { data: addressAmount };
        } catch (error) {
            console.error("AddressService -> Count -> " + (error as Error).message);
            if (process.env.NODE_ENV === "development") {
                if (error instanceof ZodError)
                    throw new Error("AddressService -> Count -> Invalid Zod params -> " + error.message);
                if (error instanceof PrismaClientKnownRequestError)
                    throw new Error("AddressService -> Count -> Prisma error -> " + error.message);
                throw new Error("AddressService -> Count -> " + (error as Error).message);
            }
            // TODO: add logging
            return { error: "Unable to count addresss..." };
        }
    }
}
