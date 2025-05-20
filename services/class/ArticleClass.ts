import PrismaInstance from "@lib/prisma";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { ArticleCount, ArticleCountProps, ArticleCountResponse, ArticleCountSchema, ArticleCreateManyProps, ArticleCreateManyResponse, ArticleCreateManySchema, ArticleCreateProps, ArticleCreateResponse, ArticleCreateSchema, ArticleDeleteManyProps, ArticleDeleteManyResponse, ArticleDeleteManySchema, ArticleDeleteProps, ArticleDeleteResponse, ArticleDeleteSchema, ArticleFindFirstProps, ArticleFindFirstResponse, ArticleFindFirstSchema, ArticleFindManyProps, ArticleFindManyResponse, ArticleFindManySchema, ArticleFindUniqueProps, ArticleFindUniqueResponse, ArticleFindUniqueSchema, ArticleUpdateManyProps, ArticleUpdateManyResponse, ArticleUpdateManySchema, ArticleUpdateProps, ArticleUpdateResponse, ArticleUpdateSchema, ArticleUpsertProps, ArticleUpsertResponse, ArticleUpsertSchema } from "@services/types/ArticleType";
import { ResponseFormat } from "@utils/FetchConfig";
import { ZodError } from "zod";

export default class ArticleService {

    // ========== Single mutations ========== //

    static async create<T extends ArticleCreateProps>(props: T): Promise<ResponseFormat<ArticleCreateResponse<T>>> {
        try {
            const parsedProps = ArticleCreateSchema.parse(props);
            const article = await PrismaInstance.article.create(parsedProps);
            return { data: article as ArticleCreateResponse<T> };
        } catch (error) {
            return ArticleService.error("create", error);
        }
    }

    static async upsert<T extends ArticleUpsertProps>(props: T): Promise<ResponseFormat<ArticleUpsertResponse<T>>> {
        try {
            const parsedProps = ArticleUpsertSchema.parse(props);
            const article = await PrismaInstance.article.upsert(parsedProps);
            return { data: article as ArticleUpsertResponse<T> };
        } catch (error) {
            return ArticleService.error("upsert", error);
        }
    }

    static async update<T extends ArticleUpdateProps>(props: T): Promise<ResponseFormat<ArticleUpdateResponse<T>>> {
        try {
            const parsedProps = ArticleUpdateSchema.parse(props);
            const article = await PrismaInstance.article.update(parsedProps);
            return { data: article as ArticleUpdateResponse<T> };
        } catch (error) {
            return ArticleService.error("update", error);
        }
    }

    static async delete<T extends ArticleDeleteProps>(props: T): Promise<ResponseFormat<ArticleDeleteResponse<T>>> {
        try {
            const parsedProps = ArticleDeleteSchema.parse(props);
            const article = await PrismaInstance.article.delete(parsedProps);
            return { data: article as ArticleDeleteResponse<T> };
        } catch (error) {
            return ArticleService.error("delete", error);
        }
    }

    // ========== Multiple mutations ========== //

    static async createMany(props: ArticleCreateManyProps): Promise<ResponseFormat<ArticleCreateManyResponse>> {
        try {
            const parsedProps = ArticleCreateManySchema.parse(props);
            const result = await PrismaInstance.article.createMany(parsedProps);
            return { data: result };
        } catch (error) {
            return ArticleService.error("createMany", error);
        }
    }

    static async updateMany(props: ArticleUpdateManyProps): Promise<ResponseFormat<ArticleUpdateManyResponse>> {
        try {
            const parsedProps = ArticleUpdateManySchema.parse(props);
            const result = await PrismaInstance.article.updateMany(parsedProps);
            return { data: result };
        } catch (error) {
            return ArticleService.error("updateMany", error);
        }
    }

    static async deleteMany(props: ArticleDeleteManyProps): Promise<ResponseFormat<ArticleDeleteManyResponse>> {
        try {
            const parsedProps = ArticleDeleteManySchema.parse(props);
            const result = await PrismaInstance.article.deleteMany(parsedProps);
            return { data: result };
        } catch (error) {
            return ArticleService.error("deleteMany", error);
        }
    }

    // ========== Single queries ========== //

    static async findFirst<T extends ArticleFindFirstProps>(props: T): Promise<ResponseFormat<ArticleFindFirstResponse<T>>> {
        try {
            const parsedProps = ArticleFindFirstSchema.parse(props);
            const article = await PrismaInstance.article.findFirst(parsedProps);
            return { data: article as ArticleFindFirstResponse<T> };
        } catch (error) {
            return ArticleService.error("findFirst", error);
        }
    }

    static async findUnique<T extends ArticleFindUniqueProps>(props: T): Promise<ResponseFormat<ArticleFindUniqueResponse<T>>> {
        try {
            const parsedProps = ArticleFindUniqueSchema.parse(props);
            const article = await PrismaInstance.article.findUnique(parsedProps);
            return { data: article as ArticleFindUniqueResponse<T> };
        } catch (error) {
            return ArticleService.error("findUnique", error);
        }
    }

    static async findMany<T extends ArticleFindManyProps>(props: T): Promise<ResponseFormat<ArticleFindManyResponse<T>>> {
        try {
            const parsedProps = ArticleFindManySchema.parse(props);
            const { skip = 0, take = 10 } = parsedProps;
            const articleList = await PrismaInstance.article.findMany({ skip, take, ...parsedProps });
            return { data: articleList as ArticleFindManyResponse<T> };
        } catch (error) {
            return ArticleService.error("findMany", error);
        }
    }

    // ========== Aggregate queries ========== //

    static async count(props: ArticleCountProps): Promise<ResponseFormat<ArticleCountResponse>> {
        try {
            const parsedProps = ArticleCountSchema.parse(props);
            const articleAmount: ArticleCount = await PrismaInstance.article.count(parsedProps);
            return { data: articleAmount };
        } catch (error) {
            return ArticleService.error("count", error);
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
