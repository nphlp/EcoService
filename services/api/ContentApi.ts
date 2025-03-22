import ContentService from "@services/class/ContentClass";
import { CountContentProps, CountContentResponse, FindManyContentProps, FindManyContentResponse, FindUniqueContentProps, FindUniqueContentResponse } from "@services/types/ContentType";
import { parseAndDecodeParams, revalidate } from "@utils/FetchV2";
import { unstable_cache as cache } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

// ============== API Routes Types ============== //

export type ContentRoutes<T> = {
    "/content": {
        props: FindManyContentProps,
        response: FindManyContentResponse<T extends FindManyContentProps ? T : never>
    },
    "/content/unique": {
        props: FindUniqueContentProps,
        response: FindUniqueContentResponse<T extends FindUniqueContentProps ? T : never>
    },
    "/content/count": {
        props: CountContentProps,
        response: CountContentResponse
    }
}

// ==================== Find Many ==================== //

const contentListCached = cache(async (params: FindManyContentProps) => ContentService.findMany(params), ["content"], {
    revalidate,
    tags: ["content"],
});

export const SelectContentList = async (request: NextRequest) => {
    try {
        const params = parseAndDecodeParams(request);
        const response = await contentListCached(params);
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
