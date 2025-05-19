import ArticleService from "@services/class/ArticleClass";
import { CountArticleProps, CountArticleResponse, FindFirstArticleProps, FindFirstArticleResponse, FindManyArticleProps, FindManyArticleResponse, FindUniqueArticleProps, FindUniqueArticleResponse } from "@services/types/ArticleType";
import { cacheLifeApi, parseAndDecodeParams } from "@utils/FetchConfig";
import { unstable_cacheLife as cacheLife, unstable_cacheTag as cacheTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

// ============== API Routes Types ============== //

export type ArticleRoutes<Input> = {
    "/article": {
        params: FindManyArticleProps,
        response: FindManyArticleResponse<Input extends FindManyArticleProps ? Input : never>
    },
    "/article/first": {
        params: FindFirstArticleProps,
        response: FindFirstArticleResponse<Input extends FindFirstArticleProps ? Input : never>
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

const articleListCached = async <T extends FindManyArticleProps>(params: T) => {
    "use cache";
    cacheLife(cacheLifeApi);
    cacheTag("/api/article");
    return ArticleService.findMany<T>(params);
};

export const SelectArticleList = async <T extends FindManyArticleProps>(request: NextRequest) => {
    try {
        const params: T = parseAndDecodeParams(request);
        const response = await articleListCached<T>(params);
        return NextResponse.json(response, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "getArticleListCached -> " + (error as Error).message }, { status: 500 });
    }
};

// ==================== Find First ==================== //

const articleFirstCached = async <T extends FindFirstArticleProps>(params: T) => {
    "use cache";
    cacheLife(cacheLifeApi);
    cacheTag("/api/article/first");
    return ArticleService.findFirst<T>(params);
};

export const SelectArticleFirst = async <T extends FindFirstArticleProps>(request: NextRequest) => {
    try {
        const params: T = parseAndDecodeParams(request);
        const response = await articleFirstCached<T>(params);
        return NextResponse.json(response, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "getArticleFirstCached -> " + (error as Error).message }, { status: 500 });
    }
};

// ==================== Find Unique ==================== //

const articleUniqueCached = async <T extends FindUniqueArticleProps>(params: T) => {
    "use cache";
    cacheLife(cacheLifeApi);
    cacheTag("/api/article/unique");
    return ArticleService.findUnique<T>(params);
};

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

const articleCountCached = async (params: CountArticleProps) => {
    "use cache";
    cacheLife(cacheLifeApi);
    cacheTag("/api/article/count");
    return ArticleService.count(params);
};

export const SelectArticleCount = async (request: NextRequest) => {
    try {
        const params: CountArticleProps = parseAndDecodeParams(request);
        const response = await articleCountCached(params);
        return NextResponse.json(response, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "getArticleCountCached -> " + (error as Error).message }, { status: 500 });
    }
};
