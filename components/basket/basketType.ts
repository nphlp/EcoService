import { OrderModel, ProductModel, QuantityModel } from "@services/types";
import { z, ZodType } from "zod";

/** Basket product */
export type BasketProduct = {
    productId: ProductModel["id"];
    name: ProductModel["name"];
    description: ProductModel["description"];
    price: ProductModel["price"];
    image: ProductModel["image"];
};

/** Server basket item */
export type ServerBasketItem = BasketProduct & {
    // Quantity
    quantityId: QuantityModel["id"]; // Required
    quantity: number;
};

/** Local basket item */
export type LocalBasketItem = BasketProduct & {
    // Quantity
    quantityId?: QuantityModel["id"]; // Optional
    quantity: number;
};

/** Server basket */
export type ServerBasket = {
    orderId: OrderModel["id"]; // Required
    items: ServerBasketItem[];
};

/** Local basket */
export type LocalBasket = {
    orderId?: OrderModel["id"]; // Optional
    items: LocalBasketItem[];
};

/** Local basket item schema */
export const localBasketItemSchema: ZodType<LocalBasketItem> = z.object({
    // Product
    productId: z.coerce.string(),
    name: z.coerce.string(),
    description: z.coerce.string(),
    price: z.coerce.number(),
    image: z.coerce.string(),
    // Quantity
    quantityId: z.coerce.string().optional(),
    quantity: z.coerce.number(),
});

/** Local basket schema */
export const localBasketSchema: ZodType<LocalBasket> = z.object({
    orderId: z.coerce.string().optional(),
    items: z.array(localBasketItemSchema),
});
