import { CountDoItYourselfProps, FindManyDoItYourselfProps, FindUniqueDoItYourselfProps } from "@class/DoItYourselfClass";
import { strictObject, z, ZodType } from "zod";

export const selectDoItYourselfUniqueSchema: ZodType<FindUniqueDoItYourselfProps> = strictObject({
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

export const selectDoItYourselfListSchema: ZodType<FindManyDoItYourselfProps> = strictObject({
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

export const selectDoItYourselfAmountSchema: ZodType<CountDoItYourselfProps> = strictObject({
    where: strictObject({
        // TODO: choose allowed filters for select request
        // WARNING: this schema protect request from frontend
    }).optional(),
});
