import { ResponseFormat } from "@app/api/Routes";
import PrismaInstance from "@lib/prisma";
import { Prisma } from "@prisma/client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import {
    ArticleCreateArgsSchema,
    ArticleDeleteArgsSchema,
    ArticleFindManyArgsSchema,
    ArticleFindUniqueArgsSchema,
    ArticleOrderByWithRelationInputSchema,
    ArticleSchema,
    ArticleUpdateArgsSchema,
    ArticleUpsertArgsSchema,
    ArticleWhereInputSchema,
    ArticleWhereUniqueInputSchema,
    ArticleWithRelationsSchema,
} from "@services/schemas";
import { ArticleIncludeSchema } from "@services/schemas/inputTypeSchemas/ArticleIncludeSchema";
import { z, ZodError, ZodType } from "zod";

// ============== Types ============== //

export type ArticleModel = z.infer<typeof ArticleSchema>;
export type ArticleRelationsOptional = z.infer<typeof ArticleSchema> & z.infer<typeof ArticleIncludeSchema>;
export type ArticleRelationsComplete = z.infer<typeof ArticleWithRelationsSchema>;
export type ArticleCount = number;

// ============== Schema Types ============== //

const createArticleSchema: ZodType<Prisma.ArticleCreateArgs> = ArticleCreateArgsSchema;
const upsertArticleSchema: ZodType<Prisma.ArticleUpsertArgs> = ArticleUpsertArgsSchema;
const updateArticleSchema: ZodType<Prisma.ArticleUpdateArgs> = ArticleUpdateArgsSchema;
const deleteArticleSchema: ZodType<Prisma.ArticleDeleteArgs> = ArticleDeleteArgsSchema;
const selectArticleSchema: ZodType<Prisma.ArticleFindUniqueArgs> = ArticleFindUniqueArgsSchema;
const selectManyArticleSchema: ZodType<Prisma.ArticleFindManyArgs> = ArticleFindManyArgsSchema;
const countArticleSchema: ZodType<Prisma.ArticleCountArgs> = z.object({
    where: z.lazy(() => ArticleWhereInputSchema).optional(),
    orderBy: z
        .union([
            z.lazy(() => ArticleOrderByWithRelationInputSchema),
            z.array(z.lazy(() => ArticleOrderByWithRelationInputSchema)),
        ])
        .optional(),
    cursor: z.lazy(() => ArticleWhereUniqueInputSchema).optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    select: z.union([z.literal(true), z.record(z.boolean())]).optional(),
});

// ============== CRUD Props Types ============== //

export type CreateArticleProps = z.infer<typeof createArticleSchema>;
export type UpsertArticleProps = z.infer<typeof upsertArticleSchema>;
export type UpdateArticleProps = z.infer<typeof updateArticleSchema>;
export type DeleteArticleProps = z.infer<typeof deleteArticleSchema>;
export type FindUniqueArticleProps = z.infer<typeof selectArticleSchema>;
export type FindManyArticleProps = z.infer<typeof selectManyArticleSchema>;
export type CountArticleProps = z.infer<typeof countArticleSchema>;

// ============== CRUD Response Types ============== //

export type CreateArticleResponse<T extends CreateArticleProps> = Prisma.ArticleGetPayload<T>;
export type UpsertArticleResponse<T extends UpsertArticleProps> = Prisma.ArticleGetPayload<T>;
export type UpdateArticleResponse<T extends UpdateArticleProps> = Prisma.ArticleGetPayload<T>;
export type DeleteArticleResponse<T extends DeleteArticleProps> = Prisma.ArticleGetPayload<T>;
export type FindUniqueArticleResponse<T extends FindUniqueArticleProps> = Prisma.ArticleGetPayload<T> | null;
export type FindManyArticleResponse<T extends FindManyArticleProps> = Prisma.ArticleGetPayload<T>[];
export type CountArticleResponse = ArticleCount;

// ============== Services ============== //

export class ArticleService {
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

    /**
     * Récupère une liste de articles avec filtres
     */
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

    /**
     * Compte les articles avec filtres
     */
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
