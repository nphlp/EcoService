import { SelectAccountAmountProps } from "@actions/types/Account";
import { selectAccountAmountSchema } from "@actions/zod-sensitive/Account";
import PrismaInstance from "@lib/prisma";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { unstable_cache as cache } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";

/**
 * Retrieves a cached count of accounts
 * @param stringParams Filtering parameters in JSON format
 * @returns Count of accounts or null if no accounts found
 */
const SelectAccountAmountCached = cache(
    async (stringParams: string): Promise<number | null> => {
        // Parse the params as object
        const params: SelectAccountAmountProps = JSON.parse(stringParams);

        // Validate the params with zod
        const { where } = selectAccountAmountSchema.parse(params);

        const accountAmount: number = await PrismaInstance.account.count({
            ...(where && { where }),
        });

        return accountAmount ? accountAmount : null;
    },
    ["accounts"],
    {
        /**
         * Cache revalidation
         * - development : revalidate every 5 seconds
         * - production : revalidate every 5 minutes
         */
        revalidate: process.env.NODE_ENV === "development" ? 5 : 300,
        tags: ["accounts"],
    },
);

export type SelectAccountAmountResponse =
    | {
          data: number | null;
      }
    | {
          error: string;
      };

/**
 * GET route handler for accounts count API
 * @param request Incoming request with optional parameters
 * @returns JSON response containing account count or error message
 */
export const GET = async (request: NextRequest): Promise<NextResponse<SelectAccountAmountResponse>> => {
    try {
        // Get the params and decode them
        const encodedParams = request.nextUrl.searchParams.get("params") ?? "{}";
        const stringParams = decodeURIComponent(encodedParams);

        // Get the account count
        const accountAmount: number | null = await SelectAccountAmountCached(stringParams);

        // Return the account count
        return NextResponse.json({ data: accountAmount }, { status: 200 });
    } catch (error) {
        console.error("SelectAccountAmountCached -> " + (error as Error).message);
        if (process.env.NODE_ENV === "development") {
            if (error instanceof ZodError)
                return NextResponse.json({ error: "SelectAccountAmountCached -> Invalid Zod params -> " + error.message });
            if (error instanceof PrismaClientKnownRequestError)
                return NextResponse.json({ error: "SelectAccountAmountCached -> Prisma error -> " + error.message });
            return NextResponse.json({ error: "SelectAccountAmountCached -> " + (error as Error).message });
        }
        // TODO: add logging
        return NextResponse.json({ error: "Something went wrong..." }, { status: 500 });
    }
};
