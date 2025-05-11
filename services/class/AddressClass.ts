import PrismaInstance from "@lib/prisma";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { AddressCount, CountAddressProps, CountAddressResponse, CreateManyAddressProps, CreateManyAddressResponse, CreateAddressProps, CreateAddressResponse, DeleteManyAddressProps, DeleteManyAddressResponse, DeleteAddressProps, DeleteAddressResponse, FindFirstAddressProps, FindFirstAddressResponse, FindManyAddressProps, FindManyAddressResponse, FindUniqueAddressProps, FindUniqueAddressResponse, UpdateManyAddressProps, UpdateManyAddressResponse, UpdateAddressProps, UpdateAddressResponse, UpsertAddressProps, UpsertAddressResponse, countAddressSchema, createManyAddressSchema, createAddressSchema, deleteManyAddressSchema, deleteAddressSchema, selectFirstAddressSchema, selectManyAddressSchema, selectUniqueAddressSchema, updateManyAddressSchema, updateAddressSchema, upsertAddressSchema } from "@services/types/AddressType";
import { ResponseFormat } from "@utils/FetchConfig";
import { ZodError } from "zod";

export default class AddressService {

    // ========== Single mutations ========== //

    static async create<T extends CreateAddressProps>(props: T): Promise<ResponseFormat<CreateAddressResponse<T>>> {
        try {
            const parsedProps = createAddressSchema.parse(props);
            const address = await PrismaInstance.address.create(parsedProps);
            return { data: address as CreateAddressResponse<T> };
        } catch (error) {
            return AddressService.error("create", error);
        }
    }

    static async upsert<T extends UpsertAddressProps>(props: T): Promise<ResponseFormat<UpsertAddressResponse<T>>> {
        try {
            const parsedProps = upsertAddressSchema.parse(props);
            const address = await PrismaInstance.address.upsert(parsedProps);
            return { data: address as UpsertAddressResponse<T> };
        } catch (error) {
            return AddressService.error("upsert", error);
        }
    }

    static async update<T extends UpdateAddressProps>(props: T): Promise<ResponseFormat<UpdateAddressResponse<T>>> {
        try {
            const parsedProps = updateAddressSchema.parse(props);
            const address = await PrismaInstance.address.update(parsedProps);
            return { data: address as UpdateAddressResponse<T> };
        } catch (error) {
            return AddressService.error("update", error);
        }
    }

    static async delete<T extends DeleteAddressProps>(props: T): Promise<ResponseFormat<DeleteAddressResponse<T>>> {
        try {
            const parsedProps = deleteAddressSchema.parse(props);
            const address = await PrismaInstance.address.delete(parsedProps);
            return { data: address as DeleteAddressResponse<T> };
        } catch (error) {
            return AddressService.error("delete", error);
        }
    }

    // ========== Multiple mutations ========== //

    static async createMany(props: CreateManyAddressProps): Promise<ResponseFormat<CreateManyAddressResponse>> {
        try {
            const parsedProps = createManyAddressSchema.parse(props);
            const result = await PrismaInstance.address.createMany(parsedProps);
            return { data: result };
        } catch (error) {
            return AddressService.error("createMany", error);
        }
    }

    static async updateMany(props: UpdateManyAddressProps): Promise<ResponseFormat<UpdateManyAddressResponse>> {
        try {
            const parsedProps = updateManyAddressSchema.parse(props);
            const result = await PrismaInstance.address.updateMany(parsedProps);
            return { data: result };
        } catch (error) {
            return AddressService.error("updateMany", error);
        }
    }

    static async deleteMany(props: DeleteManyAddressProps): Promise<ResponseFormat<DeleteManyAddressResponse>> {
        try {
            const parsedProps = deleteManyAddressSchema.parse(props);
            const result = await PrismaInstance.address.deleteMany(parsedProps);
            return { data: result };
        } catch (error) {
            return AddressService.error("deleteMany", error);
        }
    }

    // ========== Single queries ========== //

    static async findFirst<T extends FindFirstAddressProps>(props: T): Promise<ResponseFormat<FindFirstAddressResponse<T>>> {
        try {
            const parsedProps = selectFirstAddressSchema.parse(props);
            const address = await PrismaInstance.address.findFirst(parsedProps);
            return { data: address as FindFirstAddressResponse<T> };
        } catch (error) {
            return AddressService.error("findFirst", error);
        }
    }

    static async findUnique<T extends FindUniqueAddressProps>(props: T): Promise<ResponseFormat<FindUniqueAddressResponse<T>>> {
        try {
            const parsedProps = selectUniqueAddressSchema.parse(props);
            const address = await PrismaInstance.address.findUnique(parsedProps);
            return { data: address as FindUniqueAddressResponse<T> };
        } catch (error) {
            return AddressService.error("findUnique", error);
        }
    }

    static async findMany<T extends FindManyAddressProps>(props: T): Promise<ResponseFormat<FindManyAddressResponse<T>>> {
        try {
            const parsedProps = selectManyAddressSchema.parse(props);
            const { skip = 0, take = 10 } = parsedProps;
            const addressList = await PrismaInstance.address.findMany({ skip, take, ...parsedProps });
            return { data: addressList as FindManyAddressResponse<T> };
        } catch (error) {
            return AddressService.error("findMany", error);
        }
    }

    // ========== Aggregate queries ========== //

    static async count(props: CountAddressProps): Promise<ResponseFormat<CountAddressResponse>> {
        try {
            const parsedProps = countAddressSchema.parse(props);
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
