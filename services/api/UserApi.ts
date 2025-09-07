import { Prisma } from "@prisma/client";
import { GetResult, InternalArgs, PrismaClientOptions } from "@prisma/client/runtime/library";
import { UserCountCached, UserFindFirstCached, UserFindManyCached, UserFindUniqueCached } from "@services/cached";
import { ResponseFormat, parseAndDecodeParams } from "@utils/FetchConfig";
import { NextRequest, NextResponse } from "next/server";

// ========== Types ========== //

export type UserFindManyProps<T extends Prisma.UserFindManyArgs> = Prisma.SelectSubset<T, Prisma.UserFindManyArgs>;
export type UserFindManyResponse<T extends Prisma.UserFindManyArgs> = GetResult<
    Prisma.$UserPayload<InternalArgs>,
    T,
    "findMany",
    PrismaClientOptions
>;

export type UserFindFirstProps<T extends Prisma.UserFindFirstArgs> = Prisma.SelectSubset<T, Prisma.UserFindFirstArgs>;
export type UserFindFirstResponse<T extends Prisma.UserFindFirstArgs> = GetResult<
    Prisma.$UserPayload<InternalArgs>,
    T,
    "findFirst",
    PrismaClientOptions
>;

export type UserFindUniqueProps<T extends Prisma.UserFindUniqueArgs> = Prisma.SelectSubset<
    T,
    Prisma.UserFindUniqueArgs
>;
export type UserFindUniqueResponse<T extends Prisma.UserFindUniqueArgs> = GetResult<
    Prisma.$UserPayload<InternalArgs>,
    T,
    "findUnique",
    PrismaClientOptions
>;

export type UserCountProps<T extends Prisma.UserCountArgs> = Prisma.SelectSubset<T, Prisma.UserCountArgs>;
export type UserCountResponse<T extends Prisma.UserCountArgs> =
    // eslint-disable-next-line
    T extends { select: any }
        ? T["select"] extends true
            ? number
            : Prisma.GetScalarType<T["select"], Prisma.UserCountAggregateOutputType>
        : number;

// ========== Routes ========== //

type RouteResponse<T> = Promise<NextResponse<ResponseFormat<T>>>;

export type UserRoutes<Input> = {
    "/user/findMany": <T extends Prisma.UserFindManyArgs>() => {
        params: UserFindManyProps<T>;
        response: UserFindManyResponse<Input extends UserFindManyProps<T> ? Input : never>;
    };
    "/user/findFirst": <T extends Prisma.UserFindFirstArgs>() => {
        params: UserFindFirstProps<T>;
        response: UserFindFirstResponse<Input extends UserFindFirstProps<T> ? Input : never>;
    };
    "/user/findUnique": <T extends Prisma.UserFindUniqueArgs>() => {
        params: UserFindUniqueProps<T>;
        response: UserFindUniqueResponse<Input extends UserFindUniqueProps<T> ? Input : never>;
    };
    "/user/count": <T extends Prisma.UserCountArgs>() => {
        params: UserCountProps<T>;
        response: UserCountResponse<Input extends UserCountProps<T> ? Input : never>;
    };
};

// ========== Services ========== //

export const UserFindManyApi = async <T extends Prisma.UserFindManyArgs>(
    request: NextRequest,
): RouteResponse<UserFindManyResponse<T>> => {
    try {
        const params: UserFindManyProps<T> = parseAndDecodeParams(request);
        const response: UserFindManyResponse<T> = await UserFindManyCached(params);
        return NextResponse.json({ data: response }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "UserFindManyApi -> " + (error as Error).message }, { status: 500 });
    }
};

export const UserFindFirstApi = async <T extends Prisma.UserFindFirstArgs>(
    request: NextRequest,
): RouteResponse<UserFindFirstResponse<T>> => {
    try {
        const params: UserFindFirstProps<T> = parseAndDecodeParams(request);
        const response: UserFindFirstResponse<T> = await UserFindFirstCached(params);
        return NextResponse.json({ data: response }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "UserFindFirstApi -> " + (error as Error).message }, { status: 500 });
    }
};

export const UserFindUniqueApi = async <T extends Prisma.UserFindUniqueArgs>(
    request: NextRequest,
): RouteResponse<UserFindUniqueResponse<T>> => {
    try {
        const params: UserFindUniqueProps<T> = parseAndDecodeParams(request);
        const response: UserFindUniqueResponse<T> = await UserFindUniqueCached(params);
        return NextResponse.json({ data: response }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "UserFindUniqueApi -> " + (error as Error).message }, { status: 500 });
    }
};

export const UserCountApi = async <T extends Prisma.UserCountArgs>(
    request: NextRequest,
): RouteResponse<UserCountResponse<T>> => {
    try {
        const params: UserCountProps<T> = parseAndDecodeParams(request);
        const response: UserCountResponse<T> = await UserCountCached(params);
        return NextResponse.json({ data: response }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "UserCountApi -> " + (error as Error).message }, { status: 500 });
    }
};
