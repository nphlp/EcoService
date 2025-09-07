import PrismaInstance from "@lib/prisma";
import { Prisma } from "@prisma/client";
import { GetResult, InternalArgs, PrismaClientOptions } from "@prisma/client/runtime/library";
import { ResponseFormat, parseAndDecodeParams } from "@utils/FetchConfig";
import { NextRequest, NextResponse } from "next/server";

// ========== Utils ========== //

type RouteResponse<T> = Promise<NextResponse<ResponseFormat<T>>>;

// ========== Types ========== //

export type CategoryFindManyProps<T extends Prisma.CategoryFindManyArgs> = Prisma.SelectSubset<
    T,
    Prisma.CategoryFindManyArgs
>;
export type CategoryFindManyResponse<T extends Prisma.CategoryFindManyArgs> = GetResult<
    Prisma.$CategoryPayload<InternalArgs>,
    T,
    "findMany",
    PrismaClientOptions
>;

export type CategoryFindFirstProps<T extends Prisma.CategoryFindFirstArgs> = Prisma.SelectSubset<
    T,
    Prisma.CategoryFindFirstArgs
>;
export type CategoryFindFirstResponse<T extends Prisma.CategoryFindFirstArgs> = GetResult<
    Prisma.$CategoryPayload<InternalArgs>,
    T,
    "findFirst",
    PrismaClientOptions
>;

export type CategoryFindUniqueProps<T extends Prisma.CategoryFindUniqueArgs> = Prisma.SelectSubset<
    T,
    Prisma.CategoryFindUniqueArgs
>;
export type CategoryFindUniqueResponse<T extends Prisma.CategoryFindUniqueArgs> = GetResult<
    Prisma.$CategoryPayload<InternalArgs>,
    T,
    "findUnique",
    PrismaClientOptions
>;

export type CategoryCountProps<T extends Prisma.CategoryCountArgs> = Prisma.SelectSubset<T, Prisma.CategoryCountArgs>;
export type CategoryCountResponse<T extends Prisma.CategoryCountArgs> =
    // eslint-disable-next-line
    T extends { select: any }
        ? T["select"] extends true
            ? number
            : Prisma.GetScalarType<T["select"], Prisma.CategoryCountAggregateOutputType>
        : number;

// ========== Services ========== //

export type CategoryRoutes<Input> = {
    "/category/findMany": <T extends Prisma.CategoryFindManyArgs>() => {
        params: CategoryFindManyProps<T>;
        response: CategoryFindManyResponse<Input extends CategoryFindManyProps<T> ? Input : never>;
    };
    "/category/findFirst": <T extends Prisma.CategoryFindFirstArgs>() => {
        params: CategoryFindFirstProps<T>;
        response: CategoryFindFirstResponse<Input extends CategoryFindFirstProps<T> ? Input : never>;
    };
    "/category/findUnique": <T extends Prisma.CategoryFindUniqueArgs>() => {
        params: CategoryFindUniqueProps<T>;
        response: CategoryFindUniqueResponse<Input extends CategoryFindUniqueProps<T> ? Input : never>;
    };
    "/category/count": <T extends Prisma.CategoryCountArgs>() => {
        params: CategoryCountProps<T>;
        response: CategoryCountResponse<Input extends CategoryCountProps<T> ? Input : never>;
    };
};

export const CategoryFindManyApi = async <T extends Prisma.CategoryFindManyArgs>(
    request: NextRequest,
): RouteResponse<CategoryFindManyResponse<T>> => {
    try {
        const params: CategoryFindManyProps<T> = parseAndDecodeParams(request);
        const response: CategoryFindManyResponse<T> = await PrismaInstance.category.findMany(params);
        return NextResponse.json({ data: response }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "CategoryFindManyApi -> " + (error as Error).message }, { status: 500 });
    }
};

export const CategoryFindFirstApi = async <T extends Prisma.CategoryFindFirstArgs>(
    request: NextRequest,
): RouteResponse<CategoryFindFirstResponse<T>> => {
    try {
        const params: CategoryFindFirstProps<T> = parseAndDecodeParams(request);
        const response: CategoryFindFirstResponse<T> = await PrismaInstance.category.findFirst(params);
        return NextResponse.json({ data: response }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "CategoryFindFirstApi -> " + (error as Error).message }, { status: 500 });
    }
};

export const CategoryFindUniqueApi = async <T extends Prisma.CategoryFindUniqueArgs>(
    request: NextRequest,
): RouteResponse<CategoryFindUniqueResponse<T>> => {
    try {
        const params: CategoryFindUniqueProps<T> = parseAndDecodeParams(request);
        const response: CategoryFindUniqueResponse<T> = await PrismaInstance.category.findUnique(params);
        return NextResponse.json({ data: response }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "CategoryFindUniqueApi -> " + (error as Error).message }, { status: 500 });
    }
};

export const CategoryCountApi = async <T extends Prisma.CategoryCountArgs>(
    request: NextRequest,
): RouteResponse<CategoryCountResponse<T>> => {
    try {
        const params: CategoryCountProps<T> = parseAndDecodeParams(request);
        const response: CategoryCountResponse<T> = await PrismaInstance.category.count(params);
        return NextResponse.json({ data: response }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "CategoryCountApi -> " + (error as Error).message }, { status: 500 });
    }
};
