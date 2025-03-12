import { OrderType } from "@actions/types/Order";
import { SelectOrderProps } from "@actions/types/Order";
import { selectOrderUniqueSchema } from "@actions/zod-sensitive/Order";
import PrismaInstance from "@lib/prisma";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { unstable_cache as cache } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";

/**
 * Retrieves a cached order by ID
 * @param stringParams Parameters containing the order ID in JSON format
 * @returns Order or null if not found
 */
const SelectOrderCached = cache(
    async (stringParams: string): Promise<OrderType | null> => {
        // Parse the params as object
        const params: SelectOrderProps = JSON.parse(stringParams);

        const { where, select } = selectOrderUniqueSchema.parse(params);

        const orderData: OrderType | null = await PrismaInstance.order.findUnique({
            where,
            ...(select && { select }),
        });

        return orderData;
    },
    ["/orders/unique"],
    {
        /**
         * Cache revalidation
         * - development : revalidate every 5 seconds
         * - production : revalidate every 5 minutes
         */
        revalidate: process.env.NODE_ENV === "development" ? 5 : 300,
        tags: ["/orders/unique"],
    },
);

export type SelectOrderResponse =
    | {
          data: OrderType | null;
      }
    | {
          error: string;
      };

/**
 * GET route handler for retrieving a single order by ID
 * @param request Incoming request with order ID parameter
 * @returns JSON response containing order data or error message
 */
export const GET = async (request: NextRequest): Promise<NextResponse<SelectOrderResponse>> => {
    try {
        // Get the params and decode them
        const encodedParams = request.nextUrl.searchParams.get("params") ?? "{}";
        const stringParams = decodeURIComponent(encodedParams);

        // Get the order
        const orderData: OrderType | null = await SelectOrderCached(stringParams);

        // Return the order
        return NextResponse.json({ data: orderData }, { status: 200 });
    } catch (error) {
        console.error("SelectOrderCached -> " + (error as Error).message);
        if (process.env.NODE_ENV === "development") {
            if (error instanceof ZodError)
                return NextResponse.json({ error: "SelectOrderCached -> Invalid Zod params -> " + error.message });
            if (error instanceof PrismaClientKnownRequestError)
                return NextResponse.json({ error: "SelectOrderCached -> Prisma error -> " + error.message });
            return NextResponse.json({ error: "SelectOrderCached -> " + (error as Error).message });
        }
        // TODO: add logging
        return NextResponse.json({ error: "Something went wrong..." }, { status: 500 });
    }
};
