import { Prisma } from "@prisma/client";
import { GetResult, InternalArgs, PrismaClientOptions } from "@prisma/client/runtime/library";
import {
    VerificationCountCached,
    VerificationFindFirstCached,
    VerificationFindManyCached,
    VerificationFindUniqueCached,
} from "@services/cached";
import { ResponseFormat, parseAndDecodeParams } from "@utils/FetchConfig";
import { NextRequest, NextResponse } from "next/server";

// ========== Types ========== //

export type VerificationFindManyProps<T extends Prisma.VerificationFindManyArgs> = Prisma.SelectSubset<
    T,
    Prisma.VerificationFindManyArgs
>;
export type VerificationFindManyResponse<T extends Prisma.VerificationFindManyArgs> = GetResult<
    Prisma.$VerificationPayload<InternalArgs>,
    T,
    "findMany",
    PrismaClientOptions
>;

export type VerificationFindFirstProps<T extends Prisma.VerificationFindFirstArgs> = Prisma.SelectSubset<
    T,
    Prisma.VerificationFindFirstArgs
>;
export type VerificationFindFirstResponse<T extends Prisma.VerificationFindFirstArgs> = GetResult<
    Prisma.$VerificationPayload<InternalArgs>,
    T,
    "findFirst",
    PrismaClientOptions
>;

export type VerificationFindUniqueProps<T extends Prisma.VerificationFindUniqueArgs> = Prisma.SelectSubset<
    T,
    Prisma.VerificationFindUniqueArgs
>;
export type VerificationFindUniqueResponse<T extends Prisma.VerificationFindUniqueArgs> = GetResult<
    Prisma.$VerificationPayload<InternalArgs>,
    T,
    "findUnique",
    PrismaClientOptions
>;

export type VerificationCountProps<T extends Prisma.VerificationCountArgs> = Prisma.SelectSubset<
    T,
    Prisma.VerificationCountArgs
>;
export type VerificationCountResponse<T extends Prisma.VerificationCountArgs> =
    // eslint-disable-next-line
    T extends { select: any }
        ? T["select"] extends true
            ? number
            : Prisma.GetScalarType<T["select"], Prisma.VerificationCountAggregateOutputType>
        : number;

// ========== Routes ========== //

type RouteResponse<T> = Promise<NextResponse<ResponseFormat<T>>>;

export type VerificationRoutes<Input> = {
    "/verification/findMany": <T extends Prisma.VerificationFindManyArgs>() => {
        params: VerificationFindManyProps<T>;
        response: VerificationFindManyResponse<Input extends VerificationFindManyProps<T> ? Input : never>;
    };
    "/verification/findFirst": <T extends Prisma.VerificationFindFirstArgs>() => {
        params: VerificationFindFirstProps<T>;
        response: VerificationFindFirstResponse<Input extends VerificationFindFirstProps<T> ? Input : never>;
    };
    "/verification/findUnique": <T extends Prisma.VerificationFindUniqueArgs>() => {
        params: VerificationFindUniqueProps<T>;
        response: VerificationFindUniqueResponse<Input extends VerificationFindUniqueProps<T> ? Input : never>;
    };
    "/verification/count": <T extends Prisma.VerificationCountArgs>() => {
        params: VerificationCountProps<T>;
        response: VerificationCountResponse<Input extends VerificationCountProps<T> ? Input : never>;
    };
};

// ========== Services ========== //

export const VerificationFindManyApi = async <T extends Prisma.VerificationFindManyArgs>(
    request: NextRequest,
): RouteResponse<VerificationFindManyResponse<T>> => {
    try {
        const params: VerificationFindManyProps<T> = parseAndDecodeParams(request);
        const response: VerificationFindManyResponse<T> = await VerificationFindManyCached(params);
        return NextResponse.json({ data: response }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "VerificationFindManyApi -> " + (error as Error).message }, { status: 500 });
    }
};

export const VerificationFindFirstApi = async <T extends Prisma.VerificationFindFirstArgs>(
    request: NextRequest,
): RouteResponse<VerificationFindFirstResponse<T>> => {
    try {
        const params: VerificationFindFirstProps<T> = parseAndDecodeParams(request);
        const response: VerificationFindFirstResponse<T> = await VerificationFindFirstCached(params);
        return NextResponse.json({ data: response }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "VerificationFindFirstApi -> " + (error as Error).message }, { status: 500 });
    }
};

export const VerificationFindUniqueApi = async <T extends Prisma.VerificationFindUniqueArgs>(
    request: NextRequest,
): RouteResponse<VerificationFindUniqueResponse<T>> => {
    try {
        const params: VerificationFindUniqueProps<T> = parseAndDecodeParams(request);
        const response: VerificationFindUniqueResponse<T> = await VerificationFindUniqueCached(params);
        return NextResponse.json({ data: response }, { status: 200 });
    } catch (error) {
        return NextResponse.json(
            { error: "VerificationFindUniqueApi -> " + (error as Error).message },
            { status: 500 },
        );
    }
};

export const VerificationCountApi = async <T extends Prisma.VerificationCountArgs>(
    request: NextRequest,
): RouteResponse<VerificationCountResponse<T>> => {
    try {
        const params: VerificationCountProps<T> = parseAndDecodeParams(request);
        const response: VerificationCountResponse<T> = await VerificationCountCached(params);
        return NextResponse.json({ data: response }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "VerificationCountApi -> " + (error as Error).message }, { status: 500 });
    }
};
