import PrismaInstance from "@lib/prisma";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { VerificationCount, VerificationCountProps, VerificationCountResponse, VerificationCountSchema, VerificationCreateManyProps, VerificationCreateManyResponse, VerificationCreateManySchema, VerificationCreateProps, VerificationCreateResponse, VerificationCreateSchema, VerificationDeleteManyProps, VerificationDeleteManyResponse, VerificationDeleteManySchema, VerificationDeleteProps, VerificationDeleteResponse, VerificationDeleteSchema, VerificationFindFirstProps, VerificationFindFirstResponse, VerificationFindFirstSchema, VerificationFindManyProps, VerificationFindManyResponse, VerificationFindManySchema, VerificationFindUniqueProps, VerificationFindUniqueResponse, VerificationFindUniqueSchema, VerificationUpdateManyProps, VerificationUpdateManyResponse, VerificationUpdateManySchema, VerificationUpdateProps, VerificationUpdateResponse, VerificationUpdateSchema, VerificationUpsertProps, VerificationUpsertResponse, VerificationUpsertSchema } from "@services/types/VerificationType";
import { ResponseFormat } from "@utils/FetchConfig";
import { ZodError } from "zod";

export default class VerificationService {

    // ========== Single mutations ========== //

    static async create<T extends VerificationCreateProps>(props: T): Promise<ResponseFormat<VerificationCreateResponse<T>>> {
        try {
            const parsedProps = VerificationCreateSchema.parse(props);
            const verification = await PrismaInstance.verification.create(parsedProps);
            return { data: verification as VerificationCreateResponse<T> };
        } catch (error) {
            return VerificationService.error("create", error);
        }
    }

    static async upsert<T extends VerificationUpsertProps>(props: T): Promise<ResponseFormat<VerificationUpsertResponse<T>>> {
        try {
            const parsedProps = VerificationUpsertSchema.parse(props);
            const verification = await PrismaInstance.verification.upsert(parsedProps);
            return { data: verification as VerificationUpsertResponse<T> };
        } catch (error) {
            return VerificationService.error("upsert", error);
        }
    }

    static async update<T extends VerificationUpdateProps>(props: T): Promise<ResponseFormat<VerificationUpdateResponse<T>>> {
        try {
            const parsedProps = VerificationUpdateSchema.parse(props);
            const verification = await PrismaInstance.verification.update(parsedProps);
            return { data: verification as VerificationUpdateResponse<T> };
        } catch (error) {
            return VerificationService.error("update", error);
        }
    }

    static async delete<T extends VerificationDeleteProps>(props: T): Promise<ResponseFormat<VerificationDeleteResponse<T>>> {
        try {
            const parsedProps = VerificationDeleteSchema.parse(props);
            const verification = await PrismaInstance.verification.delete(parsedProps);
            return { data: verification as VerificationDeleteResponse<T> };
        } catch (error) {
            return VerificationService.error("delete", error);
        }
    }

    // ========== Multiple mutations ========== //

    static async createMany(props: VerificationCreateManyProps): Promise<ResponseFormat<VerificationCreateManyResponse>> {
        try {
            const parsedProps = VerificationCreateManySchema.parse(props);
            const result = await PrismaInstance.verification.createMany(parsedProps);
            return { data: result };
        } catch (error) {
            return VerificationService.error("createMany", error);
        }
    }

    static async updateMany(props: VerificationUpdateManyProps): Promise<ResponseFormat<VerificationUpdateManyResponse>> {
        try {
            const parsedProps = VerificationUpdateManySchema.parse(props);
            const result = await PrismaInstance.verification.updateMany(parsedProps);
            return { data: result };
        } catch (error) {
            return VerificationService.error("updateMany", error);
        }
    }

    static async deleteMany(props: VerificationDeleteManyProps): Promise<ResponseFormat<VerificationDeleteManyResponse>> {
        try {
            const parsedProps = VerificationDeleteManySchema.parse(props);
            const result = await PrismaInstance.verification.deleteMany(parsedProps);
            return { data: result };
        } catch (error) {
            return VerificationService.error("deleteMany", error);
        }
    }

    // ========== Single queries ========== //

    static async findFirst<T extends VerificationFindFirstProps>(props: T): Promise<ResponseFormat<VerificationFindFirstResponse<T>>> {
        try {
            const parsedProps = VerificationFindFirstSchema.parse(props);
            const verification = await PrismaInstance.verification.findFirst(parsedProps);
            return { data: verification as VerificationFindFirstResponse<T> };
        } catch (error) {
            return VerificationService.error("findFirst", error);
        }
    }

    static async findUnique<T extends VerificationFindUniqueProps>(props: T): Promise<ResponseFormat<VerificationFindUniqueResponse<T>>> {
        try {
            const parsedProps = VerificationFindUniqueSchema.parse(props);
            const verification = await PrismaInstance.verification.findUnique(parsedProps);
            return { data: verification as VerificationFindUniqueResponse<T> };
        } catch (error) {
            return VerificationService.error("findUnique", error);
        }
    }

    static async findMany<T extends VerificationFindManyProps>(props: T): Promise<ResponseFormat<VerificationFindManyResponse<T>>> {
        try {
            const parsedProps = VerificationFindManySchema.parse(props);
            const { skip = 0, take = 10 } = parsedProps;
            const verificationList = await PrismaInstance.verification.findMany({ skip, take, ...parsedProps });
            return { data: verificationList as VerificationFindManyResponse<T> };
        } catch (error) {
            return VerificationService.error("findMany", error);
        }
    }

    // ========== Aggregate queries ========== //

    static async count(props: VerificationCountProps): Promise<ResponseFormat<VerificationCountResponse>> {
        try {
            const parsedProps = VerificationCountSchema.parse(props);
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
