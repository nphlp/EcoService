/**
 * Classe de service pour les opérations CRUD sur les contents
 * 
 * Ce fichier centralise toute la logique d'accès aux données pour les contents.
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
    Content,
    ContentCreateArgsSchema,
    ContentDeleteArgsSchema,
    ContentFindManyArgsSchema,
    ContentFindUniqueArgsSchema,
    ContentOrderByWithRelationInputSchema,
    ContentSchema,
    ContentUpdateArgsSchema,
    ContentUpsertArgsSchema,
    ContentWhereInputSchema,
    ContentWhereUniqueInputSchema,
    ContentWithRelationsSchema
} from "@services/schemas";
import { ContentIncludeSchema } from "@services/schemas/inputTypeSchemas/ContentIncludeSchema";
import { z, ZodError, ZodType } from "zod";

// ============== Types ============== //

export type ContentModel = z.infer<typeof ContentSchema>;

export type ContentRelationsOptional = z.infer<typeof ContentSchema> & z.infer<typeof ContentIncludeSchema>;

export type ContentRelationsComplete = z.infer<typeof ContentWithRelationsSchema>;

export type ContentCount = number;

// ============== Schema Types ============== //

const createContentSchema: ZodType<Prisma.ContentCreateArgs> = ContentCreateArgsSchema;

const upsertContentSchema: ZodType<Prisma.ContentUpsertArgs> = ContentUpsertArgsSchema;

const updateContentSchema: ZodType<Prisma.ContentUpdateArgs> = ContentUpdateArgsSchema;

const deleteContentSchema: ZodType<Prisma.ContentDeleteArgs> = ContentDeleteArgsSchema;

const selectContentSchema: ZodType<Prisma.ContentFindUniqueArgs> = ContentFindUniqueArgsSchema;

const selectManyContentSchema: ZodType<Prisma.ContentFindManyArgs> = ContentFindManyArgsSchema;

/**
 * Définition du schéma pour ContentCountArgs
 * 
 * Ce schéma correspond au type Prisma.ContentCountArgs qui est défini comme:
 * Omit<ContentFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
 *   select?: ContentCountAggregateInputType | true
 * }
 */
const countContentSchema: ZodType<Prisma.ContentCountArgs> = z.object({
    where: z.lazy(() => ContentWhereInputSchema).optional(),
    orderBy: z.union([
        z.lazy(() => ContentOrderByWithRelationInputSchema),
        z.array(z.lazy(() => ContentOrderByWithRelationInputSchema))
    ]).optional(),
    cursor: z.lazy(() => ContentWhereUniqueInputSchema).optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    select: z.union([z.literal(true), z.record(z.boolean())]).optional()
});

// ============== CRUD Props Types ============== //

export type CreateContentProps = z.infer<typeof createContentSchema>;

export type UpsertContentProps = z.infer<typeof upsertContentSchema>;

export type UpdateContentProps = z.infer<typeof updateContentSchema>;

export type DeleteContentProps = z.infer<typeof deleteContentSchema>;

export type FindUniqueContentProps = z.infer<typeof selectContentSchema>;

export type FindManyContentProps = z.infer<typeof selectManyContentSchema>;

export type CountContentProps = z.infer<typeof countContentSchema>;

// ============== CRUD Response Types ============== //

export type CreateContentResponse = ContentModel;

export type UpsertContentResponse = ContentModel;

export type UpdateContentResponse = ContentModel;

export type DeleteContentResponse = ContentModel;

export type FindUniqueContentResponse = ContentRelationsOptional | null;

export type FindManyContentResponse = ContentRelationsOptional[];

export type CountContentResponse = ContentCount;

// ============== Services ============== //

/**
 * Service pour les opérations de base de données sur les contents
 */
export class ContentService {
    /**
     * Crée un(e) nouveau/nouvelle content
     * @param props Propriétés du/de la content
     * @returns Content créé(e) ou erreur
     */
    static async create(props: CreateContentProps): Promise<ResponseFormat<CreateContentResponse>> {
        try {
            const { data, include, omit, select } = createContentSchema.parse(props);

            const content: Content = await PrismaInstance.content.create({
                data,
                ...(include && { include }),
                ...(omit && { omit }),
                ...(select && { select }),
            });

            return { data: content };
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

    static async upsert(props: UpsertContentProps): Promise<ResponseFormat<UpsertContentResponse>> {
        try {
            const { create, update, where, include, omit, select } = upsertContentSchema.parse(props);

            const content: Content = await PrismaInstance.content.upsert({
                create,
                update,
                where,
                ...(include && { include }),
                ...(omit && { omit }),
                ...(select && { select }),
            });

            return { data: content };
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

    /**
     * Met à jour un(e) content
     * @param props ID du/de la content et nouvelles données
     * @returns Content mis(e) à jour ou erreur
     */
    static async update(props: UpdateContentProps): Promise<ResponseFormat<UpdateContentResponse>> {
        try {
            const { data, where, include, omit, select } = updateContentSchema.parse(props);

            const content: Content = await PrismaInstance.content.update({
                data,
                where,
                ...(include && { include }),
                ...(omit && { omit }),
                ...(select && { select }),
            });

            return { data: content };
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

    /**
     * Supprime un(e) content
     * @param props ID du/de la content
     * @returns Content supprimé(e) ou erreur
     */
    static async delete(props: DeleteContentProps): Promise<ResponseFormat<DeleteContentResponse>> {
        try {
            const { where, include, omit, select } = deleteContentSchema.parse(props);

            const content: Content = await PrismaInstance.content.delete({
                where,
                ...(include && { include }),
                ...(omit && { omit }),
                ...(select && { select }),
            });

            return { data: content };
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

    /**
     * Récupère un(e) content par ID ou autre filtre
     */
    static async findUnique(props: FindUniqueContentProps): Promise<ResponseFormat<FindUniqueContentResponse>> {
        try {
            const { where, include, omit, select } = selectContentSchema.parse(props);

            const content: ContentRelationsOptional | null = await PrismaInstance.content.findUnique({
                where,
                ...(include && { include }),
                ...(omit && { omit }),
                ...(select && { select }),
            });

            return { data: content };
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

    /**
     * Récupère une liste de contents avec filtres
     */
    static async findMany(props: FindManyContentProps): Promise<ResponseFormat<FindManyContentResponse>> {
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
            } = selectManyContentSchema.parse(props);

            const contentList: ContentRelationsOptional[] = await PrismaInstance.content.findMany({
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

            return { data: contentList };
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

    /**
     * Compte les contents avec filtres
     */
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
