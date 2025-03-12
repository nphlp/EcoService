import { SelectCategoryAmountProps } from "@actions/types/Category";
import { selectCategoryAmountSchema } from "@actions/zod-sensitive/Category";
import PrismaInstance from "@lib/prisma";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { unstable_cache as cache } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";

/**
 * Retrieves a cached count of categorys
 * @param stringParams Filtering parameters in JSON format
 * @returns Count of categorys or null if no categorys found
 */
const SelectCategoryAmountCached = cache(
    async (stringParams: string): Promise<number | null> => {
        // Parse the params as object
        const params: SelectCategoryAmountProps = JSON.parse(stringParams);

        // Validate the params with zod
        const { where } = selectCategoryAmountSchema.parse(params);

        const categoryAmount: number = await PrismaInstance.category.count({
            ...(where && { where }),
        });

        return categoryAmount ? categoryAmount : null;
    },
    ["categorys"],
    {
        /**
         * Cache revalidation
         * - development : revalidate every 5 seconds
         * - production : revalidate every 5 minutes
         */
        revalidate: process.env.NODE_ENV === "development" ? 5 : 300,
        tags: ["categorys"],
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
 * GET route handler for categorys count API
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
        return NextResponse.json({ data: categoryAmount }, { status: 200 });
    } catch (error) {
        console.error("SelectCategoryAmountCached -> " + (error as Error).message);
        if (process.env.NODE_ENV === "development") {
            if (error instanceof ZodError)
                return NextResponse.json({ error: "SelectCategoryAmountCached -> Invalid Zod params -> " + error.message });
            if (error instanceof PrismaClientKnownRequestError)
                return NextResponse.json({ error: "SelectCategoryAmountCached -> Prisma error -> " + error.message });
            return NextResponse.json({ error: "SelectCategoryAmountCached -> " + (error as Error).message });
        }
        // TODO: add logging
        return NextResponse.json({ error: "Something went wrong..." }, { status: 500 });
    }
};
