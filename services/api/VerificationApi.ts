import VerificationService from "@services/class/VerificationClass";
import { CountVerificationProps, CountVerificationResponse, FindManyVerificationProps, FindManyVerificationResponse, FindUniqueVerificationProps, FindUniqueVerificationResponse } from "@services/types/VerificationType";
import { parseAndDecodeParams, revalidate } from "@utils/FetchV2";
import { unstable_cache as cache } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

// ============== API Routes Types ============== //

export type VerificationRoutes<T> = {
    "/verification": {
        props: FindManyVerificationProps,
        response: FindManyVerificationResponse<T extends FindManyVerificationProps ? T : never>
    },
    "/verification/unique": {
        props: FindUniqueVerificationProps,
        response: FindUniqueVerificationResponse<T extends FindUniqueVerificationProps ? T : never>
    },
    "/verification/count": {
        props: CountVerificationProps,
        response: CountVerificationResponse
    }
}

// ==================== Find Many ==================== //

const verificationListCached = cache(async (params: FindManyVerificationProps) => VerificationService.findMany(params), ["verification"], {
    revalidate,
    tags: ["verification"],
});

export const SelectVerificationList = async (request: NextRequest) => {
    try {
        const params = parseAndDecodeParams(request);
        const response = await verificationListCached(params);
        return NextResponse.json(response, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "getVerificationListCached -> " + (error as Error).message }, { status: 500 });
    }
};

// ==================== Find Unique ==================== //

const verificationUniqueCached = cache(
    async <T extends FindUniqueVerificationProps>(params: T) => VerificationService.findUnique(params),
    ["verification/unique"],
    { revalidate, tags: ["verification/unique"] },
);

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

const verificationCountCached = cache(async (params: CountVerificationProps) => VerificationService.count(params), ["verification/count"], {
    revalidate,
    tags: ["verification/count"],
});

export const SelectVerificationCount = async (request: NextRequest) => {
    try {
        const params: CountVerificationProps = parseAndDecodeParams(request);
        const response = await verificationCountCached(params);
        return NextResponse.json(response, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "getVerificationCountCached -> " + (error as Error).message }, { status: 500 });
    }
};
