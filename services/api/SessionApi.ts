import SessionService from "@services/class/SessionClass";
import { SessionCountProps, SessionCountResponse, SessionFindFirstProps, SessionFindFirstResponse, SessionFindManyProps, SessionFindManyResponse, SessionFindUniqueProps, SessionFindUniqueResponse } from "@services/types/SessionType";
import { cacheLifeApi, parseAndDecodeParams } from "@utils/FetchConfig";
import { unstable_cacheLife as cacheLife, unstable_cacheTag as cacheTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

// ============== API Routes Types ============== //

export type SessionRoutes<Input> = {
    "/session": {
        params: SessionFindManyProps,
        response: SessionFindManyResponse<Input extends SessionFindManyProps ? Input : never>
    },
    "/session/first": {
        params: SessionFindFirstProps,
        response: SessionFindFirstResponse<Input extends SessionFindFirstProps ? Input : never>
    },
    "/session/unique": {
        params: SessionFindUniqueProps,
        response: SessionFindUniqueResponse<Input extends SessionFindUniqueProps ? Input : never>
    },
    "/session/count": {
        params: SessionCountProps,
        response: SessionCountResponse
    }
}

// ==================== Find Many ==================== //

const sessionFindManyCached = async <T extends SessionFindManyProps>(params: T) => {
    "use cache";
    cacheLife(cacheLifeApi);
    cacheTag("/api/session");
    return SessionService.findMany<T>(params);
};

export const SessionFindManyApi = async <T extends SessionFindManyProps>(request: NextRequest) => {
    try {
        const params: T = parseAndDecodeParams(request);
        const response = await sessionFindManyCached<T>(params);
        return NextResponse.json(response, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "SessionFindManyApi -> " + (error as Error).message }, { status: 500 });
    }
};

// ==================== Find First ==================== //

const sessionFindFirstCached = async <T extends SessionFindFirstProps>(params: T) => {
    "use cache";
    cacheLife(cacheLifeApi);
    cacheTag("/api/session/first");
    return SessionService.findFirst<T>(params);
};

export const SessionFindFirstApi = async <T extends SessionFindFirstProps>(request: NextRequest) => {
    try {
        const params: T = parseAndDecodeParams(request);
        const response = await sessionFindFirstCached<T>(params);
        return NextResponse.json(response, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "SessionFindFirstApi -> " + (error as Error).message }, { status: 500 });
    }
};

// ==================== Find Unique ==================== //

const sessionFindUniqueCached = async <T extends SessionFindUniqueProps>(params: T) => {
    "use cache";
    cacheLife(cacheLifeApi);
    cacheTag("/api/session/unique");
    return SessionService.findUnique<T>(params);
};

export const SessionFindUniqueApi = async <T extends SessionFindUniqueProps>(request: NextRequest) => {
    try {
        const params: T = parseAndDecodeParams(request);
        const response = await sessionFindUniqueCached<T>(params);
        return NextResponse.json(response, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "SessionFindUniqueApi -> " + (error as Error).message }, { status: 500 });
    }
};

// ==================== Count ==================== //

const sessionCountCached = async (params: SessionCountProps) => {
    "use cache";
    cacheLife(cacheLifeApi);
    cacheTag("/api/session/count");
    return SessionService.count(params);
};

export const SessionCountApi = async (request: NextRequest) => {
    try {
        const params: SessionCountProps = parseAndDecodeParams(request);
        const response = await sessionCountCached(params);
        return NextResponse.json(response, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "SessionCountApi -> " + (error as Error).message }, { status: 500 });
    }
};
