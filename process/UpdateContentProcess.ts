"use server";

import { hasRole } from "@permissions/hasRole";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/client";
import { ArticleUpdateAction } from "@services/actions/ArticleAction";
import { ContentCreateAction, ContentDeleteManyAction, ContentUpdateAction } from "@services/actions/ContentAction";
import { DiyUpdateAction } from "@services/actions/DiyAction";
import { stringToSlug } from "@utils/string-format";
import { ZodError, ZodType, strictObject, z } from "zod";
import Solid from "@/solid/solid-fetch";

export type ContentBlockInput = {
    id?: string;
    content: string;
    existingImage: string;
    newImage: File | null;
};

export type UpdateContentProcessProps = {
    type: "article" | "diy";
    id: string;
    title: string;
    contentBlocks: ContentBlockInput[];
};

const updateContentProcessSchema: ZodType<UpdateContentProcessProps> = strictObject({
    type: z.enum(["article", "diy"]),
    id: z.string().min(1),
    title: z.string().min(1),
    contentBlocks: z
        .array(
            strictObject({
                id: z.string().optional(),
                content: z.string().min(1),
                existingImage: z.string(),
                newImage: z.instanceof(File).nullable(),
            }),
        )
        .min(1),
});

export type UpdateContentProcessResponse = {
    status: boolean;
    message: string;
};

export const UpdateContentProcess = async (props: UpdateContentProcessProps): Promise<UpdateContentProcessResponse> => {
    try {
        const { type, id, title, contentBlocks } = updateContentProcessSchema.parse(props);

        const session = await hasRole(["EMPLOYEE", "ADMIN"]);

        if (!session) {
            return { message: "Unauthorized", status: false };
        }

        const slug = stringToSlug(title);
        const isArticle = type === "article";
        const typeName = isArticle ? "Article" : "DIY";

        // Update article/DIY title
        if (isArticle) {
            await ArticleUpdateAction({
                where: { id },
                data: { title, slug },
            });
        } else {
            await DiyUpdateAction({
                where: { id },
                data: { title, slug },
            });
        }

        // Get existing content IDs
        const existingContentIds = contentBlocks.filter((b) => b.id).map((b) => b.id as string);

        // Delete removed content blocks
        if (isArticle) {
            await ContentDeleteManyAction({
                where: {
                    articleId: id,
                    id: { notIn: existingContentIds },
                },
            }).catch(() => {});
        } else {
            await ContentDeleteManyAction({
                where: {
                    diyId: id,
                    id: { notIn: existingContentIds },
                },
            }).catch(() => {});
        }

        // Update or create content blocks
        for (let i = 0; i < contentBlocks.length; i++) {
            const block = contentBlocks[i];

            // Upload new image if provided
            let imageUrl = block.existingImage;
            if (block.newImage) {
                imageUrl = await Solid({
                    route: "/stripe/file/upload",
                    method: "POST",
                    body: {
                        file: block.newImage,
                        fileNameToSlugify: `${slug}-${i + 1}`,
                    },
                });

                if (!imageUrl) {
                    return { message: `Échec de l'upload de l'image pour le bloc ${i + 1}`, status: false };
                }
            }

            if (block.id) {
                // Update existing block
                await ContentUpdateAction({
                    where: { id: block.id },
                    data: {
                        content: block.content,
                        image: imageUrl,
                    },
                });
            } else {
                // Create new block
                await ContentCreateAction({
                    data: {
                        content: block.content,
                        image: imageUrl,
                        ...(isArticle ? { articleId: id } : { diyId: id }),
                    },
                });
            }
        }

        return { message: `${typeName} mis à jour avec succès`, status: true };
    } catch (error) {
        if (process.env.NODE_ENV === "development") {
            const processName = "UpdateContentProcess";
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
