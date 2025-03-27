import { CountDiyProps, FindManyDiyProps, FindUniqueDiyProps } from "@services/types";
import { strictObject, z, ZodType } from "zod";

export const selectDiyUniqueSchema: ZodType<FindUniqueDiyProps> = strictObject({
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

export const selectDiyListSchema: ZodType<FindManyDiyProps> = strictObject({
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

export const selectDiyAmountSchema: ZodType<CountDiyProps> = strictObject({
    where: strictObject({
        // TODO: choose allowed filters for select request
        // WARNING: this schema protect request from frontend
    }).optional(),
});
