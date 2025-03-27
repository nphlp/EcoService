import ContentService from "@services/class/ContentClass";
import { CountContentProps, CountContentResponse, FindManyContentProps, FindManyContentResponse, FindUniqueContentProps, FindUniqueContentResponse } from "@services/types/ContentType";
import { parseAndDecodeParams, revalidate } from "@utils/FetchV2";
import { unstable_cache as cache } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

// ============== API Routes Types ============== //

export type ContentRoutes<Input> = {
    "/content": {
        params: FindManyContentProps,
        response: FindManyContentResponse<Input extends FindManyContentProps ? Input : never>
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

const contentListCached = cache(async <T extends FindManyContentProps>(params: T) => ContentService.findMany(params), ["content"], {
    revalidate,
    tags: ["content"],
});

export const SelectContentList = async <T extends FindManyContentProps>(request: NextRequest) => {
    try {
        const params: T = parseAndDecodeParams(request);
        const response = await contentListCached<T>(params);
        return NextResponse.json(response, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "getContentListCached -> " + (error as Error).message }, { status: 500 });
    }
};

// ==================== Find Unique ==================== //

const contentUniqueCached = cache(
    async <T extends FindUniqueContentProps>(params: T) => ContentService.findUnique(params),
    ["content/unique"],
    { revalidate, tags: ["content/unique"] },
);

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

const contentCountCached = cache(async (params: CountContentProps) => ContentService.count(params), ["content/count"], {
    revalidate,
    tags: ["content/count"],
});

export const SelectContentCount = async (request: NextRequest) => {
    try {
        const params: CountContentProps = parseAndDecodeParams(request);
        const response = await contentCountCached(params);
        return NextResponse.json(response, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "getContentCountCached -> " + (error as Error).message }, { status: 500 });
    }
};
