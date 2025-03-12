import { CategoryType } from "@actions/types/Category";
import { SelectCategoryListProps } from "@actions/types/Category";
import { selectCategoryListSchema } from "@actions/zod-sensitive/Category";
import PrismaInstance from "@lib/prisma";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { unstable_cache as cache } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";

/**
 * Retrieves a cached list of categorys
 * @param stringParams Filtering and pagination parameters in JSON format
 * @returns List of categorys or null if no categorys found
 */
const SelectCategoryListCached = cache(
    async (stringParams: string): Promise<CategoryType[] | null> => {
        // Parse the params as object
        const params: SelectCategoryListProps = JSON.parse(stringParams);

        // Validate the params with zod
        const { select, orderBy, take = 10, skip = 0, where } = selectCategoryListSchema.parse(params);

        const categoryDataList: CategoryType[] = await PrismaInstance.category.findMany({
            ...(select && { select }),
            ...(orderBy && { orderBy }),
            ...(take && { take }),
            ...(skip && { skip }),
            ...(where && { where }),
        });

        console.log("SelectCategoryList -> Revalidating categorys list from database...");

        // Return the category list
        return categoryDataList.length ? categoryDataList : null;
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

export type SelectCategoryListResponse =
    | {
          data: CategoryType[] | null;
      }
    | {
          error: string;
      };

/**
 * GET route handler for categorys API
 * @param request Incoming request with optional parameters
 * @returns JSON response containing category list or error message
 */
export const GET = async (request: NextRequest): Promise<NextResponse<SelectCategoryListResponse>> => {
    try {
        // Get the params and decode them
        const encodedParams = request.nextUrl.searchParams.get("params") ?? "{}";
        const stringParams = decodeURIComponent(encodedParams);

        // Get the category list
        const categoryList: CategoryType[] | null = await SelectCategoryListCached(stringParams);

        // Return the category list
        return NextResponse.json({ data: categoryList }, { status: 200 });
    } catch (error) {
        console.error("SelectCategoryListCached -> " + (error as Error).message);
        if (process.env.NODE_ENV === "development") {
            if (error instanceof ZodError)
                return NextResponse.json({ error: "SelectCategoryListCached -> Invalid Zod params -> " + error.message });
            if (error instanceof PrismaClientKnownRequestError)
                return NextResponse.json({ error: "SelectCategoryListCached -> Prisma error -> " + error.message });
            return NextResponse.json({ error: "SelectCategoryListCached -> " + (error as Error).message });
        }
        // TODO: add logging
        return NextResponse.json({ error: "Something went wrong..." }, { status: 500 });
    }
};
