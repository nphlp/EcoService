import PrismaInstance from "@lib/prisma";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { CategoryCount, CountCategoryProps, CountCategoryResponse, CreateCategoryProps, CreateCategoryResponse, DeleteCategoryProps, DeleteCategoryResponse, FindManyCategoryProps, FindManyCategoryResponse, FindUniqueCategoryProps, FindUniqueCategoryResponse, UpdateCategoryProps, UpdateCategoryResponse, UpsertCategoryProps, UpsertCategoryResponse, countCategorySchema, createCategorySchema, deleteCategorySchema, selectCategorySchema, selectManyCategorySchema, updateCategorySchema, upsertCategorySchema } from "@services/types/CategoryType";
import { ResponseFormat } from "@utils/FetchV2";
import { ZodError } from "zod";

export default class CategoryService {
    static async create<T extends CreateCategoryProps>(props: T): Promise<ResponseFormat<CreateCategoryResponse<T>>> {
        try {
            const { data, include, omit, select } = createCategorySchema.parse(props);

            const category = await PrismaInstance.category.create({
                data,
                ...(include && { include }),
                ...(omit && { omit }),
                ...(select && { select }),
            });

            return { data: category as CreateCategoryResponse<T> };
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

    static async upsert<T extends UpsertCategoryProps>(props: T): Promise<ResponseFormat<UpsertCategoryResponse<T>>> {
        try {
            const { create, update, where, include, omit, select } = upsertCategorySchema.parse(props);

            const category = await PrismaInstance.category.upsert({
                create,
                update,
                where,
                ...(include && { include }),
                ...(omit && { omit }),
                ...(select && { select }),
            });

            return { data: category as UpsertCategoryResponse<T> };
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

    static async update<T extends UpdateCategoryProps>(props: T): Promise<ResponseFormat<UpdateCategoryResponse<T>>> {
        try {
            const { data, where, include, omit, select } = updateCategorySchema.parse(props);

            const category = await PrismaInstance.category.update({
                data,
                where,
                ...(include && { include }),
                ...(omit && { omit }),
                ...(select && { select }),
            });

            return { data: category as UpdateCategoryResponse<T> };
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

    static async delete<T extends DeleteCategoryProps>(props: T): Promise<ResponseFormat<DeleteCategoryResponse<T>>> {
        try {
            const { where, include, omit, select } = deleteCategorySchema.parse(props);

            const category = await PrismaInstance.category.delete({
                where,
                ...(include && { include }),
                ...(omit && { omit }),
                ...(select && { select }),
            });

            return { data: category as DeleteCategoryResponse<T> };
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

    static async findUnique<T extends FindUniqueCategoryProps>(props: T): Promise<ResponseFormat<FindUniqueCategoryResponse<T>>> {
        try {
            const { where, include, omit, select } = selectCategorySchema.parse(props);

            const category = await PrismaInstance.category.findUnique({
                where,
                ...(include && { include }),
                ...(omit && { omit }),
                ...(select && { select }),
            });

            return { data: category as FindUniqueCategoryResponse<T> };
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

    static async findMany<T extends FindManyCategoryProps>(props: T): Promise<ResponseFormat<FindManyCategoryResponse<T>>> {
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

            const categoryList = await PrismaInstance.category.findMany({
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

            return { data: categoryList as FindManyCategoryResponse<T> };
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
