import QuantityService from "@services/class/QuantityClass";
import { CountQuantityProps, CountQuantityResponse, FindFirstQuantityProps, FindFirstQuantityResponse, FindManyQuantityProps, FindManyQuantityResponse, FindUniqueQuantityProps, FindUniqueQuantityResponse } from "@services/types/QuantityType";
import { cacheLifeApi, parseAndDecodeParams } from "@utils/FetchConfig";
import { unstable_cacheLife as cacheLife, unstable_cacheTag as cacheTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

// ============== API Routes Types ============== //

export type QuantityRoutes<Input> = {
    "/quantity": {
        params: FindManyQuantityProps,
        response: FindManyQuantityResponse<Input extends FindManyQuantityProps ? Input : never>
    },
    "/quantity/first": {
        params: FindFirstQuantityProps,
        response: FindFirstQuantityResponse<Input extends FindFirstQuantityProps ? Input : never>
    },
    "/quantity/unique": {
        params: FindUniqueQuantityProps,
        response: FindUniqueQuantityResponse<Input extends FindUniqueQuantityProps ? Input : never>
    },
    "/quantity/count": {
        params: CountQuantityProps,
        response: CountQuantityResponse
    }
}

// ==================== Find Many ==================== //

const quantityListCached = async <T extends FindManyQuantityProps>(params: T) => {
    "use cache";
    cacheLife(cacheLifeApi);
    cacheTag("/api/quantity");
    return QuantityService.findMany<T>(params);
};

export const SelectQuantityList = async <T extends FindManyQuantityProps>(request: NextRequest) => {
    try {
        const params: T = parseAndDecodeParams(request);
        const response = await quantityListCached<T>(params);
        return NextResponse.json(response, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "getQuantityListCached -> " + (error as Error).message }, { status: 500 });
    }
};

// ==================== Find First ==================== //

const quantityFirstCached = async <T extends FindFirstQuantityProps>(params: T) => {
    "use cache";
    cacheLife(cacheLifeApi);
    cacheTag("/api/quantity/first");
    return QuantityService.findFirst<T>(params);
};

export const SelectQuantityFirst = async <T extends FindFirstQuantityProps>(request: NextRequest) => {
    try {
        const params: T = parseAndDecodeParams(request);
        const response = await quantityFirstCached<T>(params);
        return NextResponse.json(response, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "getQuantityFirstCached -> " + (error as Error).message }, { status: 500 });
    }
};

// ==================== Find Unique ==================== //

const quantityUniqueCached = async <T extends FindUniqueQuantityProps>(params: T) => {
    "use cache";
    cacheLife(cacheLifeApi);
    cacheTag("/api/quantity/unique");
    return QuantityService.findUnique<T>(params);
};

export const SelectQuantityUnique = async <T extends FindUniqueQuantityProps>(request: NextRequest) => {
    try {
        const params: T = parseAndDecodeParams(request);
        const response = await quantityUniqueCached<T>(params);
        return NextResponse.json(response, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "getQuantityUniqueCached -> " + (error as Error).message }, { status: 500 });
    }
};

// ==================== Count ==================== //

const quantityCountCached = async (params: CountQuantityProps) => {
    "use cache";
    cacheLife(cacheLifeApi);
    cacheTag("/api/quantity/count");
    return QuantityService.count(params);
};

export const SelectQuantityCount = async (request: NextRequest) => {
    try {
        const params: CountQuantityProps = parseAndDecodeParams(request);
        const response = await quantityCountCached(params);
        return NextResponse.json(response, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "getQuantityCountCached -> " + (error as Error).message }, { status: 500 });
    }
};
