import { StripeInstance } from "@lib/stripe";
import { parseAndDecodeParams, ResponseFormat } from "@utils/FetchConfig";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { z, ZodType } from "zod";
import { StripeError } from "../../Error";

export type StripeSelectProductProps = {
    id: string;
};

const stripeSelectProductPropsSchema: ZodType<StripeSelectProductProps> = z.object({
    id: z.string(),
});

export type StripeSelectProductResponse = Stripe.Product;

export async function GET(request: NextRequest): Promise<NextResponse<ResponseFormat<StripeSelectProductResponse>>> {
    try {
        const params: StripeSelectProductProps = parseAndDecodeParams(request);

        const { id } = stripeSelectProductPropsSchema.parse(params);

        const stripeProduct = await StripeInstance.products.retrieve(id);

        return NextResponse.json({ data: stripeProduct }, { status: 200 });
    } catch (e) {
        const error = StripeError("/products/select", e);
        return NextResponse.json({ error }, { status: 500 });
    }
}
