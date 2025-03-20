/**
 * Classe de service pour les opérations CRUD sur les articles
 * 
 * Ce fichier centralise toute la logique d'accès aux données pour les articles.
 * Il utilise les schémas Zod générés par zod-prisma-types pour la validation des données.
 * Chaque méthode retourne soit les données demandées, soit une erreur formatée.
 * 
 * Les types sont définis pour correspondre aux opérations Prisma (create, update, delete, etc.)
 * et suivent une nomenclature cohérente avec l'API Prisma.
 */
import { ResponseFormat } from "@app/api/Routes";
import PrismaInstance from "@lib/prisma";
import { Prisma } from "@prisma/client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import {
    Article,
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
    ArticleWithRelationsSchema
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

/**
 * Définition du schéma pour ArticleCountArgs
 * 
 * Ce schéma correspond au type Prisma.ArticleCountArgs qui est défini comme:
 * Omit<ArticleFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
 *   select?: ArticleCountAggregateInputType | true
 * }
 */
const countArticleSchema: ZodType<Prisma.ArticleCountArgs> = z.object({
    where: z.lazy(() => ArticleWhereInputSchema).optional(),
    orderBy: z.union([
        z.lazy(() => ArticleOrderByWithRelationInputSchema),
        z.array(z.lazy(() => ArticleOrderByWithRelationInputSchema))
    ]).optional(),
    cursor: z.lazy(() => ArticleWhereUniqueInputSchema).optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    select: z.union([z.literal(true), z.record(z.boolean())]).optional()
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

export type CreateArticleResponse = ArticleModel;

export type UpsertArticleResponse = ArticleModel;

export type UpdateArticleResponse = ArticleModel;

export type DeleteArticleResponse = ArticleModel;

export type FindUniqueArticleResponse = ArticleRelationsOptional | null;

export type FindManyArticleResponse = ArticleRelationsOptional[];

export type CountArticleResponse = ArticleCount;

// ============== Services ============== //

/**
 * Service pour les opérations de base de données sur les articles
 */
export class ArticleService {
    /**
     * Crée un(e) nouveau/nouvelle article
     * @param props Propriétés du/de la article
     * @returns Article créé(e) ou erreur
     */
    static async create(props: CreateArticleProps): Promise<ResponseFormat<CreateArticleResponse>> {
        try {
            const { data, include, omit, select } = createArticleSchema.parse(props);

            const article: Article = await PrismaInstance.article.create({
                data,
                ...(include && { include }),
                ...(omit && { omit }),
                ...(select && { select }),
            });

            return { data: article };
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

    static async upsert(props: UpsertArticleProps): Promise<ResponseFormat<UpsertArticleResponse>> {
        try {
            const { create, update, where, include, omit, select } = upsertArticleSchema.parse(props);

            const article: Article = await PrismaInstance.article.upsert({
                create,
                update,
                where,
                ...(include && { include }),
                ...(omit && { omit }),
                ...(select && { select }),
            });

            return { data: article };
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

    /**
     * Met à jour un(e) article
     * @param props ID du/de la article et nouvelles données
     * @returns Article mis(e) à jour ou erreur
     */
    static async update(props: UpdateArticleProps): Promise<ResponseFormat<UpdateArticleResponse>> {
        try {
            const { data, where, include, omit, select } = updateArticleSchema.parse(props);

            const article: Article = await PrismaInstance.article.update({
                data,
                where,
                ...(include && { include }),
                ...(omit && { omit }),
                ...(select && { select }),
            });

            return { data: article };
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

    /**
     * Supprime un(e) article
     * @param props ID du/de la article
     * @returns Article supprimé(e) ou erreur
     */
    static async delete(props: DeleteArticleProps): Promise<ResponseFormat<DeleteArticleResponse>> {
        try {
            const { where, include, omit, select } = deleteArticleSchema.parse(props);

            const article: Article = await PrismaInstance.article.delete({
                where,
                ...(include && { include }),
                ...(omit && { omit }),
                ...(select && { select }),
            });

            return { data: article };
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

    /**
     * Récupère un(e) article par ID ou autre filtre
     */
    static async findUnique(props: FindUniqueArticleProps): Promise<ResponseFormat<FindUniqueArticleResponse>> {
        try {
            const { where, include, omit, select } = selectArticleSchema.parse(props);

            const article: ArticleRelationsOptional | null = await PrismaInstance.article.findUnique({
                where,
                ...(include && { include }),
                ...(omit && { omit }),
                ...(select && { select }),
            });

            return { data: article };
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
    static async findMany(props: FindManyArticleProps): Promise<ResponseFormat<FindManyArticleResponse>> {
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

            const articleList: ArticleRelationsOptional[] = await PrismaInstance.article.findMany({
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

            return { data: articleList };
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
