import { CategoryType } from "@actions/types/Category";
import { SelectCategoryProps } from "@actions/types/Category";
import { selectCategoryUniqueSchema } from "@actions/zod-sensitive/Category";
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
        const params: SelectCategoryProps = JSON.parse(stringParams);

        const { where, select } = selectCategoryUniqueSchema.parse(params);

        const categoryData: CategoryType | null = await PrismaInstance.category.findUnique({
            where,
            ...(select && { select }),
        });

        return categoryData;
    },
    ["/categorys/unique"],
    {
        /**
         * Cache revalidation
         * - development : revalidate every 5 seconds
         * - production : revalidate every 5 minutes
         */
        revalidate: process.env.NODE_ENV === "development" ? 5 : 300,
        tags: ["/categorys/unique"],
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
 * GET route handler for retrieving a single category by ID
 * @param request Incoming request with category ID parameter
 * @returns JSON response containing category data or error message
 */
export const GET = async (request: NextRequest): Promise<NextResponse<SelectCategoryResponse>> => {
    try {
        // Get the params and decode them
        const encodedParams = request.nextUrl.searchParams.get("params") ?? "{}";
        const stringParams = decodeURIComponent(encodedParams);

        // Get the category
        const categoryData: CategoryType | null = await SelectCategoryCached(stringParams);

        // Return the category
        return NextResponse.json({ data: categoryData }, { status: 200 });
    } catch (error) {
        console.error("SelectCategoryCached -> " + (error as Error).message);
        if (process.env.NODE_ENV === "development") {
            if (error instanceof ZodError)
                return NextResponse.json({ error: "SelectCategoryCached -> Invalid Zod params -> " + error.message });
            if (error instanceof PrismaClientKnownRequestError)
                return NextResponse.json({ error: "SelectCategoryCached -> Prisma error -> " + error.message });
            return NextResponse.json({ error: "SelectCategoryCached -> " + (error as Error).message });
        }
        // TODO: add logging
        return NextResponse.json({ error: "Something went wrong..." }, { status: 500 });
    }
};
