import { StripeInstance } from "@lib/stripe";
import { decodeParams } from "@utils/url-parsers";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { ZodType, z } from "zod";
import { ResponseFormat } from "@/solid/solid-config";
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
        const params: StripeSelectProductProps = decodeParams(request.nextUrl.searchParams);

        const { id } = stripeSelectProductPropsSchema.parse(params);

        const stripeProduct = await StripeInstance.products.retrieve(id, {
            expand: ["default_price"],
        });

        return NextResponse.json({ data: stripeProduct }, { status: 200 });
    } catch (e) {
        const error = StripeError("/products/select", e);
        return NextResponse.json({ error }, { status: 500 });
    }
}
