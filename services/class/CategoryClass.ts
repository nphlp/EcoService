import PrismaInstance from "@lib/prisma";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { CategoryCount, CategoryCountProps, CategoryCountResponse, CategoryCreateManyProps, CategoryCreateManyResponse, CategoryCreateProps, CategoryCreateResponse, CategoryDeleteManyProps, CategoryDeleteManyResponse, CategoryDeleteProps, CategoryDeleteResponse, CategoryFindFirstProps, CategoryFindFirstResponse, CategoryFindManyProps, CategoryFindManyResponse, CategoryFindUniqueProps, CategoryFindUniqueResponse, CategoryUpdateManyProps, CategoryUpdateManyResponse, CategoryUpdateProps, CategoryUpdateResponse, CategoryUpsertProps, CategoryUpsertResponse } from "@services/types/CategoryType";
import { ResponseFormat } from "@utils/FetchConfig";

export default class CategoryService {

    // ========== Single mutations ========== //

    static async create<T extends CategoryCreateProps>(props: T): Promise<ResponseFormat<CategoryCreateResponse<T>>> {
        try {
            const category = await PrismaInstance.category.create(props);
            return { data: category as CategoryCreateResponse<T> };
        } catch (error) {
            return CategoryService.error("create", error);
        }
    }

    static async upsert<T extends CategoryUpsertProps>(props: T): Promise<ResponseFormat<CategoryUpsertResponse<T>>> {
        try {
            const category = await PrismaInstance.category.upsert(props);
            return { data: category as CategoryUpsertResponse<T> };
        } catch (error) {
            return CategoryService.error("upsert", error);
        }
    }

    static async update<T extends CategoryUpdateProps>(props: T): Promise<ResponseFormat<CategoryUpdateResponse<T>>> {
        try {
            const category = await PrismaInstance.category.update(props);
            return { data: category as CategoryUpdateResponse<T> };
        } catch (error) {
            return CategoryService.error("update", error);
        }
    }

    static async delete<T extends CategoryDeleteProps>(props: T): Promise<ResponseFormat<CategoryDeleteResponse<T>>> {
        try {
            const category = await PrismaInstance.category.delete(props);
            return { data: category as CategoryDeleteResponse<T> };
        } catch (error) {
            return CategoryService.error("delete", error);
        }
    }

    // ========== Multiple mutations ========== //

    static async createMany(props: CategoryCreateManyProps): Promise<ResponseFormat<CategoryCreateManyResponse>> {
        try {
            const result = await PrismaInstance.category.createMany(props);
            return { data: result };
        } catch (error) {
            return CategoryService.error("createMany", error);
        }
    }

    static async updateMany(props: CategoryUpdateManyProps): Promise<ResponseFormat<CategoryUpdateManyResponse>> {
        try {
            const result = await PrismaInstance.category.updateMany(props);
            return { data: result };
        } catch (error) {
            return CategoryService.error("updateMany", error);
        }
    }

    static async deleteMany(props: CategoryDeleteManyProps): Promise<ResponseFormat<CategoryDeleteManyResponse>> {
        try {
            const result = await PrismaInstance.category.deleteMany(props);
            return { data: result };
        } catch (error) {
            return CategoryService.error("deleteMany", error);
        }
    }

    // ========== Single queries ========== //

    static async findFirst<T extends CategoryFindFirstProps>(props: T): Promise<ResponseFormat<CategoryFindFirstResponse<T>>> {
        try {
            const category = await PrismaInstance.category.findFirst(props);
            return { data: category as CategoryFindFirstResponse<T> };
        } catch (error) {
            return CategoryService.error("findFirst", error);
        }
    }

    static async findUnique<T extends CategoryFindUniqueProps>(props: T): Promise<ResponseFormat<CategoryFindUniqueResponse<T>>> {
        try {
            const category = await PrismaInstance.category.findUnique(props);
            return { data: category as CategoryFindUniqueResponse<T> };
        } catch (error) {
            return CategoryService.error("findUnique", error);
        }
    }

    static async findMany<T extends CategoryFindManyProps>(props: T): Promise<ResponseFormat<CategoryFindManyResponse<T>>> {
        try {
            const categoryList = await PrismaInstance.category.findMany(props);
            return { data: categoryList as CategoryFindManyResponse<T> };
        } catch (error) {
            return CategoryService.error("findMany", error);
        }
    }

    // ========== Aggregate queries ========== //

    static async count(props: CategoryCountProps): Promise<ResponseFormat<CategoryCountResponse>> {
        try {
            const categoryAmount: CategoryCount = await PrismaInstance.category.count(props);
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
            if (error instanceof PrismaClientKnownRequestError){
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
