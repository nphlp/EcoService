"use server";

import { hasRole } from "@permissions/hasRole";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/client";
import { ArticleDeleteAction } from "@services/actions/ArticleAction";
import { DiyDeleteAction } from "@services/actions/DiyAction";
import { ZodError, ZodType, strictObject, z } from "zod";

export type DeleteContentProcessProps = {
    type: "article" | "diy";
    id: string;
};

const deleteContentProcessSchema: ZodType<DeleteContentProcessProps> = strictObject({
    type: z.enum(["article", "diy"]),
    id: z.string().min(1),
});

export type DeleteContentProcessResponse = {
    status: boolean;
    message: string;
};

export const DeleteContentProcess = async (props: DeleteContentProcessProps): Promise<DeleteContentProcessResponse> => {
    try {
        const { type, id } = deleteContentProcessSchema.parse(props);

        const session = await hasRole(["EMPLOYEE", "ADMIN"]);

        if (!session) {
            return { message: "Unauthorized", status: false };
        }

        const isArticle = type === "article";
        const typeName = isArticle ? "Article" : "DIY";

        if (isArticle) {
            await ArticleDeleteAction({ where: { id } });
        } else {
            await DiyDeleteAction({ where: { id } });
        }

        return { message: `${typeName} supprimé avec succès`, status: true };
    } catch (error) {
        if (process.env.NODE_ENV === "development") {
            const processName = "DeleteContentProcess";
            const message = (error as Error).message;
            if (error instanceof ZodError) {
                const zodMessage = processName + " -> Invalid Zod params -> " + error.message;
                console.error(zodMessage);
                throw new Error(zodMessage);
            } else if (error instanceof PrismaClientKnownRequestError) {
                const prismaMessage = processName + " -> Prisma error -> " + error.message;
                console.error(prismaMessage);
                throw new Error(prismaMessage);
            } else {
                const errorMessage = processName + " -> " + message;
                console.error(errorMessage);
                throw new Error(errorMessage);
            }
        }
        return { message: "Something went wrong...", status: false };
    }
};
