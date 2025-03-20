/**
 * Classe de service pour les opérations CRUD sur les accounts
 * 
 * Ce fichier centralise toute la logique d'accès aux données pour les accounts.
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
    Account,
    AccountCreateArgsSchema,
    AccountDeleteArgsSchema,
    AccountFindManyArgsSchema,
    AccountFindUniqueArgsSchema,
    AccountOrderByWithRelationInputSchema,
    AccountSchema,
    AccountUpdateArgsSchema,
    AccountUpsertArgsSchema,
    AccountWhereInputSchema,
    AccountWhereUniqueInputSchema,
    AccountWithRelationsSchema
} from "@services/schemas";
import { AccountIncludeSchema } from "@services/schemas/inputTypeSchemas/AccountIncludeSchema";
import { z, ZodError, ZodType } from "zod";

// ============== Types ============== //

export type AccountModel = z.infer<typeof AccountSchema>;

export type AccountRelationsOptional = z.infer<typeof AccountSchema> & z.infer<typeof AccountIncludeSchema>;

export type AccountRelationsComplete = z.infer<typeof AccountWithRelationsSchema>;

export type AccountCount = number;

// ============== Schema Types ============== //

const createAccountSchema: ZodType<Prisma.AccountCreateArgs> = AccountCreateArgsSchema;

const upsertAccountSchema: ZodType<Prisma.AccountUpsertArgs> = AccountUpsertArgsSchema;

const updateAccountSchema: ZodType<Prisma.AccountUpdateArgs> = AccountUpdateArgsSchema;

const deleteAccountSchema: ZodType<Prisma.AccountDeleteArgs> = AccountDeleteArgsSchema;

const selectAccountSchema: ZodType<Prisma.AccountFindUniqueArgs> = AccountFindUniqueArgsSchema;

const selectManyAccountSchema: ZodType<Prisma.AccountFindManyArgs> = AccountFindManyArgsSchema;

/**
 * Définition du schéma pour AccountCountArgs
 * 
 * Ce schéma correspond au type Prisma.AccountCountArgs qui est défini comme:
 * Omit<AccountFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
 *   select?: AccountCountAggregateInputType | true
 * }
 */
const countAccountSchema: ZodType<Prisma.AccountCountArgs> = z.object({
    where: z.lazy(() => AccountWhereInputSchema).optional(),
    orderBy: z.union([
        z.lazy(() => AccountOrderByWithRelationInputSchema),
        z.array(z.lazy(() => AccountOrderByWithRelationInputSchema))
    ]).optional(),
    cursor: z.lazy(() => AccountWhereUniqueInputSchema).optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    select: z.union([z.literal(true), z.record(z.boolean())]).optional()
});

// ============== CRUD Props Types ============== //

export type CreateAccountProps = z.infer<typeof createAccountSchema>;

export type UpsertAccountProps = z.infer<typeof upsertAccountSchema>;

export type UpdateAccountProps = z.infer<typeof updateAccountSchema>;

export type DeleteAccountProps = z.infer<typeof deleteAccountSchema>;

export type FindUniqueAccountProps = z.infer<typeof selectAccountSchema>;

export type FindManyAccountProps = z.infer<typeof selectManyAccountSchema>;

export type CountAccountProps = z.infer<typeof countAccountSchema>;

// ============== CRUD Response Types ============== //

export type CreateAccountResponse = AccountModel;

export type UpsertAccountResponse = AccountModel;

export type UpdateAccountResponse = AccountModel;

export type DeleteAccountResponse = AccountModel;

export type FindUniqueAccountResponse = AccountRelationsOptional | null;

export type FindManyAccountResponse = AccountRelationsOptional[];

export type CountAccountResponse = AccountCount;

// ============== Services ============== //

/**
 * Service pour les opérations de base de données sur les accounts
 */
export class AccountService {
    /**
     * Crée un(e) nouveau/nouvelle account
     * @param props Propriétés du/de la account
     * @returns Account créé(e) ou erreur
     */
    static async create(props: CreateAccountProps): Promise<ResponseFormat<CreateAccountResponse>> {
        try {
            const { data, include, omit, select } = createAccountSchema.parse(props);

            const account: Account = await PrismaInstance.account.create({
                data,
                ...(include && { include }),
                ...(omit && { omit }),
                ...(select && { select }),
            });

            return { data: account };
        } catch (error) {
            console.error("AccountService -> Create -> " + (error as Error).message);
            if (process.env.NODE_ENV === "development") {
                if (error instanceof ZodError)
                    throw new Error("AccountService -> Create -> Invalid Zod params -> " + error.message);
                if (error instanceof PrismaClientKnownRequestError)
                    throw new Error("AccountService -> Create -> Prisma error -> " + error.message);
                throw new Error("AccountService -> Create -> " + (error as Error).message);
            }
            // TODO: add logging
            return { error: "Unable to create account..." };
        }
    }

    static async upsert(props: UpsertAccountProps): Promise<ResponseFormat<UpsertAccountResponse>> {
        try {
            const { create, update, where, include, omit, select } = upsertAccountSchema.parse(props);

            const account: Account = await PrismaInstance.account.upsert({
                create,
                update,
                where,
                ...(include && { include }),
                ...(omit && { omit }),
                ...(select && { select }),
            });

            return { data: account };
        } catch (error) {
            console.error("AccountService -> Upsert -> " + (error as Error).message);
            if (process.env.NODE_ENV === "development") {
                if (error instanceof ZodError)
                    throw new Error("AccountService -> Upsert -> Invalid Zod params -> " + error.message);
                if (error instanceof PrismaClientKnownRequestError)
                    throw new Error("AccountService -> Upsert -> Prisma error -> " + error.message);
                throw new Error("AccountService -> Upsert -> " + (error as Error).message);
            }
            // TODO: add logging
            return { error: "Unable to upsert account..." };
        }
    }

    /**
     * Met à jour un(e) account
     * @param props ID du/de la account et nouvelles données
     * @returns Account mis(e) à jour ou erreur
     */
    static async update(props: UpdateAccountProps): Promise<ResponseFormat<UpdateAccountResponse>> {
        try {
            const { data, where, include, omit, select } = updateAccountSchema.parse(props);

            const account: Account = await PrismaInstance.account.update({
                data,
                where,
                ...(include && { include }),
                ...(omit && { omit }),
                ...(select && { select }),
            });

            return { data: account };
        } catch (error) {
            console.error("AccountService -> Update -> " + (error as Error).message);
            if (process.env.NODE_ENV === "development") {
                if (error instanceof ZodError)
                    throw new Error("AccountService -> Update -> Invalid Zod params -> " + error.message);
                if (error instanceof PrismaClientKnownRequestError)
                    throw new Error("AccountService -> Update -> Prisma error -> " + error.message);
                throw new Error("AccountService -> Update -> " + (error as Error).message);
            }
            // TODO: add logging
            return { error: "Unable to update account..." };
        }
    }

    /**
     * Supprime un(e) account
     * @param props ID du/de la account
     * @returns Account supprimé(e) ou erreur
     */
    static async delete(props: DeleteAccountProps): Promise<ResponseFormat<DeleteAccountResponse>> {
        try {
            const { where, include, omit, select } = deleteAccountSchema.parse(props);

            const account: Account = await PrismaInstance.account.delete({
                where,
                ...(include && { include }),
                ...(omit && { omit }),
                ...(select && { select }),
            });

            return { data: account };
        } catch (error) {
            console.error("AccountService -> Delete -> " + (error as Error).message);
            if (process.env.NODE_ENV === "development") {
                if (error instanceof ZodError)
                    throw new Error("AccountService -> Delete -> Invalid Zod params -> " + error.message);
                if (error instanceof PrismaClientKnownRequestError)
                    throw new Error("AccountService -> Delete -> Prisma error -> " + error.message);
                throw new Error("AccountService -> Delete -> " + (error as Error).message);
            }
            // TODO: add logging
            return { error: "Unable to delete account..." };
        }
    }

    /**
     * Récupère un(e) account par ID ou autre filtre
     */
    static async findUnique(props: FindUniqueAccountProps): Promise<ResponseFormat<FindUniqueAccountResponse>> {
        try {
            const { where, include, omit, select } = selectAccountSchema.parse(props);

            const account: AccountRelationsOptional | null = await PrismaInstance.account.findUnique({
                where,
                ...(include && { include }),
                ...(omit && { omit }),
                ...(select && { select }),
            });

            return { data: account };
        } catch (error) {
            console.error("AccountService -> FindUnique -> " + (error as Error).message);
            if (process.env.NODE_ENV === "development") {
                if (error instanceof ZodError)
                    throw new Error("AccountService -> FindUnique -> Invalid Zod params -> " + error.message);
                if (error instanceof PrismaClientKnownRequestError)
                    throw new Error("AccountService -> FindUnique -> Prisma error -> " + error.message);
                throw new Error("AccountService -> FindUnique -> " + (error as Error).message);
            }
            // TODO: add logging
            return { error: "Unable to find account..." };
        }
    }

    /**
     * Récupère une liste de accounts avec filtres
     */
    static async findMany(props: FindManyAccountProps): Promise<ResponseFormat<FindManyAccountResponse>> {
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
            } = selectManyAccountSchema.parse(props);

            const accountList: AccountRelationsOptional[] = await PrismaInstance.account.findMany({
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

            return { data: accountList };
        } catch (error) {
            console.error("AccountService -> FindMany -> " + (error as Error).message);
            if (process.env.NODE_ENV === "development") {
                if (error instanceof ZodError)
                    throw new Error("AccountService -> FindMany -> Invalid Zod params -> " + error.message);
                if (error instanceof PrismaClientKnownRequestError)
                    throw new Error("AccountService -> FindMany -> Prisma error -> " + error.message);
                throw new Error("AccountService -> FindMany -> " + (error as Error).message);
            }
            // TODO: add logging
            return { error: "Unable to find accounts..." };
        }
    }

    /**
     * Compte les accounts avec filtres
     */
    static async count(props: CountAccountProps): Promise<ResponseFormat<CountAccountResponse>> {
        try {
            const { cursor, orderBy, select, skip, take, where } = countAccountSchema.parse(props);

            const accountAmount: AccountCount = await PrismaInstance.account.count({
                ...(cursor && { cursor }),
                ...(orderBy && { orderBy }),
                ...(select && { select }),
                ...(skip && { skip }),
                ...(take && { take }),
                ...(where && { where }),
            });

            return { data: accountAmount };
        } catch (error) {
            console.error("AccountService -> Count -> " + (error as Error).message);
            if (process.env.NODE_ENV === "development") {
                if (error instanceof ZodError)
                    throw new Error("AccountService -> Count -> Invalid Zod params -> " + error.message);
                if (error instanceof PrismaClientKnownRequestError)
                    throw new Error("AccountService -> Count -> Prisma error -> " + error.message);
                throw new Error("AccountService -> Count -> " + (error as Error).message);
            }
            // TODO: add logging
            return { error: "Unable to count accounts..." };
        }
    }
}
