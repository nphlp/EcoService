import FruitService from "@services/class/FruitClass";
import { CountFruitProps, CountFruitResponse, FindManyFruitProps, FindManyFruitResponse, FindUniqueFruitProps, FindUniqueFruitResponse } from "@services/types/FruitType";
import { parseAndDecodeParams, revalidate } from "@utils/FetchV2";
import { unstable_cache as cache } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

// ============== API Routes Types ============== //

export type FruitRoutes<T> = {
    "/fruit": {
        props: FindManyFruitProps,
        response: FindManyFruitResponse<T extends FindManyFruitProps ? T : never>
    },
    "/fruit/unique": {
        props: FindUniqueFruitProps,
        response: FindUniqueFruitResponse<T extends FindUniqueFruitProps ? T : never>
    },
    "/fruit/count": {
        props: CountFruitProps,
        response: CountFruitResponse
    }
}

// ==================== Find Many ==================== //

const fruitListCached = cache(async (params: FindManyFruitProps) => FruitService.findMany(params), ["fruit"], {
    revalidate,
    tags: ["fruit"],
});

export const SelectFruitList = async (request: NextRequest) => {
    try {
        const params = parseAndDecodeParams(request);
        const response = await fruitListCached(params);
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
