import { Prisma } from "@prisma/client";
import { GetResult, InternalArgs, PrismaClientOptions } from "@prisma/client/runtime/library";
import { OrderCountCached, OrderFindFirstCached, OrderFindManyCached, OrderFindUniqueCached } from "@services/cached";
import { ResponseFormat, parseAndDecodeParams } from "@utils/FetchConfig";
import { NextRequest, NextResponse } from "next/server";

// ========== Types ========== //

export type OrderFindManyProps<T extends Prisma.OrderFindManyArgs> = Prisma.SelectSubset<T, Prisma.OrderFindManyArgs>;
export type OrderFindManyResponse<T extends Prisma.OrderFindManyArgs> = GetResult<
    Prisma.$OrderPayload<InternalArgs>,
    T,
    "findMany",
    PrismaClientOptions
>;

export type OrderFindFirstProps<T extends Prisma.OrderFindFirstArgs> = Prisma.SelectSubset<
    T,
    Prisma.OrderFindFirstArgs
>;
export type OrderFindFirstResponse<T extends Prisma.OrderFindFirstArgs> = GetResult<
    Prisma.$OrderPayload<InternalArgs>,
    T,
    "findFirst",
    PrismaClientOptions
>;

export type OrderFindUniqueProps<T extends Prisma.OrderFindUniqueArgs> = Prisma.SelectSubset<
    T,
    Prisma.OrderFindUniqueArgs
>;
export type OrderFindUniqueResponse<T extends Prisma.OrderFindUniqueArgs> = GetResult<
    Prisma.$OrderPayload<InternalArgs>,
    T,
    "findUnique",
    PrismaClientOptions
>;

export type OrderCountProps<T extends Prisma.OrderCountArgs> = Prisma.SelectSubset<T, Prisma.OrderCountArgs>;
export type OrderCountResponse<T extends Prisma.OrderCountArgs> =
    // eslint-disable-next-line
    T extends { select: any }
        ? T["select"] extends true
            ? number
            : Prisma.GetScalarType<T["select"], Prisma.OrderCountAggregateOutputType>
        : number;

// ========== Routes ========== //

type RouteResponse<T> = Promise<NextResponse<ResponseFormat<T>>>;

export type OrderRoutes<Input> = {
    "/order/findMany": <T extends Prisma.OrderFindManyArgs>() => {
        params: OrderFindManyProps<T>;
        response: OrderFindManyResponse<Input extends OrderFindManyProps<T> ? Input : never>;
    };
    "/order/findFirst": <T extends Prisma.OrderFindFirstArgs>() => {
        params: OrderFindFirstProps<T>;
        response: OrderFindFirstResponse<Input extends OrderFindFirstProps<T> ? Input : never>;
    };
    "/order/findUnique": <T extends Prisma.OrderFindUniqueArgs>() => {
        params: OrderFindUniqueProps<T>;
        response: OrderFindUniqueResponse<Input extends OrderFindUniqueProps<T> ? Input : never>;
    };
    "/order/count": <T extends Prisma.OrderCountArgs>() => {
        params: OrderCountProps<T>;
        response: OrderCountResponse<Input extends OrderCountProps<T> ? Input : never>;
    };
};

// ========== Services ========== //

export const OrderFindManyApi = async <T extends Prisma.OrderFindManyArgs>(
    request: NextRequest,
): RouteResponse<OrderFindManyResponse<T>> => {
    try {
        const params: OrderFindManyProps<T> = parseAndDecodeParams(request);
        const response: OrderFindManyResponse<T> = await OrderFindManyCached(params);
        return NextResponse.json({ data: response }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "OrderFindManyApi -> " + (error as Error).message }, { status: 500 });
    }
};

export const OrderFindFirstApi = async <T extends Prisma.OrderFindFirstArgs>(
    request: NextRequest,
): RouteResponse<OrderFindFirstResponse<T>> => {
    try {
        const params: OrderFindFirstProps<T> = parseAndDecodeParams(request);
        const response: OrderFindFirstResponse<T> = await OrderFindFirstCached(params);
        return NextResponse.json({ data: response }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "OrderFindFirstApi -> " + (error as Error).message }, { status: 500 });
    }
};

export const OrderFindUniqueApi = async <T extends Prisma.OrderFindUniqueArgs>(
    request: NextRequest,
): RouteResponse<OrderFindUniqueResponse<T>> => {
    try {
        const params: OrderFindUniqueProps<T> = parseAndDecodeParams(request);
        const response: OrderFindUniqueResponse<T> = await OrderFindUniqueCached(params);
        return NextResponse.json({ data: response }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "OrderFindUniqueApi -> " + (error as Error).message }, { status: 500 });
    }
};

export const OrderCountApi = async <T extends Prisma.OrderCountArgs>(
    request: NextRequest,
): RouteResponse<OrderCountResponse<T>> => {
    try {
        const params: OrderCountProps<T> = parseAndDecodeParams(request);
        const response: OrderCountResponse<T> = await OrderCountCached(params);
        return NextResponse.json({ data: response }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "OrderCountApi -> " + (error as Error).message }, { status: 500 });
    }
};
