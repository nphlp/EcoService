import PrismaInstance from "@lib/prisma";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { ContentCount, CountContentProps, CountContentResponse, CreateContentProps, CreateContentResponse, DeleteContentProps, DeleteContentResponse, FindManyContentProps, FindManyContentResponse, FindUniqueContentProps, FindUniqueContentResponse, UpdateContentProps, UpdateContentResponse, UpsertContentProps, UpsertContentResponse, countContentSchema, createContentSchema, deleteContentSchema, selectContentSchema, selectManyContentSchema, updateContentSchema, upsertContentSchema } from "@services/types/ContentType";
import { ResponseFormat } from "@utils/FetchConfig";
import { ZodError } from "zod";

export default class ContentService {
    static async create<T extends CreateContentProps>(props: T): Promise<ResponseFormat<CreateContentResponse<T>>> {
        try {
            const { data, omit, select } = createContentSchema.parse(props);

            const content = await PrismaInstance.content.create({
                data,
                
                ...(omit && { omit }),
                ...(select && { select }),
            });

            return { data: content as CreateContentResponse<T> };
        } catch (error) {
            console.error("ContentService -> Create -> " + (error as Error).message);
            if (process.env.NODE_ENV === "development") {
                if (error instanceof ZodError)
                    throw new Error("ContentService -> Create -> Invalid Zod params -> " + error.message);
                if (error instanceof PrismaClientKnownRequestError)
                    throw new Error("ContentService -> Create -> Prisma error -> " + error.message);
                throw new Error("ContentService -> Create -> " + (error as Error).message);
            }
            // TODO: add logging
            return { error: "Unable to create content..." };
        }
    }

    static async upsert<T extends UpsertContentProps>(props: T): Promise<ResponseFormat<UpsertContentResponse<T>>> {
        try {
            const { create, update, where, omit, select } = upsertContentSchema.parse(props);

            const content = await PrismaInstance.content.upsert({
                create,
                update,
                where,
                
                ...(omit && { omit }),
                ...(select && { select }),
            });

            return { data: content as UpsertContentResponse<T> };
        } catch (error) {
            console.error("ContentService -> Upsert -> " + (error as Error).message);
            if (process.env.NODE_ENV === "development") {
                if (error instanceof ZodError)
                    throw new Error("ContentService -> Upsert -> Invalid Zod params -> " + error.message);
                if (error instanceof PrismaClientKnownRequestError)
                    throw new Error("ContentService -> Upsert -> Prisma error -> " + error.message);
                throw new Error("ContentService -> Upsert -> " + (error as Error).message);
            }
            // TODO: add logging
            return { error: "Unable to upsert content..." };
        }
    }

    static async update<T extends UpdateContentProps>(props: T): Promise<ResponseFormat<UpdateContentResponse<T>>> {
        try {
            const { data, where, omit, select } = updateContentSchema.parse(props);

            const content = await PrismaInstance.content.update({
                data,
                where,
                
                ...(omit && { omit }),
                ...(select && { select }),
            });

            return { data: content as UpdateContentResponse<T> };
        } catch (error) {
            console.error("ContentService -> Update -> " + (error as Error).message);
            if (process.env.NODE_ENV === "development") {
                if (error instanceof ZodError)
                    throw new Error("ContentService -> Update -> Invalid Zod params -> " + error.message);
                if (error instanceof PrismaClientKnownRequestError)
                    throw new Error("ContentService -> Update -> Prisma error -> " + error.message);
                throw new Error("ContentService -> Update -> " + (error as Error).message);
            }
            // TODO: add logging
            return { error: "Unable to update content..." };
        }
    }

    static async delete<T extends DeleteContentProps>(props: T): Promise<ResponseFormat<DeleteContentResponse<T>>> {
        try {
            const { where, omit, select } = deleteContentSchema.parse(props);

            const content = await PrismaInstance.content.delete({
                where,
                
                ...(omit && { omit }),
                ...(select && { select }),
            });

            return { data: content as DeleteContentResponse<T> };
        } catch (error) {
            console.error("ContentService -> Delete -> " + (error as Error).message);
            if (process.env.NODE_ENV === "development") {
                if (error instanceof ZodError)
                    throw new Error("ContentService -> Delete -> Invalid Zod params -> " + error.message);
                if (error instanceof PrismaClientKnownRequestError)
                    throw new Error("ContentService -> Delete -> Prisma error -> " + error.message);
                throw new Error("ContentService -> Delete -> " + (error as Error).message);
            }
            // TODO: add logging
            return { error: "Unable to delete content..." };
        }
    }

    static async findUnique<T extends FindUniqueContentProps>(props: T): Promise<ResponseFormat<FindUniqueContentResponse<T>>> {
        try {
            const { where, omit, select } = selectContentSchema.parse(props);

            const content = await PrismaInstance.content.findUnique({
                where,
                
                ...(omit && { omit }),
                ...(select && { select }),
            });

            return { data: content as FindUniqueContentResponse<T> };
        } catch (error) {
            console.error("ContentService -> FindUnique -> " + (error as Error).message);
            if (process.env.NODE_ENV === "development") {
                if (error instanceof ZodError)
                    throw new Error("ContentService -> FindUnique -> Invalid Zod params -> " + error.message);
                if (error instanceof PrismaClientKnownRequestError)
                    throw new Error("ContentService -> FindUnique -> Prisma error -> " + error.message);
                throw new Error("ContentService -> FindUnique -> " + (error as Error).message);
            }
            // TODO: add logging
            return { error: "Unable to find content..." };
        }
    }

    static async findMany<T extends FindManyContentProps>(props: T): Promise<ResponseFormat<FindManyContentResponse<T>>> {
        try {
            const {
                cursor,
                distinct,
                
                omit,
                orderBy,
                select,
                skip = 0,
                take = 10,
                where,
            } = selectManyContentSchema.parse(props);

            const contentList = await PrismaInstance.content.findMany({
                ...(cursor && { cursor }),
                ...(distinct && { distinct }),
                
                ...(omit && { omit }),
                ...(orderBy && { orderBy }),
                ...(select && { select }),
                ...(skip && { skip }),
                ...(take && { take }),
                ...(where && { where }),
            });

            return { data: contentList as FindManyContentResponse<T> };
        } catch (error) {
            console.error("ContentService -> FindMany -> " + (error as Error).message);
            if (process.env.NODE_ENV === "development") {
                if (error instanceof ZodError)
                    throw new Error("ContentService -> FindMany -> Invalid Zod params -> " + error.message);
                if (error instanceof PrismaClientKnownRequestError)
                    throw new Error("ContentService -> FindMany -> Prisma error -> " + error.message);
                throw new Error("ContentService -> FindMany -> " + (error as Error).message);
            }
            // TODO: add logging
            return { error: "Unable to find contents..." };
        }
    }

    static async count(props: CountContentProps): Promise<ResponseFormat<CountContentResponse>> {
        try {
            const { cursor, orderBy, select, skip, take, where } = countContentSchema.parse(props);

            const contentAmount: ContentCount = await PrismaInstance.content.count({
                ...(cursor && { cursor }),
                ...(orderBy && { orderBy }),
                ...(select && { select }),
                ...(skip && { skip }),
                ...(take && { take }),
                ...(where && { where }),
            });

            return { data: contentAmount };
        } catch (error) {
            console.error("ContentService -> Count -> " + (error as Error).message);
            if (process.env.NODE_ENV === "development") {
                if (error instanceof ZodError)
                    throw new Error("ContentService -> Count -> Invalid Zod params -> " + error.message);
                if (error instanceof PrismaClientKnownRequestError)
                    throw new Error("ContentService -> Count -> Prisma error -> " + error.message);
                throw new Error("ContentService -> Count -> " + (error as Error).message);
            }
            // TODO: add logging
            return { error: "Unable to count contents..." };
        }
    }
}
