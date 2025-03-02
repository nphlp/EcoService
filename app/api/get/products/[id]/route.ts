import { productIdObjectSchema, ProductType, SelectProductListProps } from "@actions/types/Product";
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
const SelectProductCached = cache(
    async (stringParams: string): Promise<ProductType | null> => {
        // Parse the params as object
        const params: SelectProductListProps = JSON.parse(stringParams);

        console.log("params", params);

        const { id } = productIdObjectSchema.parse(params);

        const productData: ProductType | null = await PrismaInstance.product.findUnique({
            where: { id },
        });

        return productData;
    },
    ["/products/{id}"],
    {
        /**
         * Cache revalidation
         * - development : revalidate every 5 seconds
         * - production : revalidate every 5 minutes
         */
        revalidate: process.env.NODE_ENV === "development" ? 5 : 300,
        tags: ["/products/{id}"],
    },
);

export type SelectProductResponse =
    | {
          data: ProductType | null;
      }
    | {
          error: string;
      };

/**
 * GET route handler for products API
 * @param request Incoming request with optional parameters
 * @returns JSON response containing product list or error message
 */
export const GET = async (request: NextRequest): Promise<NextResponse<SelectProductResponse>> => {
    try {
        // Get the params and decode them
        const encodedParams = request.nextUrl.searchParams.get("params") ?? "{}";
        const stringParams = decodeURIComponent(encodedParams);

        // Get the product list
        const product: ProductType | null = await SelectProductCached(stringParams);

        // Return the product list
        return NextResponse.json({ data: product });
    } catch (error) {
        console.error("SelectProduct -> " + (error as Error).message);
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
