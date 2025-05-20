import QuantityService from "@services/class/QuantityClass";
import { QuantityCountProps, QuantityCountResponse, QuantityFindFirstProps, QuantityFindFirstResponse, QuantityFindManyProps, QuantityFindManyResponse, QuantityFindUniqueProps, QuantityFindUniqueResponse } from "@services/types/QuantityType";
import { cacheLifeApi, parseAndDecodeParams } from "@utils/FetchConfig";
import { unstable_cacheLife as cacheLife, unstable_cacheTag as cacheTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

// ============== API Routes Types ============== //

export type QuantityRoutes<Input> = {
    "/quantity": {
        params: QuantityFindManyProps,
        response: QuantityFindManyResponse<Input extends QuantityFindManyProps ? Input : never>
    },
    "/quantity/first": {
        params: QuantityFindFirstProps,
        response: QuantityFindFirstResponse<Input extends QuantityFindFirstProps ? Input : never>
    },
    "/quantity/unique": {
        params: QuantityFindUniqueProps,
        response: QuantityFindUniqueResponse<Input extends QuantityFindUniqueProps ? Input : never>
    },
    "/quantity/count": {
        params: QuantityCountProps,
        response: QuantityCountResponse
    }
}

// ==================== Find Many ==================== //

const quantityFindManyCached = async <T extends QuantityFindManyProps>(params: T) => {
    "use cache";
    cacheLife(cacheLifeApi);
    cacheTag("/api/quantity");
    return QuantityService.findMany<T>(params);
};

export const QuantityFindManyApi = async <T extends QuantityFindManyProps>(request: NextRequest) => {
    try {
        const params: T = parseAndDecodeParams(request);
        const response = await quantityFindManyCached<T>(params);
        return NextResponse.json(response, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "QuantityFindManyApi -> " + (error as Error).message }, { status: 500 });
    }
};

// ==================== Find First ==================== //

const quantityFindFirstCached = async <T extends QuantityFindFirstProps>(params: T) => {
    "use cache";
    cacheLife(cacheLifeApi);
    cacheTag("/api/quantity/first");
    return QuantityService.findFirst<T>(params);
};

export const QuantityFindFirstApi = async <T extends QuantityFindFirstProps>(request: NextRequest) => {
    try {
        const params: T = parseAndDecodeParams(request);
        const response = await quantityFindFirstCached<T>(params);
        return NextResponse.json(response, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "QuantityFindFirstApi -> " + (error as Error).message }, { status: 500 });
    }
};

// ==================== Find Unique ==================== //

const quantityFindUniqueCached = async <T extends QuantityFindUniqueProps>(params: T) => {
    "use cache";
    cacheLife(cacheLifeApi);
    cacheTag("/api/quantity/unique");
    return QuantityService.findUnique<T>(params);
};

export const QuantityFindUniqueApi = async <T extends QuantityFindUniqueProps>(request: NextRequest) => {
    try {
        const params: T = parseAndDecodeParams(request);
        const response = await quantityFindUniqueCached<T>(params);
        return NextResponse.json(response, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "QuantityFindUniqueApi -> " + (error as Error).message }, { status: 500 });
    }
};

// ==================== Count ==================== //

const quantityCountCached = async (params: QuantityCountProps) => {
    "use cache";
    cacheLife(cacheLifeApi);
    cacheTag("/api/quantity/count");
    return QuantityService.count(params);
};

export const QuantityCountApi = async (request: NextRequest) => {
    try {
        const params: QuantityCountProps = parseAndDecodeParams(request);
        const response = await quantityCountCached(params);
        return NextResponse.json(response, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "QuantityCountApi -> " + (error as Error).message }, { status: 500 });
    }
};
