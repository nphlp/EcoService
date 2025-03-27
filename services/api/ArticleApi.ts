import ArticleService from "@services/class/ArticleClass";
import { CountArticleProps, CountArticleResponse, FindManyArticleProps, FindManyArticleResponse, FindUniqueArticleProps, FindUniqueArticleResponse } from "@services/types/ArticleType";
import { parseAndDecodeParams, revalidate } from "@utils/FetchV2";
import { unstable_cache as cache } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

// ============== API Routes Types ============== //

export type ArticleRoutes<Input> = {
    "/article": {
        params: FindManyArticleProps,
        response: FindManyArticleResponse<Input extends FindManyArticleProps ? Input : never>
    },
    "/article/unique": {
        params: FindUniqueArticleProps,
        response: FindUniqueArticleResponse<Input extends FindUniqueArticleProps ? Input : never>
    },
    "/article/count": {
        params: CountArticleProps,
        response: CountArticleResponse
    }
}

// ==================== Find Many ==================== //

const articleListCached = cache(async <T extends FindManyArticleProps>(params: T) => ArticleService.findMany(params), ["article"], {
    revalidate,
    tags: ["article"],
});

export const SelectArticleList = async <T extends FindManyArticleProps>(request: NextRequest) => {
    try {
        const params: T = parseAndDecodeParams(request);
        const response = await articleListCached<T>(params);
        return NextResponse.json(response, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "getArticleListCached -> " + (error as Error).message }, { status: 500 });
    }
};

// ==================== Find Unique ==================== //

const articleUniqueCached = cache(
    async <T extends FindUniqueArticleProps>(params: T) => ArticleService.findUnique(params),
    ["article/unique"],
    { revalidate, tags: ["article/unique"] },
);

export const SelectArticleUnique = async <T extends FindUniqueArticleProps>(request: NextRequest) => {
    try {
        const params: T = parseAndDecodeParams(request);
        const response = await articleUniqueCached<T>(params);
        return NextResponse.json(response, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "getArticleUniqueCached -> " + (error as Error).message }, { status: 500 });
    }
};

// ==================== Count ==================== //

const articleCountCached = cache(async (params: CountArticleProps) => ArticleService.count(params), ["article/count"], {
    revalidate,
    tags: ["article/count"],
});

export const SelectArticleCount = async (request: NextRequest) => {
    try {
        const params: CountArticleProps = parseAndDecodeParams(request);
        const response = await articleCountCached(params);
        return NextResponse.json(response, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "getArticleCountCached -> " + (error as Error).message }, { status: 500 });
    }
};
