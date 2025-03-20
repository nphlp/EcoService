/**
 * Classe de service pour les opérations CRUD sur les doItYourselfs
 * 
 * Ce fichier centralise toute la logique d'accès aux données pour les doItYourselfs.
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
    DoItYourself,
    DoItYourselfCreateArgsSchema,
    DoItYourselfDeleteArgsSchema,
    DoItYourselfFindManyArgsSchema,
    DoItYourselfFindUniqueArgsSchema,
    DoItYourselfOrderByWithRelationInputSchema,
    DoItYourselfSchema,
    DoItYourselfUpdateArgsSchema,
    DoItYourselfUpsertArgsSchema,
    DoItYourselfWhereInputSchema,
    DoItYourselfWhereUniqueInputSchema,
    DoItYourselfWithRelationsSchema
} from "@services/schemas";
import { DoItYourselfIncludeSchema } from "@services/schemas/inputTypeSchemas/DoItYourselfIncludeSchema";
import { z, ZodError, ZodType } from "zod";

// ============== Types ============== //

export type DoItYourselfModel = z.infer<typeof DoItYourselfSchema>;

export type DoItYourselfRelationsOptional = z.infer<typeof DoItYourselfSchema> & z.infer<typeof DoItYourselfIncludeSchema>;

export type DoItYourselfRelationsComplete = z.infer<typeof DoItYourselfWithRelationsSchema>;

export type DoItYourselfCount = number;

// ============== Schema Types ============== //

const createDoItYourselfSchema: ZodType<Prisma.DoItYourselfCreateArgs> = DoItYourselfCreateArgsSchema;

const upsertDoItYourselfSchema: ZodType<Prisma.DoItYourselfUpsertArgs> = DoItYourselfUpsertArgsSchema;

const updateDoItYourselfSchema: ZodType<Prisma.DoItYourselfUpdateArgs> = DoItYourselfUpdateArgsSchema;

const deleteDoItYourselfSchema: ZodType<Prisma.DoItYourselfDeleteArgs> = DoItYourselfDeleteArgsSchema;

const selectDoItYourselfSchema: ZodType<Prisma.DoItYourselfFindUniqueArgs> = DoItYourselfFindUniqueArgsSchema;

const selectManyDoItYourselfSchema: ZodType<Prisma.DoItYourselfFindManyArgs> = DoItYourselfFindManyArgsSchema;

/**
 * Définition du schéma pour DoItYourselfCountArgs
 * 
 * Ce schéma correspond au type Prisma.DoItYourselfCountArgs qui est défini comme:
 * Omit<DoItYourselfFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
 *   select?: DoItYourselfCountAggregateInputType | true
 * }
 */
const countDoItYourselfSchema: ZodType<Prisma.DoItYourselfCountArgs> = z.object({
    where: z.lazy(() => DoItYourselfWhereInputSchema).optional(),
    orderBy: z.union([
        z.lazy(() => DoItYourselfOrderByWithRelationInputSchema),
        z.array(z.lazy(() => DoItYourselfOrderByWithRelationInputSchema))
    ]).optional(),
    cursor: z.lazy(() => DoItYourselfWhereUniqueInputSchema).optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    select: z.union([z.literal(true), z.record(z.boolean())]).optional()
});

// ============== CRUD Props Types ============== //

export type CreateDoItYourselfProps = z.infer<typeof createDoItYourselfSchema>;

export type UpsertDoItYourselfProps = z.infer<typeof upsertDoItYourselfSchema>;

export type UpdateDoItYourselfProps = z.infer<typeof updateDoItYourselfSchema>;

export type DeleteDoItYourselfProps = z.infer<typeof deleteDoItYourselfSchema>;

export type FindUniqueDoItYourselfProps = z.infer<typeof selectDoItYourselfSchema>;

export type FindManyDoItYourselfProps = z.infer<typeof selectManyDoItYourselfSchema>;

export type CountDoItYourselfProps = z.infer<typeof countDoItYourselfSchema>;

// ============== CRUD Response Types ============== //

export type CreateDoItYourselfResponse = DoItYourselfModel;

export type UpsertDoItYourselfResponse = DoItYourselfModel;

export type UpdateDoItYourselfResponse = DoItYourselfModel;

export type DeleteDoItYourselfResponse = DoItYourselfModel;

export type FindUniqueDoItYourselfResponse = DoItYourselfRelationsOptional | null;

export type FindManyDoItYourselfResponse = DoItYourselfRelationsOptional[];

export type CountDoItYourselfResponse = DoItYourselfCount;

// ============== Services ============== //

/**
 * Service pour les opérations de base de données sur les doItYourselfs
 */
export class DoItYourselfService {
    /**
     * Crée un(e) nouveau/nouvelle doItYourself
     * @param props Propriétés du/de la doItYourself
     * @returns DoItYourself créé(e) ou erreur
     */
    static async create(props: CreateDoItYourselfProps): Promise<ResponseFormat<CreateDoItYourselfResponse>> {
        try {
            const { data, include, omit, select } = createDoItYourselfSchema.parse(props);

            const doItYourself: DoItYourself = await PrismaInstance.doItYourself.create({
                data,
                ...(include && { include }),
                ...(omit && { omit }),
                ...(select && { select }),
            });

            return { data: doItYourself };
        } catch (error) {
            console.error("DoItYourselfService -> Create -> " + (error as Error).message);
            if (process.env.NODE_ENV === "development") {
                if (error instanceof ZodError)
                    throw new Error("DoItYourselfService -> Create -> Invalid Zod params -> " + error.message);
                if (error instanceof PrismaClientKnownRequestError)
                    throw new Error("DoItYourselfService -> Create -> Prisma error -> " + error.message);
                throw new Error("DoItYourselfService -> Create -> " + (error as Error).message);
            }
            // TODO: add logging
            return { error: "Unable to create doItYourself..." };
        }
    }

    static async upsert(props: UpsertDoItYourselfProps): Promise<ResponseFormat<UpsertDoItYourselfResponse>> {
        try {
            const { create, update, where, include, omit, select } = upsertDoItYourselfSchema.parse(props);

            const doItYourself: DoItYourself = await PrismaInstance.doItYourself.upsert({
                create,
                update,
                where,
                ...(include && { include }),
                ...(omit && { omit }),
                ...(select && { select }),
            });

            return { data: doItYourself };
        } catch (error) {
            console.error("DoItYourselfService -> Upsert -> " + (error as Error).message);
            if (process.env.NODE_ENV === "development") {
                if (error instanceof ZodError)
                    throw new Error("DoItYourselfService -> Upsert -> Invalid Zod params -> " + error.message);
                if (error instanceof PrismaClientKnownRequestError)
                    throw new Error("DoItYourselfService -> Upsert -> Prisma error -> " + error.message);
                throw new Error("DoItYourselfService -> Upsert -> " + (error as Error).message);
            }
            // TODO: add logging
            return { error: "Unable to upsert doItYourself..." };
        }
    }

    /**
     * Met à jour un(e) doItYourself
     * @param props ID du/de la doItYourself et nouvelles données
     * @returns DoItYourself mis(e) à jour ou erreur
     */
    static async update(props: UpdateDoItYourselfProps): Promise<ResponseFormat<UpdateDoItYourselfResponse>> {
        try {
            const { data, where, include, omit, select } = updateDoItYourselfSchema.parse(props);

            const doItYourself: DoItYourself = await PrismaInstance.doItYourself.update({
                data,
                where,
                ...(include && { include }),
                ...(omit && { omit }),
                ...(select && { select }),
            });

            return { data: doItYourself };
        } catch (error) {
            console.error("DoItYourselfService -> Update -> " + (error as Error).message);
            if (process.env.NODE_ENV === "development") {
                if (error instanceof ZodError)
                    throw new Error("DoItYourselfService -> Update -> Invalid Zod params -> " + error.message);
                if (error instanceof PrismaClientKnownRequestError)
                    throw new Error("DoItYourselfService -> Update -> Prisma error -> " + error.message);
                throw new Error("DoItYourselfService -> Update -> " + (error as Error).message);
            }
            // TODO: add logging
            return { error: "Unable to update doItYourself..." };
        }
    }

    /**
     * Supprime un(e) doItYourself
     * @param props ID du/de la doItYourself
     * @returns DoItYourself supprimé(e) ou erreur
     */
    static async delete(props: DeleteDoItYourselfProps): Promise<ResponseFormat<DeleteDoItYourselfResponse>> {
        try {
            const { where, include, omit, select } = deleteDoItYourselfSchema.parse(props);

            const doItYourself: DoItYourself = await PrismaInstance.doItYourself.delete({
                where,
                ...(include && { include }),
                ...(omit && { omit }),
                ...(select && { select }),
            });

            return { data: doItYourself };
        } catch (error) {
            console.error("DoItYourselfService -> Delete -> " + (error as Error).message);
            if (process.env.NODE_ENV === "development") {
                if (error instanceof ZodError)
                    throw new Error("DoItYourselfService -> Delete -> Invalid Zod params -> " + error.message);
                if (error instanceof PrismaClientKnownRequestError)
                    throw new Error("DoItYourselfService -> Delete -> Prisma error -> " + error.message);
                throw new Error("DoItYourselfService -> Delete -> " + (error as Error).message);
            }
            // TODO: add logging
            return { error: "Unable to delete doItYourself..." };
        }
    }

    /**
     * Récupère un(e) doItYourself par ID ou autre filtre
     */
    static async findUnique(props: FindUniqueDoItYourselfProps): Promise<ResponseFormat<FindUniqueDoItYourselfResponse>> {
        try {
            const { where, include, omit, select } = selectDoItYourselfSchema.parse(props);

            const doItYourself: DoItYourselfRelationsOptional | null = await PrismaInstance.doItYourself.findUnique({
                where,
                ...(include && { include }),
                ...(omit && { omit }),
                ...(select && { select }),
            });

            return { data: doItYourself };
        } catch (error) {
            console.error("DoItYourselfService -> FindUnique -> " + (error as Error).message);
            if (process.env.NODE_ENV === "development") {
                if (error instanceof ZodError)
                    throw new Error("DoItYourselfService -> FindUnique -> Invalid Zod params -> " + error.message);
                if (error instanceof PrismaClientKnownRequestError)
                    throw new Error("DoItYourselfService -> FindUnique -> Prisma error -> " + error.message);
                throw new Error("DoItYourselfService -> FindUnique -> " + (error as Error).message);
            }
            // TODO: add logging
            return { error: "Unable to find doItYourself..." };
        }
    }

    /**
     * Récupère une liste de doItYourselfs avec filtres
     */
    static async findMany(props: FindManyDoItYourselfProps): Promise<ResponseFormat<FindManyDoItYourselfResponse>> {
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
            } = selectManyDoItYourselfSchema.parse(props);

            const doItYourselfList: DoItYourselfRelationsOptional[] = await PrismaInstance.doItYourself.findMany({
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

            return { data: doItYourselfList };
        } catch (error) {
            console.error("DoItYourselfService -> FindMany -> " + (error as Error).message);
            if (process.env.NODE_ENV === "development") {
                if (error instanceof ZodError)
                    throw new Error("DoItYourselfService -> FindMany -> Invalid Zod params -> " + error.message);
                if (error instanceof PrismaClientKnownRequestError)
                    throw new Error("DoItYourselfService -> FindMany -> Prisma error -> " + error.message);
                throw new Error("DoItYourselfService -> FindMany -> " + (error as Error).message);
            }
            // TODO: add logging
            return { error: "Unable to find doItYourselfs..." };
        }
    }

    /**
     * Compte les doItYourselfs avec filtres
     */
    static async count(props: CountDoItYourselfProps): Promise<ResponseFormat<CountDoItYourselfResponse>> {
        try {
            const { cursor, orderBy, select, skip, take, where } = countDoItYourselfSchema.parse(props);

            const doItYourselfAmount: DoItYourselfCount = await PrismaInstance.doItYourself.count({
                ...(cursor && { cursor }),
                ...(orderBy && { orderBy }),
                ...(select && { select }),
                ...(skip && { skip }),
                ...(take && { take }),
                ...(where && { where }),
            });

            return { data: doItYourselfAmount };
        } catch (error) {
            console.error("DoItYourselfService -> Count -> " + (error as Error).message);
            if (process.env.NODE_ENV === "development") {
                if (error instanceof ZodError)
                    throw new Error("DoItYourselfService -> Count -> Invalid Zod params -> " + error.message);
                if (error instanceof PrismaClientKnownRequestError)
                    throw new Error("DoItYourselfService -> Count -> Prisma error -> " + error.message);
                throw new Error("DoItYourselfService -> Count -> " + (error as Error).message);
            }
            // TODO: add logging
            return { error: "Unable to count doItYourselfs..." };
        }
    }
}
