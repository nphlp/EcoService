"use server";

import { Fetch } from "@app/api/utils/Fetch";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
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
        const product = createStripeProductSchema.parse(props);

        console.log("product", product);

        const { name, description, price, categoryId, image } = product;

        // Is user authorized to create a product ?
        // const session = await GetSession();
        // const isAuthorized = await isVendorOrEmployeeOrAdmin();
        // if (!session || !isAuthorized) unauthorized();

        // Check if product already exists in DB (this route does not exist yet)
        const existingProductInDatabase = await Fetch({
            route: "/products/unique",
            params: {
                where: { name },
            },
        });

        // TODO: check if the request bellow works
        console.log("existingProductInDatabase", existingProductInDatabase);

        if (existingProductInDatabase) {
            return { message: "Product already exists", status: false };
        }

        // Check if product already exists in Stripe
        // const existingProductInStripe = await Fetch({ route: "/stripe/products/{name}", params: { name: product.name } });

        // Check if category exists in DB
        const categoryExists = await Fetch({
            route: "/categories/unique",
            params: {
                where: {
                    id: categoryId,
                },
            },
        });
        if (!categoryExists) {
            return { message: "Category does not exist", status: false };
        }

        // Upload image to Stripe
        // const imageUrlOnStripe = await Fetch({
        //     route: "/stripe/file/upload",
        //     method: "POST",
        //     params: {
        //         file: image,
        //         fileNameToSlugify: name,
        //     },
        // });

        // Create product in database first
        // const createdInDB = await CreateProduct({
        //     name,
        //     description,
        //     price: parseFloat(price),
        //     categoryId,
        //     vendorId: session.user.id,
        //     image: imageUrlOnStripe,
        //     stock: 0,
        // });
        // if (!createdInDB.productData) {
        //     return { message: "Failed to create product in database.", status: false };
        // }
        // const { productData: createdProductInDatabase } = createdInDB;

        // Create product in Stripe
        // const createProductInStripe = await Fetch({
        //     route: "/stripe/products",
        //     method: "POST",
        //     params: {
        //         name,
        //         description,
        //         price,
        //         currency: "eur",
        //         categoryId,
        //         categoryName: categoryExists.name,
        //         productId: createdProductInDatabase.id,
        //         vendorId: session.user.id,
        //         imageUrl: imageUrlOnStripe,
        //     },
        // });

        // if (!createProductInStripe) {
        //     return {
        //         message:
        //             "Failed to create product in Stripe, but product was created in database successfully. Please contact support.",
        //         status: false,
        //     };
        // }

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
