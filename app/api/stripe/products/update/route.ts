import { StripeInstance } from "@lib/stripe";
import { ResponseFormat, parseAndDecodeParams } from "@utils/FetchConfig";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { ZodType, z } from "zod";
import { StripeError } from "../../Error";

export type UpdateStripeProductProps = {
    productId: string;
    priceId: string;
};

const updateStripeProductPropsSchema: ZodType<UpdateStripeProductProps> = z.object({
    productId: z.string(),
    priceId: z.string(),
});

export type UpdateStripeProductResponse = Stripe.Product;

export async function GET(request: NextRequest): Promise<NextResponse<ResponseFormat<UpdateStripeProductResponse>>> {
    try {
        const params: UpdateStripeProductProps = parseAndDecodeParams(request);

        const { productId, priceId } = updateStripeProductPropsSchema.parse(params);

        const updatedProduct = await StripeInstance.products.update(productId, { default_price: priceId });

        return NextResponse.json({ data: updatedProduct }, { status: 200 });
    } catch (e) {
        const error = StripeError("/products/update", e);
        return NextResponse.json({ error }, { status: 500 });
    }
}
