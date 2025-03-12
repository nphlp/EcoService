import { FruitCommon, FruitId, FruitTimestamps, FruitUpdate } from "@actions/types/Fruit";
import { FruitModel } from "@actions/zod-generated";
import { strictObject, z, ZodString, ZodType } from "zod";

export const fruitIdSchema: ZodString = z.string().nanoid();

export const fruitIdObjectSchema: ZodType<FruitId> = strictObject({
    id: z.string().nanoid(),
});

export const fruitCommonSchema: ZodType<FruitCommon> = FruitModel.omit({
    id: true,
    createdAt: true,
    updatedAt: true,
});

export const fruitTimestampsSchema: ZodType<FruitTimestamps> = strictObject({
    createdAt: z.date(),
    updatedAt: z.date(),
});

export const fruitUpdateSchema: ZodType<FruitUpdate> = strictObject({
    id: fruitIdSchema,
    data: fruitCommonSchema,
});
