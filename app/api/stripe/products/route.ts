import { StripeInstance } from "@lib/stripe";
import { decodeParams } from "@utils/url-parsers";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { ZodType, z } from "zod";
import { ResponseFormat } from "@/solid/solid-config";
import { StripeError } from "../Error";

export type StripeProductsProps = {
    limit?: number;
};

const stripeProductsSchema: ZodType<StripeProductsProps> = z.object({
    limit: z.number().min(1).max(100).optional(),
});

export type StripeProductsResponse = Stripe.Product[];

export async function GET(request: NextRequest): Promise<NextResponse<ResponseFormat<StripeProductsResponse>>> {
    try {
        const params: StripeProductsProps = decodeParams(request.nextUrl.searchParams);
        const { limit } = stripeProductsSchema.parse(params);

        const products = await StripeInstance.products.list({
            expand: ["data.default_price"],
            active: true,
            limit,
        });

        return NextResponse.json({ data: products.data });
    } catch (e) {
        const error = StripeError("/products", e);
        return NextResponse.json({ error }, { status: 500 });
    }
}
