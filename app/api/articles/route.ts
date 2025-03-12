import { ArticleType } from "@actions/types/Article";
import { SelectArticleListProps } from "@actions/types/Article";
import { selectArticleListSchema } from "@actions/zod-sensitive/Article";
import PrismaInstance from "@lib/prisma";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { unstable_cache as cache } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";

/**
 * Retrieves a cached list of articles
 * @param stringParams Filtering and pagination parameters in JSON format
 * @returns List of articles or null if no articles found
 */
const SelectArticleListCached = cache(
    async (stringParams: string): Promise<ArticleType[] | null> => {
        // Parse the params as object
        const params: SelectArticleListProps = JSON.parse(stringParams);

        // Validate the params with zod
        const { select, orderBy, take = 10, skip = 0, where } = selectArticleListSchema.parse(params);

        const articleDataList: ArticleType[] = await PrismaInstance.article.findMany({
            ...(select && { select }),
            ...(orderBy && { orderBy }),
            ...(take && { take }),
            ...(skip && { skip }),
            ...(where && { where }),
        });

        console.log("SelectArticleList -> Revalidating articles list from database...");

        // Return the article list
        return articleDataList.length ? articleDataList : null;
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

export type SelectArticleListResponse =
    | {
          data: ArticleType[] | null;
      }
    | {
          error: string;
      };

/**
 * GET route handler for articles API
 * @param request Incoming request with optional parameters
 * @returns JSON response containing article list or error message
 */
export const GET = async (request: NextRequest): Promise<NextResponse<SelectArticleListResponse>> => {
    try {
        // Get the params and decode them
        const encodedParams = request.nextUrl.searchParams.get("params") ?? "{}";
        const stringParams = decodeURIComponent(encodedParams);

        // Get the article list
        const articleList: ArticleType[] | null = await SelectArticleListCached(stringParams);

        // Return the article list
        return NextResponse.json({ data: articleList }, { status: 200 });
    } catch (error) {
        console.error("SelectArticleListCached -> " + (error as Error).message);
        if (process.env.NODE_ENV === "development") {
            if (error instanceof ZodError)
                return NextResponse.json({ error: "SelectArticleListCached -> Invalid Zod params -> " + error.message });
            if (error instanceof PrismaClientKnownRequestError)
                return NextResponse.json({ error: "SelectArticleListCached -> Prisma error -> " + error.message });
            return NextResponse.json({ error: "SelectArticleListCached -> " + (error as Error).message });
        }
        // TODO: add logging
        return NextResponse.json({ error: "Something went wrong..." }, { status: 500 });
    }
};
