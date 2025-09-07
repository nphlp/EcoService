import PrismaInstance from "@lib/prisma";
import { Prisma } from "@prisma/client";
import { GetResult, InternalArgs, PrismaClientOptions } from "@prisma/client/runtime/library";
import { ResponseFormat, parseAndDecodeParams } from "@utils/FetchConfig";
import { NextRequest, NextResponse } from "next/server";

// ========== Utils ========== //

type RouteResponse<T> = Promise<NextResponse<ResponseFormat<T>>>;

// ========== Types ========== //

export type DiyFindManyProps<T extends Prisma.DiyFindManyArgs> = Prisma.SelectSubset<T, Prisma.DiyFindManyArgs>;
export type DiyFindManyResponse<T extends Prisma.DiyFindManyArgs> = GetResult<
    Prisma.$DiyPayload<InternalArgs>,
    T,
    "findMany",
    PrismaClientOptions
>;

export type DiyFindFirstProps<T extends Prisma.DiyFindFirstArgs> = Prisma.SelectSubset<T, Prisma.DiyFindFirstArgs>;
export type DiyFindFirstResponse<T extends Prisma.DiyFindFirstArgs> = GetResult<
    Prisma.$DiyPayload<InternalArgs>,
    T,
    "findFirst",
    PrismaClientOptions
>;

export type DiyFindUniqueProps<T extends Prisma.DiyFindUniqueArgs> = Prisma.SelectSubset<T, Prisma.DiyFindUniqueArgs>;
export type DiyFindUniqueResponse<T extends Prisma.DiyFindUniqueArgs> = GetResult<
    Prisma.$DiyPayload<InternalArgs>,
    T,
    "findUnique",
    PrismaClientOptions
>;

export type DiyCountProps<T extends Prisma.DiyCountArgs> = Prisma.SelectSubset<T, Prisma.DiyCountArgs>;
export type DiyCountResponse<T extends Prisma.DiyCountArgs> =
    // eslint-disable-next-line
    T extends { select: any }
        ? T["select"] extends true
            ? number
            : Prisma.GetScalarType<T["select"], Prisma.DiyCountAggregateOutputType>
        : number;

// ========== Services ========== //

export type DiyRoutes<Input> = {
    "/diy/findMany": <T extends Prisma.DiyFindManyArgs>() => {
        params: DiyFindManyProps<T>;
        response: DiyFindManyResponse<Input extends DiyFindManyProps<T> ? Input : never>;
    };
    "/diy/findFirst": <T extends Prisma.DiyFindFirstArgs>() => {
        params: DiyFindFirstProps<T>;
        response: DiyFindFirstResponse<Input extends DiyFindFirstProps<T> ? Input : never>;
    };
    "/diy/findUnique": <T extends Prisma.DiyFindUniqueArgs>() => {
        params: DiyFindUniqueProps<T>;
        response: DiyFindUniqueResponse<Input extends DiyFindUniqueProps<T> ? Input : never>;
    };
    "/diy/count": <T extends Prisma.DiyCountArgs>() => {
        params: DiyCountProps<T>;
        response: DiyCountResponse<Input extends DiyCountProps<T> ? Input : never>;
    };
};

export const DiyFindManyApi = async <T extends Prisma.DiyFindManyArgs>(
    request: NextRequest,
): RouteResponse<DiyFindManyResponse<T>> => {
    try {
        const params: DiyFindManyProps<T> = parseAndDecodeParams(request);
        const response: DiyFindManyResponse<T> = await PrismaInstance.diy.findMany(params);
        return NextResponse.json({ data: response }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "DiyFindManyApi -> " + (error as Error).message }, { status: 500 });
    }
};

export const DiyFindFirstApi = async <T extends Prisma.DiyFindFirstArgs>(
    request: NextRequest,
): RouteResponse<DiyFindFirstResponse<T>> => {
    try {
        const params: DiyFindFirstProps<T> = parseAndDecodeParams(request);
        const response: DiyFindFirstResponse<T> = await PrismaInstance.diy.findFirst(params);
        return NextResponse.json({ data: response }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "DiyFindFirstApi -> " + (error as Error).message }, { status: 500 });
    }
};

export const DiyFindUniqueApi = async <T extends Prisma.DiyFindUniqueArgs>(
    request: NextRequest,
): RouteResponse<DiyFindUniqueResponse<T>> => {
    try {
        const params: DiyFindUniqueProps<T> = parseAndDecodeParams(request);
        const response: DiyFindUniqueResponse<T> = await PrismaInstance.diy.findUnique(params);
        return NextResponse.json({ data: response }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "DiyFindUniqueApi -> " + (error as Error).message }, { status: 500 });
    }
};

export const DiyCountApi = async <T extends Prisma.DiyCountArgs>(
    request: NextRequest,
): RouteResponse<DiyCountResponse<T>> => {
    try {
        const params: DiyCountProps<T> = parseAndDecodeParams(request);
        const response: DiyCountResponse<T> = await PrismaInstance.diy.count(params);
        return NextResponse.json({ data: response }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "DiyCountApi -> " + (error as Error).message }, { status: 500 });
    }
};
