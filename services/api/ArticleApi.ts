import { ArticleCountCached, ArticleFindFirstCached, ArticleFindManyCached, ArticleFindUniqueCached } from "@services/cached/index";
import { ArticleCountProps, ArticleCountResponse, ArticleFindFirstProps, ArticleFindFirstResponse, ArticleFindManyProps, ArticleFindManyResponse, ArticleFindUniqueProps, ArticleFindUniqueResponse } from "@services/types/index";
import { parseAndDecodeParams } from "@utils/FetchConfig";
import { NextRequest, NextResponse } from "next/server";

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

export const ArticleFindManyApi = async <T extends ArticleFindManyProps>(request: NextRequest) => {
    try {
        const params: T = parseAndDecodeParams(request);
        const response = await ArticleFindManyCached<T>(params);
        return NextResponse.json(response, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "ArticleFindManyApi -> " + (error as Error).message }, { status: 500 });
    }
};

export const ArticleFindFirstApi = async <T extends ArticleFindFirstProps>(request: NextRequest) => {
    try {
        const params: T = parseAndDecodeParams(request);
        const response = await ArticleFindFirstCached<T>(params);
        return NextResponse.json(response, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "ArticleFindFirstApi -> " + (error as Error).message }, { status: 500 });
    }
};

export const ArticleFindUniqueApi = async <T extends ArticleFindUniqueProps>(request: NextRequest) => {
    try {
        const params: T = parseAndDecodeParams(request);
        const response = await ArticleFindUniqueCached<T>(params);
        return NextResponse.json(response, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "ArticleFindUniqueApi -> " + (error as Error).message }, { status: 500 });
    }
};

export const ArticleCountApi = async (request: NextRequest) => {
    try {
        const params: ArticleCountProps = parseAndDecodeParams(request);
        const response = await ArticleCountCached(params);
        return NextResponse.json(response, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "ArticleCountApi -> " + (error as Error).message }, { status: 500 });
    }
};
