import PrismaInstance from "@lib/prisma";
import { Prisma } from "@prisma/client";
import { GetResult, InternalArgs, PrismaClientOptions } from "@prisma/client/runtime/library";
import { ResponseFormat, parseAndDecodeParams } from "@utils/FetchConfig";
import { NextRequest, NextResponse } from "next/server";

// ========== Utils ========== //

type RouteResponse<T> = Promise<NextResponse<ResponseFormat<T>>>;

// ========== Types ========== //

export type AccountFindManyProps<T extends Prisma.AccountFindManyArgs> = Prisma.SelectSubset<
    T,
    Prisma.AccountFindManyArgs
>;
export type AccountFindManyResponse<T extends Prisma.AccountFindManyArgs> = GetResult<
    Prisma.$AccountPayload<InternalArgs>,
    T,
    "findMany",
    PrismaClientOptions
>;

export type AccountFindFirstProps<T extends Prisma.AccountFindFirstArgs> = Prisma.SelectSubset<
    T,
    Prisma.AccountFindFirstArgs
>;
export type AccountFindFirstResponse<T extends Prisma.AccountFindFirstArgs> = GetResult<
    Prisma.$AccountPayload<InternalArgs>,
    T,
    "findFirst",
    PrismaClientOptions
>;

export type AccountFindUniqueProps<T extends Prisma.AccountFindUniqueArgs> = Prisma.SelectSubset<
    T,
    Prisma.AccountFindUniqueArgs
>;
export type AccountFindUniqueResponse<T extends Prisma.AccountFindUniqueArgs> = GetResult<
    Prisma.$AccountPayload<InternalArgs>,
    T,
    "findUnique",
    PrismaClientOptions
>;

export type AccountCountProps<T extends Prisma.AccountCountArgs> = Prisma.SelectSubset<T, Prisma.AccountCountArgs>;
export type AccountCountResponse<T extends Prisma.AccountCountArgs> =
    // eslint-disable-next-line
    T extends { select: any }
        ? T["select"] extends true
            ? number
            : Prisma.GetScalarType<T["select"], Prisma.AccountCountAggregateOutputType>
        : number;

// ========== Services ========== //

export type AccountRoutes<Input> = {
    "/account/findMany": <T extends Prisma.AccountFindManyArgs>() => {
        params: AccountFindManyProps<T>;
        response: AccountFindManyResponse<Input extends AccountFindManyProps<T> ? Input : never>;
    };
    "/account/findFirst": <T extends Prisma.AccountFindFirstArgs>() => {
        params: AccountFindFirstProps<T>;
        response: AccountFindFirstResponse<Input extends AccountFindFirstProps<T> ? Input : never>;
    };
    "/account/findUnique": <T extends Prisma.AccountFindUniqueArgs>() => {
        params: AccountFindUniqueProps<T>;
        response: AccountFindUniqueResponse<Input extends AccountFindUniqueProps<T> ? Input : never>;
    };
    "/account/count": <T extends Prisma.AccountCountArgs>() => {
        params: AccountCountProps<T>;
        response: AccountCountResponse<Input extends AccountCountProps<T> ? Input : never>;
    };
};

export const AccountFindManyApi = async <T extends Prisma.AccountFindManyArgs>(
    request: NextRequest,
): RouteResponse<AccountFindManyResponse<T>> => {
    try {
        const params: AccountFindManyProps<T> = parseAndDecodeParams(request);
        const response: AccountFindManyResponse<T> = await PrismaInstance.account.findMany(params);
        return NextResponse.json({ data: response }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "AccountFindManyApi -> " + (error as Error).message }, { status: 500 });
    }
};

export const AccountFindFirstApi = async <T extends Prisma.AccountFindFirstArgs>(
    request: NextRequest,
): RouteResponse<AccountFindFirstResponse<T>> => {
    try {
        const params: AccountFindFirstProps<T> = parseAndDecodeParams(request);
        const response: AccountFindFirstResponse<T> = await PrismaInstance.account.findFirst(params);
        return NextResponse.json({ data: response }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "AccountFindFirstApi -> " + (error as Error).message }, { status: 500 });
    }
};

export const AccountFindUniqueApi = async <T extends Prisma.AccountFindUniqueArgs>(
    request: NextRequest,
): RouteResponse<AccountFindUniqueResponse<T>> => {
    try {
        const params: AccountFindUniqueProps<T> = parseAndDecodeParams(request);
        const response: AccountFindUniqueResponse<T> = await PrismaInstance.account.findUnique(params);
        return NextResponse.json({ data: response }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "AccountFindUniqueApi -> " + (error as Error).message }, { status: 500 });
    }
};

export const AccountCountApi = async <T extends Prisma.AccountCountArgs>(
    request: NextRequest,
): RouteResponse<AccountCountResponse<T>> => {
    try {
        const params: AccountCountProps<T> = parseAndDecodeParams(request);
        const response: AccountCountResponse<T> = await PrismaInstance.account.count(params);
        return NextResponse.json({ data: response }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "AccountCountApi -> " + (error as Error).message }, { status: 500 });
    }
};
