import SessionService from "@services/class/SessionClass";
import { CountSessionProps, CountSessionResponse, FindFirstSessionProps, FindFirstSessionResponse, FindManySessionProps, FindManySessionResponse, FindUniqueSessionProps, FindUniqueSessionResponse } from "@services/types/SessionType";
import { cacheLifeApi, parseAndDecodeParams } from "@utils/FetchConfig";
import { unstable_cacheLife as cacheLife, unstable_cacheTag as cacheTag } from "next/cache";
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

const sessionListCached = async <T extends FindManySessionProps>(params: T) => {
    "use cache";
    cacheLife(cacheLifeApi);
    cacheTag("/api/session");
    return SessionService.findMany<T>(params);
};

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

const sessionFirstCached = async <T extends FindFirstSessionProps>(params: T) => {
    "use cache";
    cacheLife(cacheLifeApi);
    cacheTag("/api/session/first");
    return SessionService.findFirst<T>(params);
};

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

const sessionUniqueCached = async <T extends FindUniqueSessionProps>(params: T) => {
    "use cache";
    cacheLife(cacheLifeApi);
    cacheTag("/api/session/unique");
    return SessionService.findUnique<T>(params);
};

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

const sessionCountCached = async (params: CountSessionProps) => {
    "use cache";
    cacheLife(cacheLifeApi);
    cacheTag("/api/session/count");
    return SessionService.count(params);
};

export const SelectSessionCount = async (request: NextRequest) => {
    try {
        const params: CountSessionProps = parseAndDecodeParams(request);
        const response = await sessionCountCached(params);
        return NextResponse.json(response, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "getSessionCountCached -> " + (error as Error).message }, { status: 500 });
    }
};
