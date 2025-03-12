"use server";

import { GetSession } from "@lib/auth";
import { Product } from "@prisma/client";
import { unauthorized } from "next/navigation";
import { productCommonSchema } from "@actions/zod/Product";

export const CreateStripeProduct = async (props: Product) => {
    // Validate product type with zod
    const product = productCommonSchema.parse(props);

    console.log("product", product);

    // Get user session
    const session = await GetSession();

    // If not authenticated, redirect to unauthorized page (/app/unauthorized.tsx)
    if (!session) {
        unauthorized();
    }

    // Check if user is a vendor ? In the session or in the database

    // Check if product already exists in DB (this route does not exist yet)
    // const existingProductInDB = await Fetch({ route: "/products/{name}", params: { name: product.name } });

    // Create product in Stripe (this route does not exist yet)
    // const existingProductInStripe = await Fetch({ route: "/stripe/products/{vendorId}/{name}", params: { name: product.name } });
    
    // ...
};
