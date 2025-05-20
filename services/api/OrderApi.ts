import OrderService from "@services/class/OrderClass";
import { OrderCountProps, OrderCountResponse, OrderFindFirstProps, OrderFindFirstResponse, OrderFindManyProps, OrderFindManyResponse, OrderFindUniqueProps, OrderFindUniqueResponse } from "@services/types/OrderType";
import { cacheLifeApi, parseAndDecodeParams } from "@utils/FetchConfig";
import { unstable_cacheLife as cacheLife, unstable_cacheTag as cacheTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

// ============== API Routes Types ============== //

export type OrderRoutes<Input> = {
    "/order": {
        params: OrderFindManyProps,
        response: OrderFindManyResponse<Input extends OrderFindManyProps ? Input : never>
    },
    "/order/first": {
        params: OrderFindFirstProps,
        response: OrderFindFirstResponse<Input extends OrderFindFirstProps ? Input : never>
    },
    "/order/unique": {
        params: OrderFindUniqueProps,
        response: OrderFindUniqueResponse<Input extends OrderFindUniqueProps ? Input : never>
    },
    "/order/count": {
        params: OrderCountProps,
        response: OrderCountResponse
    }
}

// ==================== Find Many ==================== //

const orderFindManyCached = async <T extends OrderFindManyProps>(params: T) => {
    "use cache";
    cacheLife(cacheLifeApi);
    cacheTag("/api/order");
    return OrderService.findMany<T>(params);
};

export const OrderFindManyApi = async <T extends OrderFindManyProps>(request: NextRequest) => {
    try {
        const params: T = parseAndDecodeParams(request);
        const response = await orderFindManyCached<T>(params);
        return NextResponse.json(response, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "OrderFindManyApi -> " + (error as Error).message }, { status: 500 });
    }
};

// ==================== Find First ==================== //

const orderFindFirstCached = async <T extends OrderFindFirstProps>(params: T) => {
    "use cache";
    cacheLife(cacheLifeApi);
    cacheTag("/api/order/first");
    return OrderService.findFirst<T>(params);
};

export const OrderFindFirstApi = async <T extends OrderFindFirstProps>(request: NextRequest) => {
    try {
        const params: T = parseAndDecodeParams(request);
        const response = await orderFindFirstCached<T>(params);
        return NextResponse.json(response, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "OrderFindFirstApi -> " + (error as Error).message }, { status: 500 });
    }
};

// ==================== Find Unique ==================== //

const orderFindUniqueCached = async <T extends OrderFindUniqueProps>(params: T) => {
    "use cache";
    cacheLife(cacheLifeApi);
    cacheTag("/api/order/unique");
    return OrderService.findUnique<T>(params);
};

export const OrderFindUniqueApi = async <T extends OrderFindUniqueProps>(request: NextRequest) => {
    try {
        const params: T = parseAndDecodeParams(request);
        const response = await orderFindUniqueCached<T>(params);
        return NextResponse.json(response, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "OrderFindUniqueApi -> " + (error as Error).message }, { status: 500 });
    }
};

// ==================== Count ==================== //

const orderCountCached = async (params: OrderCountProps) => {
    "use cache";
    cacheLife(cacheLifeApi);
    cacheTag("/api/order/count");
    return OrderService.count(params);
};

export const OrderCountApi = async (request: NextRequest) => {
    try {
        const params: OrderCountProps = parseAndDecodeParams(request);
        const response = await orderCountCached(params);
        return NextResponse.json(response, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "OrderCountApi -> " + (error as Error).message }, { status: 500 });
    }
};
