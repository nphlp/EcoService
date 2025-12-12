import z from "zod";

const quantityWithFruitSchema = z.object({
    id: z.string(),
    quantity: z.number(),
    fruitId: z.string(),
    Fruit: z.object({
        id: z.string(),
        name: z.string(),
        description: z.string(),
    }),
});

const basketWithQuantitiesSchema = z.object({
    id: z.string(),
    userId: z.string(),
    createdAt: z.date(),
    updatedAt: z.date(),
    Quantity: z.array(quantityWithFruitSchema),
});

export { basketWithQuantitiesSchema, quantityWithFruitSchema };
