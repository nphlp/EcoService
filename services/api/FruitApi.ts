import FruitService from "@services/class/FruitClass";
import { CountFruitProps, CountFruitResponse, FindFirstFruitProps, FindFirstFruitResponse, FindManyFruitProps, FindManyFruitResponse, FindUniqueFruitProps, FindUniqueFruitResponse } from "@services/types/FruitType";
import { cacheLifeApi, parseAndDecodeParams } from "@utils/FetchConfig";
import { unstable_cacheLife as cacheLife, unstable_cacheTag as cacheTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

// ============== API Routes Types ============== //

export type FruitRoutes<Input> = {
    "/fruit": {
        params: FindManyFruitProps,
        response: FindManyFruitResponse<Input extends FindManyFruitProps ? Input : never>
    },
    "/fruit/first": {
        params: FindFirstFruitProps,
        response: FindFirstFruitResponse<Input extends FindFirstFruitProps ? Input : never>
    },
    "/fruit/unique": {
        params: FindUniqueFruitProps,
        response: FindUniqueFruitResponse<Input extends FindUniqueFruitProps ? Input : never>
    },
    "/fruit/count": {
        params: CountFruitProps,
        response: CountFruitResponse
    }
}

// ==================== Find Many ==================== //

const fruitListCached = async <T extends FindManyFruitProps>(params: T) => {
    "use cache";
    cacheLife(cacheLifeApi);
    cacheTag("/api/fruit");
    return FruitService.findMany<T>(params);
};

export const SelectFruitList = async <T extends FindManyFruitProps>(request: NextRequest) => {
    try {
        const params: T = parseAndDecodeParams(request);
        const response = await fruitListCached<T>(params);
        return NextResponse.json(response, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "getFruitListCached -> " + (error as Error).message }, { status: 500 });
    }
};

// ==================== Find First ==================== //

const fruitFirstCached = async <T extends FindFirstFruitProps>(params: T) => {
    "use cache";
    cacheLife(cacheLifeApi);
    cacheTag("/api/fruit/first");
    return FruitService.findFirst<T>(params);
};

export const SelectFruitFirst = async <T extends FindFirstFruitProps>(request: NextRequest) => {
    try {
        const params: T = parseAndDecodeParams(request);
        const response = await fruitFirstCached<T>(params);
        return NextResponse.json(response, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "getFruitFirstCached -> " + (error as Error).message }, { status: 500 });
    }
};

// ==================== Find Unique ==================== //

const fruitUniqueCached = async <T extends FindUniqueFruitProps>(params: T) => {
    "use cache";
    cacheLife(cacheLifeApi);
    cacheTag("/api/fruit/unique");
    return FruitService.findUnique<T>(params);
};

export const SelectFruitUnique = async <T extends FindUniqueFruitProps>(request: NextRequest) => {
    try {
        const params: T = parseAndDecodeParams(request);
        const response = await fruitUniqueCached<T>(params);
        return NextResponse.json(response, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "getFruitUniqueCached -> " + (error as Error).message }, { status: 500 });
    }
};

// ==================== Count ==================== //

const fruitCountCached = async (params: CountFruitProps) => {
    "use cache";
    cacheLife(cacheLifeApi);
    cacheTag("/api/fruit/count");
    return FruitService.count(params);
};

export const SelectFruitCount = async (request: NextRequest) => {
    try {
        const params: CountFruitProps = parseAndDecodeParams(request);
        const response = await fruitCountCached(params);
        return NextResponse.json(response, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "getFruitCountCached -> " + (error as Error).message }, { status: 500 });
    }
};
