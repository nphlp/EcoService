import { CountArticleProps, FindManyArticleProps, FindUniqueArticleProps } from "@services/types";
import { strictObject, z, ZodType } from "zod";

export const selectArticleUniqueSchema: ZodType<FindUniqueArticleProps> = strictObject({
    where: strictObject({
        id: z.string().nanoid(),
        // TODO: choose allowed filters for select request
        // WARNING: this schema protect request from frontend
    }),
    select: strictObject({
        // TODO: choose allowed filters for select request
        // WARNING: this schema protect request from frontend
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
    }).optional(),
});

export const selectArticleListSchema: ZodType<FindManyArticleProps> = strictObject({
    select: strictObject({
        // TODO: choose allowed filters for select request
        // WARNING: this schema protect request from frontend
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
    }).optional(),
    orderBy: strictObject({
        // TODO: choose allowed filters for select request
        // WARNING: this schema protect request from frontend
        createdAt: z.enum(["asc", "desc"]).optional(),
    }).optional(),
    take: z.number().min(1).max(100).optional(),
    skip: z.number().min(0).optional(),
    where: strictObject({
        // TODO: choose allowed filters for select request
        // WARNING: this schema protect request from frontend
    }).optional(),
});

export const selectArticleAmountSchema: ZodType<CountArticleProps> = strictObject({
    where: strictObject({
        // TODO: choose allowed filters for select request
        // WARNING: this schema protect request from frontend
    }).optional(),
});
