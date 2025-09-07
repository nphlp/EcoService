import { Prisma } from "@prisma/client";
import { GetResult, InternalArgs, PrismaClientOptions } from "@prisma/client/runtime/library";
import {
    ContentCountCached,
    ContentFindFirstCached,
    ContentFindManyCached,
    ContentFindUniqueCached,
} from "@services/cached";
import { ResponseFormat, parseAndDecodeParams } from "@utils/FetchConfig";
import { NextRequest, NextResponse } from "next/server";

// ========== Types ========== //

export type ContentFindManyProps<T extends Prisma.ContentFindManyArgs> = Prisma.SelectSubset<
    T,
    Prisma.ContentFindManyArgs
>;
export type ContentFindManyResponse<T extends Prisma.ContentFindManyArgs> = GetResult<
    Prisma.$ContentPayload<InternalArgs>,
    T,
    "findMany",
    PrismaClientOptions
>;

export type ContentFindFirstProps<T extends Prisma.ContentFindFirstArgs> = Prisma.SelectSubset<
    T,
    Prisma.ContentFindFirstArgs
>;
export type ContentFindFirstResponse<T extends Prisma.ContentFindFirstArgs> = GetResult<
    Prisma.$ContentPayload<InternalArgs>,
    T,
    "findFirst",
    PrismaClientOptions
>;

export type ContentFindUniqueProps<T extends Prisma.ContentFindUniqueArgs> = Prisma.SelectSubset<
    T,
    Prisma.ContentFindUniqueArgs
>;
export type ContentFindUniqueResponse<T extends Prisma.ContentFindUniqueArgs> = GetResult<
    Prisma.$ContentPayload<InternalArgs>,
    T,
    "findUnique",
    PrismaClientOptions
>;

export type ContentCountProps<T extends Prisma.ContentCountArgs> = Prisma.SelectSubset<T, Prisma.ContentCountArgs>;
export type ContentCountResponse<T extends Prisma.ContentCountArgs> =
    // eslint-disable-next-line
    T extends { select: any }
        ? T["select"] extends true
            ? number
            : Prisma.GetScalarType<T["select"], Prisma.ContentCountAggregateOutputType>
        : number;

// ========== Routes ========== //

type RouteResponse<T> = Promise<NextResponse<ResponseFormat<T>>>;

export type ContentRoutes<Input> = {
    "/content/findMany": <T extends Prisma.ContentFindManyArgs>() => {
        params: ContentFindManyProps<T>;
        response: ContentFindManyResponse<Input extends ContentFindManyProps<T> ? Input : never>;
    };
    "/content/findFirst": <T extends Prisma.ContentFindFirstArgs>() => {
        params: ContentFindFirstProps<T>;
        response: ContentFindFirstResponse<Input extends ContentFindFirstProps<T> ? Input : never>;
    };
    "/content/findUnique": <T extends Prisma.ContentFindUniqueArgs>() => {
        params: ContentFindUniqueProps<T>;
        response: ContentFindUniqueResponse<Input extends ContentFindUniqueProps<T> ? Input : never>;
    };
    "/content/count": <T extends Prisma.ContentCountArgs>() => {
        params: ContentCountProps<T>;
        response: ContentCountResponse<Input extends ContentCountProps<T> ? Input : never>;
    };
};

// ========== Services ========== //

export const ContentFindManyApi = async <T extends Prisma.ContentFindManyArgs>(
    request: NextRequest,
): RouteResponse<ContentFindManyResponse<T>> => {
    try {
        const params: ContentFindManyProps<T> = parseAndDecodeParams(request);
        const response: ContentFindManyResponse<T> = await ContentFindManyCached(params);
        return NextResponse.json({ data: response }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "ContentFindManyApi -> " + (error as Error).message }, { status: 500 });
    }
};

export const ContentFindFirstApi = async <T extends Prisma.ContentFindFirstArgs>(
    request: NextRequest,
): RouteResponse<ContentFindFirstResponse<T>> => {
    try {
        const params: ContentFindFirstProps<T> = parseAndDecodeParams(request);
        const response: ContentFindFirstResponse<T> = await ContentFindFirstCached(params);
        return NextResponse.json({ data: response }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "ContentFindFirstApi -> " + (error as Error).message }, { status: 500 });
    }
};

export const ContentFindUniqueApi = async <T extends Prisma.ContentFindUniqueArgs>(
    request: NextRequest,
): RouteResponse<ContentFindUniqueResponse<T>> => {
    try {
        const params: ContentFindUniqueProps<T> = parseAndDecodeParams(request);
        const response: ContentFindUniqueResponse<T> = await ContentFindUniqueCached(params);
        return NextResponse.json({ data: response }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "ContentFindUniqueApi -> " + (error as Error).message }, { status: 500 });
    }
};

export const ContentCountApi = async <T extends Prisma.ContentCountArgs>(
    request: NextRequest,
): RouteResponse<ContentCountResponse<T>> => {
    try {
        const params: ContentCountProps<T> = parseAndDecodeParams(request);
        const response: ContentCountResponse<T> = await ContentCountCached(params);
        return NextResponse.json({ data: response }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "ContentCountApi -> " + (error as Error).message }, { status: 500 });
    }
};
