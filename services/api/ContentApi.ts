import ContentService from "@services/class/ContentClass";
import { CountContentProps, CountContentResponse, FindFirstContentProps, FindFirstContentResponse, FindManyContentProps, FindManyContentResponse, FindUniqueContentProps, FindUniqueContentResponse } from "@services/types/ContentType";
import { cacheLifeApi, parseAndDecodeParams } from "@utils/FetchConfig";
import { unstable_cacheLife as cacheLife, unstable_cacheTag as cacheTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

// ============== API Routes Types ============== //

export type ContentRoutes<Input> = {
    "/content": {
        params: FindManyContentProps,
        response: FindManyContentResponse<Input extends FindManyContentProps ? Input : never>
    },
    "/content/first": {
        params: FindFirstContentProps,
        response: FindFirstContentResponse<Input extends FindFirstContentProps ? Input : never>
    },
    "/content/unique": {
        params: FindUniqueContentProps,
        response: FindUniqueContentResponse<Input extends FindUniqueContentProps ? Input : never>
    },
    "/content/count": {
        params: CountContentProps,
        response: CountContentResponse
    }
}

// ==================== Find Many ==================== //

const contentListCached = async <T extends FindManyContentProps>(params: T) => {
    "use cache";
    cacheLife(cacheLifeApi);
    cacheTag("/api/content");
    return ContentService.findMany<T>(params);
};

export const SelectContentList = async <T extends FindManyContentProps>(request: NextRequest) => {
    try {
        const params: T = parseAndDecodeParams(request);
        const response = await contentListCached<T>(params);
        return NextResponse.json(response, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "getContentListCached -> " + (error as Error).message }, { status: 500 });
    }
};

// ==================== Find First ==================== //

const contentFirstCached = async <T extends FindFirstContentProps>(params: T) => {
    "use cache";
    cacheLife(cacheLifeApi);
    cacheTag("/api/content/first");
    return ContentService.findFirst<T>(params);
};

export const SelectContentFirst = async <T extends FindFirstContentProps>(request: NextRequest) => {
    try {
        const params: T = parseAndDecodeParams(request);
        const response = await contentFirstCached<T>(params);
        return NextResponse.json(response, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "getContentFirstCached -> " + (error as Error).message }, { status: 500 });
    }
};

// ==================== Find Unique ==================== //

const contentUniqueCached = async <T extends FindUniqueContentProps>(params: T) => {
    "use cache";
    cacheLife(cacheLifeApi);
    cacheTag("/api/content/unique");
    return ContentService.findUnique<T>(params);
};

export const SelectContentUnique = async <T extends FindUniqueContentProps>(request: NextRequest) => {
    try {
        const params: T = parseAndDecodeParams(request);
        const response = await contentUniqueCached<T>(params);
        return NextResponse.json(response, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "getContentUniqueCached -> " + (error as Error).message }, { status: 500 });
    }
};

// ==================== Count ==================== //

const contentCountCached = async (params: CountContentProps) => {
    "use cache";
    cacheLife(cacheLifeApi);
    cacheTag("/api/content/count");
    return ContentService.count(params);
};

export const SelectContentCount = async (request: NextRequest) => {
    try {
        const params: CountContentProps = parseAndDecodeParams(request);
        const response = await contentCountCached(params);
        return NextResponse.json(response, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "getContentCountCached -> " + (error as Error).message }, { status: 500 });
    }
};
