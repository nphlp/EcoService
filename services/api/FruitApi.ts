import FruitService from "@services/class/FruitClass";
import { FruitCountProps, FruitCountResponse, FruitFindFirstProps, FruitFindFirstResponse, FruitFindManyProps, FruitFindManyResponse, FruitFindUniqueProps, FruitFindUniqueResponse } from "@services/types/FruitType";
import { cacheLifeApi, parseAndDecodeParams } from "@utils/FetchConfig";
import { unstable_cacheLife as cacheLife, unstable_cacheTag as cacheTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

// ============== API Routes Types ============== //

export type FruitRoutes<Input> = {
    "/fruit": {
        params: FruitFindManyProps,
        response: FruitFindManyResponse<Input extends FruitFindManyProps ? Input : never>
    },
    "/fruit/first": {
        params: FruitFindFirstProps,
        response: FruitFindFirstResponse<Input extends FruitFindFirstProps ? Input : never>
    },
    "/fruit/unique": {
        params: FruitFindUniqueProps,
        response: FruitFindUniqueResponse<Input extends FruitFindUniqueProps ? Input : never>
    },
    "/fruit/count": {
        params: FruitCountProps,
        response: FruitCountResponse
    }
}

// ==================== Find Many ==================== //

const fruitFindManyCached = async <T extends FruitFindManyProps>(params: T) => {
    "use cache";
    cacheLife(cacheLifeApi);
    cacheTag("/api/fruit");
    return FruitService.findMany<T>(params);
};

export const FruitFindManyApi = async <T extends FruitFindManyProps>(request: NextRequest) => {
    try {
        const params: T = parseAndDecodeParams(request);
        const response = await fruitFindManyCached<T>(params);
        return NextResponse.json(response, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "FruitFindManyApi -> " + (error as Error).message }, { status: 500 });
    }
};

// ==================== Find First ==================== //

const fruitFindFirstCached = async <T extends FruitFindFirstProps>(params: T) => {
    "use cache";
    cacheLife(cacheLifeApi);
    cacheTag("/api/fruit/first");
    return FruitService.findFirst<T>(params);
};

export const FruitFindFirstApi = async <T extends FruitFindFirstProps>(request: NextRequest) => {
    try {
        const params: T = parseAndDecodeParams(request);
        const response = await fruitFindFirstCached<T>(params);
        return NextResponse.json(response, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "FruitFindFirstApi -> " + (error as Error).message }, { status: 500 });
    }
};

// ==================== Find Unique ==================== //

const fruitFindUniqueCached = async <T extends FruitFindUniqueProps>(params: T) => {
    "use cache";
    cacheLife(cacheLifeApi);
    cacheTag("/api/fruit/unique");
    return FruitService.findUnique<T>(params);
};

export const FruitFindUniqueApi = async <T extends FruitFindUniqueProps>(request: NextRequest) => {
    try {
        const params: T = parseAndDecodeParams(request);
        const response = await fruitFindUniqueCached<T>(params);
        return NextResponse.json(response, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "FruitFindUniqueApi -> " + (error as Error).message }, { status: 500 });
    }
};

// ==================== Count ==================== //

const fruitCountCached = async (params: FruitCountProps) => {
    "use cache";
    cacheLife(cacheLifeApi);
    cacheTag("/api/fruit/count");
    return FruitService.count(params);
};

export const FruitCountApi = async (request: NextRequest) => {
    try {
        const params: FruitCountProps = parseAndDecodeParams(request);
        const response = await fruitCountCached(params);
        return NextResponse.json(response, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "FruitCountApi -> " + (error as Error).message }, { status: 500 });
    }
};
