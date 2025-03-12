import { QuantityType } from "@actions/types/Quantity";
import { SelectQuantityProps } from "@actions/types/Quantity";
import { selectQuantityUniqueSchema } from "@actions/zod-sensitive/Quantity";
import PrismaInstance from "@lib/prisma";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { unstable_cache as cache } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";

/**
 * Retrieves a cached quantity by ID
 * @param stringParams Parameters containing the quantity ID in JSON format
 * @returns Quantity or null if not found
 */
const SelectQuantityCached = cache(
    async (stringParams: string): Promise<QuantityType | null> => {
        // Parse the params as object
        const params: SelectQuantityProps = JSON.parse(stringParams);

        const { where, select } = selectQuantityUniqueSchema.parse(params);

        const quantityData: QuantityType | null = await PrismaInstance.quantity.findUnique({
            where,
            ...(select && { select }),
        });

        return quantityData;
    },
    ["/quantitys/unique"],
    {
        /**
         * Cache revalidation
         * - development : revalidate every 5 seconds
         * - production : revalidate every 5 minutes
         */
        revalidate: process.env.NODE_ENV === "development" ? 5 : 300,
        tags: ["/quantitys/unique"],
    },
);

export type SelectQuantityResponse =
    | {
          data: QuantityType | null;
      }
    | {
          error: string;
      };

/**
 * GET route handler for retrieving a single quantity by ID
 * @param request Incoming request with quantity ID parameter
 * @returns JSON response containing quantity data or error message
 */
export const GET = async (request: NextRequest): Promise<NextResponse<SelectQuantityResponse>> => {
    try {
        // Get the params and decode them
        const encodedParams = request.nextUrl.searchParams.get("params") ?? "{}";
        const stringParams = decodeURIComponent(encodedParams);

        // Get the quantity
        const quantityData: QuantityType | null = await SelectQuantityCached(stringParams);

        // Return the quantity
        return NextResponse.json({ data: quantityData }, { status: 200 });
    } catch (error) {
        console.error("SelectQuantityCached -> " + (error as Error).message);
        if (process.env.NODE_ENV === "development") {
            if (error instanceof ZodError)
                return NextResponse.json({ error: "SelectQuantityCached -> Invalid Zod params -> " + error.message });
            if (error instanceof PrismaClientKnownRequestError)
                return NextResponse.json({ error: "SelectQuantityCached -> Prisma error -> " + error.message });
            return NextResponse.json({ error: "SelectQuantityCached -> " + (error as Error).message });
        }
        // TODO: add logging
        return NextResponse.json({ error: "Something went wrong..." }, { status: 500 });
    }
};
