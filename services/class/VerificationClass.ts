/**
 * Classe de service pour les opérations CRUD sur les verifications
 * 
 * Ce fichier centralise toute la logique d'accès aux données pour les verifications.
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
    Verification,
    VerificationCreateArgsSchema,
    VerificationDeleteArgsSchema,
    VerificationFindManyArgsSchema,
    VerificationFindUniqueArgsSchema,
    VerificationOrderByWithRelationInputSchema,
    VerificationSchema,
    VerificationUpdateArgsSchema,
    VerificationUpsertArgsSchema,
    VerificationWhereInputSchema,
    VerificationWhereUniqueInputSchema
} from "@services/schemas";
import { z, ZodError, ZodType } from "zod";

// ============== Types ============== //

export type VerificationModel = z.infer<typeof VerificationSchema>;

export type VerificationCount = number;

// ============== Schema Types ============== //

const createVerificationSchema: ZodType<Prisma.VerificationCreateArgs> = VerificationCreateArgsSchema;

const upsertVerificationSchema: ZodType<Prisma.VerificationUpsertArgs> = VerificationUpsertArgsSchema;

const updateVerificationSchema: ZodType<Prisma.VerificationUpdateArgs> = VerificationUpdateArgsSchema;

const deleteVerificationSchema: ZodType<Prisma.VerificationDeleteArgs> = VerificationDeleteArgsSchema;

const selectVerificationSchema: ZodType<Prisma.VerificationFindUniqueArgs> = VerificationFindUniqueArgsSchema;

const selectManyVerificationSchema: ZodType<Prisma.VerificationFindManyArgs> = VerificationFindManyArgsSchema;

/**
 * Définition du schéma pour VerificationCountArgs
 * 
 * Ce schéma correspond au type Prisma.VerificationCountArgs qui est défini comme:
 * Omit<VerificationFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
 *   select?: VerificationCountAggregateInputType | true
 * }
 */
const countVerificationSchema: ZodType<Prisma.VerificationCountArgs> = z.object({
    where: z.lazy(() => VerificationWhereInputSchema).optional(),
    orderBy: z.union([
        z.lazy(() => VerificationOrderByWithRelationInputSchema),
        z.array(z.lazy(() => VerificationOrderByWithRelationInputSchema))
    ]).optional(),
    cursor: z.lazy(() => VerificationWhereUniqueInputSchema).optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    select: z.union([z.literal(true), z.record(z.boolean())]).optional()
});

// ============== CRUD Props Types ============== //

export type CreateVerificationProps = z.infer<typeof createVerificationSchema>;

export type UpsertVerificationProps = z.infer<typeof upsertVerificationSchema>;

export type UpdateVerificationProps = z.infer<typeof updateVerificationSchema>;

export type DeleteVerificationProps = z.infer<typeof deleteVerificationSchema>;

export type FindUniqueVerificationProps = z.infer<typeof selectVerificationSchema>;

export type FindManyVerificationProps = z.infer<typeof selectManyVerificationSchema>;

export type CountVerificationProps = z.infer<typeof countVerificationSchema>;

// ============== CRUD Response Types ============== //

export type CreateVerificationResponse = VerificationModel;

export type UpsertVerificationResponse = VerificationModel;

export type UpdateVerificationResponse = VerificationModel;

export type DeleteVerificationResponse = VerificationModel;

export type FindUniqueVerificationResponse = VerificationModel | null;

export type FindManyVerificationResponse = VerificationModel[];

export type CountVerificationResponse = VerificationCount;

// ============== Services ============== //

/**
 * Service pour les opérations de base de données sur les verifications
 */
export class VerificationService {
    /**
     * Crée un(e) nouveau/nouvelle verification
     * @param props Propriétés du/de la verification
     * @returns Verification créé(e) ou erreur
     */
    static async create(props: CreateVerificationProps): Promise<ResponseFormat<CreateVerificationResponse>> {
        try {
            const { data, omit, select } = createVerificationSchema.parse(props);

            const verification: Verification = await PrismaInstance.verification.create({
                data,
                
                ...(omit && { omit }),
                ...(select && { select }),
            });

            return { data: verification };
        } catch (error) {
            console.error("VerificationService -> Create -> " + (error as Error).message);
            if (process.env.NODE_ENV === "development") {
                if (error instanceof ZodError)
                    throw new Error("VerificationService -> Create -> Invalid Zod params -> " + error.message);
                if (error instanceof PrismaClientKnownRequestError)
                    throw new Error("VerificationService -> Create -> Prisma error -> " + error.message);
                throw new Error("VerificationService -> Create -> " + (error as Error).message);
            }
            // TODO: add logging
            return { error: "Unable to create verification..." };
        }
    }

    static async upsert(props: UpsertVerificationProps): Promise<ResponseFormat<UpsertVerificationResponse>> {
        try {
            const { create, update, where, omit, select } = upsertVerificationSchema.parse(props);

            const verification: Verification = await PrismaInstance.verification.upsert({
                create,
                update,
                where,
                
                ...(omit && { omit }),
                ...(select && { select }),
            });

            return { data: verification };
        } catch (error) {
            console.error("VerificationService -> Upsert -> " + (error as Error).message);
            if (process.env.NODE_ENV === "development") {
                if (error instanceof ZodError)
                    throw new Error("VerificationService -> Upsert -> Invalid Zod params -> " + error.message);
                if (error instanceof PrismaClientKnownRequestError)
                    throw new Error("VerificationService -> Upsert -> Prisma error -> " + error.message);
                throw new Error("VerificationService -> Upsert -> " + (error as Error).message);
            }
            // TODO: add logging
            return { error: "Unable to upsert verification..." };
        }
    }

    /**
     * Met à jour un(e) verification
     * @param props ID du/de la verification et nouvelles données
     * @returns Verification mis(e) à jour ou erreur
     */
    static async update(props: UpdateVerificationProps): Promise<ResponseFormat<UpdateVerificationResponse>> {
        try {
            const { data, where, omit, select } = updateVerificationSchema.parse(props);

            const verification: Verification = await PrismaInstance.verification.update({
                data,
                where,
                
                ...(omit && { omit }),
                ...(select && { select }),
            });

            return { data: verification };
        } catch (error) {
            console.error("VerificationService -> Update -> " + (error as Error).message);
            if (process.env.NODE_ENV === "development") {
                if (error instanceof ZodError)
                    throw new Error("VerificationService -> Update -> Invalid Zod params -> " + error.message);
                if (error instanceof PrismaClientKnownRequestError)
                    throw new Error("VerificationService -> Update -> Prisma error -> " + error.message);
                throw new Error("VerificationService -> Update -> " + (error as Error).message);
            }
            // TODO: add logging
            return { error: "Unable to update verification..." };
        }
    }

    /**
     * Supprime un(e) verification
     * @param props ID du/de la verification
     * @returns Verification supprimé(e) ou erreur
     */
    static async delete(props: DeleteVerificationProps): Promise<ResponseFormat<DeleteVerificationResponse>> {
        try {
            const { where, omit, select } = deleteVerificationSchema.parse(props);

            const verification: Verification = await PrismaInstance.verification.delete({
                where,
                
                ...(omit && { omit }),
                ...(select && { select }),
            });

            return { data: verification };
        } catch (error) {
            console.error("VerificationService -> Delete -> " + (error as Error).message);
            if (process.env.NODE_ENV === "development") {
                if (error instanceof ZodError)
                    throw new Error("VerificationService -> Delete -> Invalid Zod params -> " + error.message);
                if (error instanceof PrismaClientKnownRequestError)
                    throw new Error("VerificationService -> Delete -> Prisma error -> " + error.message);
                throw new Error("VerificationService -> Delete -> " + (error as Error).message);
            }
            // TODO: add logging
            return { error: "Unable to delete verification..." };
        }
    }

    /**
     * Récupère un(e) verification par ID ou autre filtre
     */
    static async findUnique(props: FindUniqueVerificationProps): Promise<ResponseFormat<FindUniqueVerificationResponse>> {
        try {
            const { where, omit, select } = selectVerificationSchema.parse(props);

            const verification: VerificationModel | null = await PrismaInstance.verification.findUnique({
                where,
                
                ...(omit && { omit }),
                ...(select && { select }),
            });

            return { data: verification };
        } catch (error) {
            console.error("VerificationService -> FindUnique -> " + (error as Error).message);
            if (process.env.NODE_ENV === "development") {
                if (error instanceof ZodError)
                    throw new Error("VerificationService -> FindUnique -> Invalid Zod params -> " + error.message);
                if (error instanceof PrismaClientKnownRequestError)
                    throw new Error("VerificationService -> FindUnique -> Prisma error -> " + error.message);
                throw new Error("VerificationService -> FindUnique -> " + (error as Error).message);
            }
            // TODO: add logging
            return { error: "Unable to find verification..." };
        }
    }

    /**
     * Récupère une liste de verifications avec filtres
     */
    static async findMany(props: FindManyVerificationProps): Promise<ResponseFormat<FindManyVerificationResponse>> {
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
            } = selectManyVerificationSchema.parse(props);

            const verificationList: VerificationModel[] = await PrismaInstance.verification.findMany({
                ...(cursor && { cursor }),
                ...(distinct && { distinct }),
                
                ...(omit && { omit }),
                ...(orderBy && { orderBy }),
                ...(select && { select }),
                ...(skip && { skip }),
                ...(take && { take }),
                ...(where && { where }),
            });

            return { data: verificationList };
        } catch (error) {
            console.error("VerificationService -> FindMany -> " + (error as Error).message);
            if (process.env.NODE_ENV === "development") {
                if (error instanceof ZodError)
                    throw new Error("VerificationService -> FindMany -> Invalid Zod params -> " + error.message);
                if (error instanceof PrismaClientKnownRequestError)
                    throw new Error("VerificationService -> FindMany -> Prisma error -> " + error.message);
                throw new Error("VerificationService -> FindMany -> " + (error as Error).message);
            }
            // TODO: add logging
            return { error: "Unable to find verifications..." };
        }
    }

    /**
     * Compte les verifications avec filtres
     */
    static async count(props: CountVerificationProps): Promise<ResponseFormat<CountVerificationResponse>> {
        try {
            const { cursor, orderBy, select, skip, take, where } = countVerificationSchema.parse(props);

            const verificationAmount: VerificationCount = await PrismaInstance.verification.count({
                ...(cursor && { cursor }),
                ...(orderBy && { orderBy }),
                ...(select && { select }),
                ...(skip && { skip }),
                ...(take && { take }),
                ...(where && { where }),
            });

            return { data: verificationAmount };
        } catch (error) {
            console.error("VerificationService -> Count -> " + (error as Error).message);
            if (process.env.NODE_ENV === "development") {
                if (error instanceof ZodError)
                    throw new Error("VerificationService -> Count -> Invalid Zod params -> " + error.message);
                if (error instanceof PrismaClientKnownRequestError)
                    throw new Error("VerificationService -> Count -> Prisma error -> " + error.message);
                throw new Error("VerificationService -> Count -> " + (error as Error).message);
            }
            // TODO: add logging
            return { error: "Unable to count verifications..." };
        }
    }
}
