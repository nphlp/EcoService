import { selectCategoryAmountSchema, SelectCategoryListProps } from "@actions/types/Category";
import PrismaInstance from "@lib/prisma";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { unstable_cache as cache } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";

/**
 * Retrieves a cached count of categories
 * @param stringParams Filtering parameters in JSON format
 * @returns Count of categories or null if no categories found
 */
const SelectCategoryAmountCached = cache(
    async (stringParams: string): Promise<number | null> => {
        // Parse the params as object
        const params: SelectCategoryListProps = JSON.parse(stringParams);

        // Validate the params with zod
        const { where } = selectCategoryAmountSchema.parse(params);

        const categoryAmount = await PrismaInstance.category.count({
            ...(where && { where }),
        });

        return categoryAmount ? categoryAmount : null;
    },
    ["categories"],
    {
        /**
         * Cache revalidation
         * - development : revalidate every 5 seconds
         * - production : revalidate every 5 minutes
         */
        revalidate: process.env.NODE_ENV === "development" ? 5 : 300,
        tags: ["categories"],
    },
);

export type SelectCategoryAmountResponse =
    | {
          data: number | null;
      }
    | {
          error: string;
      };

/**
 * GET route handler for categories count API
 * @param request Incoming request with optional parameters
 * @returns JSON response containing category count or error message
 */
export const GET = async (request: NextRequest): Promise<NextResponse<SelectCategoryAmountResponse>> => {
    try {
        // Get the params and decode them
        const encodedParams = request.nextUrl.searchParams.get("params") ?? "{}";
        const stringParams = decodeURIComponent(encodedParams);

        // Get the category count
        const categoryAmount: number | null = await SelectCategoryAmountCached(stringParams);

        // Return the category count
        return NextResponse.json({ data: categoryAmount });
    } catch (error) {
        console.error("SelectCategoryAmount -> " + (error as Error).message);
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
