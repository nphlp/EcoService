import { SelectAddressAmountProps } from "@actions/types/Address";
import { selectAddressAmountSchema } from "@actions/zod-sensitive/Address";
import PrismaInstance from "@lib/prisma";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { unstable_cache as cache } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";

/**
 * Retrieves a cached count of addresss
 * @param stringParams Filtering parameters in JSON format
 * @returns Count of addresss or null if no addresss found
 */
const SelectAddressAmountCached = cache(
    async (stringParams: string): Promise<number | null> => {
        // Parse the params as object
        const params: SelectAddressAmountProps = JSON.parse(stringParams);

        // Validate the params with zod
        const { where } = selectAddressAmountSchema.parse(params);

        const addressAmount: number = await PrismaInstance.address.count({
            ...(where && { where }),
        });

        return addressAmount ? addressAmount : null;
    },
    ["addresss"],
    {
        /**
         * Cache revalidation
         * - development : revalidate every 5 seconds
         * - production : revalidate every 5 minutes
         */
        revalidate: process.env.NODE_ENV === "development" ? 5 : 300,
        tags: ["addresss"],
    },
);

export type SelectAddressAmountResponse =
    | {
          data: number | null;
      }
    | {
          error: string;
      };

/**
 * GET route handler for addresss count API
 * @param request Incoming request with optional parameters
 * @returns JSON response containing address count or error message
 */
export const GET = async (request: NextRequest): Promise<NextResponse<SelectAddressAmountResponse>> => {
    try {
        // Get the params and decode them
        const encodedParams = request.nextUrl.searchParams.get("params") ?? "{}";
        const stringParams = decodeURIComponent(encodedParams);

        // Get the address count
        const addressAmount: number | null = await SelectAddressAmountCached(stringParams);

        // Return the address count
        return NextResponse.json({ data: addressAmount }, { status: 200 });
    } catch (error) {
        console.error("SelectAddressAmountCached -> " + (error as Error).message);
        if (process.env.NODE_ENV === "development") {
            if (error instanceof ZodError)
                return NextResponse.json({ error: "SelectAddressAmountCached -> Invalid Zod params -> " + error.message });
            if (error instanceof PrismaClientKnownRequestError)
                return NextResponse.json({ error: "SelectAddressAmountCached -> Prisma error -> " + error.message });
            return NextResponse.json({ error: "SelectAddressAmountCached -> " + (error as Error).message });
        }
        // TODO: add logging
        return NextResponse.json({ error: "Something went wrong..." }, { status: 500 });
    }
};
