import { StripeInstance } from "@lib/stripe";
import { NextRequest, NextResponse } from "next/server";
import { z, ZodError, ZodType } from "zod";

export async function GET() {
    try {
        const products = await StripeInstance.products.list({
            expand: ["data.default_price"],
            active: true,
        });

        return NextResponse.json({ data: products.data });
    } catch (error) {
        console.error("Error fetching products:", error);
        return NextResponse.json({ error: (error as Error).message || "Error fetching products" }, { status: 500 });
    }
}

export type CreateStripeProductProps = {
    name: string;
    description: string;
    price: string;
    currency: string;
    categoryId: string;
    categoryName: string;
    productId: string;
    vendorId: string;
    imageUrl: string;
};

const createStripeProductPropsSchema: ZodType<CreateStripeProductProps> = z.object({
    name: z.string(),
    description: z.string(),
    price: z.string(),
    currency: z.string(),
    categoryId: z.string(),
    categoryName: z.string(),
    productId: z.string(),
    vendorId: z.string(),
    imageUrl: z.string(),
});

export async function POST(request: NextRequest) {
    try {
        // Get the params and decode them
        const encodedParams = request.nextUrl.searchParams.get("params") ?? "{}";
        const stringParams = decodeURIComponent(encodedParams);

        // Parse the params
        const params: CreateStripeProductProps = JSON.parse(stringParams);

        // Validate and extract the params
        const { name, description, price, currency, categoryId, categoryName, productId, vendorId, imageUrl } =
            createStripeProductPropsSchema.parse(params);

        // Create product in Stripe
        const stripeProduct = await StripeInstance.products.create({
            name,
            description,
            images: [imageUrl],
            // Include our database info in Stripe metadata
            metadata: {
                categoryId,
                categoryName,
                productId,
                vendorId,
            },
        });

        // Create price for the product
        const stripePrice = await StripeInstance.prices.create({
            product: stripeProduct.id,
            unit_amount: Math.round(parseFloat(price) * 100), // Convert to cents
            currency: currency,
        });

        // Associate the price to the product
        const updatedProduct = await StripeInstance.products.update(stripeProduct.id, {
            default_price: stripePrice.id,
        });

        return NextResponse.json({ data: updatedProduct }, { status: 200 });
    } catch (error) {
        console.error("CreateStripeProduct -> " + (error as Error).message);
        if (process.env.NODE_ENV === "development") {
            if (error instanceof ZodError)
                return NextResponse.json({ error: "CreateStripeProduct -> Invalid Zod params -> " + error.message });
            return NextResponse.json({ error: "CreateStripeProduct -> " + (error as Error).message });
        }
        // TODO: add logging
        return NextResponse.json({ error: "Something went wrong..." }, { status: 500 });
    }
}
