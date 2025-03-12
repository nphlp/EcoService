import { AddressType } from "@actions/types/Address";
import { SelectAddressListProps } from "@actions/types/Address";
import { selectAddressListSchema } from "@actions/zod-sensitive/Address";
import PrismaInstance from "@lib/prisma";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { unstable_cache as cache } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";

/**
 * Retrieves a cached list of addresss
 * @param stringParams Filtering and pagination parameters in JSON format
 * @returns List of addresss or null if no addresss found
 */
const SelectAddressListCached = cache(
    async (stringParams: string): Promise<AddressType[] | null> => {
        // Parse the params as object
        const params: SelectAddressListProps = JSON.parse(stringParams);

        // Validate the params with zod
        const { select, orderBy, take = 10, skip = 0, where } = selectAddressListSchema.parse(params);

        const addressDataList: AddressType[] = await PrismaInstance.address.findMany({
            ...(select && { select }),
            ...(orderBy && { orderBy }),
            ...(take && { take }),
            ...(skip && { skip }),
            ...(where && { where }),
        });

        console.log("SelectAddressList -> Revalidating addresss list from database...");

        // Return the address list
        return addressDataList.length ? addressDataList : null;
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

export type SelectAddressListResponse =
    | {
          data: AddressType[] | null;
      }
    | {
          error: string;
      };

/**
 * GET route handler for addresss API
 * @param request Incoming request with optional parameters
 * @returns JSON response containing address list or error message
 */
export const GET = async (request: NextRequest): Promise<NextResponse<SelectAddressListResponse>> => {
    try {
        // Get the params and decode them
        const encodedParams = request.nextUrl.searchParams.get("params") ?? "{}";
        const stringParams = decodeURIComponent(encodedParams);

        // Get the address list
        const addressList: AddressType[] | null = await SelectAddressListCached(stringParams);

        // Return the address list
        return NextResponse.json({ data: addressList }, { status: 200 });
    } catch (error) {
        console.error("SelectAddressListCached -> " + (error as Error).message);
        if (process.env.NODE_ENV === "development") {
            if (error instanceof ZodError)
                return NextResponse.json({ error: "SelectAddressListCached -> Invalid Zod params -> " + error.message });
            if (error instanceof PrismaClientKnownRequestError)
                return NextResponse.json({ error: "SelectAddressListCached -> Prisma error -> " + error.message });
            return NextResponse.json({ error: "SelectAddressListCached -> " + (error as Error).message });
        }
        // TODO: add logging
        return NextResponse.json({ error: "Something went wrong..." }, { status: 500 });
    }
};
