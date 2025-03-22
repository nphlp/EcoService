import { ResponseFormat } from "@app/api/Routes";
import PrismaInstance from "@lib/prisma";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { VerificationCount, CountVerificationProps, CountVerificationResponse, CreateVerificationProps, CreateVerificationResponse, DeleteVerificationProps, DeleteVerificationResponse, FindManyVerificationProps, FindManyVerificationResponse, FindUniqueVerificationProps, FindUniqueVerificationResponse, UpdateVerificationProps, UpdateVerificationResponse, UpsertVerificationProps, UpsertVerificationResponse, countVerificationSchema, createVerificationSchema, deleteVerificationSchema, selectVerificationSchema, selectManyVerificationSchema, updateVerificationSchema, upsertVerificationSchema } from "@services/types/VerificationType";
import { ZodError } from "zod";

export default class VerificationService {
    static async create<T extends CreateVerificationProps>(props: T): Promise<ResponseFormat<CreateVerificationResponse<T>>> {
        try {
            const { data, omit, select } = createVerificationSchema.parse(props);

            const verification = await PrismaInstance.verification.create({
                data,
                
                ...(omit && { omit }),
                ...(select && { select }),
            });

            return { data: verification as CreateVerificationResponse<T> };
        } catch (error) {
            console.error("VerificationService -> Create -> " + (error as Error).message);
            if (process.env.NODE_ENV === "development") {
                if (error instanceof ZodError)
                    throw new Error("VerificationService -> Create -> Invalid Zod params -> " + error.message);
                if (error instanceof PrismaClientKnownRequestError)
                    throw new Error("VerificationService -> Create -> Prisma error -> " + error.message);
                throw new Error("VerificationService -> Create -> " + (error as Error).message);
            }
            // TODO: add logging
            return { error: "Unable to create verification..." };
        }
    }

    static async upsert<T extends UpsertVerificationProps>(props: T): Promise<ResponseFormat<UpsertVerificationResponse<T>>> {
        try {
            const { create, update, where, omit, select } = upsertVerificationSchema.parse(props);

            const verification = await PrismaInstance.verification.upsert({
                create,
                update,
                where,
                
                ...(omit && { omit }),
                ...(select && { select }),
            });

            return { data: verification as UpsertVerificationResponse<T> };
        } catch (error) {
            console.error("VerificationService -> Upsert -> " + (error as Error).message);
            if (process.env.NODE_ENV === "development") {
                if (error instanceof ZodError)
                    throw new Error("VerificationService -> Upsert -> Invalid Zod params -> " + error.message);
                if (error instanceof PrismaClientKnownRequestError)
                    throw new Error("VerificationService -> Upsert -> Prisma error -> " + error.message);
                throw new Error("VerificationService -> Upsert -> " + (error as Error).message);
            }
            // TODO: add logging
            return { error: "Unable to upsert verification..." };
        }
    }

    static async update<T extends UpdateVerificationProps>(props: T): Promise<ResponseFormat<UpdateVerificationResponse<T>>> {
        try {
            const { data, where, omit, select } = updateVerificationSchema.parse(props);

            const verification = await PrismaInstance.verification.update({
                data,
                where,
                
                ...(omit && { omit }),
                ...(select && { select }),
            });

            return { data: verification as UpdateVerificationResponse<T> };
        } catch (error) {
            console.error("VerificationService -> Update -> " + (error as Error).message);
            if (process.env.NODE_ENV === "development") {
                if (error instanceof ZodError)
                    throw new Error("VerificationService -> Update -> Invalid Zod params -> " + error.message);
                if (error instanceof PrismaClientKnownRequestError)
                    throw new Error("VerificationService -> Update -> Prisma error -> " + error.message);
                throw new Error("VerificationService -> Update -> " + (error as Error).message);
            }
            // TODO: add logging
            return { error: "Unable to update verification..." };
        }
    }

    static async delete<T extends DeleteVerificationProps>(props: T): Promise<ResponseFormat<DeleteVerificationResponse<T>>> {
        try {
            const { where, omit, select } = deleteVerificationSchema.parse(props);

            const verification = await PrismaInstance.verification.delete({
                where,
                
                ...(omit && { omit }),
                ...(select && { select }),
            });

            return { data: verification as DeleteVerificationResponse<T> };
        } catch (error) {
            console.error("VerificationService -> Delete -> " + (error as Error).message);
            if (process.env.NODE_ENV === "development") {
                if (error instanceof ZodError)
                    throw new Error("VerificationService -> Delete -> Invalid Zod params -> " + error.message);
                if (error instanceof PrismaClientKnownRequestError)
                    throw new Error("VerificationService -> Delete -> Prisma error -> " + error.message);
                throw new Error("VerificationService -> Delete -> " + (error as Error).message);
            }
            // TODO: add logging
            return { error: "Unable to delete verification..." };
        }
    }

    static async findUnique<T extends FindUniqueVerificationProps>(props: T): Promise<ResponseFormat<FindUniqueVerificationResponse<T>>> {
        try {
            const { where, omit, select } = selectVerificationSchema.parse(props);

            const verification = await PrismaInstance.verification.findUnique({
                where,
                
                ...(omit && { omit }),
                ...(select && { select }),
            });

            return { data: verification as FindUniqueVerificationResponse<T> };
        } catch (error) {
            console.error("VerificationService -> FindUnique -> " + (error as Error).message);
            if (process.env.NODE_ENV === "development") {
                if (error instanceof ZodError)
                    throw new Error("VerificationService -> FindUnique -> Invalid Zod params -> " + error.message);
                if (error instanceof PrismaClientKnownRequestError)
                    throw new Error("VerificationService -> FindUnique -> Prisma error -> " + error.message);
                throw new Error("VerificationService -> FindUnique -> " + (error as Error).message);
            }
            // TODO: add logging
            return { error: "Unable to find verification..." };
        }
    }

    static async findMany<T extends FindManyVerificationProps>(props: T): Promise<ResponseFormat<FindManyVerificationResponse<T>>> {
        try {
            const {
                cursor,
                distinct,
                
                omit,
                orderBy,
                select,
                skip = 0,
                take = 10,
                where,
            } = selectManyVerificationSchema.parse(props);

            const verificationList = await PrismaInstance.verification.findMany({
                ...(cursor && { cursor }),
                ...(distinct && { distinct }),
                
                ...(omit && { omit }),
                ...(orderBy && { orderBy }),
                ...(select && { select }),
                ...(skip && { skip }),
                ...(take && { take }),
                ...(where && { where }),
            });

            return { data: verificationList as FindManyVerificationResponse<T> };
        } catch (error) {
            console.error("VerificationService -> FindMany -> " + (error as Error).message);
            if (process.env.NODE_ENV === "development") {
                if (error instanceof ZodError)
                    throw new Error("VerificationService -> FindMany -> Invalid Zod params -> " + error.message);
                if (error instanceof PrismaClientKnownRequestError)
                    throw new Error("VerificationService -> FindMany -> Prisma error -> " + error.message);
                throw new Error("VerificationService -> FindMany -> " + (error as Error).message);
            }
            // TODO: add logging
            return { error: "Unable to find verifications..." };
        }
    }

    static async count(props: CountVerificationProps): Promise<ResponseFormat<CountVerificationResponse>> {
        try {
            const { cursor, orderBy, select, skip, take, where } = countVerificationSchema.parse(props);

            const verificationAmount: VerificationCount = await PrismaInstance.verification.count({
                ...(cursor && { cursor }),
                ...(orderBy && { orderBy }),
                ...(select && { select }),
                ...(skip && { skip }),
                ...(take && { take }),
                ...(where && { where }),
            });

            return { data: verificationAmount };
        } catch (error) {
            console.error("VerificationService -> Count -> " + (error as Error).message);
            if (process.env.NODE_ENV === "development") {
                if (error instanceof ZodError)
                    throw new Error("VerificationService -> Count -> Invalid Zod params -> " + error.message);
                if (error instanceof PrismaClientKnownRequestError)
                    throw new Error("VerificationService -> Count -> Prisma error -> " + error.message);
                throw new Error("VerificationService -> Count -> " + (error as Error).message);
            }
            // TODO: add logging
            return { error: "Unable to count verifications..." };
        }
    }
}
