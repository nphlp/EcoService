import PrismaInstance from "@lib/prisma";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { CategoryCount, CountCategoryProps, CountCategoryResponse, CreateManyCategoryProps, CreateManyCategoryResponse, CreateCategoryProps, CreateCategoryResponse, DeleteManyCategoryProps, DeleteManyCategoryResponse, DeleteCategoryProps, DeleteCategoryResponse, FindFirstCategoryProps, FindFirstCategoryResponse, FindManyCategoryProps, FindManyCategoryResponse, FindUniqueCategoryProps, FindUniqueCategoryResponse, UpdateManyCategoryProps, UpdateManyCategoryResponse, UpdateCategoryProps, UpdateCategoryResponse, UpsertCategoryProps, UpsertCategoryResponse, countCategorySchema, createManyCategorySchema, createCategorySchema, deleteManyCategorySchema, deleteCategorySchema, selectFirstCategorySchema, selectManyCategorySchema, selectUniqueCategorySchema, updateManyCategorySchema, updateCategorySchema, upsertCategorySchema } from "@services/types/CategoryType";
import { ResponseFormat } from "@utils/FetchConfig";
import { ZodError } from "zod";

export default class CategoryService {

    // ========== Single mutations ========== //

    static async create<T extends CreateCategoryProps>(props: T): Promise<ResponseFormat<CreateCategoryResponse<T>>> {
        try {
            const parsedProps = createCategorySchema.parse(props);
            const category = await PrismaInstance.category.create(parsedProps);
            return { data: category as CreateCategoryResponse<T> };
        } catch (error) {
            return CategoryService.error("create", error);
        }
    }

    static async upsert<T extends UpsertCategoryProps>(props: T): Promise<ResponseFormat<UpsertCategoryResponse<T>>> {
        try {
            const parsedProps = upsertCategorySchema.parse(props);
            const category = await PrismaInstance.category.upsert(parsedProps);
            return { data: category as UpsertCategoryResponse<T> };
        } catch (error) {
            return CategoryService.error("upsert", error);
        }
    }

    static async update<T extends UpdateCategoryProps>(props: T): Promise<ResponseFormat<UpdateCategoryResponse<T>>> {
        try {
            const parsedProps = updateCategorySchema.parse(props);
            const category = await PrismaInstance.category.update(parsedProps);
            return { data: category as UpdateCategoryResponse<T> };
        } catch (error) {
            return CategoryService.error("update", error);
        }
    }

    static async delete<T extends DeleteCategoryProps>(props: T): Promise<ResponseFormat<DeleteCategoryResponse<T>>> {
        try {
            const parsedProps = deleteCategorySchema.parse(props);
            const category = await PrismaInstance.category.delete(parsedProps);
            return { data: category as DeleteCategoryResponse<T> };
        } catch (error) {
            return CategoryService.error("delete", error);
        }
    }

    // ========== Multiple mutations ========== //

    static async createMany(props: CreateManyCategoryProps): Promise<ResponseFormat<CreateManyCategoryResponse>> {
        try {
            const parsedProps = createManyCategorySchema.parse(props);
            const result = await PrismaInstance.category.createMany(parsedProps);
            return { data: result };
        } catch (error) {
            return CategoryService.error("createMany", error);
        }
    }

    static async updateMany(props: UpdateManyCategoryProps): Promise<ResponseFormat<UpdateManyCategoryResponse>> {
        try {
            const parsedProps = updateManyCategorySchema.parse(props);
            const result = await PrismaInstance.category.updateMany(parsedProps);
            return { data: result };
        } catch (error) {
            return CategoryService.error("updateMany", error);
        }
    }

    static async deleteMany(props: DeleteManyCategoryProps): Promise<ResponseFormat<DeleteManyCategoryResponse>> {
        try {
            const parsedProps = deleteManyCategorySchema.parse(props);
            const result = await PrismaInstance.category.deleteMany(parsedProps);
            return { data: result };
        } catch (error) {
            return CategoryService.error("deleteMany", error);
        }
    }

    // ========== Single queries ========== //

    static async findFirst<T extends FindFirstCategoryProps>(props: T): Promise<ResponseFormat<FindFirstCategoryResponse<T>>> {
        try {
            const parsedProps = selectFirstCategorySchema.parse(props);
            const category = await PrismaInstance.category.findFirst(parsedProps);
            return { data: category as FindFirstCategoryResponse<T> };
        } catch (error) {
            return CategoryService.error("findFirst", error);
        }
    }

    static async findUnique<T extends FindUniqueCategoryProps>(props: T): Promise<ResponseFormat<FindUniqueCategoryResponse<T>>> {
        try {
            const parsedProps = selectUniqueCategorySchema.parse(props);
            const category = await PrismaInstance.category.findUnique(parsedProps);
            return { data: category as FindUniqueCategoryResponse<T> };
        } catch (error) {
            return CategoryService.error("findUnique", error);
        }
    }

    static async findMany<T extends FindManyCategoryProps>(props: T): Promise<ResponseFormat<FindManyCategoryResponse<T>>> {
        try {
            const parsedProps = selectManyCategorySchema.parse(props);
            const { skip = 0, take = 10 } = parsedProps;
            const categoryList = await PrismaInstance.category.findMany({ skip, take, ...parsedProps });
            return { data: categoryList as FindManyCategoryResponse<T> };
        } catch (error) {
            return CategoryService.error("findMany", error);
        }
    }

    // ========== Aggregate queries ========== //

    static async count(props: CountCategoryProps): Promise<ResponseFormat<CountCategoryResponse>> {
        try {
            const parsedProps = countCategorySchema.parse(props);
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
