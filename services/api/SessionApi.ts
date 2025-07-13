import { SessionCountCached, SessionFindFirstCached, SessionFindManyCached, SessionFindUniqueCached } from "@services/cached/index";
import { SessionCountProps, SessionCountResponse, SessionFindFirstProps, SessionFindFirstResponse, SessionFindManyProps, SessionFindManyResponse, SessionFindUniqueProps, SessionFindUniqueResponse } from "@services/types/index";
import { parseAndDecodeParams } from "@utils/FetchConfig";
import { NextRequest, NextResponse } from "next/server";

export type SessionRoutes<Input> = {
    "/session/findMany": {
        params: SessionFindManyProps,
        response: SessionFindManyResponse<Input extends SessionFindManyProps ? Input : never>
    },
    "/session/findFirst": {
        params: SessionFindFirstProps,
        response: SessionFindFirstResponse<Input extends SessionFindFirstProps ? Input : never>
    },
    "/session/findUnique": {
        params: SessionFindUniqueProps,
        response: SessionFindUniqueResponse<Input extends SessionFindUniqueProps ? Input : never>
    },
    "/session/count": {
        params: SessionCountProps,
        response: SessionCountResponse
    }
}

export const SessionFindManyApi = async <T extends SessionFindManyProps>(request: NextRequest) => {
    try {
        const params: T = parseAndDecodeParams(request);
        const response = await SessionFindManyCached<T>(params);
        return NextResponse.json(response, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "SessionFindManyApi -> " + (error as Error).message }, { status: 500 });
    }
};

export const SessionFindFirstApi = async <T extends SessionFindFirstProps>(request: NextRequest) => {
    try {
        const params: T = parseAndDecodeParams(request);
        const response = await SessionFindFirstCached<T>(params);
        return NextResponse.json(response, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "SessionFindFirstApi -> " + (error as Error).message }, { status: 500 });
    }
};

export const SessionFindUniqueApi = async <T extends SessionFindUniqueProps>(request: NextRequest) => {
    try {
        const params: T = parseAndDecodeParams(request);
        const response = await SessionFindUniqueCached<T>(params);
        return NextResponse.json(response, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "SessionFindUniqueApi -> " + (error as Error).message }, { status: 500 });
    }
};

export const SessionCountApi = async (request: NextRequest) => {
    try {
        const params: SessionCountProps = parseAndDecodeParams(request);
        const response = await SessionCountCached(params);
        return NextResponse.json(response, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "SessionCountApi -> " + (error as Error).message }, { status: 500 });
    }
};
