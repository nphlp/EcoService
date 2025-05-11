import SessionService from "@services/class/SessionClass";
import { CountSessionProps, CountSessionResponse, FindFirstSessionProps, FindFirstSessionResponse, FindManySessionProps, FindManySessionResponse, FindUniqueSessionProps, FindUniqueSessionResponse } from "@services/types/SessionType";
import { parseAndDecodeParams, revalidate } from "@utils/FetchConfig";
import { unstable_cache as cache } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

// ============== API Routes Types ============== //

export type SessionRoutes<Input> = {
    "/session": {
        params: FindManySessionProps,
        response: FindManySessionResponse<Input extends FindManySessionProps ? Input : never>
    },
    "/session/first": {
        params: FindFirstSessionProps,
        response: FindFirstSessionResponse<Input extends FindFirstSessionProps ? Input : never>
    },
    "/session/unique": {
        params: FindUniqueSessionProps,
        response: FindUniqueSessionResponse<Input extends FindUniqueSessionProps ? Input : never>
    },
    "/session/count": {
        params: CountSessionProps,
        response: CountSessionResponse
    }
}

// ==================== Find Many ==================== //

const sessionListCached = cache(async <T extends FindManySessionProps>(params: T) => SessionService.findMany(params), ["session"], {
    revalidate,
    tags: ["session"],
});

export const SelectSessionList = async <T extends FindManySessionProps>(request: NextRequest) => {
    try {
        const params: T = parseAndDecodeParams(request);
        const response = await sessionListCached<T>(params);
        return NextResponse.json(response, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "getSessionListCached -> " + (error as Error).message }, { status: 500 });
    }
};

// ==================== Find First ==================== //

const sessionFirstCached = cache(
    async <T extends FindFirstSessionProps>(params: T) => SessionService.findFirst(params),
    ["session/first"],
    { revalidate, tags: ["session/first"] },
);

export const SelectSessionFirst = async <T extends FindFirstSessionProps>(request: NextRequest) => {
    try {
        const params: T = parseAndDecodeParams(request);
        const response = await sessionFirstCached<T>(params);
        return NextResponse.json(response, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "getSessionFirstCached -> " + (error as Error).message }, { status: 500 });
    }
};

// ==================== Find Unique ==================== //

const sessionUniqueCached = cache(
    async <T extends FindUniqueSessionProps>(params: T) => SessionService.findUnique(params),
    ["session/unique"],
    { revalidate, tags: ["session/unique"] },
);

export const SelectSessionUnique = async <T extends FindUniqueSessionProps>(request: NextRequest) => {
    try {
        const params: T = parseAndDecodeParams(request);
        const response = await sessionUniqueCached<T>(params);
        return NextResponse.json(response, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "getSessionUniqueCached -> " + (error as Error).message }, { status: 500 });
    }
};

// ==================== Count ==================== //

const sessionCountCached = cache(async (params: CountSessionProps) => SessionService.count(params), ["session/count"], {
    revalidate,
    tags: ["session/count"],
});

export const SelectSessionCount = async (request: NextRequest) => {
    try {
        const params: CountSessionProps = parseAndDecodeParams(request);
        const response = await sessionCountCached(params);
        return NextResponse.json(response, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "getSessionCountCached -> " + (error as Error).message }, { status: 500 });
    }
};
