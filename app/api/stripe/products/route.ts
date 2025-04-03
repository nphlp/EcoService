import { StripeInstance } from "@lib/stripe";
import { ResponseFormat } from "@utils/FetchConfig";
import { NextResponse } from "next/server";
import Stripe from "stripe";
import { ZodError } from "zod";

export type StripeProductsResponse = Stripe.Product[];

export async function GET(): Promise<NextResponse<ResponseFormat<StripeProductsResponse>>> {
    try {
        const products = await StripeInstance.products.list({
            expand: ["data.default_price"],
            active: true,
        });

        return NextResponse.json({ data: products.data });
    } catch (error) {
        console.error("GetAllStripeProducts -> " + (error as Error).message);
        if (process.env.NODE_ENV === "development") {
            if (error instanceof ZodError)
                return NextResponse.json({ error: "GetAllStripeProducts -> Invalid Zod params -> " + error.message });
            return NextResponse.json({ error: "GetAllStripeProducts -> " + (error as Error).message });
        }
        // TODO: add logging
        return NextResponse.json({ error: "Something went wrong..." }, { status: 500 });
    }
}
