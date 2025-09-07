import PrismaInstance from "@lib/prisma";
import { Prisma } from "@prisma/client";
import { GetResult, InternalArgs, PrismaClientOptions } from "@prisma/client/runtime/library";
import { ResponseFormat, parseAndDecodeParams } from "@utils/FetchConfig";
import { NextRequest, NextResponse } from "next/server";

// ========== Utils ========== //

type RouteResponse<T> = Promise<NextResponse<ResponseFormat<T>>>;

// ========== Types ========== //

export type AddressFindManyProps<T extends Prisma.AddressFindManyArgs> = Prisma.SelectSubset<
    T,
    Prisma.AddressFindManyArgs
>;
export type AddressFindManyResponse<T extends Prisma.AddressFindManyArgs> = GetResult<
    Prisma.$AddressPayload<InternalArgs>,
    T,
    "findMany",
    PrismaClientOptions
>;

export type AddressFindFirstProps<T extends Prisma.AddressFindFirstArgs> = Prisma.SelectSubset<
    T,
    Prisma.AddressFindFirstArgs
>;
export type AddressFindFirstResponse<T extends Prisma.AddressFindFirstArgs> = GetResult<
    Prisma.$AddressPayload<InternalArgs>,
    T,
    "findFirst",
    PrismaClientOptions
>;

export type AddressFindUniqueProps<T extends Prisma.AddressFindUniqueArgs> = Prisma.SelectSubset<
    T,
    Prisma.AddressFindUniqueArgs
>;
export type AddressFindUniqueResponse<T extends Prisma.AddressFindUniqueArgs> = GetResult<
    Prisma.$AddressPayload<InternalArgs>,
    T,
    "findUnique",
    PrismaClientOptions
>;

export type AddressCountProps<T extends Prisma.AddressCountArgs> = Prisma.SelectSubset<T, Prisma.AddressCountArgs>;
export type AddressCountResponse<T extends Prisma.AddressCountArgs> =
    // eslint-disable-next-line
    T extends { select: any }
        ? T["select"] extends true
            ? number
            : Prisma.GetScalarType<T["select"], Prisma.AddressCountAggregateOutputType>
        : number;

// ========== Services ========== //

export type AddressRoutes<Input> = {
    "/address/findMany": <T extends Prisma.AddressFindManyArgs>() => {
        params: AddressFindManyProps<T>;
        response: AddressFindManyResponse<Input extends AddressFindManyProps<T> ? Input : never>;
    };
    "/address/findFirst": <T extends Prisma.AddressFindFirstArgs>() => {
        params: AddressFindFirstProps<T>;
        response: AddressFindFirstResponse<Input extends AddressFindFirstProps<T> ? Input : never>;
    };
    "/address/findUnique": <T extends Prisma.AddressFindUniqueArgs>() => {
        params: AddressFindUniqueProps<T>;
        response: AddressFindUniqueResponse<Input extends AddressFindUniqueProps<T> ? Input : never>;
    };
    "/address/count": <T extends Prisma.AddressCountArgs>() => {
        params: AddressCountProps<T>;
        response: AddressCountResponse<Input extends AddressCountProps<T> ? Input : never>;
    };
};

export const AddressFindManyApi = async <T extends Prisma.AddressFindManyArgs>(
    request: NextRequest,
): RouteResponse<AddressFindManyResponse<T>> => {
    try {
        const params: AddressFindManyProps<T> = parseAndDecodeParams(request);
        const response: AddressFindManyResponse<T> = await PrismaInstance.address.findMany(params);
        return NextResponse.json({ data: response }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "AddressFindManyApi -> " + (error as Error).message }, { status: 500 });
    }
};

export const AddressFindFirstApi = async <T extends Prisma.AddressFindFirstArgs>(
    request: NextRequest,
): RouteResponse<AddressFindFirstResponse<T>> => {
    try {
        const params: AddressFindFirstProps<T> = parseAndDecodeParams(request);
        const response: AddressFindFirstResponse<T> = await PrismaInstance.address.findFirst(params);
        return NextResponse.json({ data: response }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "AddressFindFirstApi -> " + (error as Error).message }, { status: 500 });
    }
};

export const AddressFindUniqueApi = async <T extends Prisma.AddressFindUniqueArgs>(
    request: NextRequest,
): RouteResponse<AddressFindUniqueResponse<T>> => {
    try {
        const params: AddressFindUniqueProps<T> = parseAndDecodeParams(request);
        const response: AddressFindUniqueResponse<T> = await PrismaInstance.address.findUnique(params);
        return NextResponse.json({ data: response }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "AddressFindUniqueApi -> " + (error as Error).message }, { status: 500 });
    }
};

export const AddressCountApi = async <T extends Prisma.AddressCountArgs>(
    request: NextRequest,
): RouteResponse<AddressCountResponse<T>> => {
    try {
        const params: AddressCountProps<T> = parseAndDecodeParams(request);
        const response: AddressCountResponse<T> = await PrismaInstance.address.count(params);
        return NextResponse.json({ data: response }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "AddressCountApi -> " + (error as Error).message }, { status: 500 });
    }
};
