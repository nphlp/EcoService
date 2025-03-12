import { ArticleType } from "@actions/types/Article";
import { SelectArticleProps } from "@actions/types/Article";
import { selectArticleUniqueSchema } from "@actions/zod-sensitive/Article";
import PrismaInstance from "@lib/prisma";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { unstable_cache as cache } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";

/**
 * Retrieves a cached article by ID
 * @param stringParams Parameters containing the article ID in JSON format
 * @returns Article or null if not found
 */
const SelectArticleCached = cache(
    async (stringParams: string): Promise<ArticleType | null> => {
        // Parse the params as object
        const params: SelectArticleProps = JSON.parse(stringParams);

        const { where, select } = selectArticleUniqueSchema.parse(params);

        const articleData: ArticleType | null = await PrismaInstance.article.findUnique({
            where,
            ...(select && { select }),
        });

        return articleData;
    },
    ["/articles/unique"],
    {
        /**
         * Cache revalidation
         * - development : revalidate every 5 seconds
         * - production : revalidate every 5 minutes
         */
        revalidate: process.env.NODE_ENV === "development" ? 5 : 300,
        tags: ["/articles/unique"],
    },
);

export type SelectArticleResponse =
    | {
          data: ArticleType | null;
      }
    | {
          error: string;
      };

/**
 * GET route handler for retrieving a single article by ID
 * @param request Incoming request with article ID parameter
 * @returns JSON response containing article data or error message
 */
export const GET = async (request: NextRequest): Promise<NextResponse<SelectArticleResponse>> => {
    try {
        // Get the params and decode them
        const encodedParams = request.nextUrl.searchParams.get("params") ?? "{}";
        const stringParams = decodeURIComponent(encodedParams);

        // Get the article
        const articleData: ArticleType | null = await SelectArticleCached(stringParams);

        // Return the article
        return NextResponse.json({ data: articleData }, { status: 200 });
    } catch (error) {
        console.error("SelectArticleCached -> " + (error as Error).message);
        if (process.env.NODE_ENV === "development") {
            if (error instanceof ZodError)
                return NextResponse.json({ error: "SelectArticleCached -> Invalid Zod params -> " + error.message });
            if (error instanceof PrismaClientKnownRequestError)
                return NextResponse.json({ error: "SelectArticleCached -> Prisma error -> " + error.message });
            return NextResponse.json({ error: "SelectArticleCached -> " + (error as Error).message });
        }
        // TODO: add logging
        return NextResponse.json({ error: "Something went wrong..." }, { status: 500 });
    }
};
