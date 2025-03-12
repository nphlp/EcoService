import { FruitType } from "@actions/types/Fruit";
import { SelectFruitListProps } from "@actions/types/Fruit";
import { selectFruitListSchema } from "@actions/zod-sensitive/Fruit";
import PrismaInstance from "@lib/prisma";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { unstable_cache as cache } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";

/**
 * Retrieves a cached list of fruits
 * @param stringParams Filtering and pagination parameters in JSON format
 * @returns List of fruits or null if no fruits found
 */
const SelectFruitListCached = cache(
    async (stringParams: string): Promise<FruitType[] | null> => {
        // Parse the params as object
        const params: SelectFruitListProps = JSON.parse(stringParams);

        // Validate the params with zod
        const { select, orderBy, take = 10, skip = 0, where } = selectFruitListSchema.parse(params);

        const fruitDataList: FruitType[] = await PrismaInstance.fruit.findMany({
            ...(select && { select }),
            ...(orderBy && { orderBy }),
            ...(take && { take }),
            ...(skip && { skip }),
            ...(where && { where }),
        });

        console.log("SelectFruitList -> Revalidating fruits list from database...");

        // Return the fruit list
        return fruitDataList.length ? fruitDataList : null;
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

export type SelectFruitListResponse =
    | {
          data: FruitType[] | null;
      }
    | {
          error: string;
      };

/**
 * GET route handler for fruits API
 * @param request Incoming request with optional parameters
 * @returns JSON response containing fruit list or error message
 */
export const GET = async (request: NextRequest): Promise<NextResponse<SelectFruitListResponse>> => {
    try {
        // Get the params and decode them
        const encodedParams = request.nextUrl.searchParams.get("params") ?? "{}";
        const stringParams = decodeURIComponent(encodedParams);

        // Get the fruit list
        const fruitList: FruitType[] | null = await SelectFruitListCached(stringParams);

        // Return the fruit list
        return NextResponse.json({ data: fruitList }, { status: 200 });
    } catch (error) {
        console.error("SelectFruitListCached -> " + (error as Error).message);
        if (process.env.NODE_ENV === "development") {
            if (error instanceof ZodError)
                return NextResponse.json({ error: "SelectFruitListCached -> Invalid Zod params -> " + error.message });
            if (error instanceof PrismaClientKnownRequestError)
                return NextResponse.json({ error: "SelectFruitListCached -> Prisma error -> " + error.message });
            return NextResponse.json({ error: "SelectFruitListCached -> " + (error as Error).message });
        }
        // TODO: add logging
        return NextResponse.json({ error: "Something went wrong..." }, { status: 500 });
    }
};
