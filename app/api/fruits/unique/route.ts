import { FruitType } from "@actions/types/Fruit";
import { SelectFruitProps } from "@actions/types/Fruit";
import { selectFruitUniqueSchema } from "@actions/zod-sensitive/Fruit";
import PrismaInstance from "@lib/prisma";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { unstable_cache as cache } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";

/**
 * Retrieves a cached fruit by ID
 * @param stringParams Parameters containing the fruit ID in JSON format
 * @returns Fruit or null if not found
 */
const SelectFruitCached = cache(
    async (stringParams: string): Promise<FruitType | null> => {
        // Parse the params as object
        const params: SelectFruitProps = JSON.parse(stringParams);

        const { where, select } = selectFruitUniqueSchema.parse(params);

        const fruitData: FruitType | null = await PrismaInstance.fruit.findUnique({
            where,
            ...(select && { select }),
        });

        return fruitData;
    },
    ["/fruits/unique"],
    {
        /**
         * Cache revalidation
         * - development : revalidate every 5 seconds
         * - production : revalidate every 5 minutes
         */
        revalidate: process.env.NODE_ENV === "development" ? 5 : 300,
        tags: ["/fruits/unique"],
    },
);

export type SelectFruitResponse =
    | {
          data: FruitType | null;
      }
    | {
          error: string;
      };

/**
 * GET route handler for retrieving a single fruit by ID
 * @param request Incoming request with fruit ID parameter
 * @returns JSON response containing fruit data or error message
 */
export const GET = async (request: NextRequest): Promise<NextResponse<SelectFruitResponse>> => {
    try {
        // Get the params and decode them
        const encodedParams = request.nextUrl.searchParams.get("params") ?? "{}";
        const stringParams = decodeURIComponent(encodedParams);

        // Get the fruit
        const fruitData: FruitType | null = await SelectFruitCached(stringParams);

        // Return the fruit
        return NextResponse.json({ data: fruitData }, { status: 200 });
    } catch (error) {
        console.error("SelectFruitCached -> " + (error as Error).message);
        if (process.env.NODE_ENV === "development") {
            if (error instanceof ZodError)
                return NextResponse.json({ error: "SelectFruitCached -> Invalid Zod params -> " + error.message });
            if (error instanceof PrismaClientKnownRequestError)
                return NextResponse.json({ error: "SelectFruitCached -> Prisma error -> " + error.message });
            return NextResponse.json({ error: "SelectFruitCached -> " + (error as Error).message });
        }
        // TODO: add logging
        return NextResponse.json({ error: "Something went wrong..." }, { status: 500 });
    }
};
