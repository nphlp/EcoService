"use server";

import { hasRole } from "@permissions/hasRole";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/client";
import { ArticleCreateAction, ArticleFindUniqueAction } from "@services/actions/ArticleAction";
import { ContentCreateAction } from "@services/actions/ContentAction";
import { DiyCreateAction, DiyFindUniqueAction } from "@services/actions/DiyAction";
import { stringToSlug } from "@utils/string-format";
import { ZodError, ZodType, strictObject, z } from "zod";
import Solid from "@/solid/solid-fetch";

export type ContentBlockInput = {
    content: string;
    image: File;
};

export type CreateContentProcessProps = {
    type: "article" | "diy";
    title: string;
    contentBlocks: ContentBlockInput[];
};

const createContentProcessSchema: ZodType<CreateContentProcessProps> = strictObject({
    type: z.enum(["article", "diy"]),
    title: z.string().min(1),
    contentBlocks: z
        .array(
            strictObject({
                content: z.string().min(1),
                image: z.instanceof(File),
            }),
        )
        .min(1),
});

export type CreateContentProcessResponse = {
    status: boolean;
    message: string;
};

export const CreateContentProcess = async (props: CreateContentProcessProps): Promise<CreateContentProcessResponse> => {
    try {
        // Validate params
        const { type, title, contentBlocks } = createContentProcessSchema.parse(props);

        // Authorization
        const session = await hasRole(["EMPLOYEE", "ADMIN"]);

        if (!session) {
            return { message: "Unauthorized", status: false };
        }

        const slug = stringToSlug(title);
        const isArticle = type === "article";
        const typeName = isArticle ? "article" : "DIY";

        // Check if already exists
        const existingContent = isArticle
            ? await ArticleFindUniqueAction({ where: { title } })
            : await DiyFindUniqueAction({ where: { title } });

        if (existingContent) {
            return { message: `Un ${typeName} avec ce titre existe déjà`, status: false };
        }

        // Create article or DIY
        const createdContent = isArticle
            ? await ArticleCreateAction({
                  data: {
                      title,
                      slug,
                      authorId: session.user.id,
                  },
              })
            : await DiyCreateAction({
                  data: {
                      title,
                      slug,
                      authorId: session.user.id,
                  },
              });

        if (!createdContent) {
            return { message: `Échec de la création du ${typeName}`, status: false };
        }

        // Upload images and create content blocks
        for (let i = 0; i < contentBlocks.length; i++) {
            const block = contentBlocks[i];

            // Upload image to Stripe
            const imageUrl = await Solid({
                route: "/stripe/file/upload",
                method: "POST",
                body: {
                    file: block.image,
                    fileNameToSlugify: `${slug}-${i + 1}`,
                },
            });

            if (!imageUrl) {
                return { message: `Échec de l'upload de l'image pour le bloc ${i + 1}`, status: false };
            }

            // Create content block
            await ContentCreateAction({
                data: {
                    content: block.content,
                    image: imageUrl,
                    ...(isArticle ? { articleId: createdContent.id } : { diyId: createdContent.id }),
                },
            });
        }

        return { message: `${typeName} créé avec succès`, status: true };
    } catch (error) {
        if (process.env.NODE_ENV === "development") {
            const processName = "CreateContentProcess";
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
