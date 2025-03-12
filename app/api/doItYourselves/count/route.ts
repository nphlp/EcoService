import { SelectDoItYourselfAmountProps } from "@actions/types/DoItYourself";
import { selectDoItYourselfAmountSchema } from "@actions/zod-sensitive/DoItYourself";
import PrismaInstance from "@lib/prisma";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { unstable_cache as cache } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";

/**
 * Retrieves a cached count of doItYourselfs
 * @param stringParams Filtering parameters in JSON format
 * @returns Count of doItYourselfs or null if no doItYourselfs found
 */
const SelectDoItYourselfAmountCached = cache(
    async (stringParams: string): Promise<number | null> => {
        // Parse the params as object
        const params: SelectDoItYourselfAmountProps = JSON.parse(stringParams);

        // Validate the params with zod
        const { where } = selectDoItYourselfAmountSchema.parse(params);

        const doItYourselfAmount: number = await PrismaInstance.doItYourself.count({
            ...(where && { where }),
        });

        return doItYourselfAmount ? doItYourselfAmount : null;
    },
    ["doItYourselfs"],
    {
        /**
         * Cache revalidation
         * - development : revalidate every 5 seconds
         * - production : revalidate every 5 minutes
         */
        revalidate: process.env.NODE_ENV === "development" ? 5 : 300,
        tags: ["doItYourselfs"],
    },
);

export type SelectDoItYourselfAmountResponse =
    | {
          data: number | null;
      }
    | {
          error: string;
      };

/**
 * GET route handler for doItYourselfs count API
 * @param request Incoming request with optional parameters
 * @returns JSON response containing doItYourself count or error message
 */
export const GET = async (request: NextRequest): Promise<NextResponse<SelectDoItYourselfAmountResponse>> => {
    try {
        // Get the params and decode them
        const encodedParams = request.nextUrl.searchParams.get("params") ?? "{}";
        const stringParams = decodeURIComponent(encodedParams);

        // Get the doItYourself count
        const doItYourselfAmount: number | null = await SelectDoItYourselfAmountCached(stringParams);

        // Return the doItYourself count
        return NextResponse.json({ data: doItYourselfAmount }, { status: 200 });
    } catch (error) {
        console.error("SelectDoItYourselfAmountCached -> " + (error as Error).message);
        if (process.env.NODE_ENV === "development") {
            if (error instanceof ZodError)
                return NextResponse.json({ error: "SelectDoItYourselfAmountCached -> Invalid Zod params -> " + error.message });
            if (error instanceof PrismaClientKnownRequestError)
                return NextResponse.json({ error: "SelectDoItYourselfAmountCached -> Prisma error -> " + error.message });
            return NextResponse.json({ error: "SelectDoItYourselfAmountCached -> " + (error as Error).message });
        }
        // TODO: add logging
        return NextResponse.json({ error: "Something went wrong..." }, { status: 500 });
    }
};
