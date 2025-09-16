import { StripeInstance } from "@lib/stripe";
import { ResponseFormat, parseAndDecodeParams } from "@utils/FetchConfig";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { ZodType, z } from "zod";
import { StripeError } from "../../Error";

export type CreateStripeProductProps = {
    name: string;
    description: string;
    categoryId: string;
    categoryName: string;
    vendorId: string;
    imageUrl: string;
};

const createStripeProductPropsSchema: ZodType<CreateStripeProductProps> = z.object({
    name: z.string(),
    description: z.string(),
    categoryId: z.string(),
    categoryName: z.string(),
    vendorId: z.string(),
    imageUrl: z.string(),
});

export type CreateStripeProductResponse = Stripe.Product;

export async function GET(request: NextRequest): Promise<NextResponse<ResponseFormat<CreateStripeProductResponse>>> {
    try {
        const params: CreateStripeProductProps = parseAndDecodeParams(request);

        const { name, description, categoryId, categoryName, vendorId, imageUrl } =
            createStripeProductPropsSchema.parse(params);

        const stripeProduct = await StripeInstance.products.create({
            name,
            description,
            images: [imageUrl],
            // Include our database info in Stripe metadata
            metadata: {
                categoryId,
                categoryName,
                vendorId,
            },
        });

        return NextResponse.json({ data: stripeProduct }, { status: 200 });
    } catch (e) {
        const error = StripeError("/products/create", e);
        return NextResponse.json({ error }, { status: 500 });
    }
}
