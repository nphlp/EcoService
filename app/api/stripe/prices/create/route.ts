import { StripeInstance } from "@lib/stripe";
import { ResponseFormat, parseAndDecodeParams } from "@utils/FetchConfig";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { ZodType, z } from "zod";
import { StripeError } from "../../Error";

export type CreateStripePriceProps = {
    productId: string;
    amountInCents: number;
    currency: string;
};

const createStripePricePropsSchema: ZodType<CreateStripePriceProps> = z.object({
    productId: z.string(),
    amountInCents: z.number().min(0),
    currency: z.string(),
});

export type CreateStripePriceResponse = Stripe.Price;

export async function GET(request: NextRequest): Promise<NextResponse<ResponseFormat<CreateStripePriceResponse>>> {
    try {
        const params: CreateStripePriceProps = parseAndDecodeParams(request);

        const { productId, amountInCents, currency } = createStripePricePropsSchema.parse(params);

        const stripePrice = await StripeInstance.prices.create({
            product: productId,
            unit_amount: amountInCents,
            currency,
        });

        return NextResponse.json({ data: stripePrice }, { status: 200 });
    } catch (e) {
        const error = StripeError("/prices/create", e);
        return NextResponse.json({ error }, { status: 500 });
    }
}
