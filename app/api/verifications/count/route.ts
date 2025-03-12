import { SelectVerificationAmountProps } from "@actions/types/Verification";
import { selectVerificationAmountSchema } from "@actions/zod-sensitive/Verification";
import PrismaInstance from "@lib/prisma";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { unstable_cache as cache } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";

/**
 * Retrieves a cached count of verifications
 * @param stringParams Filtering parameters in JSON format
 * @returns Count of verifications or null if no verifications found
 */
const SelectVerificationAmountCached = cache(
    async (stringParams: string): Promise<number | null> => {
        // Parse the params as object
        const params: SelectVerificationAmountProps = JSON.parse(stringParams);

        // Validate the params with zod
        const { where } = selectVerificationAmountSchema.parse(params);

        const verificationAmount: number = await PrismaInstance.verification.count({
            ...(where && { where }),
        });

        return verificationAmount ? verificationAmount : null;
    },
    ["verifications"],
    {
        /**
         * Cache revalidation
         * - development : revalidate every 5 seconds
         * - production : revalidate every 5 minutes
         */
        revalidate: process.env.NODE_ENV === "development" ? 5 : 300,
        tags: ["verifications"],
    },
);

export type SelectVerificationAmountResponse =
    | {
          data: number | null;
      }
    | {
          error: string;
      };

/**
 * GET route handler for verifications count API
 * @param request Incoming request with optional parameters
 * @returns JSON response containing verification count or error message
 */
export const GET = async (request: NextRequest): Promise<NextResponse<SelectVerificationAmountResponse>> => {
    try {
        // Get the params and decode them
        const encodedParams = request.nextUrl.searchParams.get("params") ?? "{}";
        const stringParams = decodeURIComponent(encodedParams);

        // Get the verification count
        const verificationAmount: number | null = await SelectVerificationAmountCached(stringParams);

        // Return the verification count
        return NextResponse.json({ data: verificationAmount }, { status: 200 });
    } catch (error) {
        console.error("SelectVerificationAmountCached -> " + (error as Error).message);
        if (process.env.NODE_ENV === "development") {
            if (error instanceof ZodError)
                return NextResponse.json({ error: "SelectVerificationAmountCached -> Invalid Zod params -> " + error.message });
            if (error instanceof PrismaClientKnownRequestError)
                return NextResponse.json({ error: "SelectVerificationAmountCached -> Prisma error -> " + error.message });
            return NextResponse.json({ error: "SelectVerificationAmountCached -> " + (error as Error).message });
        }
        // TODO: add logging
        return NextResponse.json({ error: "Something went wrong..." }, { status: 500 });
    }
};
