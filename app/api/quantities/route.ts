import { QuantityType } from "@actions/types/Quantity";
import { SelectQuantityListProps } from "@actions/types/Quantity";
import { selectQuantityListSchema } from "@actions/zod-sensitive/Quantity";
import PrismaInstance from "@lib/prisma";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { unstable_cache as cache } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";

/**
 * Retrieves a cached list of quantitys
 * @param stringParams Filtering and pagination parameters in JSON format
 * @returns List of quantitys or null if no quantitys found
 */
const SelectQuantityListCached = cache(
    async (stringParams: string): Promise<QuantityType[] | null> => {
        // Parse the params as object
        const params: SelectQuantityListProps = JSON.parse(stringParams);

        // Validate the params with zod
        const { select, orderBy, take = 10, skip = 0, where } = selectQuantityListSchema.parse(params);

        const quantityDataList: QuantityType[] = await PrismaInstance.quantity.findMany({
            ...(select && { select }),
            ...(orderBy && { orderBy }),
            ...(take && { take }),
            ...(skip && { skip }),
            ...(where && { where }),
        });

        console.log("SelectQuantityList -> Revalidating quantitys list from database...");

        // Return the quantity list
        return quantityDataList.length ? quantityDataList : null;
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

export type SelectQuantityListResponse =
    | {
          data: QuantityType[] | null;
      }
    | {
          error: string;
      };

/**
 * GET route handler for quantitys API
 * @param request Incoming request with optional parameters
 * @returns JSON response containing quantity list or error message
 */
export const GET = async (request: NextRequest): Promise<NextResponse<SelectQuantityListResponse>> => {
    try {
        // Get the params and decode them
        const encodedParams = request.nextUrl.searchParams.get("params") ?? "{}";
        const stringParams = decodeURIComponent(encodedParams);

        // Get the quantity list
        const quantityList: QuantityType[] | null = await SelectQuantityListCached(stringParams);

        // Return the quantity list
        return NextResponse.json({ data: quantityList }, { status: 200 });
    } catch (error) {
        console.error("SelectQuantityListCached -> " + (error as Error).message);
        if (process.env.NODE_ENV === "development") {
            if (error instanceof ZodError)
                return NextResponse.json({ error: "SelectQuantityListCached -> Invalid Zod params -> " + error.message });
            if (error instanceof PrismaClientKnownRequestError)
                return NextResponse.json({ error: "SelectQuantityListCached -> Prisma error -> " + error.message });
            return NextResponse.json({ error: "SelectQuantityListCached -> " + (error as Error).message });
        }
        // TODO: add logging
        return NextResponse.json({ error: "Something went wrong..." }, { status: 500 });
    }
};
