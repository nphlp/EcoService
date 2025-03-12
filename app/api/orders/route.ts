import { OrderType } from "@actions/types/Order";
import { SelectOrderListProps } from "@actions/types/Order";
import { selectOrderListSchema } from "@actions/zod-sensitive/Order";
import PrismaInstance from "@lib/prisma";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { unstable_cache as cache } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";

/**
 * Retrieves a cached list of orders
 * @param stringParams Filtering and pagination parameters in JSON format
 * @returns List of orders or null if no orders found
 */
const SelectOrderListCached = cache(
    async (stringParams: string): Promise<OrderType[] | null> => {
        // Parse the params as object
        const params: SelectOrderListProps = JSON.parse(stringParams);

        // Validate the params with zod
        const { select, orderBy, take = 10, skip = 0, where } = selectOrderListSchema.parse(params);

        const orderDataList: OrderType[] = await PrismaInstance.order.findMany({
            ...(select && { select }),
            ...(orderBy && { orderBy }),
            ...(take && { take }),
            ...(skip && { skip }),
            ...(where && { where }),
        });

        console.log("SelectOrderList -> Revalidating orders list from database...");

        // Return the order list
        return orderDataList.length ? orderDataList : null;
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

export type SelectOrderListResponse =
    | {
          data: OrderType[] | null;
      }
    | {
          error: string;
      };

/**
 * GET route handler for orders API
 * @param request Incoming request with optional parameters
 * @returns JSON response containing order list or error message
 */
export const GET = async (request: NextRequest): Promise<NextResponse<SelectOrderListResponse>> => {
    try {
        // Get the params and decode them
        const encodedParams = request.nextUrl.searchParams.get("params") ?? "{}";
        const stringParams = decodeURIComponent(encodedParams);

        // Get the order list
        const orderList: OrderType[] | null = await SelectOrderListCached(stringParams);

        // Return the order list
        return NextResponse.json({ data: orderList }, { status: 200 });
    } catch (error) {
        console.error("SelectOrderListCached -> " + (error as Error).message);
        if (process.env.NODE_ENV === "development") {
            if (error instanceof ZodError)
                return NextResponse.json({ error: "SelectOrderListCached -> Invalid Zod params -> " + error.message });
            if (error instanceof PrismaClientKnownRequestError)
                return NextResponse.json({ error: "SelectOrderListCached -> Prisma error -> " + error.message });
            return NextResponse.json({ error: "SelectOrderListCached -> " + (error as Error).message });
        }
        // TODO: add logging
        return NextResponse.json({ error: "Something went wrong..." }, { status: 500 });
    }
};
