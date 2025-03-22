import QuantityService from "@services/class/QuantityClass";
import { CountQuantityProps, CountQuantityResponse, FindManyQuantityProps, FindManyQuantityResponse, FindUniqueQuantityProps, FindUniqueQuantityResponse } from "@services/types/QuantityType";
import { parseAndDecodeParams, revalidate } from "@utils/FetchV2";
import { unstable_cache as cache } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

// ============== API Routes Types ============== //

export type QuantityRoutes<T> = {
    "/quantity": {
        props: FindManyQuantityProps,
        response: FindManyQuantityResponse<T extends FindManyQuantityProps ? T : never>
    },
    "/quantity/unique": {
        props: FindUniqueQuantityProps,
        response: FindUniqueQuantityResponse<T extends FindUniqueQuantityProps ? T : never>
    },
    "/quantity/count": {
        props: CountQuantityProps,
        response: CountQuantityResponse
    }
}

// ==================== Find Many ==================== //

const quantityListCached = cache(async (params: FindManyQuantityProps) => QuantityService.findMany(params), ["quantity"], {
    revalidate,
    tags: ["quantity"],
});

export const SelectQuantityList = async (request: NextRequest) => {
    try {
        const params = parseAndDecodeParams(request);
        const response = await quantityListCached(params);
        return NextResponse.json(response, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "getQuantityListCached -> " + (error as Error).message }, { status: 500 });
    }
};

// ==================== Find Unique ==================== //

const quantityUniqueCached = cache(
    async <T extends FindUniqueQuantityProps>(params: T) => QuantityService.findUnique(params),
    ["quantity/unique"],
    { revalidate, tags: ["quantity/unique"] },
);

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

const quantityCountCached = cache(async (params: CountQuantityProps) => QuantityService.count(params), ["quantity/count"], {
    revalidate,
    tags: ["quantity/count"],
});

export const SelectQuantityCount = async (request: NextRequest) => {
    try {
        const params: CountQuantityProps = parseAndDecodeParams(request);
        const response = await quantityCountCached(params);
        return NextResponse.json(response, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "getQuantityCountCached -> " + (error as Error).message }, { status: 500 });
    }
};
