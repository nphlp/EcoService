import ArticleService from "@services/class/ArticleClass";
import { ArticleCountProps, ArticleCountResponse, ArticleFindFirstProps, ArticleFindFirstResponse, ArticleFindManyProps, ArticleFindManyResponse, ArticleFindUniqueProps, ArticleFindUniqueResponse } from "@services/types/ArticleType";
import { cacheLifeApi, parseAndDecodeParams } from "@utils/FetchConfig";
import { unstable_cacheLife as cacheLife, unstable_cacheTag as cacheTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

// ============== API Routes Types ============== //

export type ArticleRoutes<Input> = {
    "/article": {
        params: ArticleFindManyProps,
        response: ArticleFindManyResponse<Input extends ArticleFindManyProps ? Input : never>
    },
    "/article/first": {
        params: ArticleFindFirstProps,
        response: ArticleFindFirstResponse<Input extends ArticleFindFirstProps ? Input : never>
    },
    "/article/unique": {
        params: ArticleFindUniqueProps,
        response: ArticleFindUniqueResponse<Input extends ArticleFindUniqueProps ? Input : never>
    },
    "/article/count": {
        params: ArticleCountProps,
        response: ArticleCountResponse
    }
}

// ==================== Find Many ==================== //

const articleFindManyCached = async <T extends ArticleFindManyProps>(params: T) => {
    "use cache";
    cacheLife(cacheLifeApi);
    cacheTag("/api/article");
    return ArticleService.findMany<T>(params);
};

export const ArticleFindManyApi = async <T extends ArticleFindManyProps>(request: NextRequest) => {
    try {
        const params: T = parseAndDecodeParams(request);
        const response = await articleFindManyCached<T>(params);
        return NextResponse.json(response, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "ArticleFindManyApi -> " + (error as Error).message }, { status: 500 });
    }
};

// ==================== Find First ==================== //

const articleFindFirstCached = async <T extends ArticleFindFirstProps>(params: T) => {
    "use cache";
    cacheLife(cacheLifeApi);
    cacheTag("/api/article/first");
    return ArticleService.findFirst<T>(params);
};

export const ArticleFindFirstApi = async <T extends ArticleFindFirstProps>(request: NextRequest) => {
    try {
        const params: T = parseAndDecodeParams(request);
        const response = await articleFindFirstCached<T>(params);
        return NextResponse.json(response, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "ArticleFindFirstApi -> " + (error as Error).message }, { status: 500 });
    }
};

// ==================== Find Unique ==================== //

const articleFindUniqueCached = async <T extends ArticleFindUniqueProps>(params: T) => {
    "use cache";
    cacheLife(cacheLifeApi);
    cacheTag("/api/article/unique");
    return ArticleService.findUnique<T>(params);
};

export const ArticleFindUniqueApi = async <T extends ArticleFindUniqueProps>(request: NextRequest) => {
    try {
        const params: T = parseAndDecodeParams(request);
        const response = await articleFindUniqueCached<T>(params);
        return NextResponse.json(response, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "ArticleFindUniqueApi -> " + (error as Error).message }, { status: 500 });
    }
};

// ==================== Count ==================== //

const articleCountCached = async (params: ArticleCountProps) => {
    "use cache";
    cacheLife(cacheLifeApi);
    cacheTag("/api/article/count");
    return ArticleService.count(params);
};

export const ArticleCountApi = async (request: NextRequest) => {
    try {
        const params: ArticleCountProps = parseAndDecodeParams(request);
        const response = await articleCountCached(params);
        return NextResponse.json(response, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "ArticleCountApi -> " + (error as Error).message }, { status: 500 });
    }
};
