import PrismaInstance from "@lib/prisma";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { ArticleCount, ArticleCountProps, ArticleCountResponse, ArticleCreateManyProps, ArticleCreateManyResponse, ArticleCreateProps, ArticleCreateResponse, ArticleDeleteManyProps, ArticleDeleteManyResponse, ArticleDeleteProps, ArticleDeleteResponse, ArticleFindFirstProps, ArticleFindFirstResponse, ArticleFindManyProps, ArticleFindManyResponse, ArticleFindUniqueProps, ArticleFindUniqueResponse, ArticleUpdateManyProps, ArticleUpdateManyResponse, ArticleUpdateProps, ArticleUpdateResponse, ArticleUpsertProps, ArticleUpsertResponse } from "@services/types/ArticleType";
import { ResponseFormat } from "@utils/FetchConfig";

export default class ArticleService {

    // ========== Single mutations ========== //

    static async create<T extends ArticleCreateProps>(props: T): Promise<ResponseFormat<ArticleCreateResponse<T>>> {
        try {
            const article = await PrismaInstance.article.create(props);
            return { data: article as ArticleCreateResponse<T> };
        } catch (error) {
            return ArticleService.error("create", error);
        }
    }

    static async upsert<T extends ArticleUpsertProps>(props: T): Promise<ResponseFormat<ArticleUpsertResponse<T>>> {
        try {
            const article = await PrismaInstance.article.upsert(props);
            return { data: article as ArticleUpsertResponse<T> };
        } catch (error) {
            return ArticleService.error("upsert", error);
        }
    }

    static async update<T extends ArticleUpdateProps>(props: T): Promise<ResponseFormat<ArticleUpdateResponse<T>>> {
        try {
            const article = await PrismaInstance.article.update(props);
            return { data: article as ArticleUpdateResponse<T> };
        } catch (error) {
            return ArticleService.error("update", error);
        }
    }

    static async delete<T extends ArticleDeleteProps>(props: T): Promise<ResponseFormat<ArticleDeleteResponse<T>>> {
        try {
            const article = await PrismaInstance.article.delete(props);
            return { data: article as ArticleDeleteResponse<T> };
        } catch (error) {
            return ArticleService.error("delete", error);
        }
    }

    // ========== Multiple mutations ========== //

    static async createMany(props: ArticleCreateManyProps): Promise<ResponseFormat<ArticleCreateManyResponse>> {
        try {
            const result = await PrismaInstance.article.createMany(props);
            return { data: result };
        } catch (error) {
            return ArticleService.error("createMany", error);
        }
    }

    static async updateMany(props: ArticleUpdateManyProps): Promise<ResponseFormat<ArticleUpdateManyResponse>> {
        try {
            const result = await PrismaInstance.article.updateMany(props);
            return { data: result };
        } catch (error) {
            return ArticleService.error("updateMany", error);
        }
    }

    static async deleteMany(props: ArticleDeleteManyProps): Promise<ResponseFormat<ArticleDeleteManyResponse>> {
        try {
            const result = await PrismaInstance.article.deleteMany(props);
            return { data: result };
        } catch (error) {
            return ArticleService.error("deleteMany", error);
        }
    }

    // ========== Single queries ========== //

    static async findFirst<T extends ArticleFindFirstProps>(props: T): Promise<ResponseFormat<ArticleFindFirstResponse<T>>> {
        try {
            const article = await PrismaInstance.article.findFirst(props);
            return { data: article as ArticleFindFirstResponse<T> };
        } catch (error) {
            return ArticleService.error("findFirst", error);
        }
    }

    static async findUnique<T extends ArticleFindUniqueProps>(props: T): Promise<ResponseFormat<ArticleFindUniqueResponse<T>>> {
        try {
            const article = await PrismaInstance.article.findUnique(props);
            return { data: article as ArticleFindUniqueResponse<T> };
        } catch (error) {
            return ArticleService.error("findUnique", error);
        }
    }

    static async findMany<T extends ArticleFindManyProps>(props: T): Promise<ResponseFormat<ArticleFindManyResponse<T>>> {
        try {
            const articleList = await PrismaInstance.article.findMany(props);
            return { data: articleList as ArticleFindManyResponse<T> };
        } catch (error) {
            return ArticleService.error("findMany", error);
        }
    }

    // ========== Aggregate queries ========== //

    static async count(props: ArticleCountProps): Promise<ResponseFormat<ArticleCountResponse>> {
        try {
            const articleAmount: ArticleCount = await PrismaInstance.article.count(props);
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
