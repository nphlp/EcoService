"use server";

import { CreateQuantity } from "@actions/QuantityAction";
import { BasketItem } from "@comps/basket/basketType";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { revalidatePath } from "next/cache";
import { ZodError } from "zod";
import { GetBasket } from "./GetBasket";

type AddProductToBasketProps = {
    product: Omit<BasketItem, "quatityId" | "quantity">;
};

export const AddProductToBasket = async (props: AddProductToBasketProps) => {
    try {
        const { product } = props;

        const serverBasket = await GetBasket();

        if (serverBasket) {
            const { orderId } = serverBasket;
            const { productId } = product;

            // Create quantity
            await CreateQuantity({
                data: {
                    Product: { connect: { id: productId } },
                    Order: { connect: { id: orderId } },
                    quantity: 1,
                },
            });
        }

        // Refresh checkout page
        revalidatePath("/checkout", "page");
    } catch (error) {
        if (process.env.NODE_ENV === "development") {
            const processName = "AddProductToBasket";
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
        // TODO: add logging
        return null;
    }
};
