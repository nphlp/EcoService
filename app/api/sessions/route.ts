import { SessionType } from "@actions/types/Session";
import { SelectSessionListProps } from "@actions/types/Session";
import { selectSessionListSchema } from "@actions/zod-sensitive/Session";
import PrismaInstance from "@lib/prisma";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { unstable_cache as cache } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";

/**
 * Retrieves a cached list of sessions
 * @param stringParams Filtering and pagination parameters in JSON format
 * @returns List of sessions or null if no sessions found
 */
const SelectSessionListCached = cache(
    async (stringParams: string): Promise<SessionType[] | null> => {
        // Parse the params as object
        const params: SelectSessionListProps = JSON.parse(stringParams);

        // Validate the params with zod
        const { select, orderBy, take = 10, skip = 0, where } = selectSessionListSchema.parse(params);

        const sessionDataList: SessionType[] = await PrismaInstance.session.findMany({
            ...(select && { select }),
            ...(orderBy && { orderBy }),
            ...(take && { take }),
            ...(skip && { skip }),
            ...(where && { where }),
        });

        console.log("SelectSessionList -> Revalidating sessions list from database...");

        // Return the session list
        return sessionDataList.length ? sessionDataList : null;
    },
    ["sessions"],
    {
        /**
         * Cache revalidation
         * - development : revalidate every 5 seconds
         * - production : revalidate every 5 minutes
         */
        revalidate: process.env.NODE_ENV === "development" ? 5 : 300,
        tags: ["sessions"],
    },
);

export type SelectSessionListResponse =
    | {
          data: SessionType[] | null;
      }
    | {
          error: string;
      };

/**
 * GET route handler for sessions API
 * @param request Incoming request with optional parameters
 * @returns JSON response containing session list or error message
 */
export const GET = async (request: NextRequest): Promise<NextResponse<SelectSessionListResponse>> => {
    try {
        // Get the params and decode them
        const encodedParams = request.nextUrl.searchParams.get("params") ?? "{}";
        const stringParams = decodeURIComponent(encodedParams);

        // Get the session list
        const sessionList: SessionType[] | null = await SelectSessionListCached(stringParams);

        // Return the session list
        return NextResponse.json({ data: sessionList }, { status: 200 });
    } catch (error) {
        console.error("SelectSessionListCached -> " + (error as Error).message);
        if (process.env.NODE_ENV === "development") {
            if (error instanceof ZodError)
                return NextResponse.json({ error: "SelectSessionListCached -> Invalid Zod params -> " + error.message });
            if (error instanceof PrismaClientKnownRequestError)
                return NextResponse.json({ error: "SelectSessionListCached -> Prisma error -> " + error.message });
            return NextResponse.json({ error: "SelectSessionListCached -> " + (error as Error).message });
        }
        // TODO: add logging
        return NextResponse.json({ error: "Something went wrong..." }, { status: 500 });
    }
};
