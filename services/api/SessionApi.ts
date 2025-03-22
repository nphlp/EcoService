import SessionService from "@services/class/SessionClass";
import { CountSessionProps, CountSessionResponse, FindManySessionProps, FindManySessionResponse, FindUniqueSessionProps, FindUniqueSessionResponse } from "@services/types/SessionType";
import { parseAndDecodeParams, revalidate } from "@utils/FetchV2";
import { unstable_cache as cache } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

// ============== API Routes Types ============== //

export type SessionRoutes<T> = {
    "/session": {
        props: FindManySessionProps,
        response: FindManySessionResponse<T extends FindManySessionProps ? T : never>
    },
    "/session/unique": {
        props: FindUniqueSessionProps,
        response: FindUniqueSessionResponse<T extends FindUniqueSessionProps ? T : never>
    },
    "/session/count": {
        props: CountSessionProps,
        response: CountSessionResponse
    }
}

// ==================== Find Many ==================== //

const sessionListCached = cache(async (params: FindManySessionProps) => SessionService.findMany(params), ["session"], {
    revalidate,
    tags: ["session"],
});

export const SelectSessionList = async (request: NextRequest) => {
    try {
        const params = parseAndDecodeParams(request);
        const response = await sessionListCached(params);
        return NextResponse.json(response, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "getSessionListCached -> " + (error as Error).message }, { status: 500 });
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
