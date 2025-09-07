import { Prisma } from "@prisma/client";
import { GetResult, InternalArgs, PrismaClientOptions } from "@prisma/client/runtime/library";
import {
    ProductCountCached,
    ProductFindFirstCached,
    ProductFindManyCached,
    ProductFindUniqueCached,
} from "@services/cached";
import { ResponseFormat, parseAndDecodeParams } from "@utils/FetchConfig";
import { NextRequest, NextResponse } from "next/server";

// ========== Types ========== //

export type ProductFindManyProps<T extends Prisma.ProductFindManyArgs> = Prisma.SelectSubset<
    T,
    Prisma.ProductFindManyArgs
>;
export type ProductFindManyResponse<T extends Prisma.ProductFindManyArgs> = GetResult<
    Prisma.$ProductPayload<InternalArgs>,
    T,
    "findMany",
    PrismaClientOptions
>;

export type ProductFindFirstProps<T extends Prisma.ProductFindFirstArgs> = Prisma.SelectSubset<
    T,
    Prisma.ProductFindFirstArgs
>;
export type ProductFindFirstResponse<T extends Prisma.ProductFindFirstArgs> = GetResult<
    Prisma.$ProductPayload<InternalArgs>,
    T,
    "findFirst",
    PrismaClientOptions
>;

export type ProductFindUniqueProps<T extends Prisma.ProductFindUniqueArgs> = Prisma.SelectSubset<
    T,
    Prisma.ProductFindUniqueArgs
>;
export type ProductFindUniqueResponse<T extends Prisma.ProductFindUniqueArgs> = GetResult<
    Prisma.$ProductPayload<InternalArgs>,
    T,
    "findUnique",
    PrismaClientOptions
>;

export type ProductCountProps<T extends Prisma.ProductCountArgs> = Prisma.SelectSubset<T, Prisma.ProductCountArgs>;
export type ProductCountResponse<T extends Prisma.ProductCountArgs> =
    // eslint-disable-next-line
    T extends { select: any }
        ? T["select"] extends true
            ? number
            : Prisma.GetScalarType<T["select"], Prisma.ProductCountAggregateOutputType>
        : number;

// ========== Routes ========== //

type RouteResponse<T> = Promise<NextResponse<ResponseFormat<T>>>;

export type ProductRoutes<Input> = {
    "/product/findMany": <T extends Prisma.ProductFindManyArgs>() => {
        params: ProductFindManyProps<T>;
        response: ProductFindManyResponse<Input extends ProductFindManyProps<T> ? Input : never>;
    };
    "/product/findFirst": <T extends Prisma.ProductFindFirstArgs>() => {
        params: ProductFindFirstProps<T>;
        response: ProductFindFirstResponse<Input extends ProductFindFirstProps<T> ? Input : never>;
    };
    "/product/findUnique": <T extends Prisma.ProductFindUniqueArgs>() => {
        params: ProductFindUniqueProps<T>;
        response: ProductFindUniqueResponse<Input extends ProductFindUniqueProps<T> ? Input : never>;
    };
    "/product/count": <T extends Prisma.ProductCountArgs>() => {
        params: ProductCountProps<T>;
        response: ProductCountResponse<Input extends ProductCountProps<T> ? Input : never>;
    };
};

// ========== Services ========== //

export const ProductFindManyApi = async <T extends Prisma.ProductFindManyArgs>(
    request: NextRequest,
): RouteResponse<ProductFindManyResponse<T>> => {
    try {
        const params: ProductFindManyProps<T> = parseAndDecodeParams(request);
        const response: ProductFindManyResponse<T> = await ProductFindManyCached(params);
        return NextResponse.json({ data: response }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "ProductFindManyApi -> " + (error as Error).message }, { status: 500 });
    }
};

export const ProductFindFirstApi = async <T extends Prisma.ProductFindFirstArgs>(
    request: NextRequest,
): RouteResponse<ProductFindFirstResponse<T>> => {
    try {
        const params: ProductFindFirstProps<T> = parseAndDecodeParams(request);
        const response: ProductFindFirstResponse<T> = await ProductFindFirstCached(params);
        return NextResponse.json({ data: response }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "ProductFindFirstApi -> " + (error as Error).message }, { status: 500 });
    }
};

export const ProductFindUniqueApi = async <T extends Prisma.ProductFindUniqueArgs>(
    request: NextRequest,
): RouteResponse<ProductFindUniqueResponse<T>> => {
    try {
        const params: ProductFindUniqueProps<T> = parseAndDecodeParams(request);
        const response: ProductFindUniqueResponse<T> = await ProductFindUniqueCached(params);
        return NextResponse.json({ data: response }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "ProductFindUniqueApi -> " + (error as Error).message }, { status: 500 });
    }
};

export const ProductCountApi = async <T extends Prisma.ProductCountArgs>(
    request: NextRequest,
): RouteResponse<ProductCountResponse<T>> => {
    try {
        const params: ProductCountProps<T> = parseAndDecodeParams(request);
        const response: ProductCountResponse<T> = await ProductCountCached(params);
        return NextResponse.json({ data: response }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "ProductCountApi -> " + (error as Error).message }, { status: 500 });
    }
};
