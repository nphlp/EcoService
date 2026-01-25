import { StripeInstance } from "@lib/stripe";
import { decodeParams } from "@utils/url-parsers";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { ZodType, z } from "zod";
import { ResponseFormat } from "@/solid/solid-config";
import { StripeError } from "../../Error";

export type UpdateFullStripeProductProps = {
    productId: string;
    name: string;
    description: string;
    categoryId: string;
    categoryName: string;
    imageUrl: string;
};

const updateFullStripeProductPropsSchema: ZodType<UpdateFullStripeProductProps> = z.object({
    productId: z.string(),
    name: z.string(),
    description: z.string(),
    categoryId: z.string(),
    categoryName: z.string(),
    imageUrl: z.string(),
});

export type UpdateFullStripeProductResponse = Stripe.Product;

export async function GET(
    request: NextRequest,
): Promise<NextResponse<ResponseFormat<UpdateFullStripeProductResponse>>> {
    try {
        const params: UpdateFullStripeProductProps = decodeParams(request.nextUrl.searchParams);

        const { productId, name, description, categoryId, categoryName, imageUrl } =
            updateFullStripeProductPropsSchema.parse(params);

        const updatedProduct = await StripeInstance.products.update(productId, {
            name,
            description,
            images: imageUrl ? [imageUrl] : undefined,
            metadata: {
                categoryId,
                categoryName,
                localImage: imageUrl || null,
            },
        });

        return NextResponse.json({ data: updatedProduct }, { status: 200 });
    } catch (e) {
        const error = StripeError("/products/update-full", e);
        return NextResponse.json({ error }, { status: 500 });
    }
}
