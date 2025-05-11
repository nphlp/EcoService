import PrismaInstance from "@lib/prisma";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { ContentCount, CountContentProps, CountContentResponse, CreateManyContentProps, CreateManyContentResponse, CreateContentProps, CreateContentResponse, DeleteManyContentProps, DeleteManyContentResponse, DeleteContentProps, DeleteContentResponse, FindFirstContentProps, FindFirstContentResponse, FindManyContentProps, FindManyContentResponse, FindUniqueContentProps, FindUniqueContentResponse, UpdateManyContentProps, UpdateManyContentResponse, UpdateContentProps, UpdateContentResponse, UpsertContentProps, UpsertContentResponse, countContentSchema, createManyContentSchema, createContentSchema, deleteManyContentSchema, deleteContentSchema, selectFirstContentSchema, selectManyContentSchema, selectUniqueContentSchema, updateManyContentSchema, updateContentSchema, upsertContentSchema } from "@services/types/ContentType";
import { ResponseFormat } from "@utils/FetchConfig";
import { ZodError } from "zod";

export default class ContentService {

    // ========== Single mutations ========== //

    static async create<T extends CreateContentProps>(props: T): Promise<ResponseFormat<CreateContentResponse<T>>> {
        try {
            const parsedProps = createContentSchema.parse(props);
            const content = await PrismaInstance.content.create(parsedProps);
            return { data: content as CreateContentResponse<T> };
        } catch (error) {
            return ContentService.error("create", error);
        }
    }

    static async upsert<T extends UpsertContentProps>(props: T): Promise<ResponseFormat<UpsertContentResponse<T>>> {
        try {
            const parsedProps = upsertContentSchema.parse(props);
            const content = await PrismaInstance.content.upsert(parsedProps);
            return { data: content as UpsertContentResponse<T> };
        } catch (error) {
            return ContentService.error("upsert", error);
        }
    }

    static async update<T extends UpdateContentProps>(props: T): Promise<ResponseFormat<UpdateContentResponse<T>>> {
        try {
            const parsedProps = updateContentSchema.parse(props);
            const content = await PrismaInstance.content.update(parsedProps);
            return { data: content as UpdateContentResponse<T> };
        } catch (error) {
            return ContentService.error("update", error);
        }
    }

    static async delete<T extends DeleteContentProps>(props: T): Promise<ResponseFormat<DeleteContentResponse<T>>> {
        try {
            const parsedProps = deleteContentSchema.parse(props);
            const content = await PrismaInstance.content.delete(parsedProps);
            return { data: content as DeleteContentResponse<T> };
        } catch (error) {
            return ContentService.error("delete", error);
        }
    }

    // ========== Multiple mutations ========== //

    static async createMany(props: CreateManyContentProps): Promise<ResponseFormat<CreateManyContentResponse>> {
        try {
            const parsedProps = createManyContentSchema.parse(props);
            const result = await PrismaInstance.content.createMany(parsedProps);
            return { data: result };
        } catch (error) {
            return ContentService.error("createMany", error);
        }
    }

    static async updateMany(props: UpdateManyContentProps): Promise<ResponseFormat<UpdateManyContentResponse>> {
        try {
            const parsedProps = updateManyContentSchema.parse(props);
            const result = await PrismaInstance.content.updateMany(parsedProps);
            return { data: result };
        } catch (error) {
            return ContentService.error("updateMany", error);
        }
    }

    static async deleteMany(props: DeleteManyContentProps): Promise<ResponseFormat<DeleteManyContentResponse>> {
        try {
            const parsedProps = deleteManyContentSchema.parse(props);
            const result = await PrismaInstance.content.deleteMany(parsedProps);
            return { data: result };
        } catch (error) {
            return ContentService.error("deleteMany", error);
        }
    }

    // ========== Single queries ========== //

    static async findFirst<T extends FindFirstContentProps>(props: T): Promise<ResponseFormat<FindFirstContentResponse<T>>> {
        try {
            const parsedProps = selectFirstContentSchema.parse(props);
            const content = await PrismaInstance.content.findFirst(parsedProps);
            return { data: content as FindFirstContentResponse<T> };
        } catch (error) {
            return ContentService.error("findFirst", error);
        }
    }

    static async findUnique<T extends FindUniqueContentProps>(props: T): Promise<ResponseFormat<FindUniqueContentResponse<T>>> {
        try {
            const parsedProps = selectUniqueContentSchema.parse(props);
            const content = await PrismaInstance.content.findUnique(parsedProps);
            return { data: content as FindUniqueContentResponse<T> };
        } catch (error) {
            return ContentService.error("findUnique", error);
        }
    }

    static async findMany<T extends FindManyContentProps>(props: T): Promise<ResponseFormat<FindManyContentResponse<T>>> {
        try {
            const parsedProps = selectManyContentSchema.parse(props);
            const { skip = 0, take = 10 } = parsedProps;
            const contentList = await PrismaInstance.content.findMany({ skip, take, ...parsedProps });
            return { data: contentList as FindManyContentResponse<T> };
        } catch (error) {
            return ContentService.error("findMany", error);
        }
    }

    // ========== Aggregate queries ========== //

    static async count(props: CountContentProps): Promise<ResponseFormat<CountContentResponse>> {
        try {
            const parsedProps = countContentSchema.parse(props);
            const contentAmount: ContentCount = await PrismaInstance.content.count(parsedProps);
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
