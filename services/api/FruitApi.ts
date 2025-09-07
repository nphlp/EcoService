import PrismaInstance from "@lib/prisma";
import { Prisma } from "@prisma/client";
import { GetResult, InternalArgs, PrismaClientOptions } from "@prisma/client/runtime/library";
import { ResponseFormat, parseAndDecodeParams } from "@utils/FetchConfig";
import { NextRequest, NextResponse } from "next/server";

// ========== Utils ========== //

type RouteResponse<T> = Promise<NextResponse<ResponseFormat<T>>>;

// ========== Types ========== //

export type FruitFindManyProps<T extends Prisma.FruitFindManyArgs> = Prisma.SelectSubset<T, Prisma.FruitFindManyArgs>;
export type FruitFindManyResponse<T extends Prisma.FruitFindManyArgs> = GetResult<
    Prisma.$FruitPayload<InternalArgs>,
    T,
    "findMany",
    PrismaClientOptions
>;

export type FruitFindFirstProps<T extends Prisma.FruitFindFirstArgs> = Prisma.SelectSubset<
    T,
    Prisma.FruitFindFirstArgs
>;
export type FruitFindFirstResponse<T extends Prisma.FruitFindFirstArgs> = GetResult<
    Prisma.$FruitPayload<InternalArgs>,
    T,
    "findFirst",
    PrismaClientOptions
>;

export type FruitFindUniqueProps<T extends Prisma.FruitFindUniqueArgs> = Prisma.SelectSubset<
    T,
    Prisma.FruitFindUniqueArgs
>;
export type FruitFindUniqueResponse<T extends Prisma.FruitFindUniqueArgs> = GetResult<
    Prisma.$FruitPayload<InternalArgs>,
    T,
    "findUnique",
    PrismaClientOptions
>;

export type FruitCountProps<T extends Prisma.FruitCountArgs> = Prisma.SelectSubset<T, Prisma.FruitCountArgs>;
export type FruitCountResponse<T extends Prisma.FruitCountArgs> =
    // eslint-disable-next-line
    T extends { select: any }
        ? T["select"] extends true
            ? number
            : Prisma.GetScalarType<T["select"], Prisma.FruitCountAggregateOutputType>
        : number;

// ========== Services ========== //

export type FruitRoutes<Input> = {
    "/fruit/findMany": <T extends Prisma.FruitFindManyArgs>() => {
        params: FruitFindManyProps<T>;
        response: FruitFindManyResponse<Input extends FruitFindManyProps<T> ? Input : never>;
    };
    "/fruit/findFirst": <T extends Prisma.FruitFindFirstArgs>() => {
        params: FruitFindFirstProps<T>;
        response: FruitFindFirstResponse<Input extends FruitFindFirstProps<T> ? Input : never>;
    };
    "/fruit/findUnique": <T extends Prisma.FruitFindUniqueArgs>() => {
        params: FruitFindUniqueProps<T>;
        response: FruitFindUniqueResponse<Input extends FruitFindUniqueProps<T> ? Input : never>;
    };
    "/fruit/count": <T extends Prisma.FruitCountArgs>() => {
        params: FruitCountProps<T>;
        response: FruitCountResponse<Input extends FruitCountProps<T> ? Input : never>;
    };
};

export const FruitFindManyApi = async <T extends Prisma.FruitFindManyArgs>(
    request: NextRequest,
): RouteResponse<FruitFindManyResponse<T>> => {
    try {
        const params: FruitFindManyProps<T> = parseAndDecodeParams(request);
        const response: FruitFindManyResponse<T> = await PrismaInstance.fruit.findMany(params);
        return NextResponse.json({ data: response }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "FruitFindManyApi -> " + (error as Error).message }, { status: 500 });
    }
};

export const FruitFindFirstApi = async <T extends Prisma.FruitFindFirstArgs>(
    request: NextRequest,
): RouteResponse<FruitFindFirstResponse<T>> => {
    try {
        const params: FruitFindFirstProps<T> = parseAndDecodeParams(request);
        const response: FruitFindFirstResponse<T> = await PrismaInstance.fruit.findFirst(params);
        return NextResponse.json({ data: response }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "FruitFindFirstApi -> " + (error as Error).message }, { status: 500 });
    }
};

export const FruitFindUniqueApi = async <T extends Prisma.FruitFindUniqueArgs>(
    request: NextRequest,
): RouteResponse<FruitFindUniqueResponse<T>> => {
    try {
        const params: FruitFindUniqueProps<T> = parseAndDecodeParams(request);
        const response: FruitFindUniqueResponse<T> = await PrismaInstance.fruit.findUnique(params);
        return NextResponse.json({ data: response }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "FruitFindUniqueApi -> " + (error as Error).message }, { status: 500 });
    }
};

export const FruitCountApi = async <T extends Prisma.FruitCountArgs>(
    request: NextRequest,
): RouteResponse<FruitCountResponse<T>> => {
    try {
        const params: FruitCountProps<T> = parseAndDecodeParams(request);
        const response: FruitCountResponse<T> = await PrismaInstance.fruit.count(params);
        return NextResponse.json({ data: response }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "FruitCountApi -> " + (error as Error).message }, { status: 500 });
    }
};
