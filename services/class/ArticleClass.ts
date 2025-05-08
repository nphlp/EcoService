import PrismaInstance from "@lib/prisma";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { ArticleCount, CountArticleProps, CountArticleResponse, CreateManyArticleProps, CreateManyArticleResponse, CreateArticleProps, CreateArticleResponse, DeleteManyArticleProps, DeleteManyArticleResponse, DeleteArticleProps, DeleteArticleResponse, FindFirstArticleProps, FindFirstArticleResponse, FindManyArticleProps, FindManyArticleResponse, FindUniqueArticleProps, FindUniqueArticleResponse, UpdateManyArticleProps, UpdateManyArticleResponse, UpdateArticleProps, UpdateArticleResponse, UpsertArticleProps, UpsertArticleResponse, countArticleSchema, createManyArticleSchema, createArticleSchema, deleteManyArticleSchema, deleteArticleSchema, selectFirstArticleSchema, selectManyArticleSchema, selectUniqueArticleSchema, updateManyArticleSchema, updateArticleSchema, upsertArticleSchema } from "@services/types/ArticleType";
import { ResponseFormat } from "@utils/FetchConfig";
import { ZodError } from "zod";

export default class ArticleService {

    // ========== Single mutations ========== //

    static async create<T extends CreateArticleProps>(props: T): Promise<ResponseFormat<CreateArticleResponse<T>>> {
        try {
            const parsedProps = createArticleSchema.parse(props);
            const article = await PrismaInstance.article.create(parsedProps);
            return { data: article as CreateArticleResponse<T> };
        } catch (error) {
            return ArticleService.error("create", error);
        }
    }

    static async upsert<T extends UpsertArticleProps>(props: T): Promise<ResponseFormat<UpsertArticleResponse<T>>> {
        try {
            const parsedProps = upsertArticleSchema.parse(props);
            const article = await PrismaInstance.article.upsert(parsedProps);
            return { data: article as UpsertArticleResponse<T> };
        } catch (error) {
            return ArticleService.error("upsert", error);
        }
    }

    static async update<T extends UpdateArticleProps>(props: T): Promise<ResponseFormat<UpdateArticleResponse<T>>> {
        try {
            const parsedProps = updateArticleSchema.parse(props);
            const article = await PrismaInstance.article.update(parsedProps);
            return { data: article as UpdateArticleResponse<T> };
        } catch (error) {
            return ArticleService.error("update", error);
        }
    }

    static async delete<T extends DeleteArticleProps>(props: T): Promise<ResponseFormat<DeleteArticleResponse<T>>> {
        try {
            const parsedProps = deleteArticleSchema.parse(props);
            const article = await PrismaInstance.article.delete(parsedProps);
            return { data: article as DeleteArticleResponse<T> };
        } catch (error) {
            return ArticleService.error("delete", error);
        }
    }

    // ========== Multiple mutations ========== //

    static async createMany(props: CreateManyArticleProps): Promise<ResponseFormat<CreateManyArticleResponse>> {
        try {
            const parsedProps = createManyArticleSchema.parse(props);
            const result = await PrismaInstance.article.createMany(parsedProps);
            return { data: result };
        } catch (error) {
            return ArticleService.error("createMany", error);
        }
    }

    static async updateMany(props: UpdateManyArticleProps): Promise<ResponseFormat<UpdateManyArticleResponse>> {
        try {
            const parsedProps = updateManyArticleSchema.parse(props);
            const result = await PrismaInstance.article.updateMany(parsedProps);
            return { data: result };
        } catch (error) {
            return ArticleService.error("updateMany", error);
        }
    }

    static async deleteMany(props: DeleteManyArticleProps): Promise<ResponseFormat<DeleteManyArticleResponse>> {
        try {
            const parsedProps = deleteManyArticleSchema.parse(props);
            const result = await PrismaInstance.article.deleteMany(parsedProps);
            return { data: result };
        } catch (error) {
            return ArticleService.error("deleteMany", error);
        }
    }

    // ========== Single queries ========== //

    static async findFirst<T extends FindFirstArticleProps>(props: T): Promise<ResponseFormat<FindFirstArticleResponse<T>>> {
        try {
            const parsedProps = selectFirstArticleSchema.parse(props);
            const article = await PrismaInstance.article.findFirst(parsedProps);
            return { data: article as FindFirstArticleResponse<T> };
        } catch (error) {
            return ArticleService.error("findFirst", error);
        }
    }

    static async findUnique<T extends FindUniqueArticleProps>(props: T): Promise<ResponseFormat<FindUniqueArticleResponse<T>>> {
        try {
            const parsedProps = selectUniqueArticleSchema.parse(props);
            const article = await PrismaInstance.article.findUnique(parsedProps);
            return { data: article as FindUniqueArticleResponse<T> };
        } catch (error) {
            return ArticleService.error("findUnique", error);
        }
    }

    static async findMany<T extends FindManyArticleProps>(props: T): Promise<ResponseFormat<FindManyArticleResponse<T>>> {
        try {
            const parsedProps = selectManyArticleSchema.parse(props);
            const { skip = 0, take = 10 } = parsedProps;
            const articleList = await PrismaInstance.article.findMany({ skip, take, ...parsedProps });
            return { data: articleList as FindManyArticleResponse<T> };
        } catch (error) {
            return ArticleService.error("findMany", error);
        }
    }

    // ========== Aggregate queries ========== //

    static async count(props: CountArticleProps): Promise<ResponseFormat<CountArticleResponse>> {
        try {
            const parsedProps = countArticleSchema.parse(props);
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
