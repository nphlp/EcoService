import { VerificationCountCached, VerificationFindFirstCached, VerificationFindManyCached, VerificationFindUniqueCached } from "@services/cached/index";
import { VerificationCountProps, VerificationCountResponse, VerificationFindFirstProps, VerificationFindFirstResponse, VerificationFindManyProps, VerificationFindManyResponse, VerificationFindUniqueProps, VerificationFindUniqueResponse } from "@services/types/index";
import { parseAndDecodeParams } from "@utils/FetchConfig";
import { NextRequest, NextResponse } from "next/server";

export type VerificationRoutes<Input> = {
    "/verification": {
        params: VerificationFindManyProps,
        response: VerificationFindManyResponse<Input extends VerificationFindManyProps ? Input : never>
    },
    "/verification/first": {
        params: VerificationFindFirstProps,
        response: VerificationFindFirstResponse<Input extends VerificationFindFirstProps ? Input : never>
    },
    "/verification/unique": {
        params: VerificationFindUniqueProps,
        response: VerificationFindUniqueResponse<Input extends VerificationFindUniqueProps ? Input : never>
    },
    "/verification/count": {
        params: VerificationCountProps,
        response: VerificationCountResponse
    }
}

export const VerificationFindManyApi = async <T extends VerificationFindManyProps>(request: NextRequest) => {
    try {
        const params: T = parseAndDecodeParams(request);
        const response = await VerificationFindManyCached<T>(params);
        return NextResponse.json(response, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "VerificationFindManyApi -> " + (error as Error).message }, { status: 500 });
    }
};

export const VerificationFindFirstApi = async <T extends VerificationFindFirstProps>(request: NextRequest) => {
    try {
        const params: T = parseAndDecodeParams(request);
        const response = await VerificationFindFirstCached<T>(params);
        return NextResponse.json(response, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "VerificationFindFirstApi -> " + (error as Error).message }, { status: 500 });
    }
};

export const VerificationFindUniqueApi = async <T extends VerificationFindUniqueProps>(request: NextRequest) => {
    try {
        const params: T = parseAndDecodeParams(request);
        const response = await VerificationFindUniqueCached<T>(params);
        return NextResponse.json(response, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "VerificationFindUniqueApi -> " + (error as Error).message }, { status: 500 });
    }
};

export const VerificationCountApi = async (request: NextRequest) => {
    try {
        const params: VerificationCountProps = parseAndDecodeParams(request);
        const response = await VerificationCountCached(params);
        return NextResponse.json(response, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "VerificationCountApi -> " + (error as Error).message }, { status: 500 });
    }
};
