import FruitService from "@services/class/FruitClass";
import { CountFruitProps, CountFruitResponse, FindManyFruitProps, FindManyFruitResponse, FindUniqueFruitProps, FindUniqueFruitResponse } from "@services/types/FruitType";
import { parseAndDecodeParams, revalidate } from "@utils/FetchConfig";
import { unstable_cache as cache } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

// ============== API Routes Types ============== //

export type FruitRoutes<Input> = {
    "/fruit": {
        params: FindManyFruitProps,
        response: FindManyFruitResponse<Input extends FindManyFruitProps ? Input : never>
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

const fruitListCached = cache(async <T extends FindManyFruitProps>(params: T) => FruitService.findMany(params), ["fruit"], {
    revalidate,
    tags: ["fruit"],
});

export const SelectFruitList = async <T extends FindManyFruitProps>(request: NextRequest) => {
    try {
        const params: T = parseAndDecodeParams(request);
        const response = await fruitListCached<T>(params);
        return NextResponse.json(response, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "getFruitListCached -> " + (error as Error).message }, { status: 500 });
    }
};

// ==================== Find Unique ==================== //

const fruitUniqueCached = cache(
    async <T extends FindUniqueFruitProps>(params: T) => FruitService.findUnique(params),
    ["fruit/unique"],
    { revalidate, tags: ["fruit/unique"] },
);

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

const fruitCountCached = cache(async (params: CountFruitProps) => FruitService.count(params), ["fruit/count"], {
    revalidate,
    tags: ["fruit/count"],
});

export const SelectFruitCount = async (request: NextRequest) => {
    try {
        const params: CountFruitProps = parseAndDecodeParams(request);
        const response = await fruitCountCached(params);
        return NextResponse.json(response, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "getFruitCountCached -> " + (error as Error).message }, { status: 500 });
    }
};
