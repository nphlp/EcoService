import { DoItYourselfType } from "@actions/types/DoItYourself";
import { SelectDoItYourselfListProps } from "@actions/types/DoItYourself";
import { selectDoItYourselfListSchema } from "@actions/zod-sensitive/DoItYourself";
import PrismaInstance from "@lib/prisma";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { unstable_cache as cache } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";

/**
 * Retrieves a cached list of doItYourselfs
 * @param stringParams Filtering and pagination parameters in JSON format
 * @returns List of doItYourselfs or null if no doItYourselfs found
 */
const SelectDoItYourselfListCached = cache(
    async (stringParams: string): Promise<DoItYourselfType[] | null> => {
        // Parse the params as object
        const params: SelectDoItYourselfListProps = JSON.parse(stringParams);

        // Validate the params with zod
        const { select, orderBy, take = 10, skip = 0, where } = selectDoItYourselfListSchema.parse(params);

        const doItYourselfDataList: DoItYourselfType[] = await PrismaInstance.doItYourself.findMany({
            ...(select && { select }),
            ...(orderBy && { orderBy }),
            ...(take && { take }),
            ...(skip && { skip }),
            ...(where && { where }),
        });

        console.log("SelectDoItYourselfList -> Revalidating doItYourselfs list from database...");

        // Return the doItYourself list
        return doItYourselfDataList.length ? doItYourselfDataList : null;
    },
    ["doItYourselfs"],
    {
        /**
         * Cache revalidation
         * - development : revalidate every 5 seconds
         * - production : revalidate every 5 minutes
         */
        revalidate: process.env.NODE_ENV === "development" ? 5 : 300,
        tags: ["doItYourselfs"],
    },
);

export type SelectDoItYourselfListResponse =
    | {
          data: DoItYourselfType[] | null;
      }
    | {
          error: string;
      };

/**
 * GET route handler for doItYourselfs API
 * @param request Incoming request with optional parameters
 * @returns JSON response containing doItYourself list or error message
 */
export const GET = async (request: NextRequest): Promise<NextResponse<SelectDoItYourselfListResponse>> => {
    try {
        // Get the params and decode them
        const encodedParams = request.nextUrl.searchParams.get("params") ?? "{}";
        const stringParams = decodeURIComponent(encodedParams);

        // Get the doItYourself list
        const doItYourselfList: DoItYourselfType[] | null = await SelectDoItYourselfListCached(stringParams);

        // Return the doItYourself list
        return NextResponse.json({ data: doItYourselfList }, { status: 200 });
    } catch (error) {
        console.error("SelectDoItYourselfListCached -> " + (error as Error).message);
        if (process.env.NODE_ENV === "development") {
            if (error instanceof ZodError)
                return NextResponse.json({ error: "SelectDoItYourselfListCached -> Invalid Zod params -> " + error.message });
            if (error instanceof PrismaClientKnownRequestError)
                return NextResponse.json({ error: "SelectDoItYourselfListCached -> Prisma error -> " + error.message });
            return NextResponse.json({ error: "SelectDoItYourselfListCached -> " + (error as Error).message });
        }
        // TODO: add logging
        return NextResponse.json({ error: "Something went wrong..." }, { status: 500 });
    }
};
