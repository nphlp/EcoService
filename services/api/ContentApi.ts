import ContentService from "@services/class/ContentClass";
import { ContentCountProps, ContentCountResponse, ContentFindFirstProps, ContentFindFirstResponse, ContentFindManyProps, ContentFindManyResponse, ContentFindUniqueProps, ContentFindUniqueResponse } from "@services/types/ContentType";
import { cacheLifeApi, parseAndDecodeParams } from "@utils/FetchConfig";
import { unstable_cacheLife as cacheLife, unstable_cacheTag as cacheTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

// ============== API Routes Types ============== //

export type ContentRoutes<Input> = {
    "/content": {
        params: ContentFindManyProps,
        response: ContentFindManyResponse<Input extends ContentFindManyProps ? Input : never>
    },
    "/content/first": {
        params: ContentFindFirstProps,
        response: ContentFindFirstResponse<Input extends ContentFindFirstProps ? Input : never>
    },
    "/content/unique": {
        params: ContentFindUniqueProps,
        response: ContentFindUniqueResponse<Input extends ContentFindUniqueProps ? Input : never>
    },
    "/content/count": {
        params: ContentCountProps,
        response: ContentCountResponse
    }
}

// ==================== Find Many ==================== //

const contentFindManyCached = async <T extends ContentFindManyProps>(params: T) => {
    "use cache";
    cacheLife(cacheLifeApi);
    cacheTag("/api/content");
    return ContentService.findMany<T>(params);
};

export const ContentFindManyApi = async <T extends ContentFindManyProps>(request: NextRequest) => {
    try {
        const params: T = parseAndDecodeParams(request);
        const response = await contentFindManyCached<T>(params);
        return NextResponse.json(response, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "ContentFindManyApi -> " + (error as Error).message }, { status: 500 });
    }
};

// ==================== Find First ==================== //

const contentFindFirstCached = async <T extends ContentFindFirstProps>(params: T) => {
    "use cache";
    cacheLife(cacheLifeApi);
    cacheTag("/api/content/first");
    return ContentService.findFirst<T>(params);
};

export const ContentFindFirstApi = async <T extends ContentFindFirstProps>(request: NextRequest) => {
    try {
        const params: T = parseAndDecodeParams(request);
        const response = await contentFindFirstCached<T>(params);
        return NextResponse.json(response, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "ContentFindFirstApi -> " + (error as Error).message }, { status: 500 });
    }
};

// ==================== Find Unique ==================== //

const contentFindUniqueCached = async <T extends ContentFindUniqueProps>(params: T) => {
    "use cache";
    cacheLife(cacheLifeApi);
    cacheTag("/api/content/unique");
    return ContentService.findUnique<T>(params);
};

export const ContentFindUniqueApi = async <T extends ContentFindUniqueProps>(request: NextRequest) => {
    try {
        const params: T = parseAndDecodeParams(request);
        const response = await contentFindUniqueCached<T>(params);
        return NextResponse.json(response, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "ContentFindUniqueApi -> " + (error as Error).message }, { status: 500 });
    }
};

// ==================== Count ==================== //

const contentCountCached = async (params: ContentCountProps) => {
    "use cache";
    cacheLife(cacheLifeApi);
    cacheTag("/api/content/count");
    return ContentService.count(params);
};

export const ContentCountApi = async (request: NextRequest) => {
    try {
        const params: ContentCountProps = parseAndDecodeParams(request);
        const response = await contentCountCached(params);
        return NextResponse.json(response, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "ContentCountApi -> " + (error as Error).message }, { status: 500 });
    }
};
