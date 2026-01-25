"use server";

import { hasRole } from "@permissions/hasRole";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/client";
import { CategoryFindUniqueAction } from "@services/actions/CategoryAction";
import { ZodError, ZodType, strictObject, z } from "zod";
import Solid from "@/solid/solid-fetch";

export type UpdateProductInStripeProcessProps = {
    productId: string;
    name: string;
    description: string;
    price: string;
    categoryId: string;
    image: File | null;
};

const updateProductInStripeProcessSchema: ZodType<
    Omit<UpdateProductInStripeProcessProps, "price"> & { price: number }
> = strictObject({
    productId: z.string(),
    name: z.string(),
    description: z.string(),
    price: z
        .string()
        .transform((stringValue: string): number => Number(Number(stringValue.trim().replace(",", ".")).toFixed(2)))
        .refine((value) => !isNaN(value) && value >= 0.01),
    categoryId: z.string(),
    image: z.instanceof(File).nullable(),
});

export type UpdateProductInStripeProcessResponse = {
    status: boolean;
    message: string;
};

export const UpdateProductInStripeProcess = async (
    props: UpdateProductInStripeProcessProps,
): Promise<UpdateProductInStripeProcessResponse> => {
    try {
        // Validate params
        const { productId, name, description, price, categoryId, image } =
            updateProductInStripeProcessSchema.parse(props);

        // Authorization
        const session = await hasRole(["VENDOR", "EMPLOYEE", "ADMIN"]);

        if (!session) {
            return { message: "Unauthorized", status: false };
        }

        // Category exists?
        const categoryExists = await CategoryFindUniqueAction({
            where: {
                id: categoryId,
            },
        });

        if (!categoryExists) {
            return { message: "Category does not exist", status: false };
        }

        // Get current product
        const currentProduct = await Solid({ route: "/stripe/products/select", params: { id: productId } });

        if (!currentProduct) {
            return { message: "Product not found", status: false };
        }

        // Upload new image if provided
        let imageUrl = currentProduct.images?.[0] ?? currentProduct.metadata?.localImage;
        if (image) {
            imageUrl = await Solid({
                route: "/stripe/file/upload",
                method: "POST",
                body: {
                    file: image,
                    fileNameToSlugify: name,
                },
            });

            if (!imageUrl) {
                return { message: "Failed to upload image to Stripe.", status: false };
            }
        }

        // Update product in Stripe (name, description, metadata, image)
        const updateProduct = await Solid({
            route: "/stripe/products/update-full",
            params: {
                productId,
                name,
                description,
                categoryId,
                categoryName: categoryExists.name,
                imageUrl: imageUrl ?? "",
            },
        });

        if (!updateProduct) {
            return { message: "Failed to update product in Stripe", status: false };
        }

        // Check if price changed
        const currentPrice = currentProduct.default_price as { unit_amount?: number } | string | null;
        const currentPriceAmount =
            typeof currentPrice === "object" && currentPrice?.unit_amount ? currentPrice.unit_amount / 100 : 0;

        if (currentPriceAmount !== price) {
            // Create new price in Stripe
            const createPriceInStripe = await Solid({
                route: "/stripe/prices/create",
                params: {
                    productId,
                    amountInCents: price * 100,
                    currency: "eur",
                },
            });

            if (!createPriceInStripe) {
                return { message: "Failed to create new price in Stripe", status: false };
            }

            // Update product default price
            const updateProductPrice = await Solid({
                route: "/stripe/products/update",
                params: {
                    productId,
                    priceId: createPriceInStripe.id,
                },
            });

            if (!updateProductPrice) {
                return { message: "Failed to update product default price in Stripe", status: false };
            }
        }

        return { message: "Product updated successfully", status: true };
    } catch (error) {
        if (process.env.NODE_ENV === "development") {
            const processName = "UpdateProductInStripeProcess";
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
        return { message: "Something went wrong...", status: false };
    }
};
