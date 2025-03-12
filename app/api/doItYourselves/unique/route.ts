import { DoItYourselfType } from "@actions/types/DoItYourself";
import { SelectDoItYourselfProps } from "@actions/types/DoItYourself";
import { selectDoItYourselfUniqueSchema } from "@actions/zod-sensitive/DoItYourself";
import PrismaInstance from "@lib/prisma";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { unstable_cache as cache } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";

/**
 * Retrieves a cached doItYourself by ID
 * @param stringParams Parameters containing the doItYourself ID in JSON format
 * @returns DoItYourself or null if not found
 */
const SelectDoItYourselfCached = cache(
    async (stringParams: string): Promise<DoItYourselfType | null> => {
        // Parse the params as object
        const params: SelectDoItYourselfProps = JSON.parse(stringParams);

        const { where, select } = selectDoItYourselfUniqueSchema.parse(params);

        const doItYourselfData: DoItYourselfType | null = await PrismaInstance.doItYourself.findUnique({
            where,
            ...(select && { select }),
        });

        return doItYourselfData;
    },
    ["/doItYourselfs/unique"],
    {
        /**
         * Cache revalidation
         * - development : revalidate every 5 seconds
         * - production : revalidate every 5 minutes
         */
        revalidate: process.env.NODE_ENV === "development" ? 5 : 300,
        tags: ["/doItYourselfs/unique"],
    },
);

export type SelectDoItYourselfResponse =
    | {
          data: DoItYourselfType | null;
      }
    | {
          error: string;
      };

/**
 * GET route handler for retrieving a single doItYourself by ID
 * @param request Incoming request with doItYourself ID parameter
 * @returns JSON response containing doItYourself data or error message
 */
export const GET = async (request: NextRequest): Promise<NextResponse<SelectDoItYourselfResponse>> => {
    try {
        // Get the params and decode them
        const encodedParams = request.nextUrl.searchParams.get("params") ?? "{}";
        const stringParams = decodeURIComponent(encodedParams);

        // Get the doItYourself
        const doItYourselfData: DoItYourselfType | null = await SelectDoItYourselfCached(stringParams);

        // Return the doItYourself
        return NextResponse.json({ data: doItYourselfData }, { status: 200 });
    } catch (error) {
        console.error("SelectDoItYourselfCached -> " + (error as Error).message);
        if (process.env.NODE_ENV === "development") {
            if (error instanceof ZodError)
                return NextResponse.json({ error: "SelectDoItYourselfCached -> Invalid Zod params -> " + error.message });
            if (error instanceof PrismaClientKnownRequestError)
                return NextResponse.json({ error: "SelectDoItYourselfCached -> Prisma error -> " + error.message });
            return NextResponse.json({ error: "SelectDoItYourselfCached -> " + (error as Error).message });
        }
        // TODO: add logging
        return NextResponse.json({ error: "Something went wrong..." }, { status: 500 });
    }
};
