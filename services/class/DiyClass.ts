/**
 * Classe de service pour les opérations CRUD sur les diys
 * 
 * Ce fichier centralise toute la logique d'accès aux données pour les diys.
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
    Diy,
    DiyCreateArgsSchema,
    DiyDeleteArgsSchema,
    DiyFindManyArgsSchema,
    DiyFindUniqueArgsSchema,
    DiyOrderByWithRelationInputSchema,
    DiySchema,
    DiyUpdateArgsSchema,
    DiyUpsertArgsSchema,
    DiyWhereInputSchema,
    DiyWhereUniqueInputSchema,
    DiyWithRelationsSchema
} from "@services/schemas";
import { DiyIncludeSchema } from "@services/schemas/inputTypeSchemas/DiyIncludeSchema";
import { z, ZodError, ZodType } from "zod";

// ============== Types ============== //

export type DiyModel = z.infer<typeof DiySchema>;

export type DiyRelationsOptional = z.infer<typeof DiySchema> & z.infer<typeof DiyIncludeSchema>;

export type DiyRelationsComplete = z.infer<typeof DiyWithRelationsSchema>;

export type DiyCount = number;

// ============== Schema Types ============== //

const createDiySchema: ZodType<Prisma.DiyCreateArgs> = DiyCreateArgsSchema;

const upsertDiySchema: ZodType<Prisma.DiyUpsertArgs> = DiyUpsertArgsSchema;

const updateDiySchema: ZodType<Prisma.DiyUpdateArgs> = DiyUpdateArgsSchema;

const deleteDiySchema: ZodType<Prisma.DiyDeleteArgs> = DiyDeleteArgsSchema;

const selectDiySchema: ZodType<Prisma.DiyFindUniqueArgs> = DiyFindUniqueArgsSchema;

const selectManyDiySchema: ZodType<Prisma.DiyFindManyArgs> = DiyFindManyArgsSchema;

/**
 * Définition du schéma pour DiyCountArgs
 * 
 * Ce schéma correspond au type Prisma.DiyCountArgs qui est défini comme:
 * Omit<DiyFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
 *   select?: DiyCountAggregateInputType | true
 * }
 */
const countDiySchema: ZodType<Prisma.DiyCountArgs> = z.object({
    where: z.lazy(() => DiyWhereInputSchema).optional(),
    orderBy: z.union([
        z.lazy(() => DiyOrderByWithRelationInputSchema),
        z.array(z.lazy(() => DiyOrderByWithRelationInputSchema))
    ]).optional(),
    cursor: z.lazy(() => DiyWhereUniqueInputSchema).optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    select: z.union([z.literal(true), z.record(z.boolean())]).optional()
});

// ============== CRUD Props Types ============== //

export type CreateDiyProps = z.infer<typeof createDiySchema>;

export type UpsertDiyProps = z.infer<typeof upsertDiySchema>;

export type UpdateDiyProps = z.infer<typeof updateDiySchema>;

export type DeleteDiyProps = z.infer<typeof deleteDiySchema>;

export type FindUniqueDiyProps = z.infer<typeof selectDiySchema>;

export type FindManyDiyProps = z.infer<typeof selectManyDiySchema>;

export type CountDiyProps = z.infer<typeof countDiySchema>;

// ============== CRUD Response Types ============== //

export type CreateDiyResponse = DiyModel;

export type UpsertDiyResponse = DiyModel;

export type UpdateDiyResponse = DiyModel;

export type DeleteDiyResponse = DiyModel;

export type FindUniqueDiyResponse = DiyRelationsOptional | null;

export type FindManyDiyResponse = DiyRelationsOptional[];

export type CountDiyResponse = DiyCount;

// ============== Services ============== //

/**
 * Service pour les opérations de base de données sur les diys
 */
export class DiyService {
    /**
     * Crée un(e) nouveau/nouvelle diy
     * @param props Propriétés du/de la diy
     * @returns Diy créé(e) ou erreur
     */
    static async create(props: CreateDiyProps): Promise<ResponseFormat<CreateDiyResponse>> {
        try {
            const { data, include, omit, select } = createDiySchema.parse(props);

            const diy: Diy = await PrismaInstance.diy.create({
                data,
                ...(include && { include }),
                ...(omit && { omit }),
                ...(select && { select }),
            });

            return { data: diy };
        } catch (error) {
            console.error("DiyService -> Create -> " + (error as Error).message);
            if (process.env.NODE_ENV === "development") {
                if (error instanceof ZodError)
                    throw new Error("DiyService -> Create -> Invalid Zod params -> " + error.message);
                if (error instanceof PrismaClientKnownRequestError)
                    throw new Error("DiyService -> Create -> Prisma error -> " + error.message);
                throw new Error("DiyService -> Create -> " + (error as Error).message);
            }
            // TODO: add logging
            return { error: "Unable to create diy..." };
        }
    }

    static async upsert(props: UpsertDiyProps): Promise<ResponseFormat<UpsertDiyResponse>> {
        try {
            const { create, update, where, include, omit, select } = upsertDiySchema.parse(props);

            const diy: Diy = await PrismaInstance.diy.upsert({
                create,
                update,
                where,
                ...(include && { include }),
                ...(omit && { omit }),
                ...(select && { select }),
            });

            return { data: diy };
        } catch (error) {
            console.error("DiyService -> Upsert -> " + (error as Error).message);
            if (process.env.NODE_ENV === "development") {
                if (error instanceof ZodError)
                    throw new Error("DiyService -> Upsert -> Invalid Zod params -> " + error.message);
                if (error instanceof PrismaClientKnownRequestError)
                    throw new Error("DiyService -> Upsert -> Prisma error -> " + error.message);
                throw new Error("DiyService -> Upsert -> " + (error as Error).message);
            }
            // TODO: add logging
            return { error: "Unable to upsert diy..." };
        }
    }

    /**
     * Met à jour un(e) diy
     * @param props ID du/de la diy et nouvelles données
     * @returns Diy mis(e) à jour ou erreur
     */
    static async update(props: UpdateDiyProps): Promise<ResponseFormat<UpdateDiyResponse>> {
        try {
            const { data, where, include, omit, select } = updateDiySchema.parse(props);

            const diy: Diy = await PrismaInstance.diy.update({
                data,
                where,
                ...(include && { include }),
                ...(omit && { omit }),
                ...(select && { select }),
            });

            return { data: diy };
        } catch (error) {
            console.error("DiyService -> Update -> " + (error as Error).message);
            if (process.env.NODE_ENV === "development") {
                if (error instanceof ZodError)
                    throw new Error("DiyService -> Update -> Invalid Zod params -> " + error.message);
                if (error instanceof PrismaClientKnownRequestError)
                    throw new Error("DiyService -> Update -> Prisma error -> " + error.message);
                throw new Error("DiyService -> Update -> " + (error as Error).message);
            }
            // TODO: add logging
            return { error: "Unable to update diy..." };
        }
    }

    /**
     * Supprime un(e) diy
     * @param props ID du/de la diy
     * @returns Diy supprimé(e) ou erreur
     */
    static async delete(props: DeleteDiyProps): Promise<ResponseFormat<DeleteDiyResponse>> {
        try {
            const { where, include, omit, select } = deleteDiySchema.parse(props);

            const diy: Diy = await PrismaInstance.diy.delete({
                where,
                ...(include && { include }),
                ...(omit && { omit }),
                ...(select && { select }),
            });

            return { data: diy };
        } catch (error) {
            console.error("DiyService -> Delete -> " + (error as Error).message);
            if (process.env.NODE_ENV === "development") {
                if (error instanceof ZodError)
                    throw new Error("DiyService -> Delete -> Invalid Zod params -> " + error.message);
                if (error instanceof PrismaClientKnownRequestError)
                    throw new Error("DiyService -> Delete -> Prisma error -> " + error.message);
                throw new Error("DiyService -> Delete -> " + (error as Error).message);
            }
            // TODO: add logging
            return { error: "Unable to delete diy..." };
        }
    }

    /**
     * Récupère un(e) diy par ID ou autre filtre
     */
    static async findUnique(props: FindUniqueDiyProps): Promise<ResponseFormat<FindUniqueDiyResponse>> {
        try {
            const { where, include, omit, select } = selectDiySchema.parse(props);

            const diy: DiyRelationsOptional | null = await PrismaInstance.diy.findUnique({
                where,
                ...(include && { include }),
                ...(omit && { omit }),
                ...(select && { select }),
            });

            return { data: diy };
        } catch (error) {
            console.error("DiyService -> FindUnique -> " + (error as Error).message);
            if (process.env.NODE_ENV === "development") {
                if (error instanceof ZodError)
                    throw new Error("DiyService -> FindUnique -> Invalid Zod params -> " + error.message);
                if (error instanceof PrismaClientKnownRequestError)
                    throw new Error("DiyService -> FindUnique -> Prisma error -> " + error.message);
                throw new Error("DiyService -> FindUnique -> " + (error as Error).message);
            }
            // TODO: add logging
            return { error: "Unable to find diy..." };
        }
    }

    /**
     * Récupère une liste de diys avec filtres
     */
    static async findMany(props: FindManyDiyProps): Promise<ResponseFormat<FindManyDiyResponse>> {
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
            } = selectManyDiySchema.parse(props);

            const diyList: DiyRelationsOptional[] = await PrismaInstance.diy.findMany({
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

            return { data: diyList };
        } catch (error) {
            console.error("DiyService -> FindMany -> " + (error as Error).message);
            if (process.env.NODE_ENV === "development") {
                if (error instanceof ZodError)
                    throw new Error("DiyService -> FindMany -> Invalid Zod params -> " + error.message);
                if (error instanceof PrismaClientKnownRequestError)
                    throw new Error("DiyService -> FindMany -> Prisma error -> " + error.message);
                throw new Error("DiyService -> FindMany -> " + (error as Error).message);
            }
            // TODO: add logging
            return { error: "Unable to find diys..." };
        }
    }

    /**
     * Compte les diys avec filtres
     */
    static async count(props: CountDiyProps): Promise<ResponseFormat<CountDiyResponse>> {
        try {
            const { cursor, orderBy, select, skip, take, where } = countDiySchema.parse(props);

            const diyAmount: DiyCount = await PrismaInstance.diy.count({
                ...(cursor && { cursor }),
                ...(orderBy && { orderBy }),
                ...(select && { select }),
                ...(skip && { skip }),
                ...(take && { take }),
                ...(where && { where }),
            });

            return { data: diyAmount };
        } catch (error) {
            console.error("DiyService -> Count -> " + (error as Error).message);
            if (process.env.NODE_ENV === "development") {
                if (error instanceof ZodError)
                    throw new Error("DiyService -> Count -> Invalid Zod params -> " + error.message);
                if (error instanceof PrismaClientKnownRequestError)
                    throw new Error("DiyService -> Count -> Prisma error -> " + error.message);
                throw new Error("DiyService -> Count -> " + (error as Error).message);
            }
            // TODO: add logging
            return { error: "Unable to count diys..." };
        }
    }
}
