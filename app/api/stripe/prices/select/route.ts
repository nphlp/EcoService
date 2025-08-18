import { StripeInstance } from "@lib/stripe";
import { ResponseFormat, parseAndDecodeParams } from "@utils/FetchConfig";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { ZodType, z } from "zod";
import { StripeError } from "../../Error";

export type StripeSelectPriceProps = {
    id: string;
};

const stripeSelectPricePropsSchema: ZodType<StripeSelectPriceProps> = z.object({
    id: z.string(),
});

export type StripeSelectPriceResponse = Stripe.Price;

export async function GET(request: NextRequest): Promise<NextResponse<ResponseFormat<StripeSelectPriceResponse>>> {
    try {
        const params: StripeSelectPriceProps = parseAndDecodeParams(request);

        const { id } = stripeSelectPricePropsSchema.parse(params);

        const stripePrice = await StripeInstance.prices.retrieve(id);

        return NextResponse.json({ data: stripePrice }, { status: 200 });
    } catch (e) {
        const error = StripeError("/prices/select", e);
        return NextResponse.json({ error }, { status: 500 });
    }
}
