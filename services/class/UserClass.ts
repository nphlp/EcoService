/**
 * Classe de service pour les opérations CRUD sur les users
 * 
 * Ce fichier centralise toute la logique d'accès aux données pour les users.
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
    User,
    UserCreateArgsSchema,
    UserDeleteArgsSchema,
    UserFindManyArgsSchema,
    UserFindUniqueArgsSchema,
    UserOrderByWithRelationInputSchema,
    UserSchema,
    UserUpdateArgsSchema,
    UserUpsertArgsSchema,
    UserWhereInputSchema,
    UserWhereUniqueInputSchema,
    UserWithRelationsSchema
} from "@services/schemas";
import { UserIncludeSchema } from "@services/schemas/inputTypeSchemas/UserIncludeSchema";
import { z, ZodError, ZodType } from "zod";

// ============== Types ============== //

export type UserModel = z.infer<typeof UserSchema>;

export type UserRelationsOptional = z.infer<typeof UserSchema> & z.infer<typeof UserIncludeSchema>;

export type UserRelationsComplete = z.infer<typeof UserWithRelationsSchema>;

export type UserCount = number;

// ============== Schema Types ============== //

const createUserSchema: ZodType<Prisma.UserCreateArgs> = UserCreateArgsSchema;

const upsertUserSchema: ZodType<Prisma.UserUpsertArgs> = UserUpsertArgsSchema;

const updateUserSchema: ZodType<Prisma.UserUpdateArgs> = UserUpdateArgsSchema;

const deleteUserSchema: ZodType<Prisma.UserDeleteArgs> = UserDeleteArgsSchema;

const selectUserSchema: ZodType<Prisma.UserFindUniqueArgs> = UserFindUniqueArgsSchema;

const selectManyUserSchema: ZodType<Prisma.UserFindManyArgs> = UserFindManyArgsSchema;

/**
 * Définition du schéma pour UserCountArgs
 * 
 * Ce schéma correspond au type Prisma.UserCountArgs qui est défini comme:
 * Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
 *   select?: UserCountAggregateInputType | true
 * }
 */
const countUserSchema: ZodType<Prisma.UserCountArgs> = z.object({
    where: z.lazy(() => UserWhereInputSchema).optional(),
    orderBy: z.union([
        z.lazy(() => UserOrderByWithRelationInputSchema),
        z.array(z.lazy(() => UserOrderByWithRelationInputSchema))
    ]).optional(),
    cursor: z.lazy(() => UserWhereUniqueInputSchema).optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    select: z.union([z.literal(true), z.record(z.boolean())]).optional()
});

// ============== CRUD Props Types ============== //

export type CreateUserProps = z.infer<typeof createUserSchema>;

export type UpsertUserProps = z.infer<typeof upsertUserSchema>;

export type UpdateUserProps = z.infer<typeof updateUserSchema>;

export type DeleteUserProps = z.infer<typeof deleteUserSchema>;

export type FindUniqueUserProps = z.infer<typeof selectUserSchema>;

export type FindManyUserProps = z.infer<typeof selectManyUserSchema>;

export type CountUserProps = z.infer<typeof countUserSchema>;

// ============== CRUD Response Types ============== //

export type CreateUserResponse = UserModel;

export type UpsertUserResponse = UserModel;

export type UpdateUserResponse = UserModel;

export type DeleteUserResponse = UserModel;

export type FindUniqueUserResponse = UserRelationsOptional | null;

export type FindManyUserResponse = UserRelationsOptional[];

export type CountUserResponse = UserCount;

// ============== Services ============== //

/**
 * Service pour les opérations de base de données sur les users
 */
export class UserService {
    /**
     * Crée un(e) nouveau/nouvelle user
     * @param props Propriétés du/de la user
     * @returns User créé(e) ou erreur
     */
    static async create(props: CreateUserProps): Promise<ResponseFormat<CreateUserResponse>> {
        try {
            const { data, include, omit, select } = createUserSchema.parse(props);

            const user: User = await PrismaInstance.user.create({
                data,
                ...(include && { include }),
                ...(omit && { omit }),
                ...(select && { select }),
            });

            return { data: user };
        } catch (error) {
            console.error("UserService -> Create -> " + (error as Error).message);
            if (process.env.NODE_ENV === "development") {
                if (error instanceof ZodError)
                    throw new Error("UserService -> Create -> Invalid Zod params -> " + error.message);
                if (error instanceof PrismaClientKnownRequestError)
                    throw new Error("UserService -> Create -> Prisma error -> " + error.message);
                throw new Error("UserService -> Create -> " + (error as Error).message);
            }
            // TODO: add logging
            return { error: "Unable to create user..." };
        }
    }

    static async upsert(props: UpsertUserProps): Promise<ResponseFormat<UpsertUserResponse>> {
        try {
            const { create, update, where, include, omit, select } = upsertUserSchema.parse(props);

            const user: User = await PrismaInstance.user.upsert({
                create,
                update,
                where,
                ...(include && { include }),
                ...(omit && { omit }),
                ...(select && { select }),
            });

            return { data: user };
        } catch (error) {
            console.error("UserService -> Upsert -> " + (error as Error).message);
            if (process.env.NODE_ENV === "development") {
                if (error instanceof ZodError)
                    throw new Error("UserService -> Upsert -> Invalid Zod params -> " + error.message);
                if (error instanceof PrismaClientKnownRequestError)
                    throw new Error("UserService -> Upsert -> Prisma error -> " + error.message);
                throw new Error("UserService -> Upsert -> " + (error as Error).message);
            }
            // TODO: add logging
            return { error: "Unable to upsert user..." };
        }
    }

    /**
     * Met à jour un(e) user
     * @param props ID du/de la user et nouvelles données
     * @returns User mis(e) à jour ou erreur
     */
    static async update(props: UpdateUserProps): Promise<ResponseFormat<UpdateUserResponse>> {
        try {
            const { data, where, include, omit, select } = updateUserSchema.parse(props);

            const user: User = await PrismaInstance.user.update({
                data,
                where,
                ...(include && { include }),
                ...(omit && { omit }),
                ...(select && { select }),
            });

            return { data: user };
        } catch (error) {
            console.error("UserService -> Update -> " + (error as Error).message);
            if (process.env.NODE_ENV === "development") {
                if (error instanceof ZodError)
                    throw new Error("UserService -> Update -> Invalid Zod params -> " + error.message);
                if (error instanceof PrismaClientKnownRequestError)
                    throw new Error("UserService -> Update -> Prisma error -> " + error.message);
                throw new Error("UserService -> Update -> " + (error as Error).message);
            }
            // TODO: add logging
            return { error: "Unable to update user..." };
        }
    }

    /**
     * Supprime un(e) user
     * @param props ID du/de la user
     * @returns User supprimé(e) ou erreur
     */
    static async delete(props: DeleteUserProps): Promise<ResponseFormat<DeleteUserResponse>> {
        try {
            const { where, include, omit, select } = deleteUserSchema.parse(props);

            const user: User = await PrismaInstance.user.delete({
                where,
                ...(include && { include }),
                ...(omit && { omit }),
                ...(select && { select }),
            });

            return { data: user };
        } catch (error) {
            console.error("UserService -> Delete -> " + (error as Error).message);
            if (process.env.NODE_ENV === "development") {
                if (error instanceof ZodError)
                    throw new Error("UserService -> Delete -> Invalid Zod params -> " + error.message);
                if (error instanceof PrismaClientKnownRequestError)
                    throw new Error("UserService -> Delete -> Prisma error -> " + error.message);
                throw new Error("UserService -> Delete -> " + (error as Error).message);
            }
            // TODO: add logging
            return { error: "Unable to delete user..." };
        }
    }

    /**
     * Récupère un(e) user par ID ou autre filtre
     */
    static async findUnique(props: FindUniqueUserProps): Promise<ResponseFormat<FindUniqueUserResponse>> {
        try {
            const { where, include, omit, select } = selectUserSchema.parse(props);

            const user: UserRelationsOptional | null = await PrismaInstance.user.findUnique({
                where,
                ...(include && { include }),
                ...(omit && { omit }),
                ...(select && { select }),
            });

            return { data: user };
        } catch (error) {
            console.error("UserService -> FindUnique -> " + (error as Error).message);
            if (process.env.NODE_ENV === "development") {
                if (error instanceof ZodError)
                    throw new Error("UserService -> FindUnique -> Invalid Zod params -> " + error.message);
                if (error instanceof PrismaClientKnownRequestError)
                    throw new Error("UserService -> FindUnique -> Prisma error -> " + error.message);
                throw new Error("UserService -> FindUnique -> " + (error as Error).message);
            }
            // TODO: add logging
            return { error: "Unable to find user..." };
        }
    }

    /**
     * Récupère une liste de users avec filtres
     */
    static async findMany(props: FindManyUserProps): Promise<ResponseFormat<FindManyUserResponse>> {
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
            } = selectManyUserSchema.parse(props);

            const userList: UserRelationsOptional[] = await PrismaInstance.user.findMany({
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

            return { data: userList };
        } catch (error) {
            console.error("UserService -> FindMany -> " + (error as Error).message);
            if (process.env.NODE_ENV === "development") {
                if (error instanceof ZodError)
                    throw new Error("UserService -> FindMany -> Invalid Zod params -> " + error.message);
                if (error instanceof PrismaClientKnownRequestError)
                    throw new Error("UserService -> FindMany -> Prisma error -> " + error.message);
                throw new Error("UserService -> FindMany -> " + (error as Error).message);
            }
            // TODO: add logging
            return { error: "Unable to find users..." };
        }
    }

    /**
     * Compte les users avec filtres
     */
    static async count(props: CountUserProps): Promise<ResponseFormat<CountUserResponse>> {
        try {
            const { cursor, orderBy, select, skip, take, where } = countUserSchema.parse(props);

            const userAmount: UserCount = await PrismaInstance.user.count({
                ...(cursor && { cursor }),
                ...(orderBy && { orderBy }),
                ...(select && { select }),
                ...(skip && { skip }),
                ...(take && { take }),
                ...(where && { where }),
            });

            return { data: userAmount };
        } catch (error) {
            console.error("UserService -> Count -> " + (error as Error).message);
            if (process.env.NODE_ENV === "development") {
                if (error instanceof ZodError)
                    throw new Error("UserService -> Count -> Invalid Zod params -> " + error.message);
                if (error instanceof PrismaClientKnownRequestError)
                    throw new Error("UserService -> Count -> Prisma error -> " + error.message);
                throw new Error("UserService -> Count -> " + (error as Error).message);
            }
            // TODO: add logging
            return { error: "Unable to count users..." };
        }
    }
}
