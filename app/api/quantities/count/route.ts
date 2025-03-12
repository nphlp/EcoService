import { SelectQuantityAmountProps } from "@actions/types/Quantity";
import { selectQuantityAmountSchema } from "@actions/zod-sensitive/Quantity";
import PrismaInstance from "@lib/prisma";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { unstable_cache as cache } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";

/**
 * Retrieves a cached count of quantitys
 * @param stringParams Filtering parameters in JSON format
 * @returns Count of quantitys or null if no quantitys found
 */
const SelectQuantityAmountCached = cache(
    async (stringParams: string): Promise<number | null> => {
        // Parse the params as object
        const params: SelectQuantityAmountProps = JSON.parse(stringParams);

        // Validate the params with zod
        const { where } = selectQuantityAmountSchema.parse(params);

        const quantityAmount: number = await PrismaInstance.quantity.count({
            ...(where && { where }),
        });

        return quantityAmount ? quantityAmount : null;
    },
    ["quantitys"],
    {
        /**
         * Cache revalidation
         * - development : revalidate every 5 seconds
         * - production : revalidate every 5 minutes
         */
        revalidate: process.env.NODE_ENV === "development" ? 5 : 300,
        tags: ["quantitys"],
    },
);

export type SelectQuantityAmountResponse =
    | {
          data: number | null;
      }
    | {
          error: string;
      };

/**
 * GET route handler for quantitys count API
 * @param request Incoming request with optional parameters
 * @returns JSON response containing quantity count or error message
 */
export const GET = async (request: NextRequest): Promise<NextResponse<SelectQuantityAmountResponse>> => {
    try {
        // Get the params and decode them
        const encodedParams = request.nextUrl.searchParams.get("params") ?? "{}";
        const stringParams = decodeURIComponent(encodedParams);

        // Get the quantity count
        const quantityAmount: number | null = await SelectQuantityAmountCached(stringParams);

        // Return the quantity count
        return NextResponse.json({ data: quantityAmount }, { status: 200 });
    } catch (error) {
        console.error("SelectQuantityAmountCached -> " + (error as Error).message);
        if (process.env.NODE_ENV === "development") {
            if (error instanceof ZodError)
                return NextResponse.json({ error: "SelectQuantityAmountCached -> Invalid Zod params -> " + error.message });
            if (error instanceof PrismaClientKnownRequestError)
                return NextResponse.json({ error: "SelectQuantityAmountCached -> Prisma error -> " + error.message });
            return NextResponse.json({ error: "SelectQuantityAmountCached -> " + (error as Error).message });
        }
        // TODO: add logging
        return NextResponse.json({ error: "Something went wrong..." }, { status: 500 });
    }
};
