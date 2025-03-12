import { ProductType } from "@actions/types/Product";
import { SelectProductListProps } from "@actions/types/Product";
import { selectProductListSchema } from "@actions/zod-sensitive/Product";
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
    async (stringParams: string): Promise<ProductType[] | null> => {
        // Parse the params as object
        const params: SelectProductListProps = JSON.parse(stringParams);

        // Validate the params with zod
        const { select, orderBy, take = 10, skip = 0, where } = selectProductListSchema.parse(params);

        const productDataList: ProductType[] = await PrismaInstance.product.findMany({
            ...(select && { select }),
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

export type SelectProductListResponse =
    | {
          data: ProductType[] | null;
      }
    | {
          error: string;
      };

/**
 * GET route handler for products API
 * @param request Incoming request with optional parameters
 * @returns JSON response containing product list or error message
 */
export const GET = async (request: NextRequest): Promise<NextResponse<SelectProductListResponse>> => {
    try {
        // Get the params and decode them
        const encodedParams = request.nextUrl.searchParams.get("params") ?? "{}";
        const stringParams = decodeURIComponent(encodedParams);

        // Get the product list
        const productList: ProductType[] | null = await SelectProductListCached(stringParams);

        // Return the product list
        return NextResponse.json({ data: productList }, { status: 200 });
    } catch (error) {
        console.error("SelectProductListCached -> " + (error as Error).message);
        if (process.env.NODE_ENV === "development") {
            if (error instanceof ZodError)
                return NextResponse.json({ error: "SelectProductListCached -> Invalid Zod params -> " + error.message });
            if (error instanceof PrismaClientKnownRequestError)
                return NextResponse.json({ error: "SelectProductListCached -> Prisma error -> " + error.message });
            return NextResponse.json({ error: "SelectProductListCached -> " + (error as Error).message });
        }
        // TODO: add logging
        return NextResponse.json({ error: "Something went wrong..." }, { status: 500 });
    }
};
