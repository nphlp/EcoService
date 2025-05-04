import { StripeInstance } from "@lib/stripe";
import { parseAndDecodeParams, ResponseFormat } from "@utils/FetchConfig";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { z, ZodError, ZodType } from "zod";

export type StripeSelectProductProps = {
    id: string;
};

const stripeSelectProductPropsSchema: ZodType<StripeSelectProductProps> = z.object({
    id: z.string(),
});

export type StripeSelectProductResponse = Stripe.Product;

export async function GET(request: NextRequest): Promise<NextResponse<ResponseFormat<StripeSelectProductResponse>>> {
    try {
        // Parse the params
        const params: StripeSelectProductProps = parseAndDecodeParams(request);

        // Validate and extract the params
        const { id } = stripeSelectProductPropsSchema.parse(params);

        // Create product in Stripe
        const stripeProduct = await StripeInstance.products.retrieve(id);

        return NextResponse.json({ data: stripeProduct }, { status: 200 });
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
