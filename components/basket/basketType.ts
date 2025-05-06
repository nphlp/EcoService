import { OrderModel, ProductModel, QuantityModel, UserModel } from "@services/types";
import { z, ZodSchema } from "zod";

export type BasketItem = {
    // Product
    productId: ProductModel["id"];
    name: ProductModel["name"];
    description: ProductModel["description"];
    price: ProductModel["price"];
    image: ProductModel["image"];
    // Quantity
    quatityId: QuantityModel["id"];
    quantity: number;
};

export const BasketItemSchema: ZodSchema<BasketItem> = z.object({
    // Product
    productId: z.coerce.string(),
    name: z.coerce.string(),
    description: z.coerce.string(),
    price: z.coerce.number(),
    image: z.coerce.string(),
    // Quantity
    quatityId: z.coerce.string(),
    quantity: z.coerce.number(),
});

/**
 * Basket is a Quantity that represent a relation between a Product and an Order
 */
export type Basket = {
    userId: UserModel["id"];
    orderId: OrderModel["id"];
    items: BasketItem[];
};

export const BasketSchema: ZodSchema<Basket> = z.object({
    userId: z.coerce.string(),
    orderId: z.coerce.string(),
    items: z.array(BasketItemSchema),
});
