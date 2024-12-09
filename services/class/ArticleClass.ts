import PrismaInstance from "@lib/prisma";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { ArticleCount, CountArticleProps, CountArticleResponse, CreateArticleProps, CreateArticleResponse, DeleteArticleProps, DeleteArticleResponse, FindManyArticleProps, FindManyArticleResponse, FindUniqueArticleProps, FindUniqueArticleResponse, UpdateArticleProps, UpdateArticleResponse, UpsertArticleProps, UpsertArticleResponse, countArticleSchema, createArticleSchema, deleteArticleSchema, selectArticleSchema, selectManyArticleSchema, updateArticleSchema, upsertArticleSchema } from "@services/types/ArticleType";
import { ResponseFormat } from "@utils/FetchConfig";
import { ZodError } from "zod";

export default class ArticleService {
    static async create<T extends CreateArticleProps>(props: T): Promise<ResponseFormat<CreateArticleResponse<T>>> {
        try {
            const { data, include, omit, select } = createArticleSchema.parse(props);

            const article = await PrismaInstance.article.create({
                data,
                ...(include && { include }),
                ...(omit && { omit }),
                ...(select && { select }),
            });

            return { data: article as CreateArticleResponse<T> };
        } catch (error) {
            console.error("ArticleService -> Create -> " + (error as Error).message);
            if (process.env.NODE_ENV === "development") {
                if (error instanceof ZodError)
                    throw new Error("ArticleService -> Create -> Invalid Zod params -> " + error.message);
                if (error instanceof PrismaClientKnownRequestError)
                    throw new Error("ArticleService -> Create -> Prisma error -> " + error.message);
                throw new Error("ArticleService -> Create -> " + (error as Error).message);
            }
            // TODO: add logging
            return { error: "Unable to create article..." };
        }
    }

    static async upsert<T extends UpsertArticleProps>(props: T): Promise<ResponseFormat<UpsertArticleResponse<T>>> {
        try {
            const { create, update, where, include, omit, select } = upsertArticleSchema.parse(props);

            const article = await PrismaInstance.article.upsert({
                create,
                update,
                where,
                ...(include && { include }),
                ...(omit && { omit }),
                ...(select && { select }),
            });

            return { data: article as UpsertArticleResponse<T> };
        } catch (error) {
            console.error("ArticleService -> Upsert -> " + (error as Error).message);
            if (process.env.NODE_ENV === "development") {
                if (error instanceof ZodError)
                    throw new Error("ArticleService -> Upsert -> Invalid Zod params -> " + error.message);
                if (error instanceof PrismaClientKnownRequestError)
                    throw new Error("ArticleService -> Upsert -> Prisma error -> " + error.message);
                throw new Error("ArticleService -> Upsert -> " + (error as Error).message);
            }
            // TODO: add logging
            return { error: "Unable to upsert article..." };
        }
    }

    static async update<T extends UpdateArticleProps>(props: T): Promise<ResponseFormat<UpdateArticleResponse<T>>> {
        try {
            const { data, where, include, omit, select } = updateArticleSchema.parse(props);

            const article = await PrismaInstance.article.update({
                data,
                where,
                ...(include && { include }),
                ...(omit && { omit }),
                ...(select && { select }),
            });

            return { data: article as UpdateArticleResponse<T> };
        } catch (error) {
            console.error("ArticleService -> Update -> " + (error as Error).message);
            if (process.env.NODE_ENV === "development") {
                if (error instanceof ZodError)
                    throw new Error("ArticleService -> Update -> Invalid Zod params -> " + error.message);
                if (error instanceof PrismaClientKnownRequestError)
                    throw new Error("ArticleService -> Update -> Prisma error -> " + error.message);
                throw new Error("ArticleService -> Update -> " + (error as Error).message);
            }
            // TODO: add logging
            return { error: "Unable to update article..." };
        }
    }

    static async delete<T extends DeleteArticleProps>(props: T): Promise<ResponseFormat<DeleteArticleResponse<T>>> {
        try {
            const { where, include, omit, select } = deleteArticleSchema.parse(props);

            const article = await PrismaInstance.article.delete({
                where,
                ...(include && { include }),
                ...(omit && { omit }),
                ...(select && { select }),
            });

            return { data: article as DeleteArticleResponse<T> };
        } catch (error) {
            console.error("ArticleService -> Delete -> " + (error as Error).message);
            if (process.env.NODE_ENV === "development") {
                if (error instanceof ZodError)
                    throw new Error("ArticleService -> Delete -> Invalid Zod params -> " + error.message);
                if (error instanceof PrismaClientKnownRequestError)
                    throw new Error("ArticleService -> Delete -> Prisma error -> " + error.message);
                throw new Error("ArticleService -> Delete -> " + (error as Error).message);
            }
            // TODO: add logging
            return { error: "Unable to delete article..." };
        }
    }

    static async findUnique<T extends FindUniqueArticleProps>(props: T): Promise<ResponseFormat<FindUniqueArticleResponse<T>>> {
        try {
            const { where, include, omit, select } = selectArticleSchema.parse(props);

            const article = await PrismaInstance.article.findUnique({
                where,
                ...(include && { include }),
                ...(omit && { omit }),
                ...(select && { select }),
            });

            return { data: article as FindUniqueArticleResponse<T> };
        } catch (error) {
            console.error("ArticleService -> FindUnique -> " + (error as Error).message);
            if (process.env.NODE_ENV === "development") {
                if (error instanceof ZodError)
                    throw new Error("ArticleService -> FindUnique -> Invalid Zod params -> " + error.message);
                if (error instanceof PrismaClientKnownRequestError)
                    throw new Error("ArticleService -> FindUnique -> Prisma error -> " + error.message);
                throw new Error("ArticleService -> FindUnique -> " + (error as Error).message);
            }
            // TODO: add logging
            return { error: "Unable to find article..." };
        }
    }

    static async findMany<T extends FindManyArticleProps>(props: T): Promise<ResponseFormat<FindManyArticleResponse<T>>> {
        try {
            const {
                cursor,
                distinct,
                include,
                omit,
                orderBy,
                select,
                skip = 0,
                take = 10,
                where,
            } = selectManyArticleSchema.parse(props);

            const articleList = await PrismaInstance.article.findMany({
                ...(cursor && { cursor }),
                ...(distinct && { distinct }),
                ...(include && { include }),
                ...(omit && { omit }),
                ...(orderBy && { orderBy }),
                ...(select && { select }),
                ...(skip && { skip }),
                ...(take && { take }),
                ...(where && { where }),
            });

            return { data: articleList as FindManyArticleResponse<T> };
        } catch (error) {
            console.error("ArticleService -> FindMany -> " + (error as Error).message);
            if (process.env.NODE_ENV === "development") {
                if (error instanceof ZodError)
                    throw new Error("ArticleService -> FindMany -> Invalid Zod params -> " + error.message);
                if (error instanceof PrismaClientKnownRequestError)
                    throw new Error("ArticleService -> FindMany -> Prisma error -> " + error.message);
                throw new Error("ArticleService -> FindMany -> " + (error as Error).message);
            }
            // TODO: add logging
            return { error: "Unable to find articles..." };
        }
    }

    static async count(props: CountArticleProps): Promise<ResponseFormat<CountArticleResponse>> {
        try {
            const { cursor, orderBy, select, skip, take, where } = countArticleSchema.parse(props);

            const articleAmount: ArticleCount = await PrismaInstance.article.count({
                ...(cursor && { cursor }),
                ...(orderBy && { orderBy }),
                ...(select && { select }),
                ...(skip && { skip }),
                ...(take && { take }),
                ...(where && { where }),
            });

            return { data: articleAmount };
        } catch (error) {
            console.error("ArticleService -> Count -> " + (error as Error).message);
            if (process.env.NODE_ENV === "development") {
                if (error instanceof ZodError)
                    throw new Error("ArticleService -> Count -> Invalid Zod params -> " + error.message);
                if (error instanceof PrismaClientKnownRequestError)
                    throw new Error("ArticleService -> Count -> Prisma error -> " + error.message);
                throw new Error("ArticleService -> Count -> " + (error as Error).message);
            }
            // TODO: add logging
            return { error: "Unable to count articles..." };
        }
    }
}
