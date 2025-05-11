import { StripeInstance } from "@lib/stripe";
import { parseAndDecodeParams, ResponseFormat } from "@utils/FetchConfig";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { z, ZodType } from "zod";
import { StripeError } from "../../Error";

export type StripeSearchProductProps = {
    name: string;
};

const stripeSearchProductPropsSchema: ZodType<StripeSearchProductProps> = z.object({
    name: z.string(),
});

export type StripeSearchProductResponse = Stripe.Product[];

export async function GET(request: NextRequest): Promise<NextResponse<ResponseFormat<StripeSearchProductResponse>>> {
    try {
        const params: StripeSearchProductProps = parseAndDecodeParams(request);

        const { name } = stripeSearchProductPropsSchema.parse(params);

        const stripeProduct = await StripeInstance.products.search({ query: `name~"${name}"` });

        return NextResponse.json({ data: stripeProduct.data }, { status: 200 });
    } catch (e) {
        const error = StripeError("/products/search", e);
        return NextResponse.json({ error }, { status: 500 });
    }
}
