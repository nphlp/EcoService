import { StripeInstance } from "@lib/stripe";
import { ResponseFormat } from "@utils/FetchConfig";
import { NextResponse } from "next/server";
import Stripe from "stripe";
import { StripeError } from "../Error";

export type StripeProductsResponse = Stripe.Product[];

export async function GET(): Promise<NextResponse<ResponseFormat<StripeProductsResponse>>> {
    try {
        const products = await StripeInstance.products.list({
            expand: ["data.default_price"],
            active: true,
        });

        return NextResponse.json({ data: products.data });
    } catch (e) {
        const error = StripeError("/products", e);
        return NextResponse.json({ error }, { status: 500 });
    }
}
