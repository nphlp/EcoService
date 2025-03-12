import { ContentType } from "@actions/types/Content";
import { SelectContentListProps } from "@actions/types/Content";
import { selectContentListSchema } from "@actions/zod-sensitive/Content";
import PrismaInstance from "@lib/prisma";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { unstable_cache as cache } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";

/**
 * Retrieves a cached list of contents
 * @param stringParams Filtering and pagination parameters in JSON format
 * @returns List of contents or null if no contents found
 */
const SelectContentListCached = cache(
    async (stringParams: string): Promise<ContentType[] | null> => {
        // Parse the params as object
        const params: SelectContentListProps = JSON.parse(stringParams);

        // Validate the params with zod
        const { select, orderBy, take = 10, skip = 0, where } = selectContentListSchema.parse(params);

        const contentDataList: ContentType[] = await PrismaInstance.content.findMany({
            ...(select && { select }),
            ...(orderBy && { orderBy }),
            ...(take && { take }),
            ...(skip && { skip }),
            ...(where && { where }),
        });

        console.log("SelectContentList -> Revalidating contents list from database...");

        // Return the content list
        return contentDataList.length ? contentDataList : null;
    },
    ["contents"],
    {
        /**
         * Cache revalidation
         * - development : revalidate every 5 seconds
         * - production : revalidate every 5 minutes
         */
        revalidate: process.env.NODE_ENV === "development" ? 5 : 300,
        tags: ["contents"],
    },
);

export type SelectContentListResponse =
    | {
          data: ContentType[] | null;
      }
    | {
          error: string;
      };

/**
 * GET route handler for contents API
 * @param request Incoming request with optional parameters
 * @returns JSON response containing content list or error message
 */
export const GET = async (request: NextRequest): Promise<NextResponse<SelectContentListResponse>> => {
    try {
        // Get the params and decode them
        const encodedParams = request.nextUrl.searchParams.get("params") ?? "{}";
        const stringParams = decodeURIComponent(encodedParams);

        // Get the content list
        const contentList: ContentType[] | null = await SelectContentListCached(stringParams);

        // Return the content list
        return NextResponse.json({ data: contentList }, { status: 200 });
    } catch (error) {
        console.error("SelectContentListCached -> " + (error as Error).message);
        if (process.env.NODE_ENV === "development") {
            if (error instanceof ZodError)
                return NextResponse.json({ error: "SelectContentListCached -> Invalid Zod params -> " + error.message });
            if (error instanceof PrismaClientKnownRequestError)
                return NextResponse.json({ error: "SelectContentListCached -> Prisma error -> " + error.message });
            return NextResponse.json({ error: "SelectContentListCached -> " + (error as Error).message });
        }
        // TODO: add logging
        return NextResponse.json({ error: "Something went wrong..." }, { status: 500 });
    }
};
