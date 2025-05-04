"use server";

import { isVendorOrEmployeeOrAdmin } from "@lib/checkRole";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { Fetch } from "@utils/Fetch/Fetch";
import { FetchV2 } from "@utils/FetchV2/FetchV2";
import { strictObject, z, ZodError, ZodType } from "zod";

export type AddProductToStripeProcessProps = {
    name: string;
    description: string;
    price: string;
    categoryId: string;
    image: File;
};

const addProductToStripeProcessSchema: ZodType<AddProductToStripeProcessProps> = strictObject({
    name: z.string(),
    description: z.string(),
    price: z.string(),
    categoryId: z.string(),
    image: z.instanceof(File),
});

export type AddProductToStripeProcessResponse = {
    status: boolean;
    message: string;
};

export const AddProductToStripeProcess = async (
    props: AddProductToStripeProcessProps,
): Promise<AddProductToStripeProcessResponse> => {
    try {
        // Validate params
        const { name, description, price, categoryId, image } = addProductToStripeProcessSchema.parse(props);

        // Authorization
        const session = await isVendorOrEmployeeOrAdmin();

        if (!session) {
            return { message: "Unauthorized", status: false };
        }

        // Product already exists ?
        const existingProductInDatabase = await FetchV2({
            route: "/product/unique",
            params: {
                where: { name },
            },
        });

        if (existingProductInDatabase) {
            return { message: "Product already exists", status: false };
        }

        // Category exists ?
        const categoryExists = await FetchV2({
            route: "/category/unique",
            params: {
                where: {
                    id: categoryId,
                },
            },
        });

        if (!categoryExists) {
            return { message: "Category does not exist", status: false };
        }

        // Product already exists in Stripe ?
        const existingProductInStripe = await Fetch({ route: "/stripe/products/search", params: { name } });

        if (existingProductInStripe.length > 0) {
            return { message: "Product already exists in Stripe", status: false };
        }

        // Upload image to Stripe
        const imageUrlOnStripe = await Fetch({
            route: "/stripe/file/upload",
            method: "POST",
            body: {
                file: image,
                fileNameToSlugify: name,
            },
        });

        if (!imageUrlOnStripe) {
            return { message: "Failed to upload image to Stripe.", status: false };
        }

        // Create product in Stripe
        const createProductInStripe = await Fetch({
            route: "/stripe/products/create",
            params: {
                name,
                description,
                price,
                currency: "eur",
                categoryId,
                categoryName: categoryExists.name,
                vendorId: session.user.id,
                imageUrl: imageUrlOnStripe,
            },
        });

        if (!createProductInStripe) {
            return { message: "Failed to create product in Stripe", status: false };
        }

        // Create price in Stripe
        const createPriceInStripe = await Fetch({
            route: "/stripe/prices/create",
            params: {
                productId: createProductInStripe.id,
                amountInCents: parseFloat(price) * 100,
                currency: "eur",
            },
        });

        if (!createPriceInStripe) {
            return { message: "Failed to create price in Stripe", status: false };
        }

        // Update Stripe product default price
        const updateProductDefaultPriceInStripe = await Fetch({
            route: "/stripe/products/update",
            params: {
                productId: createProductInStripe.id,
                priceId: createPriceInStripe.id,
            },
        });

        if (!updateProductDefaultPriceInStripe) {
            return { message: "Failed to update product default price in Stripe", status: false };
        }

        return { message: "Product created successfully", status: true };
    } catch (error) {
        if (process.env.NODE_ENV === "development") {
            const processName = "AddProductToStripeProcess";
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
        return { message: "Something went wrong...", status: false };
    }
};
