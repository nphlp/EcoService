import { ProductType, SelectProductListProps, selectProductListSchema } from "@actions/types/Product";
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
const SelectProductListCached = cache(
    async (stringParams: string) => {
        // Parse the params as object
        const params: SelectProductListProps = JSON.parse(stringParams);

        // Validate the params with zod
        const { orderBy, take = 10, skip = 0, where } = selectProductListSchema.parse(params);

        const productDataList: ProductType[] = await PrismaInstance.product.findMany({
            ...(orderBy && { orderBy }),
            ...(take && { take }),
            ...(skip && { skip }),
            ...(where && { where }),
        });

        console.log("SelectProductList -> Revalidating products list from database...");

        // Return the product list
        return productDataList.length ? productDataList : null;
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

/**
 * GET route handler for products API
 * @param request Incoming request with optional parameters
 * @returns JSON response containing product list or error message
 */
export async function GET(request: NextRequest) {
    try {
        // Get the params and decode them
        const encodedParams = request.nextUrl.searchParams.get("params") ?? "{}";
        const stringParams = decodeURIComponent(encodedParams);

        // Get the product list
        const productList = await SelectProductListCached(stringParams);

        // Return the product list
        return NextResponse.json(productList);
    } catch (error) {
        console.error("SelectProductList -> " + (error as Error).message);
        if (process.env.NODE_ENV === "development") {
            if (error instanceof ZodError) {
                return NextResponse.json({ error: "Invalid params -> " + error.message }, { status: 400 });
            }
            if (error instanceof PrismaClientKnownRequestError) {
                return NextResponse.json({ error: "Prisma error -> " + error.message }, { status: 500 });
            }
            return NextResponse.json({ error: "Something went wrong..." + (error as Error).message }, { status: 500 });
        } else {
            // TODO: add logging
            return NextResponse.json({ error: "Something went wrong..." }, { status: 500 });
        }
    }
}
