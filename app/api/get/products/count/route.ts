import { selectProductAmountSchema, SelectProductListProps } from "@actions/types/Product";
import PrismaInstance from "@lib/prisma";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { unstable_cache as cache } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";

/**
 * Retrieves a cached list of products
 * @param stringParams Filtering and pagination parameters in JSON format
 * @returns List of products or null if no products found
 */
const SelectProductAmountCached = cache(
    async (stringParams: string): Promise<number | null> => {
        // Parse the params as object
        const params: SelectProductListProps = JSON.parse(stringParams);

        // Validate the params with zod
        const { where } = selectProductAmountSchema.parse(params);

        const productAmount = await PrismaInstance.product.count({
            ...(where && { where }),
        });

        return productAmount ? productAmount : null;
    },
    ["products"],
    {
        /**
         * Cache revalidation
         * - development : revalidate every 5 seconds
         * - production : revalidate every 5 minutes
         */
        revalidate: process.env.NODE_ENV === "development" ? 5 : 300,
        tags: ["products"],
    },
);

export type SelectProductAmountResponse = {
    data: number | null;
} | {
    error: string;
}

/**
 * GET route handler for products API
 * @param request Incoming request with optional parameters
 * @returns JSON response containing product list or error message
 */
export const GET = async (request: NextRequest): Promise<NextResponse<SelectProductAmountResponse>> => {
    try {
        // Get the params and decode them
        const encodedParams = request.nextUrl.searchParams.get("params") ?? "{}";
        const stringParams = decodeURIComponent(encodedParams);

        // Get the product list
        const productAmount: number | null = await SelectProductAmountCached(stringParams);

        // Return the product list
        return NextResponse.json({ data: productAmount });
    } catch (error) {
        console.error("SelectProductAmount -> " + (error as Error).message);
        if (process.env.NODE_ENV === "development") {
            if (error instanceof ZodError)
                return NextResponse.json({ error: "Invalid params -> " + error.message }, { status: 400 });
            if (error instanceof PrismaClientKnownRequestError)
                return NextResponse.json({ error: "Prisma error -> " + error.message }, { status: 500 });
            return NextResponse.json({ error: "Something went wrong..." + (error as Error).message }, { status: 500 });
        }
        // TODO: add logging
        return NextResponse.json({ error: "Something went wrong..." }, { status: 500 });
    }
};
