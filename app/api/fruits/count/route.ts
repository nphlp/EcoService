import { SelectFruitAmountProps } from "@actions/types/Fruit";
import { selectFruitAmountSchema } from "@actions/zod-sensitive/Fruit";
import PrismaInstance from "@lib/prisma";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { unstable_cache as cache } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";

/**
 * Retrieves a cached count of fruits
 * @param stringParams Filtering parameters in JSON format
 * @returns Count of fruits or null if no fruits found
 */
const SelectFruitAmountCached = cache(
    async (stringParams: string): Promise<number | null> => {
        // Parse the params as object
        const params: SelectFruitAmountProps = JSON.parse(stringParams);

        // Validate the params with zod
        const { where } = selectFruitAmountSchema.parse(params);

        const fruitAmount: number = await PrismaInstance.fruit.count({
            ...(where && { where }),
        });

        return fruitAmount ? fruitAmount : null;
    },
    ["fruits"],
    {
        /**
         * Cache revalidation
         * - development : revalidate every 5 seconds
         * - production : revalidate every 5 minutes
         */
        revalidate: process.env.NODE_ENV === "development" ? 5 : 300,
        tags: ["fruits"],
    },
);

export type SelectFruitAmountResponse =
    | {
          data: number | null;
      }
    | {
          error: string;
      };

/**
 * GET route handler for fruits count API
 * @param request Incoming request with optional parameters
 * @returns JSON response containing fruit count or error message
 */
export const GET = async (request: NextRequest): Promise<NextResponse<SelectFruitAmountResponse>> => {
    try {
        // Get the params and decode them
        const encodedParams = request.nextUrl.searchParams.get("params") ?? "{}";
        const stringParams = decodeURIComponent(encodedParams);

        // Get the fruit count
        const fruitAmount: number | null = await SelectFruitAmountCached(stringParams);

        // Return the fruit count
        return NextResponse.json({ data: fruitAmount }, { status: 200 });
    } catch (error) {
        console.error("SelectFruitAmountCached -> " + (error as Error).message);
        if (process.env.NODE_ENV === "development") {
            if (error instanceof ZodError)
                return NextResponse.json({ error: "SelectFruitAmountCached -> Invalid Zod params -> " + error.message });
            if (error instanceof PrismaClientKnownRequestError)
                return NextResponse.json({ error: "SelectFruitAmountCached -> Prisma error -> " + error.message });
            return NextResponse.json({ error: "SelectFruitAmountCached -> " + (error as Error).message });
        }
        // TODO: add logging
        return NextResponse.json({ error: "Something went wrong..." }, { status: 500 });
    }
};
