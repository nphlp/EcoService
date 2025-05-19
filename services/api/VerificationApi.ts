import VerificationService from "@services/class/VerificationClass";
import { CountVerificationProps, CountVerificationResponse, FindFirstVerificationProps, FindFirstVerificationResponse, FindManyVerificationProps, FindManyVerificationResponse, FindUniqueVerificationProps, FindUniqueVerificationResponse } from "@services/types/VerificationType";
import { cacheLifeApi, parseAndDecodeParams } from "@utils/FetchConfig";
import { unstable_cacheLife as cacheLife, unstable_cacheTag as cacheTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

// ============== API Routes Types ============== //

export type VerificationRoutes<Input> = {
    "/verification": {
        params: FindManyVerificationProps,
        response: FindManyVerificationResponse<Input extends FindManyVerificationProps ? Input : never>
    },
    "/verification/first": {
        params: FindFirstVerificationProps,
        response: FindFirstVerificationResponse<Input extends FindFirstVerificationProps ? Input : never>
    },
    "/verification/unique": {
        params: FindUniqueVerificationProps,
        response: FindUniqueVerificationResponse<Input extends FindUniqueVerificationProps ? Input : never>
    },
    "/verification/count": {
        params: CountVerificationProps,
        response: CountVerificationResponse
    }
}

// ==================== Find Many ==================== //

const verificationListCached = async <T extends FindManyVerificationProps>(params: T) => {
    "use cache";
    cacheLife(cacheLifeApi);
    cacheTag("/api/verification");
    return VerificationService.findMany<T>(params);
};

export const SelectVerificationList = async <T extends FindManyVerificationProps>(request: NextRequest) => {
    try {
        const params: T = parseAndDecodeParams(request);
        const response = await verificationListCached<T>(params);
        return NextResponse.json(response, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "getVerificationListCached -> " + (error as Error).message }, { status: 500 });
    }
};

// ==================== Find First ==================== //

const verificationFirstCached = async <T extends FindFirstVerificationProps>(params: T) => {
    "use cache";
    cacheLife(cacheLifeApi);
    cacheTag("/api/verification/first");
    return VerificationService.findFirst<T>(params);
};

export const SelectVerificationFirst = async <T extends FindFirstVerificationProps>(request: NextRequest) => {
    try {
        const params: T = parseAndDecodeParams(request);
        const response = await verificationFirstCached<T>(params);
        return NextResponse.json(response, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "getVerificationFirstCached -> " + (error as Error).message }, { status: 500 });
    }
};

// ==================== Find Unique ==================== //

const verificationUniqueCached = async <T extends FindUniqueVerificationProps>(params: T) => {
    "use cache";
    cacheLife(cacheLifeApi);
    cacheTag("/api/verification/unique");
    return VerificationService.findUnique<T>(params);
};

export const SelectVerificationUnique = async <T extends FindUniqueVerificationProps>(request: NextRequest) => {
    try {
        const params: T = parseAndDecodeParams(request);
        const response = await verificationUniqueCached<T>(params);
        return NextResponse.json(response, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "getVerificationUniqueCached -> " + (error as Error).message }, { status: 500 });
    }
};

// ==================== Count ==================== //

const verificationCountCached = async (params: CountVerificationProps) => {
    "use cache";
    cacheLife(cacheLifeApi);
    cacheTag("/api/verification/count");
    return VerificationService.count(params);
};

export const SelectVerificationCount = async (request: NextRequest) => {
    try {
        const params: CountVerificationProps = parseAndDecodeParams(request);
        const response = await verificationCountCached(params);
        return NextResponse.json(response, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "getVerificationCountCached -> " + (error as Error).message }, { status: 500 });
    }
};
