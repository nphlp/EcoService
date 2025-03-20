/**
 * Classe de service pour les opérations CRUD sur les products
 * 
 * Ce fichier centralise toute la logique d'accès aux données pour les products.
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
    Product,
    ProductCreateArgsSchema,
    ProductDeleteArgsSchema,
    ProductFindManyArgsSchema,
    ProductFindUniqueArgsSchema,
    ProductOrderByWithRelationInputSchema,
    ProductSchema,
    ProductUpdateArgsSchema,
    ProductUpsertArgsSchema,
    ProductWhereInputSchema,
    ProductWhereUniqueInputSchema,
    ProductWithRelationsSchema
} from "@services/schemas";
import { ProductIncludeSchema } from "@services/schemas/inputTypeSchemas/ProductIncludeSchema";
import { z, ZodError, ZodType } from "zod";

// ============== Types ============== //

export type ProductModel = z.infer<typeof ProductSchema>;

export type ProductRelationsOptional = z.infer<typeof ProductSchema> & z.infer<typeof ProductIncludeSchema>;

export type ProductRelationsComplete = z.infer<typeof ProductWithRelationsSchema>;

export type ProductCount = number;

// ============== Schema Types ============== //

const createProductSchema: ZodType<Prisma.ProductCreateArgs> = ProductCreateArgsSchema;

const upsertProductSchema: ZodType<Prisma.ProductUpsertArgs> = ProductUpsertArgsSchema;

const updateProductSchema: ZodType<Prisma.ProductUpdateArgs> = ProductUpdateArgsSchema;

const deleteProductSchema: ZodType<Prisma.ProductDeleteArgs> = ProductDeleteArgsSchema;

const selectProductSchema: ZodType<Prisma.ProductFindUniqueArgs> = ProductFindUniqueArgsSchema;

const selectManyProductSchema: ZodType<Prisma.ProductFindManyArgs> = ProductFindManyArgsSchema;

/**
 * Définition du schéma pour ProductCountArgs
 * 
 * Ce schéma correspond au type Prisma.ProductCountArgs qui est défini comme:
 * Omit<ProductFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
 *   select?: ProductCountAggregateInputType | true
 * }
 */
const countProductSchema: ZodType<Prisma.ProductCountArgs> = z.object({
    where: z.lazy(() => ProductWhereInputSchema).optional(),
    orderBy: z.union([
        z.lazy(() => ProductOrderByWithRelationInputSchema),
        z.array(z.lazy(() => ProductOrderByWithRelationInputSchema))
    ]).optional(),
    cursor: z.lazy(() => ProductWhereUniqueInputSchema).optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    select: z.union([z.literal(true), z.record(z.boolean())]).optional()
});

// ============== CRUD Props Types ============== //

export type CreateProductProps = z.infer<typeof createProductSchema>;

export type UpsertProductProps = z.infer<typeof upsertProductSchema>;

export type UpdateProductProps = z.infer<typeof updateProductSchema>;

export type DeleteProductProps = z.infer<typeof deleteProductSchema>;

export type FindUniqueProductProps = z.infer<typeof selectProductSchema>;

export type FindManyProductProps = z.infer<typeof selectManyProductSchema>;

export type CountProductProps = z.infer<typeof countProductSchema>;

// ============== CRUD Response Types ============== //

export type CreateProductResponse = ProductModel;

export type UpsertProductResponse = ProductModel;

export type UpdateProductResponse = ProductModel;

export type DeleteProductResponse = ProductModel;

export type FindUniqueProductResponse = ProductRelationsOptional | null;

export type FindManyProductResponse = ProductRelationsOptional[];

export type CountProductResponse = ProductCount;

// ============== Services ============== //

/**
 * Service pour les opérations de base de données sur les products
 */
export class ProductService {
    /**
     * Crée un(e) nouveau/nouvelle product
     * @param props Propriétés du/de la product
     * @returns Product créé(e) ou erreur
     */
    static async create(props: CreateProductProps): Promise<ResponseFormat<CreateProductResponse>> {
        try {
            const { data, include, omit, select } = createProductSchema.parse(props);

            const product: Product = await PrismaInstance.product.create({
                data,
                ...(include && { include }),
                ...(omit && { omit }),
                ...(select && { select }),
            });

            return { data: product };
        } catch (error) {
            console.error("ProductService -> Create -> " + (error as Error).message);
            if (process.env.NODE_ENV === "development") {
                if (error instanceof ZodError)
                    throw new Error("ProductService -> Create -> Invalid Zod params -> " + error.message);
                if (error instanceof PrismaClientKnownRequestError)
                    throw new Error("ProductService -> Create -> Prisma error -> " + error.message);
                throw new Error("ProductService -> Create -> " + (error as Error).message);
            }
            // TODO: add logging
            return { error: "Unable to create product..." };
        }
    }

    static async upsert(props: UpsertProductProps): Promise<ResponseFormat<UpsertProductResponse>> {
        try {
            const { create, update, where, include, omit, select } = upsertProductSchema.parse(props);

            const product: Product = await PrismaInstance.product.upsert({
                create,
                update,
                where,
                ...(include && { include }),
                ...(omit && { omit }),
                ...(select && { select }),
            });

            return { data: product };
        } catch (error) {
            console.error("ProductService -> Upsert -> " + (error as Error).message);
            if (process.env.NODE_ENV === "development") {
                if (error instanceof ZodError)
                    throw new Error("ProductService -> Upsert -> Invalid Zod params -> " + error.message);
                if (error instanceof PrismaClientKnownRequestError)
                    throw new Error("ProductService -> Upsert -> Prisma error -> " + error.message);
                throw new Error("ProductService -> Upsert -> " + (error as Error).message);
            }
            // TODO: add logging
            return { error: "Unable to upsert product..." };
        }
    }

    /**
     * Met à jour un(e) product
     * @param props ID du/de la product et nouvelles données
     * @returns Product mis(e) à jour ou erreur
     */
    static async update(props: UpdateProductProps): Promise<ResponseFormat<UpdateProductResponse>> {
        try {
            const { data, where, include, omit, select } = updateProductSchema.parse(props);

            const product: Product = await PrismaInstance.product.update({
                data,
                where,
                ...(include && { include }),
                ...(omit && { omit }),
                ...(select && { select }),
            });

            return { data: product };
        } catch (error) {
            console.error("ProductService -> Update -> " + (error as Error).message);
            if (process.env.NODE_ENV === "development") {
                if (error instanceof ZodError)
                    throw new Error("ProductService -> Update -> Invalid Zod params -> " + error.message);
                if (error instanceof PrismaClientKnownRequestError)
                    throw new Error("ProductService -> Update -> Prisma error -> " + error.message);
                throw new Error("ProductService -> Update -> " + (error as Error).message);
            }
            // TODO: add logging
            return { error: "Unable to update product..." };
        }
    }

    /**
     * Supprime un(e) product
     * @param props ID du/de la product
     * @returns Product supprimé(e) ou erreur
     */
    static async delete(props: DeleteProductProps): Promise<ResponseFormat<DeleteProductResponse>> {
        try {
            const { where, include, omit, select } = deleteProductSchema.parse(props);

            const product: Product = await PrismaInstance.product.delete({
                where,
                ...(include && { include }),
                ...(omit && { omit }),
                ...(select && { select }),
            });

            return { data: product };
        } catch (error) {
            console.error("ProductService -> Delete -> " + (error as Error).message);
            if (process.env.NODE_ENV === "development") {
                if (error instanceof ZodError)
                    throw new Error("ProductService -> Delete -> Invalid Zod params -> " + error.message);
                if (error instanceof PrismaClientKnownRequestError)
                    throw new Error("ProductService -> Delete -> Prisma error -> " + error.message);
                throw new Error("ProductService -> Delete -> " + (error as Error).message);
            }
            // TODO: add logging
            return { error: "Unable to delete product..." };
        }
    }

    /**
     * Récupère un(e) product par ID ou autre filtre
     */
    static async findUnique(props: FindUniqueProductProps): Promise<ResponseFormat<FindUniqueProductResponse>> {
        try {
            const { where, include, omit, select } = selectProductSchema.parse(props);

            const product: ProductRelationsOptional | null = await PrismaInstance.product.findUnique({
                where,
                ...(include && { include }),
                ...(omit && { omit }),
                ...(select && { select }),
            });

            return { data: product };
        } catch (error) {
            console.error("ProductService -> FindUnique -> " + (error as Error).message);
            if (process.env.NODE_ENV === "development") {
                if (error instanceof ZodError)
                    throw new Error("ProductService -> FindUnique -> Invalid Zod params -> " + error.message);
                if (error instanceof PrismaClientKnownRequestError)
                    throw new Error("ProductService -> FindUnique -> Prisma error -> " + error.message);
                throw new Error("ProductService -> FindUnique -> " + (error as Error).message);
            }
            // TODO: add logging
            return { error: "Unable to find product..." };
        }
    }

    /**
     * Récupère une liste de products avec filtres
     */
    static async findMany(props: FindManyProductProps): Promise<ResponseFormat<FindManyProductResponse>> {
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
            } = selectManyProductSchema.parse(props);

            const productList: ProductRelationsOptional[] = await PrismaInstance.product.findMany({
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

            return { data: productList };
        } catch (error) {
            console.error("ProductService -> FindMany -> " + (error as Error).message);
            if (process.env.NODE_ENV === "development") {
                if (error instanceof ZodError)
                    throw new Error("ProductService -> FindMany -> Invalid Zod params -> " + error.message);
                if (error instanceof PrismaClientKnownRequestError)
                    throw new Error("ProductService -> FindMany -> Prisma error -> " + error.message);
                throw new Error("ProductService -> FindMany -> " + (error as Error).message);
            }
            // TODO: add logging
            return { error: "Unable to find products..." };
        }
    }

    /**
     * Compte les products avec filtres
     */
    static async count(props: CountProductProps): Promise<ResponseFormat<CountProductResponse>> {
        try {
            const { cursor, orderBy, select, skip, take, where } = countProductSchema.parse(props);

            const productAmount: ProductCount = await PrismaInstance.product.count({
                ...(cursor && { cursor }),
                ...(orderBy && { orderBy }),
                ...(select && { select }),
                ...(skip && { skip }),
                ...(take && { take }),
                ...(where && { where }),
            });

            return { data: productAmount };
        } catch (error) {
            console.error("ProductService -> Count -> " + (error as Error).message);
            if (process.env.NODE_ENV === "development") {
                if (error instanceof ZodError)
                    throw new Error("ProductService -> Count -> Invalid Zod params -> " + error.message);
                if (error instanceof PrismaClientKnownRequestError)
                    throw new Error("ProductService -> Count -> Prisma error -> " + error.message);
                throw new Error("ProductService -> Count -> " + (error as Error).message);
            }
            // TODO: add logging
            return { error: "Unable to count products..." };
        }
    }
}
