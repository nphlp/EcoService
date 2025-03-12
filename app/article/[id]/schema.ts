import { SelectArticleProps } from "@actions/types/Article";
import { articleIdSchema } from "@actions/zod/Article";
import { strictObject, z, ZodType } from "zod";

/**
 * Schéma de validation pour la page article/[id]
 * Ce schéma définit les données que la page peut demander à l'API
 */
export const articlePageSchema: ZodType<SelectArticleProps> = strictObject({
    where: strictObject({
        id: articleIdSchema,
    }),
    select: strictObject({
        id: z.boolean().optional(),
        title: z.boolean().optional(),
        createdAt: z.boolean().optional(),
        Content: strictObject({
            select: strictObject({
                content: z.boolean().optional(),
                image: z.boolean().optional(),
            }).optional(),
        }).optional(),
        Author: strictObject({
            select: strictObject({
                name: z.boolean().optional(),
            }).optional(),
        }).optional(),
    }),
});
