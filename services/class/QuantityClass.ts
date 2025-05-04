import PrismaInstance from "@lib/prisma";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { QuantityCount, CountQuantityProps, CountQuantityResponse, CreateQuantityProps, CreateQuantityResponse, DeleteQuantityProps, DeleteQuantityResponse, FindManyQuantityProps, FindManyQuantityResponse, FindUniqueQuantityProps, FindUniqueQuantityResponse, UpdateQuantityProps, UpdateQuantityResponse, UpsertQuantityProps, UpsertQuantityResponse, countQuantitySchema, createQuantitySchema, deleteQuantitySchema, selectFirstQuantitySchema, selectManyQuantitySchema, selectUniqueQuantitySchema, updateQuantitySchema, upsertQuantitySchema, FindFirstQuantityProps, FindFirstQuantityResponse } from "@services/types/QuantityType";
import { ResponseFormat } from "@utils/FetchConfig";
import { ZodError } from "zod";

export default class QuantityService {
    static async create<T extends CreateQuantityProps>(props: T): Promise<ResponseFormat<CreateQuantityResponse<T>>> {
        try {
            const parsedProps = createQuantitySchema.parse(props);
            const quantity = await PrismaInstance.quantity.create(parsedProps);
            return { data: quantity as CreateQuantityResponse<T> };
        } catch (error) {
            return QuantityService.error("create", error);
        }
    }

    static async upsert<T extends UpsertQuantityProps>(props: T): Promise<ResponseFormat<UpsertQuantityResponse<T>>> {
        try {
            const parsedProps = upsertQuantitySchema.parse(props);
            const quantity = await PrismaInstance.quantity.upsert(parsedProps);
            return { data: quantity as UpsertQuantityResponse<T> };
        } catch (error) {
            return QuantityService.error("upsert", error);
        }
    }

    static async update<T extends UpdateQuantityProps>(props: T): Promise<ResponseFormat<UpdateQuantityResponse<T>>> {
        try {
            const parsedProps = updateQuantitySchema.parse(props);
            const quantity = await PrismaInstance.quantity.update(parsedProps);
            return { data: quantity as UpdateQuantityResponse<T> };
        } catch (error) {
            return QuantityService.error("update", error);
        }
    }

    static async delete<T extends DeleteQuantityProps>(props: T): Promise<ResponseFormat<DeleteQuantityResponse<T>>> {
        try {
            const parsedProps = deleteQuantitySchema.parse(props);
            const quantity = await PrismaInstance.quantity.delete(parsedProps);
            return { data: quantity as DeleteQuantityResponse<T> };
        } catch (error) {
            return QuantityService.error("delete", error);
        }
    }

    static async findFirst<T extends FindFirstQuantityProps>(props: T): Promise<ResponseFormat<FindFirstQuantityResponse<T>>> {
        try {
            const parsedProps = selectFirstQuantitySchema.parse(props);
            const quantity = await PrismaInstance.quantity.findFirst(parsedProps);
            return { data: quantity as FindFirstQuantityResponse<T> };
        } catch (error) {
            return QuantityService.error("findFirst", error);
        }
    }

    static async findUnique<T extends FindUniqueQuantityProps>(props: T): Promise<ResponseFormat<FindUniqueQuantityResponse<T>>> {
        try {
            const parsedProps = selectUniqueQuantitySchema.parse(props);
            const quantity = await PrismaInstance.quantity.findUnique(parsedProps);
            return { data: quantity as FindUniqueQuantityResponse<T> };
        } catch (error) {
            return QuantityService.error("findUnique", error);
        }
    }

    static async findMany<T extends FindManyQuantityProps>(props: T): Promise<ResponseFormat<FindManyQuantityResponse<T>>> {
        try {
            const parsedProps = selectManyQuantitySchema.parse(props);
            const { skip = 0, take = 10 } = parsedProps;
            const quantityList = await PrismaInstance.quantity.findMany({ skip, take, ...parsedProps });
            return { data: quantityList as FindManyQuantityResponse<T> };
        } catch (error) {
            return QuantityService.error("findMany", error);
        }
    }

    static async count(props: CountQuantityProps): Promise<ResponseFormat<CountQuantityResponse>> {
        try {
            const parsedProps = countQuantitySchema.parse(props);
            const quantityAmount: QuantityCount = await PrismaInstance.quantity.count(parsedProps);
            return { data: quantityAmount };
        } catch (error) {
            return QuantityService.error("count", error);
        }
    }

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
