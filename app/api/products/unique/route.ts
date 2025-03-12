import { ProductType } from "@actions/types/Product";
import { SelectProductProps } from "@actions/types/Product";
import { selectProductUniqueSchema } from "@actions/zod-sensitive/Product";
import PrismaInstance from "@lib/prisma";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { unstable_cache as cache } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";

/**
 * Retrieves a cached product by ID
 * @param stringParams Parameters containing the product ID in JSON format
 * @returns Product or null if not found
 */
const SelectProductCached = cache(
    async (stringParams: string): Promise<ProductType | null> => {
        // Parse the params as object
        const params: SelectProductProps = JSON.parse(stringParams);

        const { where, select } = selectProductUniqueSchema.parse(params);

        const productData: ProductType | null = await PrismaInstance.product.findUnique({
            where,
            ...(select && { select }),
        });

        return productData;
    },
    ["/products/unique"],
    {
        /**
         * Cache revalidation
         * - development : revalidate every 5 seconds
         * - production : revalidate every 5 minutes
         */
        revalidate: process.env.NODE_ENV === "development" ? 5 : 300,
        tags: ["/products/unique"],
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
 * GET route handler for retrieving a single product by ID
 * @param request Incoming request with product ID parameter
 * @returns JSON response containing product data or error message
 */
export const GET = async (request: NextRequest): Promise<NextResponse<SelectProductResponse>> => {
    try {
        // Get the params and decode them
        const encodedParams = request.nextUrl.searchParams.get("params") ?? "{}";
        const stringParams = decodeURIComponent(encodedParams);

        // Get the product
        const productData: ProductType | null = await SelectProductCached(stringParams);

        // Return the product
        return NextResponse.json({ data: productData }, { status: 200 });
    } catch (error) {
        console.error("SelectProductCached -> " + (error as Error).message);
        if (process.env.NODE_ENV === "development") {
            if (error instanceof ZodError)
                return NextResponse.json({ error: "SelectProductCached -> Invalid Zod params -> " + error.message });
            if (error instanceof PrismaClientKnownRequestError)
                return NextResponse.json({ error: "SelectProductCached -> Prisma error -> " + error.message });
            return NextResponse.json({ error: "SelectProductCached -> " + (error as Error).message });
        }
        // TODO: add logging
        return NextResponse.json({ error: "Something went wrong..." }, { status: 500 });
    }
};
