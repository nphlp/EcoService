import { categoryIdObjectSchema, CategoryType, SelectCategoryListProps } from "@actions/types/Category";
import PrismaInstance from "@lib/prisma";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { unstable_cache as cache } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";

/**
 * Retrieves a cached category by ID
 * @param stringParams Parameters containing the category ID in JSON format
 * @returns Category or null if not found
 */
const SelectCategoryCached = cache(
    async (stringParams: string): Promise<CategoryType | null> => {
        // Parse the params as object
        const params: SelectCategoryListProps = JSON.parse(stringParams);

        const { id } = categoryIdObjectSchema.parse(params);

        const categoryData: CategoryType | null = await PrismaInstance.category.findUnique({
            where: { id },
        });

        return categoryData;
    },
    ["/categories/{id}"],
    {
        /**
         * Cache revalidation
         * - development : revalidate every 5 seconds
         * - production : revalidate every 5 minutes
         */
        revalidate: process.env.NODE_ENV === "development" ? 5 : 300,
        tags: ["/categories/{id}"],
    },
);

export type SelectCategoryResponse =
    | {
          data: CategoryType | null;
      }
    | {
          error: string;
      };

/**
 * GET route handler for single category API
 * @param request Incoming request with category ID
 * @returns JSON response containing category or error message
 */
export const GET = async (request: NextRequest): Promise<NextResponse<SelectCategoryResponse>> => {
    try {
        // Get the params and decode them
        const encodedParams = request.nextUrl.searchParams.get("params") ?? "{}";
        const stringParams = decodeURIComponent(encodedParams);

        // Get the category
        const category: CategoryType | null = await SelectCategoryCached(stringParams);

        // Return the category
        return NextResponse.json({ data: category });
    } catch (error) {
        console.error("SelectCategory -> " + (error as Error).message);
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
