import PrismaInstance from "@lib/prisma";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { DiyCount, DiyCountProps, DiyCountResponse, DiyCreateManyProps, DiyCreateManyResponse, DiyCreateProps, DiyCreateResponse, DiyDeleteManyProps, DiyDeleteManyResponse, DiyDeleteProps, DiyDeleteResponse, DiyFindFirstProps, DiyFindFirstResponse, DiyFindManyProps, DiyFindManyResponse, DiyFindUniqueProps, DiyFindUniqueResponse, DiyUpdateManyProps, DiyUpdateManyResponse, DiyUpdateProps, DiyUpdateResponse, DiyUpsertProps, DiyUpsertResponse } from "@services/types/DiyType";
import { ResponseFormat } from "@utils/FetchConfig";

export default class DiyService {

    // ========== Single mutations ========== //

    static async create<T extends DiyCreateProps>(props: T): Promise<ResponseFormat<DiyCreateResponse<T>>> {
        try {
            const diy = await PrismaInstance.diy.create(props);
            return { data: diy as DiyCreateResponse<T> };
        } catch (error) {
            return DiyService.error("create", error);
        }
    }

    static async upsert<T extends DiyUpsertProps>(props: T): Promise<ResponseFormat<DiyUpsertResponse<T>>> {
        try {
            const diy = await PrismaInstance.diy.upsert(props);
            return { data: diy as DiyUpsertResponse<T> };
        } catch (error) {
            return DiyService.error("upsert", error);
        }
    }

    static async update<T extends DiyUpdateProps>(props: T): Promise<ResponseFormat<DiyUpdateResponse<T>>> {
        try {
            const diy = await PrismaInstance.diy.update(props);
            return { data: diy as DiyUpdateResponse<T> };
        } catch (error) {
            return DiyService.error("update", error);
        }
    }

    static async delete<T extends DiyDeleteProps>(props: T): Promise<ResponseFormat<DiyDeleteResponse<T>>> {
        try {
            const diy = await PrismaInstance.diy.delete(props);
            return { data: diy as DiyDeleteResponse<T> };
        } catch (error) {
            return DiyService.error("delete", error);
        }
    }

    // ========== Multiple mutations ========== //

    static async createMany(props: DiyCreateManyProps): Promise<ResponseFormat<DiyCreateManyResponse>> {
        try {
            const result = await PrismaInstance.diy.createMany(props);
            return { data: result };
        } catch (error) {
            return DiyService.error("createMany", error);
        }
    }

    static async updateMany(props: DiyUpdateManyProps): Promise<ResponseFormat<DiyUpdateManyResponse>> {
        try {
            const result = await PrismaInstance.diy.updateMany(props);
            return { data: result };
        } catch (error) {
            return DiyService.error("updateMany", error);
        }
    }

    static async deleteMany(props: DiyDeleteManyProps): Promise<ResponseFormat<DiyDeleteManyResponse>> {
        try {
            const result = await PrismaInstance.diy.deleteMany(props);
            return { data: result };
        } catch (error) {
            return DiyService.error("deleteMany", error);
        }
    }

    // ========== Single queries ========== //

    static async findFirst<T extends DiyFindFirstProps>(props: T): Promise<ResponseFormat<DiyFindFirstResponse<T>>> {
        try {
            const diy = await PrismaInstance.diy.findFirst(props);
            return { data: diy as DiyFindFirstResponse<T> };
        } catch (error) {
            return DiyService.error("findFirst", error);
        }
    }

    static async findUnique<T extends DiyFindUniqueProps>(props: T): Promise<ResponseFormat<DiyFindUniqueResponse<T>>> {
        try {
            const diy = await PrismaInstance.diy.findUnique(props);
            return { data: diy as DiyFindUniqueResponse<T> };
        } catch (error) {
            return DiyService.error("findUnique", error);
        }
    }

    static async findMany<T extends DiyFindManyProps>(props: T): Promise<ResponseFormat<DiyFindManyResponse<T>>> {
        try {
            const diyList = await PrismaInstance.diy.findMany(props);
            return { data: diyList as DiyFindManyResponse<T> };
        } catch (error) {
            return DiyService.error("findMany", error);
        }
    }

    // ========== Aggregate queries ========== //

    static async count(props: DiyCountProps): Promise<ResponseFormat<DiyCountResponse>> {
        try {
            const diyAmount: DiyCount = await PrismaInstance.diy.count(props);
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
