import PrismaInstance from "@lib/prisma";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { DiyCount, DiyCountProps, DiyCountResponse, DiyCountSchema, DiyCreateManyProps, DiyCreateManyResponse, DiyCreateManySchema, DiyCreateProps, DiyCreateResponse, DiyCreateSchema, DiyDeleteManyProps, DiyDeleteManyResponse, DiyDeleteManySchema, DiyDeleteProps, DiyDeleteResponse, DiyDeleteSchema, DiyFindFirstProps, DiyFindFirstResponse, DiyFindFirstSchema, DiyFindManyProps, DiyFindManyResponse, DiyFindManySchema, DiyFindUniqueProps, DiyFindUniqueResponse, DiyFindUniqueSchema, DiyUpdateManyProps, DiyUpdateManyResponse, DiyUpdateManySchema, DiyUpdateProps, DiyUpdateResponse, DiyUpdateSchema, DiyUpsertProps, DiyUpsertResponse, DiyUpsertSchema } from "@services/types/DiyType";
import { ResponseFormat } from "@utils/FetchConfig";
import { ZodError } from "zod";

export default class DiyService {

    // ========== Single mutations ========== //

    static async create<T extends DiyCreateProps>(props: T): Promise<ResponseFormat<DiyCreateResponse<T>>> {
        try {
            const parsedProps = DiyCreateSchema.parse(props);
            const diy = await PrismaInstance.diy.create(parsedProps);
            return { data: diy as DiyCreateResponse<T> };
        } catch (error) {
            return DiyService.error("create", error);
        }
    }

    static async upsert<T extends DiyUpsertProps>(props: T): Promise<ResponseFormat<DiyUpsertResponse<T>>> {
        try {
            const parsedProps = DiyUpsertSchema.parse(props);
            const diy = await PrismaInstance.diy.upsert(parsedProps);
            return { data: diy as DiyUpsertResponse<T> };
        } catch (error) {
            return DiyService.error("upsert", error);
        }
    }

    static async update<T extends DiyUpdateProps>(props: T): Promise<ResponseFormat<DiyUpdateResponse<T>>> {
        try {
            const parsedProps = DiyUpdateSchema.parse(props);
            const diy = await PrismaInstance.diy.update(parsedProps);
            return { data: diy as DiyUpdateResponse<T> };
        } catch (error) {
            return DiyService.error("update", error);
        }
    }

    static async delete<T extends DiyDeleteProps>(props: T): Promise<ResponseFormat<DiyDeleteResponse<T>>> {
        try {
            const parsedProps = DiyDeleteSchema.parse(props);
            const diy = await PrismaInstance.diy.delete(parsedProps);
            return { data: diy as DiyDeleteResponse<T> };
        } catch (error) {
            return DiyService.error("delete", error);
        }
    }

    // ========== Multiple mutations ========== //

    static async createMany(props: DiyCreateManyProps): Promise<ResponseFormat<DiyCreateManyResponse>> {
        try {
            const parsedProps = DiyCreateManySchema.parse(props);
            const result = await PrismaInstance.diy.createMany(parsedProps);
            return { data: result };
        } catch (error) {
            return DiyService.error("createMany", error);
        }
    }

    static async updateMany(props: DiyUpdateManyProps): Promise<ResponseFormat<DiyUpdateManyResponse>> {
        try {
            const parsedProps = DiyUpdateManySchema.parse(props);
            const result = await PrismaInstance.diy.updateMany(parsedProps);
            return { data: result };
        } catch (error) {
            return DiyService.error("updateMany", error);
        }
    }

    static async deleteMany(props: DiyDeleteManyProps): Promise<ResponseFormat<DiyDeleteManyResponse>> {
        try {
            const parsedProps = DiyDeleteManySchema.parse(props);
            const result = await PrismaInstance.diy.deleteMany(parsedProps);
            return { data: result };
        } catch (error) {
            return DiyService.error("deleteMany", error);
        }
    }

    // ========== Single queries ========== //

    static async findFirst<T extends DiyFindFirstProps>(props: T): Promise<ResponseFormat<DiyFindFirstResponse<T>>> {
        try {
            const parsedProps = DiyFindFirstSchema.parse(props);
            const diy = await PrismaInstance.diy.findFirst(parsedProps);
            return { data: diy as DiyFindFirstResponse<T> };
        } catch (error) {
            return DiyService.error("findFirst", error);
        }
    }

    static async findUnique<T extends DiyFindUniqueProps>(props: T): Promise<ResponseFormat<DiyFindUniqueResponse<T>>> {
        try {
            const parsedProps = DiyFindUniqueSchema.parse(props);
            const diy = await PrismaInstance.diy.findUnique(parsedProps);
            return { data: diy as DiyFindUniqueResponse<T> };
        } catch (error) {
            return DiyService.error("findUnique", error);
        }
    }

    static async findMany<T extends DiyFindManyProps>(props: T): Promise<ResponseFormat<DiyFindManyResponse<T>>> {
        try {
            const parsedProps = DiyFindManySchema.parse(props);
            const { skip = 0, take = 10 } = parsedProps;
            const diyList = await PrismaInstance.diy.findMany({ skip, take, ...parsedProps });
            return { data: diyList as DiyFindManyResponse<T> };
        } catch (error) {
            return DiyService.error("findMany", error);
        }
    }

    // ========== Aggregate queries ========== //

    static async count(props: DiyCountProps): Promise<ResponseFormat<DiyCountResponse>> {
        try {
            const parsedProps = DiyCountSchema.parse(props);
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
