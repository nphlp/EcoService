import PrismaInstance from "@lib/prisma";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { CategoryCount, CategoryCountProps, CategoryCountResponse, CategoryCountSchema, CategoryCreateManyProps, CategoryCreateManyResponse, CategoryCreateManySchema, CategoryCreateProps, CategoryCreateResponse, CategoryCreateSchema, CategoryDeleteManyProps, CategoryDeleteManyResponse, CategoryDeleteManySchema, CategoryDeleteProps, CategoryDeleteResponse, CategoryDeleteSchema, CategoryFindFirstProps, CategoryFindFirstResponse, CategoryFindFirstSchema, CategoryFindManyProps, CategoryFindManyResponse, CategoryFindManySchema, CategoryFindUniqueProps, CategoryFindUniqueResponse, CategoryFindUniqueSchema, CategoryUpdateManyProps, CategoryUpdateManyResponse, CategoryUpdateManySchema, CategoryUpdateProps, CategoryUpdateResponse, CategoryUpdateSchema, CategoryUpsertProps, CategoryUpsertResponse, CategoryUpsertSchema } from "@services/types/CategoryType";
import { ResponseFormat } from "@utils/FetchConfig";
import { ZodError } from "zod";

export default class CategoryService {

    // ========== Single mutations ========== //

    static async create<T extends CategoryCreateProps>(props: T): Promise<ResponseFormat<CategoryCreateResponse<T>>> {
        try {
            const parsedProps = CategoryCreateSchema.parse(props);
            const category = await PrismaInstance.category.create(parsedProps);
            return { data: category as CategoryCreateResponse<T> };
        } catch (error) {
            return CategoryService.error("create", error);
        }
    }

    static async upsert<T extends CategoryUpsertProps>(props: T): Promise<ResponseFormat<CategoryUpsertResponse<T>>> {
        try {
            const parsedProps = CategoryUpsertSchema.parse(props);
            const category = await PrismaInstance.category.upsert(parsedProps);
            return { data: category as CategoryUpsertResponse<T> };
        } catch (error) {
            return CategoryService.error("upsert", error);
        }
    }

    static async update<T extends CategoryUpdateProps>(props: T): Promise<ResponseFormat<CategoryUpdateResponse<T>>> {
        try {
            const parsedProps = CategoryUpdateSchema.parse(props);
            const category = await PrismaInstance.category.update(parsedProps);
            return { data: category as CategoryUpdateResponse<T> };
        } catch (error) {
            return CategoryService.error("update", error);
        }
    }

    static async delete<T extends CategoryDeleteProps>(props: T): Promise<ResponseFormat<CategoryDeleteResponse<T>>> {
        try {
            const parsedProps = CategoryDeleteSchema.parse(props);
            const category = await PrismaInstance.category.delete(parsedProps);
            return { data: category as CategoryDeleteResponse<T> };
        } catch (error) {
            return CategoryService.error("delete", error);
        }
    }

    // ========== Multiple mutations ========== //

    static async createMany(props: CategoryCreateManyProps): Promise<ResponseFormat<CategoryCreateManyResponse>> {
        try {
            const parsedProps = CategoryCreateManySchema.parse(props);
            const result = await PrismaInstance.category.createMany(parsedProps);
            return { data: result };
        } catch (error) {
            return CategoryService.error("createMany", error);
        }
    }

    static async updateMany(props: CategoryUpdateManyProps): Promise<ResponseFormat<CategoryUpdateManyResponse>> {
        try {
            const parsedProps = CategoryUpdateManySchema.parse(props);
            const result = await PrismaInstance.category.updateMany(parsedProps);
            return { data: result };
        } catch (error) {
            return CategoryService.error("updateMany", error);
        }
    }

    static async deleteMany(props: CategoryDeleteManyProps): Promise<ResponseFormat<CategoryDeleteManyResponse>> {
        try {
            const parsedProps = CategoryDeleteManySchema.parse(props);
            const result = await PrismaInstance.category.deleteMany(parsedProps);
            return { data: result };
        } catch (error) {
            return CategoryService.error("deleteMany", error);
        }
    }

    // ========== Single queries ========== //

    static async findFirst<T extends CategoryFindFirstProps>(props: T): Promise<ResponseFormat<CategoryFindFirstResponse<T>>> {
        try {
            const parsedProps = CategoryFindFirstSchema.parse(props);
            const category = await PrismaInstance.category.findFirst(parsedProps);
            return { data: category as CategoryFindFirstResponse<T> };
        } catch (error) {
            return CategoryService.error("findFirst", error);
        }
    }

    static async findUnique<T extends CategoryFindUniqueProps>(props: T): Promise<ResponseFormat<CategoryFindUniqueResponse<T>>> {
        try {
            const parsedProps = CategoryFindUniqueSchema.parse(props);
            const category = await PrismaInstance.category.findUnique(parsedProps);
            return { data: category as CategoryFindUniqueResponse<T> };
        } catch (error) {
            return CategoryService.error("findUnique", error);
        }
    }

    static async findMany<T extends CategoryFindManyProps>(props: T): Promise<ResponseFormat<CategoryFindManyResponse<T>>> {
        try {
            const parsedProps = CategoryFindManySchema.parse(props);
            const { skip = 0, take = 10 } = parsedProps;
            const categoryList = await PrismaInstance.category.findMany({ skip, take, ...parsedProps });
            return { data: categoryList as CategoryFindManyResponse<T> };
        } catch (error) {
            return CategoryService.error("findMany", error);
        }
    }

    // ========== Aggregate queries ========== //

    static async count(props: CategoryCountProps): Promise<ResponseFormat<CategoryCountResponse>> {
        try {
            const parsedProps = CategoryCountSchema.parse(props);
            const categoryAmount: CategoryCount = await PrismaInstance.category.count(parsedProps);
            return { data: categoryAmount };
        } catch (error) {
            return CategoryService.error("count", error);
        }
    }

    // ========== Error handling ========== //

    static async error(methodName: string, error: unknown): Promise<{error: string}> {
        if (process.env.NODE_ENV === "development") {
            const serviceName = this.constructor.name;
            const message = (error as Error).message;
            if (error instanceof ZodError){
                const zodMessage = serviceName + " -> " + methodName + " -> Invalid Zod params -> " + error.message;
                console.error(zodMessage);
                throw new Error(zodMessage);
            } else if (error instanceof PrismaClientKnownRequestError){
                const prismaMessage = serviceName + " -> " + methodName + " -> Prisma error -> " + error.message;
                console.error(prismaMessage);
                throw new Error(prismaMessage);
            } else {
                const errorMessage = serviceName + " -> " + methodName + " -> " + message;
                console.error(errorMessage);
                throw new Error(errorMessage);
            }
        }
        // TODO: add logging
        return { error: "Something went wrong..." };
    }
}
