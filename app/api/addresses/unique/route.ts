import { AddressType } from "@actions/types/Address";
import { SelectAddressProps } from "@actions/types/Address";
import { selectAddressUniqueSchema } from "@actions/zod-sensitive/Address";
import PrismaInstance from "@lib/prisma";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { unstable_cache as cache } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";

/**
 * Retrieves a cached address by ID
 * @param stringParams Parameters containing the address ID in JSON format
 * @returns Address or null if not found
 */
const SelectAddressCached = cache(
    async (stringParams: string): Promise<AddressType | null> => {
        // Parse the params as object
        const params: SelectAddressProps = JSON.parse(stringParams);

        const { where, select } = selectAddressUniqueSchema.parse(params);

        const addressData: AddressType | null = await PrismaInstance.address.findUnique({
            where,
            ...(select && { select }),
        });

        return addressData;
    },
    ["/addresss/unique"],
    {
        /**
         * Cache revalidation
         * - development : revalidate every 5 seconds
         * - production : revalidate every 5 minutes
         */
        revalidate: process.env.NODE_ENV === "development" ? 5 : 300,
        tags: ["/addresss/unique"],
    },
);

export type SelectAddressResponse =
    | {
          data: AddressType | null;
      }
    | {
          error: string;
      };

/**
 * GET route handler for retrieving a single address by ID
 * @param request Incoming request with address ID parameter
 * @returns JSON response containing address data or error message
 */
export const GET = async (request: NextRequest): Promise<NextResponse<SelectAddressResponse>> => {
    try {
        // Get the params and decode them
        const encodedParams = request.nextUrl.searchParams.get("params") ?? "{}";
        const stringParams = decodeURIComponent(encodedParams);

        // Get the address
        const addressData: AddressType | null = await SelectAddressCached(stringParams);

        // Return the address
        return NextResponse.json({ data: addressData }, { status: 200 });
    } catch (error) {
        console.error("SelectAddressCached -> " + (error as Error).message);
        if (process.env.NODE_ENV === "development") {
            if (error instanceof ZodError)
                return NextResponse.json({ error: "SelectAddressCached -> Invalid Zod params -> " + error.message });
            if (error instanceof PrismaClientKnownRequestError)
                return NextResponse.json({ error: "SelectAddressCached -> Prisma error -> " + error.message });
            return NextResponse.json({ error: "SelectAddressCached -> " + (error as Error).message });
        }
        // TODO: add logging
        return NextResponse.json({ error: "Something went wrong..." }, { status: 500 });
    }
};
