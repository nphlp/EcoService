import { SelectContentAmountProps } from "@actions/types/Content";
import { selectContentAmountSchema } from "@actions/zod-sensitive/Content";
import PrismaInstance from "@lib/prisma";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { unstable_cache as cache } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";

/**
 * Retrieves a cached count of contents
 * @param stringParams Filtering parameters in JSON format
 * @returns Count of contents or null if no contents found
 */
const SelectContentAmountCached = cache(
    async (stringParams: string): Promise<number | null> => {
        // Parse the params as object
        const params: SelectContentAmountProps = JSON.parse(stringParams);

        // Validate the params with zod
        const { where } = selectContentAmountSchema.parse(params);

        const contentAmount: number = await PrismaInstance.content.count({
            ...(where && { where }),
        });

        return contentAmount ? contentAmount : null;
    },
    ["contents"],
    {
        /**
         * Cache revalidation
         * - development : revalidate every 5 seconds
         * - production : revalidate every 5 minutes
         */
        revalidate: process.env.NODE_ENV === "development" ? 5 : 300,
        tags: ["contents"],
    },
);

export type SelectContentAmountResponse =
    | {
          data: number | null;
      }
    | {
          error: string;
      };

/**
 * GET route handler for contents count API
 * @param request Incoming request with optional parameters
 * @returns JSON response containing content count or error message
 */
export const GET = async (request: NextRequest): Promise<NextResponse<SelectContentAmountResponse>> => {
    try {
        // Get the params and decode them
        const encodedParams = request.nextUrl.searchParams.get("params") ?? "{}";
        const stringParams = decodeURIComponent(encodedParams);

        // Get the content count
        const contentAmount: number | null = await SelectContentAmountCached(stringParams);

        // Return the content count
        return NextResponse.json({ data: contentAmount }, { status: 200 });
    } catch (error) {
        console.error("SelectContentAmountCached -> " + (error as Error).message);
        if (process.env.NODE_ENV === "development") {
            if (error instanceof ZodError)
                return NextResponse.json({ error: "SelectContentAmountCached -> Invalid Zod params -> " + error.message });
            if (error instanceof PrismaClientKnownRequestError)
                return NextResponse.json({ error: "SelectContentAmountCached -> Prisma error -> " + error.message });
            return NextResponse.json({ error: "SelectContentAmountCached -> " + (error as Error).message });
        }
        // TODO: add logging
        return NextResponse.json({ error: "Something went wrong..." }, { status: 500 });
    }
};
