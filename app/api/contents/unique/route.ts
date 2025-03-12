import { ContentType } from "@actions/types/Content";
import { SelectContentProps } from "@actions/types/Content";
import { selectContentUniqueSchema } from "@actions/zod-sensitive/Content";
import PrismaInstance from "@lib/prisma";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { unstable_cache as cache } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";

/**
 * Retrieves a cached content by ID
 * @param stringParams Parameters containing the content ID in JSON format
 * @returns Content or null if not found
 */
const SelectContentCached = cache(
    async (stringParams: string): Promise<ContentType | null> => {
        // Parse the params as object
        const params: SelectContentProps = JSON.parse(stringParams);

        const { where, select } = selectContentUniqueSchema.parse(params);

        const contentData: ContentType | null = await PrismaInstance.content.findUnique({
            where,
            ...(select && { select }),
        });

        return contentData;
    },
    ["/contents/unique"],
    {
        /**
         * Cache revalidation
         * - development : revalidate every 5 seconds
         * - production : revalidate every 5 minutes
         */
        revalidate: process.env.NODE_ENV === "development" ? 5 : 300,
        tags: ["/contents/unique"],
    },
);

export type SelectContentResponse =
    | {
          data: ContentType | null;
      }
    | {
          error: string;
      };

/**
 * GET route handler for retrieving a single content by ID
 * @param request Incoming request with content ID parameter
 * @returns JSON response containing content data or error message
 */
export const GET = async (request: NextRequest): Promise<NextResponse<SelectContentResponse>> => {
    try {
        // Get the params and decode them
        const encodedParams = request.nextUrl.searchParams.get("params") ?? "{}";
        const stringParams = decodeURIComponent(encodedParams);

        // Get the content
        const contentData: ContentType | null = await SelectContentCached(stringParams);

        // Return the content
        return NextResponse.json({ data: contentData }, { status: 200 });
    } catch (error) {
        console.error("SelectContentCached -> " + (error as Error).message);
        if (process.env.NODE_ENV === "development") {
            if (error instanceof ZodError)
                return NextResponse.json({ error: "SelectContentCached -> Invalid Zod params -> " + error.message });
            if (error instanceof PrismaClientKnownRequestError)
                return NextResponse.json({ error: "SelectContentCached -> Prisma error -> " + error.message });
            return NextResponse.json({ error: "SelectContentCached -> " + (error as Error).message });
        }
        // TODO: add logging
        return NextResponse.json({ error: "Something went wrong..." }, { status: 500 });
    }
};
