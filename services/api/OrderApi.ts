import { OrderCountCached, OrderFindFirstCached, OrderFindManyCached, OrderFindUniqueCached } from "@services/cached/index";
import { OrderCountProps, OrderCountResponse, OrderFindFirstProps, OrderFindFirstResponse, OrderFindManyProps, OrderFindManyResponse, OrderFindUniqueProps, OrderFindUniqueResponse } from "@services/types/index";
import { parseAndDecodeParams } from "@utils/FetchConfig";
import { NextRequest, NextResponse } from "next/server";

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

export const OrderFindManyApi = async <T extends OrderFindManyProps>(request: NextRequest) => {
    try {
        const params: T = parseAndDecodeParams(request);
        const response = await OrderFindManyCached<T>(params);
        return NextResponse.json(response, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "OrderFindManyApi -> " + (error as Error).message }, { status: 500 });
    }
};

export const OrderFindFirstApi = async <T extends OrderFindFirstProps>(request: NextRequest) => {
    try {
        const params: T = parseAndDecodeParams(request);
        const response = await OrderFindFirstCached<T>(params);
        return NextResponse.json(response, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "OrderFindFirstApi -> " + (error as Error).message }, { status: 500 });
    }
};

export const OrderFindUniqueApi = async <T extends OrderFindUniqueProps>(request: NextRequest) => {
    try {
        const params: T = parseAndDecodeParams(request);
        const response = await OrderFindUniqueCached<T>(params);
        return NextResponse.json(response, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "OrderFindUniqueApi -> " + (error as Error).message }, { status: 500 });
    }
};

export const OrderCountApi = async (request: NextRequest) => {
    try {
        const params: OrderCountProps = parseAndDecodeParams(request);
        const response = await OrderCountCached(params);
        return NextResponse.json(response, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "OrderCountApi -> " + (error as Error).message }, { status: 500 });
    }
};
