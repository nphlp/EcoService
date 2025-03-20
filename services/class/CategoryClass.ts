/**
 * Classe de service pour les opérations CRUD sur les categorys
 * 
 * Ce fichier centralise toute la logique d'accès aux données pour les categorys.
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
    Category,
    CategoryCreateArgsSchema,
    CategoryDeleteArgsSchema,
    CategoryFindManyArgsSchema,
    CategoryFindUniqueArgsSchema,
    CategoryOrderByWithRelationInputSchema,
    CategorySchema,
    CategoryUpdateArgsSchema,
    CategoryUpsertArgsSchema,
    CategoryWhereInputSchema,
    CategoryWhereUniqueInputSchema,
    CategoryWithRelationsSchema
} from "@services/schemas";
import { CategoryIncludeSchema } from "@services/schemas/inputTypeSchemas/CategoryIncludeSchema";
import { z, ZodError, ZodType } from "zod";

// ============== Types ============== //

export type CategoryModel = z.infer<typeof CategorySchema>;

export type CategoryRelationsOptional = z.infer<typeof CategorySchema> & z.infer<typeof CategoryIncludeSchema>;

export type CategoryRelationsComplete = z.infer<typeof CategoryWithRelationsSchema>;

export type CategoryCount = number;

// ============== Schema Types ============== //

const createCategorySchema: ZodType<Prisma.CategoryCreateArgs> = CategoryCreateArgsSchema;

const upsertCategorySchema: ZodType<Prisma.CategoryUpsertArgs> = CategoryUpsertArgsSchema;

const updateCategorySchema: ZodType<Prisma.CategoryUpdateArgs> = CategoryUpdateArgsSchema;

const deleteCategorySchema: ZodType<Prisma.CategoryDeleteArgs> = CategoryDeleteArgsSchema;

const selectCategorySchema: ZodType<Prisma.CategoryFindUniqueArgs> = CategoryFindUniqueArgsSchema;

const selectManyCategorySchema: ZodType<Prisma.CategoryFindManyArgs> = CategoryFindManyArgsSchema;

/**
 * Définition du schéma pour CategoryCountArgs
 * 
 * Ce schéma correspond au type Prisma.CategoryCountArgs qui est défini comme:
 * Omit<CategoryFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
 *   select?: CategoryCountAggregateInputType | true
 * }
 */
const countCategorySchema: ZodType<Prisma.CategoryCountArgs> = z.object({
    where: z.lazy(() => CategoryWhereInputSchema).optional(),
    orderBy: z.union([
        z.lazy(() => CategoryOrderByWithRelationInputSchema),
        z.array(z.lazy(() => CategoryOrderByWithRelationInputSchema))
    ]).optional(),
    cursor: z.lazy(() => CategoryWhereUniqueInputSchema).optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    select: z.union([z.literal(true), z.record(z.boolean())]).optional()
});

// ============== CRUD Props Types ============== //

export type CreateCategoryProps = z.infer<typeof createCategorySchema>;

export type UpsertCategoryProps = z.infer<typeof upsertCategorySchema>;

export type UpdateCategoryProps = z.infer<typeof updateCategorySchema>;

export type DeleteCategoryProps = z.infer<typeof deleteCategorySchema>;

export type FindUniqueCategoryProps = z.infer<typeof selectCategorySchema>;

export type FindManyCategoryProps = z.infer<typeof selectManyCategorySchema>;

export type CountCategoryProps = z.infer<typeof countCategorySchema>;

// ============== CRUD Response Types ============== //

export type CreateCategoryResponse = CategoryModel;

export type UpsertCategoryResponse = CategoryModel;

export type UpdateCategoryResponse = CategoryModel;

export type DeleteCategoryResponse = CategoryModel;

export type FindUniqueCategoryResponse = CategoryRelationsOptional | null;

export type FindManyCategoryResponse = CategoryRelationsOptional[];

export type CountCategoryResponse = CategoryCount;

// ============== Services ============== //

/**
 * Service pour les opérations de base de données sur les categorys
 */
export class CategoryService {
    /**
     * Crée un(e) nouveau/nouvelle category
     * @param props Propriétés du/de la category
     * @returns Category créé(e) ou erreur
     */
    static async create(props: CreateCategoryProps): Promise<ResponseFormat<CreateCategoryResponse>> {
        try {
            const { data, include, omit, select } = createCategorySchema.parse(props);

            const category: Category = await PrismaInstance.category.create({
                data,
                ...(include && { include }),
                ...(omit && { omit }),
                ...(select && { select }),
            });

            return { data: category };
        } catch (error) {
            console.error("CategoryService -> Create -> " + (error as Error).message);
            if (process.env.NODE_ENV === "development") {
                if (error instanceof ZodError)
                    throw new Error("CategoryService -> Create -> Invalid Zod params -> " + error.message);
                if (error instanceof PrismaClientKnownRequestError)
                    throw new Error("CategoryService -> Create -> Prisma error -> " + error.message);
                throw new Error("CategoryService -> Create -> " + (error as Error).message);
            }
            // TODO: add logging
            return { error: "Unable to create category..." };
        }
    }

    static async upsert(props: UpsertCategoryProps): Promise<ResponseFormat<UpsertCategoryResponse>> {
        try {
            const { create, update, where, include, omit, select } = upsertCategorySchema.parse(props);

            const category: Category = await PrismaInstance.category.upsert({
                create,
                update,
                where,
                ...(include && { include }),
                ...(omit && { omit }),
                ...(select && { select }),
            });

            return { data: category };
        } catch (error) {
            console.error("CategoryService -> Upsert -> " + (error as Error).message);
            if (process.env.NODE_ENV === "development") {
                if (error instanceof ZodError)
                    throw new Error("CategoryService -> Upsert -> Invalid Zod params -> " + error.message);
                if (error instanceof PrismaClientKnownRequestError)
                    throw new Error("CategoryService -> Upsert -> Prisma error -> " + error.message);
                throw new Error("CategoryService -> Upsert -> " + (error as Error).message);
            }
            // TODO: add logging
            return { error: "Unable to upsert category..." };
        }
    }

    /**
     * Met à jour un(e) category
     * @param props ID du/de la category et nouvelles données
     * @returns Category mis(e) à jour ou erreur
     */
    static async update(props: UpdateCategoryProps): Promise<ResponseFormat<UpdateCategoryResponse>> {
        try {
            const { data, where, include, omit, select } = updateCategorySchema.parse(props);

            const category: Category = await PrismaInstance.category.update({
                data,
                where,
                ...(include && { include }),
                ...(omit && { omit }),
                ...(select && { select }),
            });

            return { data: category };
        } catch (error) {
            console.error("CategoryService -> Update -> " + (error as Error).message);
            if (process.env.NODE_ENV === "development") {
                if (error instanceof ZodError)
                    throw new Error("CategoryService -> Update -> Invalid Zod params -> " + error.message);
                if (error instanceof PrismaClientKnownRequestError)
                    throw new Error("CategoryService -> Update -> Prisma error -> " + error.message);
                throw new Error("CategoryService -> Update -> " + (error as Error).message);
            }
            // TODO: add logging
            return { error: "Unable to update category..." };
        }
    }

    /**
     * Supprime un(e) category
     * @param props ID du/de la category
     * @returns Category supprimé(e) ou erreur
     */
    static async delete(props: DeleteCategoryProps): Promise<ResponseFormat<DeleteCategoryResponse>> {
        try {
            const { where, include, omit, select } = deleteCategorySchema.parse(props);

            const category: Category = await PrismaInstance.category.delete({
                where,
                ...(include && { include }),
                ...(omit && { omit }),
                ...(select && { select }),
            });

            return { data: category };
        } catch (error) {
            console.error("CategoryService -> Delete -> " + (error as Error).message);
            if (process.env.NODE_ENV === "development") {
                if (error instanceof ZodError)
                    throw new Error("CategoryService -> Delete -> Invalid Zod params -> " + error.message);
                if (error instanceof PrismaClientKnownRequestError)
                    throw new Error("CategoryService -> Delete -> Prisma error -> " + error.message);
                throw new Error("CategoryService -> Delete -> " + (error as Error).message);
            }
            // TODO: add logging
            return { error: "Unable to delete category..." };
        }
    }

    /**
     * Récupère un(e) category par ID ou autre filtre
     */
    static async findUnique(props: FindUniqueCategoryProps): Promise<ResponseFormat<FindUniqueCategoryResponse>> {
        try {
            const { where, include, omit, select } = selectCategorySchema.parse(props);

            const category: CategoryRelationsOptional | null = await PrismaInstance.category.findUnique({
                where,
                ...(include && { include }),
                ...(omit && { omit }),
                ...(select && { select }),
            });

            return { data: category };
        } catch (error) {
            console.error("CategoryService -> FindUnique -> " + (error as Error).message);
            if (process.env.NODE_ENV === "development") {
                if (error instanceof ZodError)
                    throw new Error("CategoryService -> FindUnique -> Invalid Zod params -> " + error.message);
                if (error instanceof PrismaClientKnownRequestError)
                    throw new Error("CategoryService -> FindUnique -> Prisma error -> " + error.message);
                throw new Error("CategoryService -> FindUnique -> " + (error as Error).message);
            }
            // TODO: add logging
            return { error: "Unable to find category..." };
        }
    }

    /**
     * Récupère une liste de categorys avec filtres
     */
    static async findMany(props: FindManyCategoryProps): Promise<ResponseFormat<FindManyCategoryResponse>> {
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
            } = selectManyCategorySchema.parse(props);

            const categoryList: CategoryRelationsOptional[] = await PrismaInstance.category.findMany({
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

            return { data: categoryList };
        } catch (error) {
            console.error("CategoryService -> FindMany -> " + (error as Error).message);
            if (process.env.NODE_ENV === "development") {
                if (error instanceof ZodError)
                    throw new Error("CategoryService -> FindMany -> Invalid Zod params -> " + error.message);
                if (error instanceof PrismaClientKnownRequestError)
                    throw new Error("CategoryService -> FindMany -> Prisma error -> " + error.message);
                throw new Error("CategoryService -> FindMany -> " + (error as Error).message);
            }
            // TODO: add logging
            return { error: "Unable to find categorys..." };
        }
    }

    /**
     * Compte les categorys avec filtres
     */
    static async count(props: CountCategoryProps): Promise<ResponseFormat<CountCategoryResponse>> {
        try {
            const { cursor, orderBy, select, skip, take, where } = countCategorySchema.parse(props);

            const categoryAmount: CategoryCount = await PrismaInstance.category.count({
                ...(cursor && { cursor }),
                ...(orderBy && { orderBy }),
                ...(select && { select }),
                ...(skip && { skip }),
                ...(take && { take }),
                ...(where && { where }),
            });

            return { data: categoryAmount };
        } catch (error) {
            console.error("CategoryService -> Count -> " + (error as Error).message);
            if (process.env.NODE_ENV === "development") {
                if (error instanceof ZodError)
                    throw new Error("CategoryService -> Count -> Invalid Zod params -> " + error.message);
                if (error instanceof PrismaClientKnownRequestError)
                    throw new Error("CategoryService -> Count -> Prisma error -> " + error.message);
                throw new Error("CategoryService -> Count -> " + (error as Error).message);
            }
            // TODO: add logging
            return { error: "Unable to count categorys..." };
        }
    }
}
