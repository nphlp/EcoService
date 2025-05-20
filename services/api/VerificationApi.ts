import VerificationService from "@services/class/VerificationClass";
import { VerificationCountProps, VerificationCountResponse, VerificationFindFirstProps, VerificationFindFirstResponse, VerificationFindManyProps, VerificationFindManyResponse, VerificationFindUniqueProps, VerificationFindUniqueResponse } from "@services/types/VerificationType";
import { cacheLifeApi, parseAndDecodeParams } from "@utils/FetchConfig";
import { unstable_cacheLife as cacheLife, unstable_cacheTag as cacheTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

// ============== API Routes Types ============== //

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

// ==================== Find Many ==================== //

const verificationFindManyCached = async <T extends VerificationFindManyProps>(params: T) => {
    "use cache";
    cacheLife(cacheLifeApi);
    cacheTag("/api/verification");
    return VerificationService.findMany<T>(params);
};

export const VerificationFindManyApi = async <T extends VerificationFindManyProps>(request: NextRequest) => {
    try {
        const params: T = parseAndDecodeParams(request);
        const response = await verificationFindManyCached<T>(params);
        return NextResponse.json(response, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "VerificationFindManyApi -> " + (error as Error).message }, { status: 500 });
    }
};

// ==================== Find First ==================== //

const verificationFindFirstCached = async <T extends VerificationFindFirstProps>(params: T) => {
    "use cache";
    cacheLife(cacheLifeApi);
    cacheTag("/api/verification/first");
    return VerificationService.findFirst<T>(params);
};

export const VerificationFindFirstApi = async <T extends VerificationFindFirstProps>(request: NextRequest) => {
    try {
        const params: T = parseAndDecodeParams(request);
        const response = await verificationFindFirstCached<T>(params);
        return NextResponse.json(response, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "VerificationFindFirstApi -> " + (error as Error).message }, { status: 500 });
    }
};

// ==================== Find Unique ==================== //

const verificationFindUniqueCached = async <T extends VerificationFindUniqueProps>(params: T) => {
    "use cache";
    cacheLife(cacheLifeApi);
    cacheTag("/api/verification/unique");
    return VerificationService.findUnique<T>(params);
};

export const VerificationFindUniqueApi = async <T extends VerificationFindUniqueProps>(request: NextRequest) => {
    try {
        const params: T = parseAndDecodeParams(request);
        const response = await verificationFindUniqueCached<T>(params);
        return NextResponse.json(response, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "VerificationFindUniqueApi -> " + (error as Error).message }, { status: 500 });
    }
};

// ==================== Count ==================== //

const verificationCountCached = async (params: VerificationCountProps) => {
    "use cache";
    cacheLife(cacheLifeApi);
    cacheTag("/api/verification/count");
    return VerificationService.count(params);
};

export const VerificationCountApi = async (request: NextRequest) => {
    try {
        const params: VerificationCountProps = parseAndDecodeParams(request);
        const response = await verificationCountCached(params);
        return NextResponse.json(response, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "VerificationCountApi -> " + (error as Error).message }, { status: 500 });
    }
};
