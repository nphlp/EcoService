import OrderService from "@services/class/OrderClass";
import { CountOrderProps, CountOrderResponse, FindManyOrderProps, FindManyOrderResponse, FindUniqueOrderProps, FindUniqueOrderResponse } from "@services/types/OrderType";
import { parseAndDecodeParams, revalidate } from "@utils/FetchV2";
import { unstable_cache as cache } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

// ============== API Routes Types ============== //

export type OrderRoutes<T> = {
    "/order": {
        props: FindManyOrderProps,
        response: FindManyOrderResponse<T extends FindManyOrderProps ? T : never>
    },
    "/order/unique": {
        props: FindUniqueOrderProps,
        response: FindUniqueOrderResponse<T extends FindUniqueOrderProps ? T : never>
    },
    "/order/count": {
        props: CountOrderProps,
        response: CountOrderResponse
    }
}

// ==================== Find Many ==================== //

const orderListCached = cache(async (params: FindManyOrderProps) => OrderService.findMany(params), ["order"], {
    revalidate,
    tags: ["order"],
});

export const SelectOrderList = async (request: NextRequest) => {
    try {
        const params = parseAndDecodeParams(request);
        const response = await orderListCached(params);
        return NextResponse.json(response, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "getOrderListCached -> " + (error as Error).message }, { status: 500 });
    }
};

// ==================== Find Unique ==================== //

const orderUniqueCached = cache(
    async <T extends FindUniqueOrderProps>(params: T) => OrderService.findUnique(params),
    ["order/unique"],
    { revalidate, tags: ["order/unique"] },
);

export const SelectOrderUnique = async <T extends FindUniqueOrderProps>(request: NextRequest) => {
    try {
        const params: T = parseAndDecodeParams(request);
        const response = await orderUniqueCached<T>(params);
        return NextResponse.json(response, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "getOrderUniqueCached -> " + (error as Error).message }, { status: 500 });
    }
};

// ==================== Count ==================== //

const orderCountCached = cache(async (params: CountOrderProps) => OrderService.count(params), ["order/count"], {
    revalidate,
    tags: ["order/count"],
});

export const SelectOrderCount = async (request: NextRequest) => {
    try {
        const params: CountOrderProps = parseAndDecodeParams(request);
        const response = await orderCountCached(params);
        return NextResponse.json(response, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "getOrderCountCached -> " + (error as Error).message }, { status: 500 });
    }
};
