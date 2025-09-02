import PrismaInstance from "@lib/prisma";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { ContentCount, ContentCountProps, ContentCountResponse, ContentCreateManyProps, ContentCreateManyResponse, ContentCreateProps, ContentCreateResponse, ContentDeleteManyProps, ContentDeleteManyResponse, ContentDeleteProps, ContentDeleteResponse, ContentFindFirstProps, ContentFindFirstResponse, ContentFindManyProps, ContentFindManyResponse, ContentFindUniqueProps, ContentFindUniqueResponse, ContentUpdateManyProps, ContentUpdateManyResponse, ContentUpdateProps, ContentUpdateResponse, ContentUpsertProps, ContentUpsertResponse } from "@services/types/ContentType";
import { ResponseFormat } from "@utils/FetchConfig";

export default class ContentService {

    // ========== Single mutations ========== //

    static async create<T extends ContentCreateProps>(props: T): Promise<ResponseFormat<ContentCreateResponse<T>>> {
        try {
            const content = await PrismaInstance.content.create(props);
            return { data: content as ContentCreateResponse<T> };
        } catch (error) {
            return ContentService.error("create", error);
        }
    }

    static async upsert<T extends ContentUpsertProps>(props: T): Promise<ResponseFormat<ContentUpsertResponse<T>>> {
        try {
            const content = await PrismaInstance.content.upsert(props);
            return { data: content as ContentUpsertResponse<T> };
        } catch (error) {
            return ContentService.error("upsert", error);
        }
    }

    static async update<T extends ContentUpdateProps>(props: T): Promise<ResponseFormat<ContentUpdateResponse<T>>> {
        try {
            const content = await PrismaInstance.content.update(props);
            return { data: content as ContentUpdateResponse<T> };
        } catch (error) {
            return ContentService.error("update", error);
        }
    }

    static async delete<T extends ContentDeleteProps>(props: T): Promise<ResponseFormat<ContentDeleteResponse<T>>> {
        try {
            const content = await PrismaInstance.content.delete(props);
            return { data: content as ContentDeleteResponse<T> };
        } catch (error) {
            return ContentService.error("delete", error);
        }
    }

    // ========== Multiple mutations ========== //

    static async createMany(props: ContentCreateManyProps): Promise<ResponseFormat<ContentCreateManyResponse>> {
        try {
            const result = await PrismaInstance.content.createMany(props);
            return { data: result };
        } catch (error) {
            return ContentService.error("createMany", error);
        }
    }

    static async updateMany(props: ContentUpdateManyProps): Promise<ResponseFormat<ContentUpdateManyResponse>> {
        try {
            const result = await PrismaInstance.content.updateMany(props);
            return { data: result };
        } catch (error) {
            return ContentService.error("updateMany", error);
        }
    }

    static async deleteMany(props: ContentDeleteManyProps): Promise<ResponseFormat<ContentDeleteManyResponse>> {
        try {
            const result = await PrismaInstance.content.deleteMany(props);
            return { data: result };
        } catch (error) {
            return ContentService.error("deleteMany", error);
        }
    }

    // ========== Single queries ========== //

    static async findFirst<T extends ContentFindFirstProps>(props: T): Promise<ResponseFormat<ContentFindFirstResponse<T>>> {
        try {
            const content = await PrismaInstance.content.findFirst(props);
            return { data: content as ContentFindFirstResponse<T> };
        } catch (error) {
            return ContentService.error("findFirst", error);
        }
    }

    static async findUnique<T extends ContentFindUniqueProps>(props: T): Promise<ResponseFormat<ContentFindUniqueResponse<T>>> {
        try {
            const content = await PrismaInstance.content.findUnique(props);
            return { data: content as ContentFindUniqueResponse<T> };
        } catch (error) {
            return ContentService.error("findUnique", error);
        }
    }

    static async findMany<T extends ContentFindManyProps>(props: T): Promise<ResponseFormat<ContentFindManyResponse<T>>> {
        try {
            const contentList = await PrismaInstance.content.findMany(props);
            return { data: contentList as ContentFindManyResponse<T> };
        } catch (error) {
            return ContentService.error("findMany", error);
        }
    }

    // ========== Aggregate queries ========== //

    static async count(props: ContentCountProps): Promise<ResponseFormat<ContentCountResponse>> {
        try {
            const contentAmount: ContentCount = await PrismaInstance.content.count(props);
            return { data: contentAmount };
        } catch (error) {
            return ContentService.error("count", error);
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
