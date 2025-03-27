"use server";

import { CreateProduct } from "@actions/ProductAction";
import { isVendorOrEmployeeOrAdmin } from "@lib/checkRole";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { Fetch } from "@utils/Fetch";
import { FetchV2 } from "@utils/FetchV2";
import { strictObject, z, ZodError, ZodType } from "zod";

export type CreateStripeProductProps = {
    name: string;
    description: string;
    price: string;
    categoryId: string;
    image: File;
};

const createStripeProductSchema: ZodType<CreateStripeProductProps> = strictObject({
    name: z.string(),
    description: z.string(),
    price: z.string(),
    categoryId: z.string(),
    image: z.instanceof(File),
});

export type CreateStripeProductResponse = {
    status: boolean;
    message: string;
};

export const CreateStripeProductProcess = async (
    props: CreateStripeProductProps,
): Promise<CreateStripeProductResponse> => {
    try {
        // Validate product type with zod
        const { name, description, price, categoryId, image } = createStripeProductSchema.parse(props);

        // Is user authorized to create a product ?
        const session = await isVendorOrEmployeeOrAdmin();
        if (!session) {
            return { message: "Unauthorized", status: false };
        }

        // Check if product already exists in DB (this route does not exist yet)
        const existingProductInDatabase = await FetchV2({
            route: "/product/unique",
            params: {
                where: { name },
            },
        });

        if (existingProductInDatabase) {
            return { message: "Product already exists", status: false };
        }

        // Check if category exists in DB
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

        // Check if product already exists in Stripe
        // const existingProductInStripe = await Fetch({ route: "/stripe/products/{name}", params: { name: product.name } });

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

        // Create product in database first
        const createdProductInDatabase = await CreateProduct({
            data: {
                name,
                description,
                price: parseFloat(price),
                categoryId,
                vendorId: session.user.id,
                image: imageUrlOnStripe,
                stock: 0,
            },
        });
        if (!createdProductInDatabase) {
            return { message: "Failed to create product in database.", status: false };
        }

        // Create product in Stripe
        const createProductInStripe = await Fetch({
            route: "/stripe/products/create",
            method: "POST",
            params: {
                name,
                description,
                price,
                currency: "eur",
                categoryId,
                categoryName: categoryExists.name,
                productId: createdProductInDatabase.id,
                vendorId: session.user.id,
                imageUrl: imageUrlOnStripe,
            },
        });

        if (!createProductInStripe) { // TODO: check this condition
            return {
                message:
                    "Failed to create product in Stripe, but product was created in database successfully. Please contact support.",
                status: false,
            };
        }

        return { message: "Product created successfully", status: true };
    } catch (error) {
        console.error("CreateStripeProductProcess -> " + (error as Error).message);
        if (process.env.NODE_ENV === "development") {
            if (error instanceof ZodError)
                throw new Error("CreateStripeProductProcess -> Invalid Zod params -> " + error.message);
            if (error instanceof PrismaClientKnownRequestError)
                throw new Error("CreateStripeProductProcess -> Prisma error -> " + error.message);
            // throw new Error("CreateStripeProductProcess -> " + (error as Error).message);
        }
        // TODO: add logging
        return { message: "Something went wrong...", status: false };
    }
};
