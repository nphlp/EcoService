"use server";

import { ProductCommon } from "@actions/types/Product";

type CreateStripeProductProps = {
    price: string;
    image: File | null;
} & Omit<ProductCommon, "price" | "image">;

export const CreateStripeProduct = async (
    props: CreateStripeProductProps,
): Promise<{ status: boolean; message: string }> => {
    // Validate product type with zod
    // const product = productCommonSchema.parse(props);

    console.log("product", props);

    // Get user session
    // const session = await GetSession();

    // If not authenticated, redirect to unauthorized page (/app/unauthorized.tsx)
    // if (!session) {
    //     unauthorized();
    // }

    // Check if user is a vendor ? In the session or in the database

    // Check if product already exists in DB (this route does not exist yet)
    // const existingProductInDB = await Fetch({ route: "/products/{name}", params: { name: product.name } });

    // Create product in Stripe (this route does not exist yet)
    // const existingProductInStripe = await Fetch({ route: "/stripe/products/{vendorId}/{name}", params: { name: product.name } });

    // ...

    let message = "";
    let status = false;

    setTimeout(() => {
        const random = Math.random();
        message = random > 0.5 ? "Product created successfully" : "Product already exists";
        status = random > 0.5 ? true : false;
    }, 1000);

    return { status, message };
};
