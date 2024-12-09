import PrismaInstance from "@lib/prisma";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { SessionCount, CountSessionProps, CountSessionResponse, CreateSessionProps, CreateSessionResponse, DeleteSessionProps, DeleteSessionResponse, FindManySessionProps, FindManySessionResponse, FindUniqueSessionProps, FindUniqueSessionResponse, UpdateSessionProps, UpdateSessionResponse, UpsertSessionProps, UpsertSessionResponse, countSessionSchema, createSessionSchema, deleteSessionSchema, selectSessionSchema, selectManySessionSchema, updateSessionSchema, upsertSessionSchema } from "@services/types/SessionType";
import { ResponseFormat } from "@utils/FetchConfig";
import { ZodError } from "zod";

export default class SessionService {
    static async create<T extends CreateSessionProps>(props: T): Promise<ResponseFormat<CreateSessionResponse<T>>> {
        try {
            const { data, include, omit, select } = createSessionSchema.parse(props);

            const session = await PrismaInstance.session.create({
                data,
                ...(include && { include }),
                ...(omit && { omit }),
                ...(select && { select }),
            });

            return { data: session as CreateSessionResponse<T> };
        } catch (error) {
            console.error("SessionService -> Create -> " + (error as Error).message);
            if (process.env.NODE_ENV === "development") {
                if (error instanceof ZodError)
                    throw new Error("SessionService -> Create -> Invalid Zod params -> " + error.message);
                if (error instanceof PrismaClientKnownRequestError)
                    throw new Error("SessionService -> Create -> Prisma error -> " + error.message);
                throw new Error("SessionService -> Create -> " + (error as Error).message);
            }
            // TODO: add logging
            return { error: "Unable to create session..." };
        }
    }

    static async upsert<T extends UpsertSessionProps>(props: T): Promise<ResponseFormat<UpsertSessionResponse<T>>> {
        try {
            const { create, update, where, include, omit, select } = upsertSessionSchema.parse(props);

            const session = await PrismaInstance.session.upsert({
                create,
                update,
                where,
                ...(include && { include }),
                ...(omit && { omit }),
                ...(select && { select }),
            });

            return { data: session as UpsertSessionResponse<T> };
        } catch (error) {
            console.error("SessionService -> Upsert -> " + (error as Error).message);
            if (process.env.NODE_ENV === "development") {
                if (error instanceof ZodError)
                    throw new Error("SessionService -> Upsert -> Invalid Zod params -> " + error.message);
                if (error instanceof PrismaClientKnownRequestError)
                    throw new Error("SessionService -> Upsert -> Prisma error -> " + error.message);
                throw new Error("SessionService -> Upsert -> " + (error as Error).message);
            }
            // TODO: add logging
            return { error: "Unable to upsert session..." };
        }
    }

    static async update<T extends UpdateSessionProps>(props: T): Promise<ResponseFormat<UpdateSessionResponse<T>>> {
        try {
            const { data, where, include, omit, select } = updateSessionSchema.parse(props);

            const session = await PrismaInstance.session.update({
                data,
                where,
                ...(include && { include }),
                ...(omit && { omit }),
                ...(select && { select }),
            });

            return { data: session as UpdateSessionResponse<T> };
        } catch (error) {
            console.error("SessionService -> Update -> " + (error as Error).message);
            if (process.env.NODE_ENV === "development") {
                if (error instanceof ZodError)
                    throw new Error("SessionService -> Update -> Invalid Zod params -> " + error.message);
                if (error instanceof PrismaClientKnownRequestError)
                    throw new Error("SessionService -> Update -> Prisma error -> " + error.message);
                throw new Error("SessionService -> Update -> " + (error as Error).message);
            }
            // TODO: add logging
            return { error: "Unable to update session..." };
        }
    }

    static async delete<T extends DeleteSessionProps>(props: T): Promise<ResponseFormat<DeleteSessionResponse<T>>> {
        try {
            const { where, include, omit, select } = deleteSessionSchema.parse(props);

            const session = await PrismaInstance.session.delete({
                where,
                ...(include && { include }),
                ...(omit && { omit }),
                ...(select && { select }),
            });

            return { data: session as DeleteSessionResponse<T> };
        } catch (error) {
            console.error("SessionService -> Delete -> " + (error as Error).message);
            if (process.env.NODE_ENV === "development") {
                if (error instanceof ZodError)
                    throw new Error("SessionService -> Delete -> Invalid Zod params -> " + error.message);
                if (error instanceof PrismaClientKnownRequestError)
                    throw new Error("SessionService -> Delete -> Prisma error -> " + error.message);
                throw new Error("SessionService -> Delete -> " + (error as Error).message);
            }
            // TODO: add logging
            return { error: "Unable to delete session..." };
        }
    }

    static async findUnique<T extends FindUniqueSessionProps>(props: T): Promise<ResponseFormat<FindUniqueSessionResponse<T>>> {
        try {
            const { where, include, omit, select } = selectSessionSchema.parse(props);

            const session = await PrismaInstance.session.findUnique({
                where,
                ...(include && { include }),
                ...(omit && { omit }),
                ...(select && { select }),
            });

            return { data: session as FindUniqueSessionResponse<T> };
        } catch (error) {
            console.error("SessionService -> FindUnique -> " + (error as Error).message);
            if (process.env.NODE_ENV === "development") {
                if (error instanceof ZodError)
                    throw new Error("SessionService -> FindUnique -> Invalid Zod params -> " + error.message);
                if (error instanceof PrismaClientKnownRequestError)
                    throw new Error("SessionService -> FindUnique -> Prisma error -> " + error.message);
                throw new Error("SessionService -> FindUnique -> " + (error as Error).message);
            }
            // TODO: add logging
            return { error: "Unable to find session..." };
        }
    }

    static async findMany<T extends FindManySessionProps>(props: T): Promise<ResponseFormat<FindManySessionResponse<T>>> {
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
            } = selectManySessionSchema.parse(props);

            const sessionList = await PrismaInstance.session.findMany({
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

            return { data: sessionList as FindManySessionResponse<T> };
        } catch (error) {
            console.error("SessionService -> FindMany -> " + (error as Error).message);
            if (process.env.NODE_ENV === "development") {
                if (error instanceof ZodError)
                    throw new Error("SessionService -> FindMany -> Invalid Zod params -> " + error.message);
                if (error instanceof PrismaClientKnownRequestError)
                    throw new Error("SessionService -> FindMany -> Prisma error -> " + error.message);
                throw new Error("SessionService -> FindMany -> " + (error as Error).message);
            }
            // TODO: add logging
            return { error: "Unable to find sessions..." };
        }
    }

    static async count(props: CountSessionProps): Promise<ResponseFormat<CountSessionResponse>> {
        try {
            const { cursor, orderBy, select, skip, take, where } = countSessionSchema.parse(props);

            const sessionAmount: SessionCount = await PrismaInstance.session.count({
                ...(cursor && { cursor }),
                ...(orderBy && { orderBy }),
                ...(select && { select }),
                ...(skip && { skip }),
                ...(take && { take }),
                ...(where && { where }),
            });

            return { data: sessionAmount };
        } catch (error) {
            console.error("SessionService -> Count -> " + (error as Error).message);
            if (process.env.NODE_ENV === "development") {
                if (error instanceof ZodError)
                    throw new Error("SessionService -> Count -> Invalid Zod params -> " + error.message);
                if (error instanceof PrismaClientKnownRequestError)
                    throw new Error("SessionService -> Count -> Prisma error -> " + error.message);
                throw new Error("SessionService -> Count -> " + (error as Error).message);
            }
            // TODO: add logging
            return { error: "Unable to count sessions..." };
        }
    }
}
