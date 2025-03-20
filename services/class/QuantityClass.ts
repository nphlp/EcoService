/**
 * Classe de service pour les opérations CRUD sur les quantitys
 * 
 * Ce fichier centralise toute la logique d'accès aux données pour les quantitys.
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
    Quantity,
    QuantityCreateArgsSchema,
    QuantityDeleteArgsSchema,
    QuantityFindManyArgsSchema,
    QuantityFindUniqueArgsSchema,
    QuantityOrderByWithRelationInputSchema,
    QuantitySchema,
    QuantityUpdateArgsSchema,
    QuantityUpsertArgsSchema,
    QuantityWhereInputSchema,
    QuantityWhereUniqueInputSchema,
    QuantityWithRelationsSchema
} from "@services/schemas";
import { QuantityIncludeSchema } from "@services/schemas/inputTypeSchemas/QuantityIncludeSchema";
import { z, ZodError, ZodType } from "zod";

// ============== Types ============== //

export type QuantityModel = z.infer<typeof QuantitySchema>;

export type QuantityRelationsOptional = z.infer<typeof QuantitySchema> & z.infer<typeof QuantityIncludeSchema>;

export type QuantityRelationsComplete = z.infer<typeof QuantityWithRelationsSchema>;

export type QuantityCount = number;

// ============== Schema Types ============== //

const createQuantitySchema: ZodType<Prisma.QuantityCreateArgs> = QuantityCreateArgsSchema;

const upsertQuantitySchema: ZodType<Prisma.QuantityUpsertArgs> = QuantityUpsertArgsSchema;

const updateQuantitySchema: ZodType<Prisma.QuantityUpdateArgs> = QuantityUpdateArgsSchema;

const deleteQuantitySchema: ZodType<Prisma.QuantityDeleteArgs> = QuantityDeleteArgsSchema;

const selectQuantitySchema: ZodType<Prisma.QuantityFindUniqueArgs> = QuantityFindUniqueArgsSchema;

const selectManyQuantitySchema: ZodType<Prisma.QuantityFindManyArgs> = QuantityFindManyArgsSchema;

/**
 * Définition du schéma pour QuantityCountArgs
 * 
 * Ce schéma correspond au type Prisma.QuantityCountArgs qui est défini comme:
 * Omit<QuantityFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
 *   select?: QuantityCountAggregateInputType | true
 * }
 */
const countQuantitySchema: ZodType<Prisma.QuantityCountArgs> = z.object({
    where: z.lazy(() => QuantityWhereInputSchema).optional(),
    orderBy: z.union([
        z.lazy(() => QuantityOrderByWithRelationInputSchema),
        z.array(z.lazy(() => QuantityOrderByWithRelationInputSchema))
    ]).optional(),
    cursor: z.lazy(() => QuantityWhereUniqueInputSchema).optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    select: z.union([z.literal(true), z.record(z.boolean())]).optional()
});

// ============== CRUD Props Types ============== //

export type CreateQuantityProps = z.infer<typeof createQuantitySchema>;

export type UpsertQuantityProps = z.infer<typeof upsertQuantitySchema>;

export type UpdateQuantityProps = z.infer<typeof updateQuantitySchema>;

export type DeleteQuantityProps = z.infer<typeof deleteQuantitySchema>;

export type FindUniqueQuantityProps = z.infer<typeof selectQuantitySchema>;

export type FindManyQuantityProps = z.infer<typeof selectManyQuantitySchema>;

export type CountQuantityProps = z.infer<typeof countQuantitySchema>;

// ============== CRUD Response Types ============== //

export type CreateQuantityResponse = QuantityModel;

export type UpsertQuantityResponse = QuantityModel;

export type UpdateQuantityResponse = QuantityModel;

export type DeleteQuantityResponse = QuantityModel;

export type FindUniqueQuantityResponse = QuantityRelationsOptional | null;

export type FindManyQuantityResponse = QuantityRelationsOptional[];

export type CountQuantityResponse = QuantityCount;

// ============== Services ============== //

/**
 * Service pour les opérations de base de données sur les quantitys
 */
export class QuantityService {
    /**
     * Crée un(e) nouveau/nouvelle quantity
     * @param props Propriétés du/de la quantity
     * @returns Quantity créé(e) ou erreur
     */
    static async create(props: CreateQuantityProps): Promise<ResponseFormat<CreateQuantityResponse>> {
        try {
            const { data, include, omit, select } = createQuantitySchema.parse(props);

            const quantity: Quantity = await PrismaInstance.quantity.create({
                data,
                ...(include && { include }),
                ...(omit && { omit }),
                ...(select && { select }),
            });

            return { data: quantity };
        } catch (error) {
            console.error("QuantityService -> Create -> " + (error as Error).message);
            if (process.env.NODE_ENV === "development") {
                if (error instanceof ZodError)
                    throw new Error("QuantityService -> Create -> Invalid Zod params -> " + error.message);
                if (error instanceof PrismaClientKnownRequestError)
                    throw new Error("QuantityService -> Create -> Prisma error -> " + error.message);
                throw new Error("QuantityService -> Create -> " + (error as Error).message);
            }
            // TODO: add logging
            return { error: "Unable to create quantity..." };
        }
    }

    static async upsert(props: UpsertQuantityProps): Promise<ResponseFormat<UpsertQuantityResponse>> {
        try {
            const { create, update, where, include, omit, select } = upsertQuantitySchema.parse(props);

            const quantity: Quantity = await PrismaInstance.quantity.upsert({
                create,
                update,
                where,
                ...(include && { include }),
                ...(omit && { omit }),
                ...(select && { select }),
            });

            return { data: quantity };
        } catch (error) {
            console.error("QuantityService -> Upsert -> " + (error as Error).message);
            if (process.env.NODE_ENV === "development") {
                if (error instanceof ZodError)
                    throw new Error("QuantityService -> Upsert -> Invalid Zod params -> " + error.message);
                if (error instanceof PrismaClientKnownRequestError)
                    throw new Error("QuantityService -> Upsert -> Prisma error -> " + error.message);
                throw new Error("QuantityService -> Upsert -> " + (error as Error).message);
            }
            // TODO: add logging
            return { error: "Unable to upsert quantity..." };
        }
    }

    /**
     * Met à jour un(e) quantity
     * @param props ID du/de la quantity et nouvelles données
     * @returns Quantity mis(e) à jour ou erreur
     */
    static async update(props: UpdateQuantityProps): Promise<ResponseFormat<UpdateQuantityResponse>> {
        try {
            const { data, where, include, omit, select } = updateQuantitySchema.parse(props);

            const quantity: Quantity = await PrismaInstance.quantity.update({
                data,
                where,
                ...(include && { include }),
                ...(omit && { omit }),
                ...(select && { select }),
            });

            return { data: quantity };
        } catch (error) {
            console.error("QuantityService -> Update -> " + (error as Error).message);
            if (process.env.NODE_ENV === "development") {
                if (error instanceof ZodError)
                    throw new Error("QuantityService -> Update -> Invalid Zod params -> " + error.message);
                if (error instanceof PrismaClientKnownRequestError)
                    throw new Error("QuantityService -> Update -> Prisma error -> " + error.message);
                throw new Error("QuantityService -> Update -> " + (error as Error).message);
            }
            // TODO: add logging
            return { error: "Unable to update quantity..." };
        }
    }

    /**
     * Supprime un(e) quantity
     * @param props ID du/de la quantity
     * @returns Quantity supprimé(e) ou erreur
     */
    static async delete(props: DeleteQuantityProps): Promise<ResponseFormat<DeleteQuantityResponse>> {
        try {
            const { where, include, omit, select } = deleteQuantitySchema.parse(props);

            const quantity: Quantity = await PrismaInstance.quantity.delete({
                where,
                ...(include && { include }),
                ...(omit && { omit }),
                ...(select && { select }),
            });

            return { data: quantity };
        } catch (error) {
            console.error("QuantityService -> Delete -> " + (error as Error).message);
            if (process.env.NODE_ENV === "development") {
                if (error instanceof ZodError)
                    throw new Error("QuantityService -> Delete -> Invalid Zod params -> " + error.message);
                if (error instanceof PrismaClientKnownRequestError)
                    throw new Error("QuantityService -> Delete -> Prisma error -> " + error.message);
                throw new Error("QuantityService -> Delete -> " + (error as Error).message);
            }
            // TODO: add logging
            return { error: "Unable to delete quantity..." };
        }
    }

    /**
     * Récupère un(e) quantity par ID ou autre filtre
     */
    static async findUnique(props: FindUniqueQuantityProps): Promise<ResponseFormat<FindUniqueQuantityResponse>> {
        try {
            const { where, include, omit, select } = selectQuantitySchema.parse(props);

            const quantity: QuantityRelationsOptional | null = await PrismaInstance.quantity.findUnique({
                where,
                ...(include && { include }),
                ...(omit && { omit }),
                ...(select && { select }),
            });

            return { data: quantity };
        } catch (error) {
            console.error("QuantityService -> FindUnique -> " + (error as Error).message);
            if (process.env.NODE_ENV === "development") {
                if (error instanceof ZodError)
                    throw new Error("QuantityService -> FindUnique -> Invalid Zod params -> " + error.message);
                if (error instanceof PrismaClientKnownRequestError)
                    throw new Error("QuantityService -> FindUnique -> Prisma error -> " + error.message);
                throw new Error("QuantityService -> FindUnique -> " + (error as Error).message);
            }
            // TODO: add logging
            return { error: "Unable to find quantity..." };
        }
    }

    /**
     * Récupère une liste de quantitys avec filtres
     */
    static async findMany(props: FindManyQuantityProps): Promise<ResponseFormat<FindManyQuantityResponse>> {
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
            } = selectManyQuantitySchema.parse(props);

            const quantityList: QuantityRelationsOptional[] = await PrismaInstance.quantity.findMany({
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

            return { data: quantityList };
        } catch (error) {
            console.error("QuantityService -> FindMany -> " + (error as Error).message);
            if (process.env.NODE_ENV === "development") {
                if (error instanceof ZodError)
                    throw new Error("QuantityService -> FindMany -> Invalid Zod params -> " + error.message);
                if (error instanceof PrismaClientKnownRequestError)
                    throw new Error("QuantityService -> FindMany -> Prisma error -> " + error.message);
                throw new Error("QuantityService -> FindMany -> " + (error as Error).message);
            }
            // TODO: add logging
            return { error: "Unable to find quantitys..." };
        }
    }

    /**
     * Compte les quantitys avec filtres
     */
    static async count(props: CountQuantityProps): Promise<ResponseFormat<CountQuantityResponse>> {
        try {
            const { cursor, orderBy, select, skip, take, where } = countQuantitySchema.parse(props);

            const quantityAmount: QuantityCount = await PrismaInstance.quantity.count({
                ...(cursor && { cursor }),
                ...(orderBy && { orderBy }),
                ...(select && { select }),
                ...(skip && { skip }),
                ...(take && { take }),
                ...(where && { where }),
            });

            return { data: quantityAmount };
        } catch (error) {
            console.error("QuantityService -> Count -> " + (error as Error).message);
            if (process.env.NODE_ENV === "development") {
                if (error instanceof ZodError)
                    throw new Error("QuantityService -> Count -> Invalid Zod params -> " + error.message);
                if (error instanceof PrismaClientKnownRequestError)
                    throw new Error("QuantityService -> Count -> Prisma error -> " + error.message);
                throw new Error("QuantityService -> Count -> " + (error as Error).message);
            }
            // TODO: add logging
            return { error: "Unable to count quantitys..." };
        }
    }
}
