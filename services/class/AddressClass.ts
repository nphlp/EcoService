import PrismaInstance from "@lib/prisma";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { AddressCount, AddressCountProps, AddressCountResponse, AddressCreateManyProps, AddressCreateManyResponse, AddressCreateProps, AddressCreateResponse, AddressDeleteManyProps, AddressDeleteManyResponse, AddressDeleteProps, AddressDeleteResponse, AddressFindFirstProps, AddressFindFirstResponse, AddressFindManyProps, AddressFindManyResponse, AddressFindUniqueProps, AddressFindUniqueResponse, AddressUpdateManyProps, AddressUpdateManyResponse, AddressUpdateProps, AddressUpdateResponse, AddressUpsertProps, AddressUpsertResponse } from "@services/types/AddressType";
import { ResponseFormat } from "@utils/FetchConfig";

export default class AddressService {

    // ========== Single mutations ========== //

    static async create<T extends AddressCreateProps>(props: T): Promise<ResponseFormat<AddressCreateResponse<T>>> {
        try {
            const address = await PrismaInstance.address.create(props);
            return { data: address as AddressCreateResponse<T> };
        } catch (error) {
            return AddressService.error("create", error);
        }
    }

    static async upsert<T extends AddressUpsertProps>(props: T): Promise<ResponseFormat<AddressUpsertResponse<T>>> {
        try {
            const address = await PrismaInstance.address.upsert(props);
            return { data: address as AddressUpsertResponse<T> };
        } catch (error) {
            return AddressService.error("upsert", error);
        }
    }

    static async update<T extends AddressUpdateProps>(props: T): Promise<ResponseFormat<AddressUpdateResponse<T>>> {
        try {
            const address = await PrismaInstance.address.update(props);
            return { data: address as AddressUpdateResponse<T> };
        } catch (error) {
            return AddressService.error("update", error);
        }
    }

    static async delete<T extends AddressDeleteProps>(props: T): Promise<ResponseFormat<AddressDeleteResponse<T>>> {
        try {
            const address = await PrismaInstance.address.delete(props);
            return { data: address as AddressDeleteResponse<T> };
        } catch (error) {
            return AddressService.error("delete", error);
        }
    }

    // ========== Multiple mutations ========== //

    static async createMany(props: AddressCreateManyProps): Promise<ResponseFormat<AddressCreateManyResponse>> {
        try {
            const result = await PrismaInstance.address.createMany(props);
            return { data: result };
        } catch (error) {
            return AddressService.error("createMany", error);
        }
    }

    static async updateMany(props: AddressUpdateManyProps): Promise<ResponseFormat<AddressUpdateManyResponse>> {
        try {
            const result = await PrismaInstance.address.updateMany(props);
            return { data: result };
        } catch (error) {
            return AddressService.error("updateMany", error);
        }
    }

    static async deleteMany(props: AddressDeleteManyProps): Promise<ResponseFormat<AddressDeleteManyResponse>> {
        try {
            const result = await PrismaInstance.address.deleteMany(props);
            return { data: result };
        } catch (error) {
            return AddressService.error("deleteMany", error);
        }
    }

    // ========== Single queries ========== //

    static async findFirst<T extends AddressFindFirstProps>(props: T): Promise<ResponseFormat<AddressFindFirstResponse<T>>> {
        try {
            const address = await PrismaInstance.address.findFirst(props);
            return { data: address as AddressFindFirstResponse<T> };
        } catch (error) {
            return AddressService.error("findFirst", error);
        }
    }

    static async findUnique<T extends AddressFindUniqueProps>(props: T): Promise<ResponseFormat<AddressFindUniqueResponse<T>>> {
        try {
            const address = await PrismaInstance.address.findUnique(props);
            return { data: address as AddressFindUniqueResponse<T> };
        } catch (error) {
            return AddressService.error("findUnique", error);
        }
    }

    static async findMany<T extends AddressFindManyProps>(props: T): Promise<ResponseFormat<AddressFindManyResponse<T>>> {
        try {
            const addressList = await PrismaInstance.address.findMany(props);
            return { data: addressList as AddressFindManyResponse<T> };
        } catch (error) {
            return AddressService.error("findMany", error);
        }
    }

    // ========== Aggregate queries ========== //

    static async count(props: AddressCountProps): Promise<ResponseFormat<AddressCountResponse>> {
        try {
            const addressAmount: AddressCount = await PrismaInstance.address.count(props);
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
