import {
    SelectFruitAmountProps,
    SelectFruitListProps,
    SelectFruitProps,
} from "@actions/types/Fruit";
import { fruitIdSchema } from "@actions/zod/Fruit";
import { strictObject, z, ZodType } from "zod";

export const selectFruitUniqueSchema: ZodType<SelectFruitProps> = strictObject({
    where: strictObject({
        id: fruitIdSchema,
        // TODO: choose allowed filters for select request
        // WARNING: this schema protect request from frontend
    }),
    select: strictObject({
        // TODO: choose allowed filters for select request
        // WARNING: this schema protect request from frontend
    }).optional(),
});

export const selectFruitListSchema: ZodType<SelectFruitListProps> = strictObject({
    orderBy: strictObject({
        // TODO: choose allowed filters for select request
        // WARNING: this schema protect request from frontend
    }).optional(),
    take: z.number().min(1).max(100).optional(),
    skip: z.number().min(0).optional(),
    where: strictObject({
        // TODO: choose allowed filters for select request
        // WARNING: this schema protect request from frontend
    }).optional(),
});

export const selectFruitAmountSchema: ZodType<SelectFruitAmountProps> = strictObject({
    where: strictObject({
        // TODO: choose allowed filters for select request
        // WARNING: this schema protect request from frontend
    }).optional(),
});
