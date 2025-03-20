/**
 * Classe de service pour les opérations CRUD sur les fruits
 * 
 * Ce fichier centralise toute la logique d'accès aux données pour les fruits.
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
    Fruit,
    FruitCreateArgsSchema,
    FruitDeleteArgsSchema,
    FruitFindManyArgsSchema,
    FruitFindUniqueArgsSchema,
    FruitOrderByWithRelationInputSchema,
    FruitSchema,
    FruitUpdateArgsSchema,
    FruitUpsertArgsSchema,
    FruitWhereInputSchema,
    FruitWhereUniqueInputSchema
} from "@services/schemas";
import { z, ZodError, ZodType } from "zod";

// ============== Types ============== //

export type FruitModel = z.infer<typeof FruitSchema>;

export type FruitCount = number;

// ============== Schema Types ============== //

const createFruitSchema: ZodType<Prisma.FruitCreateArgs> = FruitCreateArgsSchema;

const upsertFruitSchema: ZodType<Prisma.FruitUpsertArgs> = FruitUpsertArgsSchema;

const updateFruitSchema: ZodType<Prisma.FruitUpdateArgs> = FruitUpdateArgsSchema;

const deleteFruitSchema: ZodType<Prisma.FruitDeleteArgs> = FruitDeleteArgsSchema;

const selectFruitSchema: ZodType<Prisma.FruitFindUniqueArgs> = FruitFindUniqueArgsSchema;

const selectManyFruitSchema: ZodType<Prisma.FruitFindManyArgs> = FruitFindManyArgsSchema;

/**
 * Définition du schéma pour FruitCountArgs
 * 
 * Ce schéma correspond au type Prisma.FruitCountArgs qui est défini comme:
 * Omit<FruitFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
 *   select?: FruitCountAggregateInputType | true
 * }
 */
const countFruitSchema: ZodType<Prisma.FruitCountArgs> = z.object({
    where: z.lazy(() => FruitWhereInputSchema).optional(),
    orderBy: z.union([
        z.lazy(() => FruitOrderByWithRelationInputSchema),
        z.array(z.lazy(() => FruitOrderByWithRelationInputSchema))
    ]).optional(),
    cursor: z.lazy(() => FruitWhereUniqueInputSchema).optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    select: z.union([z.literal(true), z.record(z.boolean())]).optional()
});

// ============== CRUD Props Types ============== //

export type CreateFruitProps = z.infer<typeof createFruitSchema>;

export type UpsertFruitProps = z.infer<typeof upsertFruitSchema>;

export type UpdateFruitProps = z.infer<typeof updateFruitSchema>;

export type DeleteFruitProps = z.infer<typeof deleteFruitSchema>;

export type FindUniqueFruitProps = z.infer<typeof selectFruitSchema>;

export type FindManyFruitProps = z.infer<typeof selectManyFruitSchema>;

export type CountFruitProps = z.infer<typeof countFruitSchema>;

// ============== CRUD Response Types ============== //

export type CreateFruitResponse = FruitModel;

export type UpsertFruitResponse = FruitModel;

export type UpdateFruitResponse = FruitModel;

export type DeleteFruitResponse = FruitModel;

export type FindUniqueFruitResponse = FruitModel | null;

export type FindManyFruitResponse = FruitModel[];

export type CountFruitResponse = FruitCount;

// ============== Services ============== //

/**
 * Service pour les opérations de base de données sur les fruits
 */
export class FruitService {
    /**
     * Crée un(e) nouveau/nouvelle fruit
     * @param props Propriétés du/de la fruit
     * @returns Fruit créé(e) ou erreur
     */
    static async create(props: CreateFruitProps): Promise<ResponseFormat<CreateFruitResponse>> {
        try {
            const { data, omit, select } = createFruitSchema.parse(props);

            const fruit: Fruit = await PrismaInstance.fruit.create({
                data,
                
                ...(omit && { omit }),
                ...(select && { select }),
            });

            return { data: fruit };
        } catch (error) {
            console.error("FruitService -> Create -> " + (error as Error).message);
            if (process.env.NODE_ENV === "development") {
                if (error instanceof ZodError)
                    throw new Error("FruitService -> Create -> Invalid Zod params -> " + error.message);
                if (error instanceof PrismaClientKnownRequestError)
                    throw new Error("FruitService -> Create -> Prisma error -> " + error.message);
                throw new Error("FruitService -> Create -> " + (error as Error).message);
            }
            // TODO: add logging
            return { error: "Unable to create fruit..." };
        }
    }

    static async upsert(props: UpsertFruitProps): Promise<ResponseFormat<UpsertFruitResponse>> {
        try {
            const { create, update, where, omit, select } = upsertFruitSchema.parse(props);

            const fruit: Fruit = await PrismaInstance.fruit.upsert({
                create,
                update,
                where,
                
                ...(omit && { omit }),
                ...(select && { select }),
            });

            return { data: fruit };
        } catch (error) {
            console.error("FruitService -> Upsert -> " + (error as Error).message);
            if (process.env.NODE_ENV === "development") {
                if (error instanceof ZodError)
                    throw new Error("FruitService -> Upsert -> Invalid Zod params -> " + error.message);
                if (error instanceof PrismaClientKnownRequestError)
                    throw new Error("FruitService -> Upsert -> Prisma error -> " + error.message);
                throw new Error("FruitService -> Upsert -> " + (error as Error).message);
            }
            // TODO: add logging
            return { error: "Unable to upsert fruit..." };
        }
    }

    /**
     * Met à jour un(e) fruit
     * @param props ID du/de la fruit et nouvelles données
     * @returns Fruit mis(e) à jour ou erreur
     */
    static async update(props: UpdateFruitProps): Promise<ResponseFormat<UpdateFruitResponse>> {
        try {
            const { data, where, omit, select } = updateFruitSchema.parse(props);

            const fruit: Fruit = await PrismaInstance.fruit.update({
                data,
                where,
                
                ...(omit && { omit }),
                ...(select && { select }),
            });

            return { data: fruit };
        } catch (error) {
            console.error("FruitService -> Update -> " + (error as Error).message);
            if (process.env.NODE_ENV === "development") {
                if (error instanceof ZodError)
                    throw new Error("FruitService -> Update -> Invalid Zod params -> " + error.message);
                if (error instanceof PrismaClientKnownRequestError)
                    throw new Error("FruitService -> Update -> Prisma error -> " + error.message);
                throw new Error("FruitService -> Update -> " + (error as Error).message);
            }
            // TODO: add logging
            return { error: "Unable to update fruit..." };
        }
    }

    /**
     * Supprime un(e) fruit
     * @param props ID du/de la fruit
     * @returns Fruit supprimé(e) ou erreur
     */
    static async delete(props: DeleteFruitProps): Promise<ResponseFormat<DeleteFruitResponse>> {
        try {
            const { where, omit, select } = deleteFruitSchema.parse(props);

            const fruit: Fruit = await PrismaInstance.fruit.delete({
                where,
                
                ...(omit && { omit }),
                ...(select && { select }),
            });

            return { data: fruit };
        } catch (error) {
            console.error("FruitService -> Delete -> " + (error as Error).message);
            if (process.env.NODE_ENV === "development") {
                if (error instanceof ZodError)
                    throw new Error("FruitService -> Delete -> Invalid Zod params -> " + error.message);
                if (error instanceof PrismaClientKnownRequestError)
                    throw new Error("FruitService -> Delete -> Prisma error -> " + error.message);
                throw new Error("FruitService -> Delete -> " + (error as Error).message);
            }
            // TODO: add logging
            return { error: "Unable to delete fruit..." };
        }
    }

    /**
     * Récupère un(e) fruit par ID ou autre filtre
     */
    static async findUnique(props: FindUniqueFruitProps): Promise<ResponseFormat<FindUniqueFruitResponse>> {
        try {
            const { where, omit, select } = selectFruitSchema.parse(props);

            const fruit: FruitModel | null = await PrismaInstance.fruit.findUnique({
                where,
                
                ...(omit && { omit }),
                ...(select && { select }),
            });

            return { data: fruit };
        } catch (error) {
            console.error("FruitService -> FindUnique -> " + (error as Error).message);
            if (process.env.NODE_ENV === "development") {
                if (error instanceof ZodError)
                    throw new Error("FruitService -> FindUnique -> Invalid Zod params -> " + error.message);
                if (error instanceof PrismaClientKnownRequestError)
                    throw new Error("FruitService -> FindUnique -> Prisma error -> " + error.message);
                throw new Error("FruitService -> FindUnique -> " + (error as Error).message);
            }
            // TODO: add logging
            return { error: "Unable to find fruit..." };
        }
    }

    /**
     * Récupère une liste de fruits avec filtres
     */
    static async findMany(props: FindManyFruitProps): Promise<ResponseFormat<FindManyFruitResponse>> {
        try {
            const {
                cursor,
                distinct,
                
                omit,
                orderBy,
                select,
                skip = 0,
                take = 10,
                where,
            } = selectManyFruitSchema.parse(props);

            const fruitList: FruitModel[] = await PrismaInstance.fruit.findMany({
                ...(cursor && { cursor }),
                ...(distinct && { distinct }),
                
                ...(omit && { omit }),
                ...(orderBy && { orderBy }),
                ...(select && { select }),
                ...(skip && { skip }),
                ...(take && { take }),
                ...(where && { where }),
            });

            return { data: fruitList };
        } catch (error) {
            console.error("FruitService -> FindMany -> " + (error as Error).message);
            if (process.env.NODE_ENV === "development") {
                if (error instanceof ZodError)
                    throw new Error("FruitService -> FindMany -> Invalid Zod params -> " + error.message);
                if (error instanceof PrismaClientKnownRequestError)
                    throw new Error("FruitService -> FindMany -> Prisma error -> " + error.message);
                throw new Error("FruitService -> FindMany -> " + (error as Error).message);
            }
            // TODO: add logging
            return { error: "Unable to find fruits..." };
        }
    }

    /**
     * Compte les fruits avec filtres
     */
    static async count(props: CountFruitProps): Promise<ResponseFormat<CountFruitResponse>> {
        try {
            const { cursor, orderBy, select, skip, take, where } = countFruitSchema.parse(props);

            const fruitAmount: FruitCount = await PrismaInstance.fruit.count({
                ...(cursor && { cursor }),
                ...(orderBy && { orderBy }),
                ...(select && { select }),
                ...(skip && { skip }),
                ...(take && { take }),
                ...(where && { where }),
            });

            return { data: fruitAmount };
        } catch (error) {
            console.error("FruitService -> Count -> " + (error as Error).message);
            if (process.env.NODE_ENV === "development") {
                if (error instanceof ZodError)
                    throw new Error("FruitService -> Count -> Invalid Zod params -> " + error.message);
                if (error instanceof PrismaClientKnownRequestError)
                    throw new Error("FruitService -> Count -> Prisma error -> " + error.message);
                throw new Error("FruitService -> Count -> " + (error as Error).message);
            }
            // TODO: add logging
            return { error: "Unable to count fruits..." };
        }
    }
}
