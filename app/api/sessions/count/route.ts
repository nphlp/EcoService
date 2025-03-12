import { SelectSessionAmountProps } from "@actions/types/Session";
import { selectSessionAmountSchema } from "@actions/zod-sensitive/Session";
import PrismaInstance from "@lib/prisma";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { unstable_cache as cache } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";

/**
 * Retrieves a cached count of sessions
 * @param stringParams Filtering parameters in JSON format
 * @returns Count of sessions or null if no sessions found
 */
const SelectSessionAmountCached = cache(
    async (stringParams: string): Promise<number | null> => {
        // Parse the params as object
        const params: SelectSessionAmountProps = JSON.parse(stringParams);

        // Validate the params with zod
        const { where } = selectSessionAmountSchema.parse(params);

        const sessionAmount: number = await PrismaInstance.session.count({
            ...(where && { where }),
        });

        return sessionAmount ? sessionAmount : null;
    },
    ["sessions"],
    {
        /**
         * Cache revalidation
         * - development : revalidate every 5 seconds
         * - production : revalidate every 5 minutes
         */
        revalidate: process.env.NODE_ENV === "development" ? 5 : 300,
        tags: ["sessions"],
    },
);

export type SelectSessionAmountResponse =
    | {
          data: number | null;
      }
    | {
          error: string;
      };

/**
 * GET route handler for sessions count API
 * @param request Incoming request with optional parameters
 * @returns JSON response containing session count or error message
 */
export const GET = async (request: NextRequest): Promise<NextResponse<SelectSessionAmountResponse>> => {
    try {
        // Get the params and decode them
        const encodedParams = request.nextUrl.searchParams.get("params") ?? "{}";
        const stringParams = decodeURIComponent(encodedParams);

        // Get the session count
        const sessionAmount: number | null = await SelectSessionAmountCached(stringParams);

        // Return the session count
        return NextResponse.json({ data: sessionAmount }, { status: 200 });
    } catch (error) {
        console.error("SelectSessionAmountCached -> " + (error as Error).message);
        if (process.env.NODE_ENV === "development") {
            if (error instanceof ZodError)
                return NextResponse.json({ error: "SelectSessionAmountCached -> Invalid Zod params -> " + error.message });
            if (error instanceof PrismaClientKnownRequestError)
                return NextResponse.json({ error: "SelectSessionAmountCached -> Prisma error -> " + error.message });
            return NextResponse.json({ error: "SelectSessionAmountCached -> " + (error as Error).message });
        }
        // TODO: add logging
        return NextResponse.json({ error: "Something went wrong..." }, { status: 500 });
    }
};
