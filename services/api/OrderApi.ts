import OrderService from "@services/class/OrderClass";
import { CountOrderProps, CountOrderResponse, FindFirstOrderProps, FindFirstOrderResponse, FindManyOrderProps, FindManyOrderResponse, FindUniqueOrderProps, FindUniqueOrderResponse } from "@services/types/OrderType";
import { cacheLifeApi, parseAndDecodeParams } from "@utils/FetchConfig";
import { unstable_cacheLife as cacheLife, unstable_cacheTag as cacheTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

// ============== API Routes Types ============== //

export type OrderRoutes<Input> = {
    "/order": {
        params: FindManyOrderProps,
        response: FindManyOrderResponse<Input extends FindManyOrderProps ? Input : never>
    },
    "/order/first": {
        params: FindFirstOrderProps,
        response: FindFirstOrderResponse<Input extends FindFirstOrderProps ? Input : never>
    },
    "/order/unique": {
        params: FindUniqueOrderProps,
        response: FindUniqueOrderResponse<Input extends FindUniqueOrderProps ? Input : never>
    },
    "/order/count": {
        params: CountOrderProps,
        response: CountOrderResponse
    }
}

// ==================== Find Many ==================== //

const orderListCached = async <T extends FindManyOrderProps>(params: T) => {
    "use cache";
    cacheLife(cacheLifeApi);
    cacheTag("/api/order");
    return OrderService.findMany<T>(params);
};

export const SelectOrderList = async <T extends FindManyOrderProps>(request: NextRequest) => {
    try {
        const params: T = parseAndDecodeParams(request);
        const response = await orderListCached<T>(params);
        return NextResponse.json(response, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "getOrderListCached -> " + (error as Error).message }, { status: 500 });
    }
};

// ==================== Find First ==================== //

const orderFirstCached = async <T extends FindFirstOrderProps>(params: T) => {
    "use cache";
    cacheLife(cacheLifeApi);
    cacheTag("/api/order/first");
    return OrderService.findFirst<T>(params);
};

export const SelectOrderFirst = async <T extends FindFirstOrderProps>(request: NextRequest) => {
    try {
        const params: T = parseAndDecodeParams(request);
        const response = await orderFirstCached<T>(params);
        return NextResponse.json(response, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "getOrderFirstCached -> " + (error as Error).message }, { status: 500 });
    }
};

// ==================== Find Unique ==================== //

const orderUniqueCached = async <T extends FindUniqueOrderProps>(params: T) => {
    "use cache";
    cacheLife(cacheLifeApi);
    cacheTag("/api/order/unique");
    return OrderService.findUnique<T>(params);
};

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

const orderCountCached = async (params: CountOrderProps) => {
    "use cache";
    cacheLife(cacheLifeApi);
    cacheTag("/api/order/count");
    return OrderService.count(params);
};

export const SelectOrderCount = async (request: NextRequest) => {
    try {
        const params: CountOrderProps = parseAndDecodeParams(request);
        const response = await orderCountCached(params);
        return NextResponse.json(response, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "getOrderCountCached -> " + (error as Error).message }, { status: 500 });
    }
};
