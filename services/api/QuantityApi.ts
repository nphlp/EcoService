import { Prisma } from "@prisma/client";
import { GetResult, InternalArgs, PrismaClientOptions } from "@prisma/client/runtime/library";
import {
    QuantityCountCached,
    QuantityFindFirstCached,
    QuantityFindManyCached,
    QuantityFindUniqueCached,
} from "@services/cached";
import { ResponseFormat, parseAndDecodeParams } from "@utils/FetchConfig";
import { NextRequest, NextResponse } from "next/server";

// ========== Types ========== //

export type QuantityFindManyProps<T extends Prisma.QuantityFindManyArgs> = Prisma.SelectSubset<
    T,
    Prisma.QuantityFindManyArgs
>;
export type QuantityFindManyResponse<T extends Prisma.QuantityFindManyArgs> = GetResult<
    Prisma.$QuantityPayload<InternalArgs>,
    T,
    "findMany",
    PrismaClientOptions
>;

export type QuantityFindFirstProps<T extends Prisma.QuantityFindFirstArgs> = Prisma.SelectSubset<
    T,
    Prisma.QuantityFindFirstArgs
>;
export type QuantityFindFirstResponse<T extends Prisma.QuantityFindFirstArgs> = GetResult<
    Prisma.$QuantityPayload<InternalArgs>,
    T,
    "findFirst",
    PrismaClientOptions
>;

export type QuantityFindUniqueProps<T extends Prisma.QuantityFindUniqueArgs> = Prisma.SelectSubset<
    T,
    Prisma.QuantityFindUniqueArgs
>;
export type QuantityFindUniqueResponse<T extends Prisma.QuantityFindUniqueArgs> = GetResult<
    Prisma.$QuantityPayload<InternalArgs>,
    T,
    "findUnique",
    PrismaClientOptions
>;

export type QuantityCountProps<T extends Prisma.QuantityCountArgs> = Prisma.SelectSubset<T, Prisma.QuantityCountArgs>;
export type QuantityCountResponse<T extends Prisma.QuantityCountArgs> =
    // eslint-disable-next-line
    T extends { select: any }
        ? T["select"] extends true
            ? number
            : Prisma.GetScalarType<T["select"], Prisma.QuantityCountAggregateOutputType>
        : number;

// ========== Routes ========== //

type RouteResponse<T> = Promise<NextResponse<ResponseFormat<T>>>;

export type QuantityRoutes<Input> = {
    "/quantity/findMany": <T extends Prisma.QuantityFindManyArgs>() => {
        params: QuantityFindManyProps<T>;
        response: QuantityFindManyResponse<Input extends QuantityFindManyProps<T> ? Input : never>;
    };
    "/quantity/findFirst": <T extends Prisma.QuantityFindFirstArgs>() => {
        params: QuantityFindFirstProps<T>;
        response: QuantityFindFirstResponse<Input extends QuantityFindFirstProps<T> ? Input : never>;
    };
    "/quantity/findUnique": <T extends Prisma.QuantityFindUniqueArgs>() => {
        params: QuantityFindUniqueProps<T>;
        response: QuantityFindUniqueResponse<Input extends QuantityFindUniqueProps<T> ? Input : never>;
    };
    "/quantity/count": <T extends Prisma.QuantityCountArgs>() => {
        params: QuantityCountProps<T>;
        response: QuantityCountResponse<Input extends QuantityCountProps<T> ? Input : never>;
    };
};

// ========== Services ========== //

export const QuantityFindManyApi = async <T extends Prisma.QuantityFindManyArgs>(
    request: NextRequest,
): RouteResponse<QuantityFindManyResponse<T>> => {
    try {
        const params: QuantityFindManyProps<T> = parseAndDecodeParams(request);
        const response: QuantityFindManyResponse<T> = await QuantityFindManyCached(params);
        return NextResponse.json({ data: response }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "QuantityFindManyApi -> " + (error as Error).message }, { status: 500 });
    }
};

export const QuantityFindFirstApi = async <T extends Prisma.QuantityFindFirstArgs>(
    request: NextRequest,
): RouteResponse<QuantityFindFirstResponse<T>> => {
    try {
        const params: QuantityFindFirstProps<T> = parseAndDecodeParams(request);
        const response: QuantityFindFirstResponse<T> = await QuantityFindFirstCached(params);
        return NextResponse.json({ data: response }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "QuantityFindFirstApi -> " + (error as Error).message }, { status: 500 });
    }
};

export const QuantityFindUniqueApi = async <T extends Prisma.QuantityFindUniqueArgs>(
    request: NextRequest,
): RouteResponse<QuantityFindUniqueResponse<T>> => {
    try {
        const params: QuantityFindUniqueProps<T> = parseAndDecodeParams(request);
        const response: QuantityFindUniqueResponse<T> = await QuantityFindUniqueCached(params);
        return NextResponse.json({ data: response }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "QuantityFindUniqueApi -> " + (error as Error).message }, { status: 500 });
    }
};

export const QuantityCountApi = async <T extends Prisma.QuantityCountArgs>(
    request: NextRequest,
): RouteResponse<QuantityCountResponse<T>> => {
    try {
        const params: QuantityCountProps<T> = parseAndDecodeParams(request);
        const response: QuantityCountResponse<T> = await QuantityCountCached(params);
        return NextResponse.json({ data: response }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "QuantityCountApi -> " + (error as Error).message }, { status: 500 });
    }
};
