import { SelectOrderAmountProps } from "@actions/types/Order";
import { selectOrderAmountSchema } from "@actions/zod-sensitive/Order";
import PrismaInstance from "@lib/prisma";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { unstable_cache as cache } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";

/**
 * Retrieves a cached count of orders
 * @param stringParams Filtering parameters in JSON format
 * @returns Count of orders or null if no orders found
 */
const SelectOrderAmountCached = cache(
    async (stringParams: string): Promise<number | null> => {
        // Parse the params as object
        const params: SelectOrderAmountProps = JSON.parse(stringParams);

        // Validate the params with zod
        const { where } = selectOrderAmountSchema.parse(params);

        const orderAmount: number = await PrismaInstance.order.count({
            ...(where && { where }),
        });

        return orderAmount ? orderAmount : null;
    },
    ["orders"],
    {
        /**
         * Cache revalidation
         * - development : revalidate every 5 seconds
         * - production : revalidate every 5 minutes
         */
        revalidate: process.env.NODE_ENV === "development" ? 5 : 300,
        tags: ["orders"],
    },
);

export type SelectOrderAmountResponse =
    | {
          data: number | null;
      }
    | {
          error: string;
      };

/**
 * GET route handler for orders count API
 * @param request Incoming request with optional parameters
 * @returns JSON response containing order count or error message
 */
export const GET = async (request: NextRequest): Promise<NextResponse<SelectOrderAmountResponse>> => {
    try {
        // Get the params and decode them
        const encodedParams = request.nextUrl.searchParams.get("params") ?? "{}";
        const stringParams = decodeURIComponent(encodedParams);

        // Get the order count
        const orderAmount: number | null = await SelectOrderAmountCached(stringParams);

        // Return the order count
        return NextResponse.json({ data: orderAmount }, { status: 200 });
    } catch (error) {
        console.error("SelectOrderAmountCached -> " + (error as Error).message);
        if (process.env.NODE_ENV === "development") {
            if (error instanceof ZodError)
                return NextResponse.json({ error: "SelectOrderAmountCached -> Invalid Zod params -> " + error.message });
            if (error instanceof PrismaClientKnownRequestError)
                return NextResponse.json({ error: "SelectOrderAmountCached -> Prisma error -> " + error.message });
            return NextResponse.json({ error: "SelectOrderAmountCached -> " + (error as Error).message });
        }
        // TODO: add logging
        return NextResponse.json({ error: "Something went wrong..." }, { status: 500 });
    }
};
