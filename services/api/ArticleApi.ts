import PrismaInstance from "@lib/prisma";
import { Prisma } from "@prisma/client";
import { GetResult, InternalArgs, PrismaClientOptions } from "@prisma/client/runtime/library";
import { ResponseFormat, parseAndDecodeParams } from "@utils/FetchConfig";
import { NextRequest, NextResponse } from "next/server";

// ========== Utils ========== //

type RouteResponse<T> = Promise<NextResponse<ResponseFormat<T>>>;

// ========== Types ========== //

export type ArticleFindManyProps<T extends Prisma.ArticleFindManyArgs> = Prisma.SelectSubset<
    T,
    Prisma.ArticleFindManyArgs
>;
export type ArticleFindManyResponse<T extends Prisma.ArticleFindManyArgs> = GetResult<
    Prisma.$ArticlePayload<InternalArgs>,
    T,
    "findMany",
    PrismaClientOptions
>;

export type ArticleFindFirstProps<T extends Prisma.ArticleFindFirstArgs> = Prisma.SelectSubset<
    T,
    Prisma.ArticleFindFirstArgs
>;
export type ArticleFindFirstResponse<T extends Prisma.ArticleFindFirstArgs> = GetResult<
    Prisma.$ArticlePayload<InternalArgs>,
    T,
    "findFirst",
    PrismaClientOptions
>;

export type ArticleFindUniqueProps<T extends Prisma.ArticleFindUniqueArgs> = Prisma.SelectSubset<
    T,
    Prisma.ArticleFindUniqueArgs
>;
export type ArticleFindUniqueResponse<T extends Prisma.ArticleFindUniqueArgs> = GetResult<
    Prisma.$ArticlePayload<InternalArgs>,
    T,
    "findUnique",
    PrismaClientOptions
>;

export type ArticleCountProps<T extends Prisma.ArticleCountArgs> = Prisma.SelectSubset<T, Prisma.ArticleCountArgs>;
export type ArticleCountResponse<T extends Prisma.ArticleCountArgs> =
    // eslint-disable-next-line
    T extends { select: any }
        ? T["select"] extends true
            ? number
            : Prisma.GetScalarType<T["select"], Prisma.ArticleCountAggregateOutputType>
        : number;

// ========== Services ========== //

export type ArticleRoutes<Input> = {
    "/article/findMany": <T extends Prisma.ArticleFindManyArgs>() => {
        params: ArticleFindManyProps<T>;
        response: ArticleFindManyResponse<Input extends ArticleFindManyProps<T> ? Input : never>;
    };
    "/article/findFirst": <T extends Prisma.ArticleFindFirstArgs>() => {
        params: ArticleFindFirstProps<T>;
        response: ArticleFindFirstResponse<Input extends ArticleFindFirstProps<T> ? Input : never>;
    };
    "/article/findUnique": <T extends Prisma.ArticleFindUniqueArgs>() => {
        params: ArticleFindUniqueProps<T>;
        response: ArticleFindUniqueResponse<Input extends ArticleFindUniqueProps<T> ? Input : never>;
    };
    "/article/count": <T extends Prisma.ArticleCountArgs>() => {
        params: ArticleCountProps<T>;
        response: ArticleCountResponse<Input extends ArticleCountProps<T> ? Input : never>;
    };
};

export const ArticleFindManyApi = async <T extends Prisma.ArticleFindManyArgs>(
    request: NextRequest,
): RouteResponse<ArticleFindManyResponse<T>> => {
    try {
        const params: ArticleFindManyProps<T> = parseAndDecodeParams(request);
        const response: ArticleFindManyResponse<T> = await PrismaInstance.article.findMany(params);
        return NextResponse.json({ data: response }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "ArticleFindManyApi -> " + (error as Error).message }, { status: 500 });
    }
};

export const ArticleFindFirstApi = async <T extends Prisma.ArticleFindFirstArgs>(
    request: NextRequest,
): RouteResponse<ArticleFindFirstResponse<T>> => {
    try {
        const params: ArticleFindFirstProps<T> = parseAndDecodeParams(request);
        const response: ArticleFindFirstResponse<T> = await PrismaInstance.article.findFirst(params);
        return NextResponse.json({ data: response }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "ArticleFindFirstApi -> " + (error as Error).message }, { status: 500 });
    }
};

export const ArticleFindUniqueApi = async <T extends Prisma.ArticleFindUniqueArgs>(
    request: NextRequest,
): RouteResponse<ArticleFindUniqueResponse<T>> => {
    try {
        const params: ArticleFindUniqueProps<T> = parseAndDecodeParams(request);
        const response: ArticleFindUniqueResponse<T> = await PrismaInstance.article.findUnique(params);
        return NextResponse.json({ data: response }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "ArticleFindUniqueApi -> " + (error as Error).message }, { status: 500 });
    }
};

export const ArticleCountApi = async <T extends Prisma.ArticleCountArgs>(
    request: NextRequest,
): RouteResponse<ArticleCountResponse<T>> => {
    try {
        const params: ArticleCountProps<T> = parseAndDecodeParams(request);
        const response: ArticleCountResponse<T> = await PrismaInstance.article.count(params);
        return NextResponse.json({ data: response }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "ArticleCountApi -> " + (error as Error).message }, { status: 500 });
    }
};
