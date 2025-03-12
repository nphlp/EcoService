import { SelectProductAmountProps } from "@actions/types/Product";
import { selectProductAmountSchema } from "@actions/zod-sensitive/Product";
import PrismaInstance from "@lib/prisma";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { unstable_cache as cache } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";

/**
 * Retrieves a cached count of products
 * @param stringParams Filtering parameters in JSON format
 * @returns Count of products or null if no products found
 */
const SelectProductAmountCached = cache(
    async (stringParams: string): Promise<number | null> => {
        // Parse the params as object
        const params: SelectProductAmountProps = JSON.parse(stringParams);

        // Validate the params with zod
        const { where } = selectProductAmountSchema.parse(params);

        const productAmount: number = await PrismaInstance.product.count({
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

export type SelectProductAmountResponse =
    | {
          data: number | null;
      }
    | {
          error: string;
      };

/**
 * GET route handler for products count API
 * @param request Incoming request with optional parameters
 * @returns JSON response containing product count or error message
 */
export const GET = async (request: NextRequest): Promise<NextResponse<SelectProductAmountResponse>> => {
    try {
        // Get the params and decode them
        const encodedParams = request.nextUrl.searchParams.get("params") ?? "{}";
        const stringParams = decodeURIComponent(encodedParams);

        // Get the product count
        const productAmount: number | null = await SelectProductAmountCached(stringParams);

        // Return the product count
        return NextResponse.json({ data: productAmount }, { status: 200 });
    } catch (error) {
        console.error("SelectProductAmountCached -> " + (error as Error).message);
        if (process.env.NODE_ENV === "development") {
            if (error instanceof ZodError)
                return NextResponse.json({ error: "SelectProductAmountCached -> Invalid Zod params -> " + error.message });
            if (error instanceof PrismaClientKnownRequestError)
                return NextResponse.json({ error: "SelectProductAmountCached -> Prisma error -> " + error.message });
            return NextResponse.json({ error: "SelectProductAmountCached -> " + (error as Error).message });
        }
        // TODO: add logging
        return NextResponse.json({ error: "Something went wrong..." }, { status: 500 });
    }
};
