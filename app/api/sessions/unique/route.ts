import { SessionType } from "@actions/types/Session";
import { SelectSessionProps } from "@actions/types/Session";
import { selectSessionUniqueSchema } from "@actions/zod-sensitive/Session";
import PrismaInstance from "@lib/prisma";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { unstable_cache as cache } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";

/**
 * Retrieves a cached session by ID
 * @param stringParams Parameters containing the session ID in JSON format
 * @returns Session or null if not found
 */
const SelectSessionCached = cache(
    async (stringParams: string): Promise<SessionType | null> => {
        // Parse the params as object
        const params: SelectSessionProps = JSON.parse(stringParams);

        const { where, select } = selectSessionUniqueSchema.parse(params);

        const sessionData: SessionType | null = await PrismaInstance.session.findUnique({
            where,
            ...(select && { select }),
        });

        return sessionData;
    },
    ["/sessions/unique"],
    {
        /**
         * Cache revalidation
         * - development : revalidate every 5 seconds
         * - production : revalidate every 5 minutes
         */
        revalidate: process.env.NODE_ENV === "development" ? 5 : 300,
        tags: ["/sessions/unique"],
    },
);

export type SelectSessionResponse =
    | {
          data: SessionType | null;
      }
    | {
          error: string;
      };

/**
 * GET route handler for retrieving a single session by ID
 * @param request Incoming request with session ID parameter
 * @returns JSON response containing session data or error message
 */
export const GET = async (request: NextRequest): Promise<NextResponse<SelectSessionResponse>> => {
    try {
        // Get the params and decode them
        const encodedParams = request.nextUrl.searchParams.get("params") ?? "{}";
        const stringParams = decodeURIComponent(encodedParams);

        // Get the session
        const sessionData: SessionType | null = await SelectSessionCached(stringParams);

        // Return the session
        return NextResponse.json({ data: sessionData }, { status: 200 });
    } catch (error) {
        console.error("SelectSessionCached -> " + (error as Error).message);
        if (process.env.NODE_ENV === "development") {
            if (error instanceof ZodError)
                return NextResponse.json({ error: "SelectSessionCached -> Invalid Zod params -> " + error.message });
            if (error instanceof PrismaClientKnownRequestError)
                return NextResponse.json({ error: "SelectSessionCached -> Prisma error -> " + error.message });
            return NextResponse.json({ error: "SelectSessionCached -> " + (error as Error).message });
        }
        // TODO: add logging
        return NextResponse.json({ error: "Something went wrong..." }, { status: 500 });
    }
};
