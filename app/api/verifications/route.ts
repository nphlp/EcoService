import { VerificationType } from "@actions/types/Verification";
import { SelectVerificationListProps } from "@actions/types/Verification";
import { selectVerificationListSchema } from "@actions/zod-sensitive/Verification";
import PrismaInstance from "@lib/prisma";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { unstable_cache as cache } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";

/**
 * Retrieves a cached list of verifications
 * @param stringParams Filtering and pagination parameters in JSON format
 * @returns List of verifications or null if no verifications found
 */
const SelectVerificationListCached = cache(
    async (stringParams: string): Promise<VerificationType[] | null> => {
        // Parse the params as object
        const params: SelectVerificationListProps = JSON.parse(stringParams);

        // Validate the params with zod
        const { select, orderBy, take = 10, skip = 0, where } = selectVerificationListSchema.parse(params);

        const verificationDataList: VerificationType[] = await PrismaInstance.verification.findMany({
            ...(select && { select }),
            ...(orderBy && { orderBy }),
            ...(take && { take }),
            ...(skip && { skip }),
            ...(where && { where }),
        });

        console.log("SelectVerificationList -> Revalidating verifications list from database...");

        // Return the verification list
        return verificationDataList.length ? verificationDataList : null;
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

export type SelectVerificationListResponse =
    | {
          data: VerificationType[] | null;
      }
    | {
          error: string;
      };

/**
 * GET route handler for verifications API
 * @param request Incoming request with optional parameters
 * @returns JSON response containing verification list or error message
 */
export const GET = async (request: NextRequest): Promise<NextResponse<SelectVerificationListResponse>> => {
    try {
        // Get the params and decode them
        const encodedParams = request.nextUrl.searchParams.get("params") ?? "{}";
        const stringParams = decodeURIComponent(encodedParams);

        // Get the verification list
        const verificationList: VerificationType[] | null = await SelectVerificationListCached(stringParams);

        // Return the verification list
        return NextResponse.json({ data: verificationList }, { status: 200 });
    } catch (error) {
        console.error("SelectVerificationListCached -> " + (error as Error).message);
        if (process.env.NODE_ENV === "development") {
            if (error instanceof ZodError)
                return NextResponse.json({ error: "SelectVerificationListCached -> Invalid Zod params -> " + error.message });
            if (error instanceof PrismaClientKnownRequestError)
                return NextResponse.json({ error: "SelectVerificationListCached -> Prisma error -> " + error.message });
            return NextResponse.json({ error: "SelectVerificationListCached -> " + (error as Error).message });
        }
        // TODO: add logging
        return NextResponse.json({ error: "Something went wrong..." }, { status: 500 });
    }
};
