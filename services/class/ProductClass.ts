import PrismaInstance from "@lib/prisma";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { ProductCount, CountProductProps, CountProductResponse, CreateProductProps, CreateProductResponse, DeleteProductProps, DeleteProductResponse, FindManyProductProps, FindManyProductResponse, FindUniqueProductProps, FindUniqueProductResponse, UpdateProductProps, UpdateProductResponse, UpsertProductProps, UpsertProductResponse, countProductSchema, createProductSchema, deleteProductSchema, selectFirstProductSchema, selectManyProductSchema, selectUniqueProductSchema, updateProductSchema, upsertProductSchema, FindFirstProductProps, FindFirstProductResponse } from "@services/types/ProductType";
import { ResponseFormat } from "@utils/FetchConfig";
import { ZodError } from "zod";

export default class ProductService {
    static async create<T extends CreateProductProps>(props: T): Promise<ResponseFormat<CreateProductResponse<T>>> {
        try {
            const parsedProps = createProductSchema.parse(props);
            const product = await PrismaInstance.product.create(parsedProps);
            return { data: product as CreateProductResponse<T> };
        } catch (error) {
            return ProductService.error("create", error);
        }
    }

    static async upsert<T extends UpsertProductProps>(props: T): Promise<ResponseFormat<UpsertProductResponse<T>>> {
        try {
            const parsedProps = upsertProductSchema.parse(props);
            const product = await PrismaInstance.product.upsert(parsedProps);
            return { data: product as UpsertProductResponse<T> };
        } catch (error) {
            return ProductService.error("upsert", error);
        }
    }

    static async update<T extends UpdateProductProps>(props: T): Promise<ResponseFormat<UpdateProductResponse<T>>> {
        try {
            const parsedProps = updateProductSchema.parse(props);
            const product = await PrismaInstance.product.update(parsedProps);
            return { data: product as UpdateProductResponse<T> };
        } catch (error) {
            return ProductService.error("update", error);
        }
    }

    static async delete<T extends DeleteProductProps>(props: T): Promise<ResponseFormat<DeleteProductResponse<T>>> {
        try {
            const parsedProps = deleteProductSchema.parse(props);
            const product = await PrismaInstance.product.delete(parsedProps);
            return { data: product as DeleteProductResponse<T> };
        } catch (error) {
            return ProductService.error("delete", error);
        }
    }

    static async findFirst<T extends FindFirstProductProps>(props: T): Promise<ResponseFormat<FindFirstProductResponse<T>>> {
        try {
            const parsedProps = selectFirstProductSchema.parse(props);
            const product = await PrismaInstance.product.findFirst(parsedProps);
            return { data: product as FindFirstProductResponse<T> };
        } catch (error) {
            return ProductService.error("findFirst", error);
        }
    }

    static async findUnique<T extends FindUniqueProductProps>(props: T): Promise<ResponseFormat<FindUniqueProductResponse<T>>> {
        try {
            const parsedProps = selectUniqueProductSchema.parse(props);
            const product = await PrismaInstance.product.findUnique(parsedProps);
            return { data: product as FindUniqueProductResponse<T> };
        } catch (error) {
            return ProductService.error("findUnique", error);
        }
    }

    static async findMany<T extends FindManyProductProps>(props: T): Promise<ResponseFormat<FindManyProductResponse<T>>> {
        try {
            const parsedProps = selectManyProductSchema.parse(props);
            const { skip = 0, take = 10 } = parsedProps;
            const productList = await PrismaInstance.product.findMany({ skip, take, ...parsedProps });
            return { data: productList as FindManyProductResponse<T> };
        } catch (error) {
            return ProductService.error("findMany", error);
        }
    }

    static async count(props: CountProductProps): Promise<ResponseFormat<CountProductResponse>> {
        try {
            const parsedProps = countProductSchema.parse(props);
            const productAmount: ProductCount = await PrismaInstance.product.count(parsedProps);
            return { data: productAmount };
        } catch (error) {
            return ProductService.error("count", error);
        }
    }

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
