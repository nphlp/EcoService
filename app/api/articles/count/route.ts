import { SelectArticleAmountProps } from "@actions/types/Article";
import { selectArticleAmountSchema } from "@actions/zod-sensitive/Article";
import PrismaInstance from "@lib/prisma";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { unstable_cache as cache } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";

/**
 * Retrieves a cached count of articles
 * @param stringParams Filtering parameters in JSON format
 * @returns Count of articles or null if no articles found
 */
const SelectArticleAmountCached = cache(
    async (stringParams: string): Promise<number | null> => {
        // Parse the params as object
        const params: SelectArticleAmountProps = JSON.parse(stringParams);

        // Validate the params with zod
        const { where } = selectArticleAmountSchema.parse(params);

        const articleAmount: number = await PrismaInstance.article.count({
            ...(where && { where }),
        });

        return articleAmount ? articleAmount : null;
    },
    ["articles"],
    {
        /**
         * Cache revalidation
         * - development : revalidate every 5 seconds
         * - production : revalidate every 5 minutes
         */
        revalidate: process.env.NODE_ENV === "development" ? 5 : 300,
        tags: ["articles"],
    },
);

export type SelectArticleAmountResponse =
    | {
          data: number | null;
      }
    | {
          error: string;
      };

/**
 * GET route handler for articles count API
 * @param request Incoming request with optional parameters
 * @returns JSON response containing article count or error message
 */
export const GET = async (request: NextRequest): Promise<NextResponse<SelectArticleAmountResponse>> => {
    try {
        // Get the params and decode them
        const encodedParams = request.nextUrl.searchParams.get("params") ?? "{}";
        const stringParams = decodeURIComponent(encodedParams);

        // Get the article count
        const articleAmount: number | null = await SelectArticleAmountCached(stringParams);

        // Return the article count
        return NextResponse.json({ data: articleAmount }, { status: 200 });
    } catch (error) {
        console.error("SelectArticleAmountCached -> " + (error as Error).message);
        if (process.env.NODE_ENV === "development") {
            if (error instanceof ZodError)
                return NextResponse.json({ error: "SelectArticleAmountCached -> Invalid Zod params -> " + error.message });
            if (error instanceof PrismaClientKnownRequestError)
                return NextResponse.json({ error: "SelectArticleAmountCached -> Prisma error -> " + error.message });
            return NextResponse.json({ error: "SelectArticleAmountCached -> " + (error as Error).message });
        }
        // TODO: add logging
        return NextResponse.json({ error: "Something went wrong..." }, { status: 500 });
    }
};
