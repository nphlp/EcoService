import PrismaInstance from "@lib/prisma";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { AddressCount, AddressCountProps, AddressCountResponse, AddressCountSchema, AddressCreateManyProps, AddressCreateManyResponse, AddressCreateManySchema, AddressCreateProps, AddressCreateResponse, AddressCreateSchema, AddressDeleteManyProps, AddressDeleteManyResponse, AddressDeleteManySchema, AddressDeleteProps, AddressDeleteResponse, AddressDeleteSchema, AddressFindFirstProps, AddressFindFirstResponse, AddressFindFirstSchema, AddressFindManyProps, AddressFindManyResponse, AddressFindManySchema, AddressFindUniqueProps, AddressFindUniqueResponse, AddressFindUniqueSchema, AddressUpdateManyProps, AddressUpdateManyResponse, AddressUpdateManySchema, AddressUpdateProps, AddressUpdateResponse, AddressUpdateSchema, AddressUpsertProps, AddressUpsertResponse, AddressUpsertSchema } from "@services/types/AddressType";
import { ResponseFormat } from "@utils/FetchConfig";
import { ZodError } from "zod";

export default class AddressService {

    // ========== Single mutations ========== //

    static async create<T extends AddressCreateProps>(props: T): Promise<ResponseFormat<AddressCreateResponse<T>>> {
        try {
            const parsedProps = AddressCreateSchema.parse(props);
            const address = await PrismaInstance.address.create(parsedProps);
            return { data: address as AddressCreateResponse<T> };
        } catch (error) {
            return AddressService.error("create", error);
        }
    }

    static async upsert<T extends AddressUpsertProps>(props: T): Promise<ResponseFormat<AddressUpsertResponse<T>>> {
        try {
            const parsedProps = AddressUpsertSchema.parse(props);
            const address = await PrismaInstance.address.upsert(parsedProps);
            return { data: address as AddressUpsertResponse<T> };
        } catch (error) {
            return AddressService.error("upsert", error);
        }
    }

    static async update<T extends AddressUpdateProps>(props: T): Promise<ResponseFormat<AddressUpdateResponse<T>>> {
        try {
            const parsedProps = AddressUpdateSchema.parse(props);
            const address = await PrismaInstance.address.update(parsedProps);
            return { data: address as AddressUpdateResponse<T> };
        } catch (error) {
            return AddressService.error("update", error);
        }
    }

    static async delete<T extends AddressDeleteProps>(props: T): Promise<ResponseFormat<AddressDeleteResponse<T>>> {
        try {
            const parsedProps = AddressDeleteSchema.parse(props);
            const address = await PrismaInstance.address.delete(parsedProps);
            return { data: address as AddressDeleteResponse<T> };
        } catch (error) {
            return AddressService.error("delete", error);
        }
    }

    // ========== Multiple mutations ========== //

    static async createMany(props: AddressCreateManyProps): Promise<ResponseFormat<AddressCreateManyResponse>> {
        try {
            const parsedProps = AddressCreateManySchema.parse(props);
            const result = await PrismaInstance.address.createMany(parsedProps);
            return { data: result };
        } catch (error) {
            return AddressService.error("createMany", error);
        }
    }

    static async updateMany(props: AddressUpdateManyProps): Promise<ResponseFormat<AddressUpdateManyResponse>> {
        try {
            const parsedProps = AddressUpdateManySchema.parse(props);
            const result = await PrismaInstance.address.updateMany(parsedProps);
            return { data: result };
        } catch (error) {
            return AddressService.error("updateMany", error);
        }
    }

    static async deleteMany(props: AddressDeleteManyProps): Promise<ResponseFormat<AddressDeleteManyResponse>> {
        try {
            const parsedProps = AddressDeleteManySchema.parse(props);
            const result = await PrismaInstance.address.deleteMany(parsedProps);
            return { data: result };
        } catch (error) {
            return AddressService.error("deleteMany", error);
        }
    }

    // ========== Single queries ========== //

    static async findFirst<T extends AddressFindFirstProps>(props: T): Promise<ResponseFormat<AddressFindFirstResponse<T>>> {
        try {
            const parsedProps = AddressFindFirstSchema.parse(props);
            const address = await PrismaInstance.address.findFirst(parsedProps);
            return { data: address as AddressFindFirstResponse<T> };
        } catch (error) {
            return AddressService.error("findFirst", error);
        }
    }

    static async findUnique<T extends AddressFindUniqueProps>(props: T): Promise<ResponseFormat<AddressFindUniqueResponse<T>>> {
        try {
            const parsedProps = AddressFindUniqueSchema.parse(props);
            const address = await PrismaInstance.address.findUnique(parsedProps);
            return { data: address as AddressFindUniqueResponse<T> };
        } catch (error) {
            return AddressService.error("findUnique", error);
        }
    }

    static async findMany<T extends AddressFindManyProps>(props: T): Promise<ResponseFormat<AddressFindManyResponse<T>>> {
        try {
            const parsedProps = AddressFindManySchema.parse(props);
            const { skip = 0, take = 10 } = parsedProps;
            const addressList = await PrismaInstance.address.findMany({ skip, take, ...parsedProps });
            return { data: addressList as AddressFindManyResponse<T> };
        } catch (error) {
            return AddressService.error("findMany", error);
        }
    }

    // ========== Aggregate queries ========== //

    static async count(props: AddressCountProps): Promise<ResponseFormat<AddressCountResponse>> {
        try {
            const parsedProps = AddressCountSchema.parse(props);
            const addressAmount: AddressCount = await PrismaInstance.address.count(parsedProps);
            return { data: addressAmount };
        } catch (error) {
            return AddressService.error("count", error);
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
