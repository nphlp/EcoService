import PrismaInstance from "@lib/prisma";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { DiyCount, CountDiyProps, CountDiyResponse, CreateManyDiyProps, CreateManyDiyResponse, CreateDiyProps, CreateDiyResponse, DeleteManyDiyProps, DeleteManyDiyResponse, DeleteDiyProps, DeleteDiyResponse, FindFirstDiyProps, FindFirstDiyResponse, FindManyDiyProps, FindManyDiyResponse, FindUniqueDiyProps, FindUniqueDiyResponse, UpdateManyDiyProps, UpdateManyDiyResponse, UpdateDiyProps, UpdateDiyResponse, UpsertDiyProps, UpsertDiyResponse, countDiySchema, createManyDiySchema, createDiySchema, deleteManyDiySchema, deleteDiySchema, selectFirstDiySchema, selectManyDiySchema, selectUniqueDiySchema, updateManyDiySchema, updateDiySchema, upsertDiySchema } from "@services/types/DiyType";
import { ResponseFormat } from "@utils/FetchConfig";
import { ZodError } from "zod";

export default class DiyService {

    // ========== Single mutations ========== //

    static async create<T extends CreateDiyProps>(props: T): Promise<ResponseFormat<CreateDiyResponse<T>>> {
        try {
            const parsedProps = createDiySchema.parse(props);
            const diy = await PrismaInstance.diy.create(parsedProps);
            return { data: diy as CreateDiyResponse<T> };
        } catch (error) {
            return DiyService.error("create", error);
        }
    }

    static async upsert<T extends UpsertDiyProps>(props: T): Promise<ResponseFormat<UpsertDiyResponse<T>>> {
        try {
            const parsedProps = upsertDiySchema.parse(props);
            const diy = await PrismaInstance.diy.upsert(parsedProps);
            return { data: diy as UpsertDiyResponse<T> };
        } catch (error) {
            return DiyService.error("upsert", error);
        }
    }

    static async update<T extends UpdateDiyProps>(props: T): Promise<ResponseFormat<UpdateDiyResponse<T>>> {
        try {
            const parsedProps = updateDiySchema.parse(props);
            const diy = await PrismaInstance.diy.update(parsedProps);
            return { data: diy as UpdateDiyResponse<T> };
        } catch (error) {
            return DiyService.error("update", error);
        }
    }

    static async delete<T extends DeleteDiyProps>(props: T): Promise<ResponseFormat<DeleteDiyResponse<T>>> {
        try {
            const parsedProps = deleteDiySchema.parse(props);
            const diy = await PrismaInstance.diy.delete(parsedProps);
            return { data: diy as DeleteDiyResponse<T> };
        } catch (error) {
            return DiyService.error("delete", error);
        }
    }

    // ========== Multiple mutations ========== //

    static async createMany(props: CreateManyDiyProps): Promise<ResponseFormat<CreateManyDiyResponse>> {
        try {
            const parsedProps = createManyDiySchema.parse(props);
            const result = await PrismaInstance.diy.createMany(parsedProps);
            return { data: result };
        } catch (error) {
            return DiyService.error("createMany", error);
        }
    }

    static async updateMany(props: UpdateManyDiyProps): Promise<ResponseFormat<UpdateManyDiyResponse>> {
        try {
            const parsedProps = updateManyDiySchema.parse(props);
            const result = await PrismaInstance.diy.updateMany(parsedProps);
            return { data: result };
        } catch (error) {
            return DiyService.error("updateMany", error);
        }
    }

    static async deleteMany(props: DeleteManyDiyProps): Promise<ResponseFormat<DeleteManyDiyResponse>> {
        try {
            const parsedProps = deleteManyDiySchema.parse(props);
            const result = await PrismaInstance.diy.deleteMany(parsedProps);
            return { data: result };
        } catch (error) {
            return DiyService.error("deleteMany", error);
        }
    }

    // ========== Single queries ========== //

    static async findFirst<T extends FindFirstDiyProps>(props: T): Promise<ResponseFormat<FindFirstDiyResponse<T>>> {
        try {
            const parsedProps = selectFirstDiySchema.parse(props);
            const diy = await PrismaInstance.diy.findFirst(parsedProps);
            return { data: diy as FindFirstDiyResponse<T> };
        } catch (error) {
            return DiyService.error("findFirst", error);
        }
    }

    static async findUnique<T extends FindUniqueDiyProps>(props: T): Promise<ResponseFormat<FindUniqueDiyResponse<T>>> {
        try {
            const parsedProps = selectUniqueDiySchema.parse(props);
            const diy = await PrismaInstance.diy.findUnique(parsedProps);
            return { data: diy as FindUniqueDiyResponse<T> };
        } catch (error) {
            return DiyService.error("findUnique", error);
        }
    }

    static async findMany<T extends FindManyDiyProps>(props: T): Promise<ResponseFormat<FindManyDiyResponse<T>>> {
        try {
            const parsedProps = selectManyDiySchema.parse(props);
            const { skip = 0, take = 10 } = parsedProps;
            const diyList = await PrismaInstance.diy.findMany({ skip, take, ...parsedProps });
            return { data: diyList as FindManyDiyResponse<T> };
        } catch (error) {
            return DiyService.error("findMany", error);
        }
    }

    // ========== Aggregate queries ========== //

    static async count(props: CountDiyProps): Promise<ResponseFormat<CountDiyResponse>> {
        try {
            const parsedProps = countDiySchema.parse(props);
            const diyAmount: DiyCount = await PrismaInstance.diy.count(parsedProps);
            return { data: diyAmount };
        } catch (error) {
            return DiyService.error("count", error);
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
