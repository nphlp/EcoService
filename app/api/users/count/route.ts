import { SelectUserAmountProps } from "@actions/types/User";
import { selectUserAmountSchema } from "@actions/zod-sensitive/User";
import PrismaInstance from "@lib/prisma";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { unstable_cache as cache } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";

/**
 * Retrieves a cached count of users
 * @param stringParams Filtering parameters in JSON format
 * @returns Count of users or null if no users found
 */
const SelectUserAmountCached = cache(
    async (stringParams: string): Promise<number | null> => {
        // Parse the params as object
        const params: SelectUserAmountProps = JSON.parse(stringParams);

        // Validate the params with zod
        const { where } = selectUserAmountSchema.parse(params);

        const userAmount: number = await PrismaInstance.user.count({
            ...(where && { where }),
        });

        return userAmount ? userAmount : null;
    },
    ["users"],
    {
        /**
         * Cache revalidation
         * - development : revalidate every 5 seconds
         * - production : revalidate every 5 minutes
         */
        revalidate: process.env.NODE_ENV === "development" ? 5 : 300,
        tags: ["users"],
    },
);

export type SelectUserAmountResponse =
    | {
          data: number | null;
      }
    | {
          error: string;
      };

/**
 * GET route handler for users count API
 * @param request Incoming request with optional parameters
 * @returns JSON response containing user count or error message
 */
export const GET = async (request: NextRequest): Promise<NextResponse<SelectUserAmountResponse>> => {
    try {
        // Get the params and decode them
        const encodedParams = request.nextUrl.searchParams.get("params") ?? "{}";
        const stringParams = decodeURIComponent(encodedParams);

        // Get the user count
        const userAmount: number | null = await SelectUserAmountCached(stringParams);

        // Return the user count
        return NextResponse.json({ data: userAmount }, { status: 200 });
    } catch (error) {
        console.error("SelectUserAmountCached -> " + (error as Error).message);
        if (process.env.NODE_ENV === "development") {
            if (error instanceof ZodError)
                return NextResponse.json({ error: "SelectUserAmountCached -> Invalid Zod params -> " + error.message });
            if (error instanceof PrismaClientKnownRequestError)
                return NextResponse.json({ error: "SelectUserAmountCached -> Prisma error -> " + error.message });
            return NextResponse.json({ error: "SelectUserAmountCached -> " + (error as Error).message });
        }
        // TODO: add logging
        return NextResponse.json({ error: "Something went wrong..." }, { status: 500 });
    }
};
