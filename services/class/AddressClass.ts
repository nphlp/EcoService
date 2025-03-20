/**
 * Classe de service pour les opérations CRUD sur les addresss
 * 
 * Ce fichier centralise toute la logique d'accès aux données pour les addresss.
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
    Address,
    AddressCreateArgsSchema,
    AddressDeleteArgsSchema,
    AddressFindManyArgsSchema,
    AddressFindUniqueArgsSchema,
    AddressOrderByWithRelationInputSchema,
    AddressSchema,
    AddressUpdateArgsSchema,
    AddressUpsertArgsSchema,
    AddressWhereInputSchema,
    AddressWhereUniqueInputSchema,
    AddressWithRelationsSchema
} from "@services/schemas";
import { AddressIncludeSchema } from "@services/schemas/inputTypeSchemas/AddressIncludeSchema";
import { z, ZodError, ZodType } from "zod";

// ============== Types ============== //

export type AddressModel = z.infer<typeof AddressSchema>;

export type AddressRelationsOptional = z.infer<typeof AddressSchema> & z.infer<typeof AddressIncludeSchema>;

export type AddressRelationsComplete = z.infer<typeof AddressWithRelationsSchema>;

export type AddressCount = number;

// ============== Schema Types ============== //

const createAddressSchema: ZodType<Prisma.AddressCreateArgs> = AddressCreateArgsSchema;

const upsertAddressSchema: ZodType<Prisma.AddressUpsertArgs> = AddressUpsertArgsSchema;

const updateAddressSchema: ZodType<Prisma.AddressUpdateArgs> = AddressUpdateArgsSchema;

const deleteAddressSchema: ZodType<Prisma.AddressDeleteArgs> = AddressDeleteArgsSchema;

const selectAddressSchema: ZodType<Prisma.AddressFindUniqueArgs> = AddressFindUniqueArgsSchema;

const selectManyAddressSchema: ZodType<Prisma.AddressFindManyArgs> = AddressFindManyArgsSchema;

/**
 * Définition du schéma pour AddressCountArgs
 * 
 * Ce schéma correspond au type Prisma.AddressCountArgs qui est défini comme:
 * Omit<AddressFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
 *   select?: AddressCountAggregateInputType | true
 * }
 */
const countAddressSchema: ZodType<Prisma.AddressCountArgs> = z.object({
    where: z.lazy(() => AddressWhereInputSchema).optional(),
    orderBy: z.union([
        z.lazy(() => AddressOrderByWithRelationInputSchema),
        z.array(z.lazy(() => AddressOrderByWithRelationInputSchema))
    ]).optional(),
    cursor: z.lazy(() => AddressWhereUniqueInputSchema).optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    select: z.union([z.literal(true), z.record(z.boolean())]).optional()
});

// ============== CRUD Props Types ============== //

export type CreateAddressProps = z.infer<typeof createAddressSchema>;

export type UpsertAddressProps = z.infer<typeof upsertAddressSchema>;

export type UpdateAddressProps = z.infer<typeof updateAddressSchema>;

export type DeleteAddressProps = z.infer<typeof deleteAddressSchema>;

export type FindUniqueAddressProps = z.infer<typeof selectAddressSchema>;

export type FindManyAddressProps = z.infer<typeof selectManyAddressSchema>;

export type CountAddressProps = z.infer<typeof countAddressSchema>;

// ============== CRUD Response Types ============== //

export type CreateAddressResponse = AddressModel;

export type UpsertAddressResponse = AddressModel;

export type UpdateAddressResponse = AddressModel;

export type DeleteAddressResponse = AddressModel;

export type FindUniqueAddressResponse = AddressRelationsOptional | null;

export type FindManyAddressResponse = AddressRelationsOptional[];

export type CountAddressResponse = AddressCount;

// ============== Services ============== //

/**
 * Service pour les opérations de base de données sur les addresss
 */
export class AddressService {
    /**
     * Crée un(e) nouveau/nouvelle address
     * @param props Propriétés du/de la address
     * @returns Address créé(e) ou erreur
     */
    static async create(props: CreateAddressProps): Promise<ResponseFormat<CreateAddressResponse>> {
        try {
            const { data, include, omit, select } = createAddressSchema.parse(props);

            const address: Address = await PrismaInstance.address.create({
                data,
                ...(include && { include }),
                ...(omit && { omit }),
                ...(select && { select }),
            });

            return { data: address };
        } catch (error) {
            console.error("AddressService -> Create -> " + (error as Error).message);
            if (process.env.NODE_ENV === "development") {
                if (error instanceof ZodError)
                    throw new Error("AddressService -> Create -> Invalid Zod params -> " + error.message);
                if (error instanceof PrismaClientKnownRequestError)
                    throw new Error("AddressService -> Create -> Prisma error -> " + error.message);
                throw new Error("AddressService -> Create -> " + (error as Error).message);
            }
            // TODO: add logging
            return { error: "Unable to create address..." };
        }
    }

    static async upsert(props: UpsertAddressProps): Promise<ResponseFormat<UpsertAddressResponse>> {
        try {
            const { create, update, where, include, omit, select } = upsertAddressSchema.parse(props);

            const address: Address = await PrismaInstance.address.upsert({
                create,
                update,
                where,
                ...(include && { include }),
                ...(omit && { omit }),
                ...(select && { select }),
            });

            return { data: address };
        } catch (error) {
            console.error("AddressService -> Upsert -> " + (error as Error).message);
            if (process.env.NODE_ENV === "development") {
                if (error instanceof ZodError)
                    throw new Error("AddressService -> Upsert -> Invalid Zod params -> " + error.message);
                if (error instanceof PrismaClientKnownRequestError)
                    throw new Error("AddressService -> Upsert -> Prisma error -> " + error.message);
                throw new Error("AddressService -> Upsert -> " + (error as Error).message);
            }
            // TODO: add logging
            return { error: "Unable to upsert address..." };
        }
    }

    /**
     * Met à jour un(e) address
     * @param props ID du/de la address et nouvelles données
     * @returns Address mis(e) à jour ou erreur
     */
    static async update(props: UpdateAddressProps): Promise<ResponseFormat<UpdateAddressResponse>> {
        try {
            const { data, where, include, omit, select } = updateAddressSchema.parse(props);

            const address: Address = await PrismaInstance.address.update({
                data,
                where,
                ...(include && { include }),
                ...(omit && { omit }),
                ...(select && { select }),
            });

            return { data: address };
        } catch (error) {
            console.error("AddressService -> Update -> " + (error as Error).message);
            if (process.env.NODE_ENV === "development") {
                if (error instanceof ZodError)
                    throw new Error("AddressService -> Update -> Invalid Zod params -> " + error.message);
                if (error instanceof PrismaClientKnownRequestError)
                    throw new Error("AddressService -> Update -> Prisma error -> " + error.message);
                throw new Error("AddressService -> Update -> " + (error as Error).message);
            }
            // TODO: add logging
            return { error: "Unable to update address..." };
        }
    }

    /**
     * Supprime un(e) address
     * @param props ID du/de la address
     * @returns Address supprimé(e) ou erreur
     */
    static async delete(props: DeleteAddressProps): Promise<ResponseFormat<DeleteAddressResponse>> {
        try {
            const { where, include, omit, select } = deleteAddressSchema.parse(props);

            const address: Address = await PrismaInstance.address.delete({
                where,
                ...(include && { include }),
                ...(omit && { omit }),
                ...(select && { select }),
            });

            return { data: address };
        } catch (error) {
            console.error("AddressService -> Delete -> " + (error as Error).message);
            if (process.env.NODE_ENV === "development") {
                if (error instanceof ZodError)
                    throw new Error("AddressService -> Delete -> Invalid Zod params -> " + error.message);
                if (error instanceof PrismaClientKnownRequestError)
                    throw new Error("AddressService -> Delete -> Prisma error -> " + error.message);
                throw new Error("AddressService -> Delete -> " + (error as Error).message);
            }
            // TODO: add logging
            return { error: "Unable to delete address..." };
        }
    }

    /**
     * Récupère un(e) address par ID ou autre filtre
     */
    static async findUnique(props: FindUniqueAddressProps): Promise<ResponseFormat<FindUniqueAddressResponse>> {
        try {
            const { where, include, omit, select } = selectAddressSchema.parse(props);

            const address: AddressRelationsOptional | null = await PrismaInstance.address.findUnique({
                where,
                ...(include && { include }),
                ...(omit && { omit }),
                ...(select && { select }),
            });

            return { data: address };
        } catch (error) {
            console.error("AddressService -> FindUnique -> " + (error as Error).message);
            if (process.env.NODE_ENV === "development") {
                if (error instanceof ZodError)
                    throw new Error("AddressService -> FindUnique -> Invalid Zod params -> " + error.message);
                if (error instanceof PrismaClientKnownRequestError)
                    throw new Error("AddressService -> FindUnique -> Prisma error -> " + error.message);
                throw new Error("AddressService -> FindUnique -> " + (error as Error).message);
            }
            // TODO: add logging
            return { error: "Unable to find address..." };
        }
    }

    /**
     * Récupère une liste de addresss avec filtres
     */
    static async findMany(props: FindManyAddressProps): Promise<ResponseFormat<FindManyAddressResponse>> {
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
            } = selectManyAddressSchema.parse(props);

            const addressList: AddressRelationsOptional[] = await PrismaInstance.address.findMany({
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

            return { data: addressList };
        } catch (error) {
            console.error("AddressService -> FindMany -> " + (error as Error).message);
            if (process.env.NODE_ENV === "development") {
                if (error instanceof ZodError)
                    throw new Error("AddressService -> FindMany -> Invalid Zod params -> " + error.message);
                if (error instanceof PrismaClientKnownRequestError)
                    throw new Error("AddressService -> FindMany -> Prisma error -> " + error.message);
                throw new Error("AddressService -> FindMany -> " + (error as Error).message);
            }
            // TODO: add logging
            return { error: "Unable to find addresss..." };
        }
    }

    /**
     * Compte les addresss avec filtres
     */
    static async count(props: CountAddressProps): Promise<ResponseFormat<CountAddressResponse>> {
        try {
            const { cursor, orderBy, select, skip, take, where } = countAddressSchema.parse(props);

            const addressAmount: AddressCount = await PrismaInstance.address.count({
                ...(cursor && { cursor }),
                ...(orderBy && { orderBy }),
                ...(select && { select }),
                ...(skip && { skip }),
                ...(take && { take }),
                ...(where && { where }),
            });

            return { data: addressAmount };
        } catch (error) {
            console.error("AddressService -> Count -> " + (error as Error).message);
            if (process.env.NODE_ENV === "development") {
                if (error instanceof ZodError)
                    throw new Error("AddressService -> Count -> Invalid Zod params -> " + error.message);
                if (error instanceof PrismaClientKnownRequestError)
                    throw new Error("AddressService -> Count -> Prisma error -> " + error.message);
                throw new Error("AddressService -> Count -> " + (error as Error).message);
            }
            // TODO: add logging
            return { error: "Unable to count addresss..." };
        }
    }
}
