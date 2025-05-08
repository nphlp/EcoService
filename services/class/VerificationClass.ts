import PrismaInstance from "@lib/prisma";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { VerificationCount, CountVerificationProps, CountVerificationResponse, CreateManyVerificationProps, CreateManyVerificationResponse, CreateVerificationProps, CreateVerificationResponse, DeleteManyVerificationProps, DeleteManyVerificationResponse, DeleteVerificationProps, DeleteVerificationResponse, FindFirstVerificationProps, FindFirstVerificationResponse, FindManyVerificationProps, FindManyVerificationResponse, FindUniqueVerificationProps, FindUniqueVerificationResponse, UpdateManyVerificationProps, UpdateManyVerificationResponse, UpdateVerificationProps, UpdateVerificationResponse, UpsertVerificationProps, UpsertVerificationResponse, countVerificationSchema, createManyVerificationSchema, createVerificationSchema, deleteManyVerificationSchema, deleteVerificationSchema, selectFirstVerificationSchema, selectManyVerificationSchema, selectUniqueVerificationSchema, updateManyVerificationSchema, updateVerificationSchema, upsertVerificationSchema } from "@services/types/VerificationType";
import { ResponseFormat } from "@utils/FetchConfig";
import { ZodError } from "zod";

export default class VerificationService {

    // ========== Single mutations ========== //

    static async create<T extends CreateVerificationProps>(props: T): Promise<ResponseFormat<CreateVerificationResponse<T>>> {
        try {
            const parsedProps = createVerificationSchema.parse(props);
            const verification = await PrismaInstance.verification.create(parsedProps);
            return { data: verification as CreateVerificationResponse<T> };
        } catch (error) {
            return VerificationService.error("create", error);
        }
    }

    static async upsert<T extends UpsertVerificationProps>(props: T): Promise<ResponseFormat<UpsertVerificationResponse<T>>> {
        try {
            const parsedProps = upsertVerificationSchema.parse(props);
            const verification = await PrismaInstance.verification.upsert(parsedProps);
            return { data: verification as UpsertVerificationResponse<T> };
        } catch (error) {
            return VerificationService.error("upsert", error);
        }
    }

    static async update<T extends UpdateVerificationProps>(props: T): Promise<ResponseFormat<UpdateVerificationResponse<T>>> {
        try {
            const parsedProps = updateVerificationSchema.parse(props);
            const verification = await PrismaInstance.verification.update(parsedProps);
            return { data: verification as UpdateVerificationResponse<T> };
        } catch (error) {
            return VerificationService.error("update", error);
        }
    }

    static async delete<T extends DeleteVerificationProps>(props: T): Promise<ResponseFormat<DeleteVerificationResponse<T>>> {
        try {
            const parsedProps = deleteVerificationSchema.parse(props);
            const verification = await PrismaInstance.verification.delete(parsedProps);
            return { data: verification as DeleteVerificationResponse<T> };
        } catch (error) {
            return VerificationService.error("delete", error);
        }
    }

    // ========== Multiple mutations ========== //

    static async createMany(props: CreateManyVerificationProps): Promise<ResponseFormat<CreateManyVerificationResponse>> {
        try {
            const parsedProps = createManyVerificationSchema.parse(props);
            const result = await PrismaInstance.verification.createMany(parsedProps);
            return { data: result };
        } catch (error) {
            return VerificationService.error("createMany", error);
        }
    }

    static async updateMany(props: UpdateManyVerificationProps): Promise<ResponseFormat<UpdateManyVerificationResponse>> {
        try {
            const parsedProps = updateManyVerificationSchema.parse(props);
            const result = await PrismaInstance.verification.updateMany(parsedProps);
            return { data: result };
        } catch (error) {
            return VerificationService.error("updateMany", error);
        }
    }

    static async deleteMany(props: DeleteManyVerificationProps): Promise<ResponseFormat<DeleteManyVerificationResponse>> {
        try {
            const parsedProps = deleteManyVerificationSchema.parse(props);
            const result = await PrismaInstance.verification.deleteMany(parsedProps);
            return { data: result };
        } catch (error) {
            return VerificationService.error("deleteMany", error);
        }
    }

    // ========== Single queries ========== //

    static async findFirst<T extends FindFirstVerificationProps>(props: T): Promise<ResponseFormat<FindFirstVerificationResponse<T>>> {
        try {
            const parsedProps = selectFirstVerificationSchema.parse(props);
            const verification = await PrismaInstance.verification.findFirst(parsedProps);
            return { data: verification as FindFirstVerificationResponse<T> };
        } catch (error) {
            return VerificationService.error("findFirst", error);
        }
    }

    static async findUnique<T extends FindUniqueVerificationProps>(props: T): Promise<ResponseFormat<FindUniqueVerificationResponse<T>>> {
        try {
            const parsedProps = selectUniqueVerificationSchema.parse(props);
            const verification = await PrismaInstance.verification.findUnique(parsedProps);
            return { data: verification as FindUniqueVerificationResponse<T> };
        } catch (error) {
            return VerificationService.error("findUnique", error);
        }
    }

    static async findMany<T extends FindManyVerificationProps>(props: T): Promise<ResponseFormat<FindManyVerificationResponse<T>>> {
        try {
            const parsedProps = selectManyVerificationSchema.parse(props);
            const { skip = 0, take = 10 } = parsedProps;
            const verificationList = await PrismaInstance.verification.findMany({ skip, take, ...parsedProps });
            return { data: verificationList as FindManyVerificationResponse<T> };
        } catch (error) {
            return VerificationService.error("findMany", error);
        }
    }

    // ========== Aggregate queries ========== //

    static async count(props: CountVerificationProps): Promise<ResponseFormat<CountVerificationResponse>> {
        try {
            const parsedProps = countVerificationSchema.parse(props);
            const verificationAmount: VerificationCount = await PrismaInstance.verification.count(parsedProps);
            return { data: verificationAmount };
        } catch (error) {
            return VerificationService.error("count", error);
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
