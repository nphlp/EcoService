import { VerificationType } from "@actions/types/Verification";
import { SelectVerificationProps } from "@actions/types/Verification";
import { selectVerificationUniqueSchema } from "@actions/zod-sensitive/Verification";
import PrismaInstance from "@lib/prisma";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { unstable_cache as cache } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";

/**
 * Retrieves a cached verification by ID
 * @param stringParams Parameters containing the verification ID in JSON format
 * @returns Verification or null if not found
 */
const SelectVerificationCached = cache(
    async (stringParams: string): Promise<VerificationType | null> => {
        // Parse the params as object
        const params: SelectVerificationProps = JSON.parse(stringParams);

        const { where, select } = selectVerificationUniqueSchema.parse(params);

        const verificationData: VerificationType | null = await PrismaInstance.verification.findUnique({
            where,
            ...(select && { select }),
        });

        return verificationData;
    },
    ["/verifications/unique"],
    {
        /**
         * Cache revalidation
         * - development : revalidate every 5 seconds
         * - production : revalidate every 5 minutes
         */
        revalidate: process.env.NODE_ENV === "development" ? 5 : 300,
        tags: ["/verifications/unique"],
    },
);

export type SelectVerificationResponse =
    | {
          data: VerificationType | null;
      }
    | {
          error: string;
      };

/**
 * GET route handler for retrieving a single verification by ID
 * @param request Incoming request with verification ID parameter
 * @returns JSON response containing verification data or error message
 */
export const GET = async (request: NextRequest): Promise<NextResponse<SelectVerificationResponse>> => {
    try {
        // Get the params and decode them
        const encodedParams = request.nextUrl.searchParams.get("params") ?? "{}";
        const stringParams = decodeURIComponent(encodedParams);

        // Get the verification
        const verificationData: VerificationType | null = await SelectVerificationCached(stringParams);

        // Return the verification
        return NextResponse.json({ data: verificationData }, { status: 200 });
    } catch (error) {
        console.error("SelectVerificationCached -> " + (error as Error).message);
        if (process.env.NODE_ENV === "development") {
            if (error instanceof ZodError)
                return NextResponse.json({ error: "SelectVerificationCached -> Invalid Zod params -> " + error.message });
            if (error instanceof PrismaClientKnownRequestError)
                return NextResponse.json({ error: "SelectVerificationCached -> Prisma error -> " + error.message });
            return NextResponse.json({ error: "SelectVerificationCached -> " + (error as Error).message });
        }
        // TODO: add logging
        return NextResponse.json({ error: "Something went wrong..." }, { status: 500 });
    }
};
