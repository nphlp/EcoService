import PrismaInstance from "@lib/prisma";
import { Prisma } from "@prisma/client";
import { GetResult, InternalArgs, PrismaClientOptions } from "@prisma/client/runtime/library";
import { ResponseFormat, parseAndDecodeParams } from "@utils/FetchConfig";
import { NextRequest, NextResponse } from "next/server";

// ========== Utils ========== //

type RouteResponse<T> = Promise<NextResponse<ResponseFormat<T>>>;

// ========== Types ========== //

export type SessionFindManyProps<T extends Prisma.SessionFindManyArgs> = Prisma.SelectSubset<
    T,
    Prisma.SessionFindManyArgs
>;
export type SessionFindManyResponse<T extends Prisma.SessionFindManyArgs> = GetResult<
    Prisma.$SessionPayload<InternalArgs>,
    T,
    "findMany",
    PrismaClientOptions
>;

export type SessionFindFirstProps<T extends Prisma.SessionFindFirstArgs> = Prisma.SelectSubset<
    T,
    Prisma.SessionFindFirstArgs
>;
export type SessionFindFirstResponse<T extends Prisma.SessionFindFirstArgs> = GetResult<
    Prisma.$SessionPayload<InternalArgs>,
    T,
    "findFirst",
    PrismaClientOptions
>;

export type SessionFindUniqueProps<T extends Prisma.SessionFindUniqueArgs> = Prisma.SelectSubset<
    T,
    Prisma.SessionFindUniqueArgs
>;
export type SessionFindUniqueResponse<T extends Prisma.SessionFindUniqueArgs> = GetResult<
    Prisma.$SessionPayload<InternalArgs>,
    T,
    "findUnique",
    PrismaClientOptions
>;

export type SessionCountProps<T extends Prisma.SessionCountArgs> = Prisma.SelectSubset<T, Prisma.SessionCountArgs>;
export type SessionCountResponse<T extends Prisma.SessionCountArgs> =
    // eslint-disable-next-line
    T extends { select: any }
        ? T["select"] extends true
            ? number
            : Prisma.GetScalarType<T["select"], Prisma.SessionCountAggregateOutputType>
        : number;

// ========== Services ========== //

export type SessionRoutes<Input> = {
    "/session/findMany": <T extends Prisma.SessionFindManyArgs>() => {
        params: SessionFindManyProps<T>;
        response: SessionFindManyResponse<Input extends SessionFindManyProps<T> ? Input : never>;
    };
    "/session/findFirst": <T extends Prisma.SessionFindFirstArgs>() => {
        params: SessionFindFirstProps<T>;
        response: SessionFindFirstResponse<Input extends SessionFindFirstProps<T> ? Input : never>;
    };
    "/session/findUnique": <T extends Prisma.SessionFindUniqueArgs>() => {
        params: SessionFindUniqueProps<T>;
        response: SessionFindUniqueResponse<Input extends SessionFindUniqueProps<T> ? Input : never>;
    };
    "/session/count": <T extends Prisma.SessionCountArgs>() => {
        params: SessionCountProps<T>;
        response: SessionCountResponse<Input extends SessionCountProps<T> ? Input : never>;
    };
};

export const SessionFindManyApi = async <T extends Prisma.SessionFindManyArgs>(
    request: NextRequest,
): RouteResponse<SessionFindManyResponse<T>> => {
    try {
        const params: SessionFindManyProps<T> = parseAndDecodeParams(request);
        const response: SessionFindManyResponse<T> = await PrismaInstance.session.findMany(params);
        return NextResponse.json({ data: response }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "SessionFindManyApi -> " + (error as Error).message }, { status: 500 });
    }
};

export const SessionFindFirstApi = async <T extends Prisma.SessionFindFirstArgs>(
    request: NextRequest,
): RouteResponse<SessionFindFirstResponse<T>> => {
    try {
        const params: SessionFindFirstProps<T> = parseAndDecodeParams(request);
        const response: SessionFindFirstResponse<T> = await PrismaInstance.session.findFirst(params);
        return NextResponse.json({ data: response }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "SessionFindFirstApi -> " + (error as Error).message }, { status: 500 });
    }
};

export const SessionFindUniqueApi = async <T extends Prisma.SessionFindUniqueArgs>(
    request: NextRequest,
): RouteResponse<SessionFindUniqueResponse<T>> => {
    try {
        const params: SessionFindUniqueProps<T> = parseAndDecodeParams(request);
        const response: SessionFindUniqueResponse<T> = await PrismaInstance.session.findUnique(params);
        return NextResponse.json({ data: response }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "SessionFindUniqueApi -> " + (error as Error).message }, { status: 500 });
    }
};

export const SessionCountApi = async <T extends Prisma.SessionCountArgs>(
    request: NextRequest,
): RouteResponse<SessionCountResponse<T>> => {
    try {
        const params: SessionCountProps<T> = parseAndDecodeParams(request);
        const response: SessionCountResponse<T> = await PrismaInstance.session.count(params);
        return NextResponse.json({ data: response }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "SessionCountApi -> " + (error as Error).message }, { status: 500 });
    }
};
