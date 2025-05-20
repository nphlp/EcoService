import AddressService from "@services/class/AddressClass";
import { AddressCountProps, AddressCountResponse, AddressFindFirstProps, AddressFindFirstResponse, AddressFindManyProps, AddressFindManyResponse, AddressFindUniqueProps, AddressFindUniqueResponse } from "@services/types/AddressType";
import { cacheLifeApi, parseAndDecodeParams } from "@utils/FetchConfig";
import { unstable_cacheLife as cacheLife, unstable_cacheTag as cacheTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

// ============== API Routes Types ============== //

export type AddressRoutes<Input> = {
    "/address": {
        params: AddressFindManyProps,
        response: AddressFindManyResponse<Input extends AddressFindManyProps ? Input : never>
    },
    "/address/first": {
        params: AddressFindFirstProps,
        response: AddressFindFirstResponse<Input extends AddressFindFirstProps ? Input : never>
    },
    "/address/unique": {
        params: AddressFindUniqueProps,
        response: AddressFindUniqueResponse<Input extends AddressFindUniqueProps ? Input : never>
    },
    "/address/count": {
        params: AddressCountProps,
        response: AddressCountResponse
    }
}

// ==================== Find Many ==================== //

const addressFindManyCached = async <T extends AddressFindManyProps>(params: T) => {
    "use cache";
    cacheLife(cacheLifeApi);
    cacheTag("/api/address");
    return AddressService.findMany<T>(params);
};

export const AddressFindManyApi = async <T extends AddressFindManyProps>(request: NextRequest) => {
    try {
        const params: T = parseAndDecodeParams(request);
        const response = await addressFindManyCached<T>(params);
        return NextResponse.json(response, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "AddressFindManyApi -> " + (error as Error).message }, { status: 500 });
    }
};

// ==================== Find First ==================== //

const addressFindFirstCached = async <T extends AddressFindFirstProps>(params: T) => {
    "use cache";
    cacheLife(cacheLifeApi);
    cacheTag("/api/address/first");
    return AddressService.findFirst<T>(params);
};

export const AddressFindFirstApi = async <T extends AddressFindFirstProps>(request: NextRequest) => {
    try {
        const params: T = parseAndDecodeParams(request);
        const response = await addressFindFirstCached<T>(params);
        return NextResponse.json(response, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "AddressFindFirstApi -> " + (error as Error).message }, { status: 500 });
    }
};

// ==================== Find Unique ==================== //

const addressFindUniqueCached = async <T extends AddressFindUniqueProps>(params: T) => {
    "use cache";
    cacheLife(cacheLifeApi);
    cacheTag("/api/address/unique");
    return AddressService.findUnique<T>(params);
};

export const AddressFindUniqueApi = async <T extends AddressFindUniqueProps>(request: NextRequest) => {
    try {
        const params: T = parseAndDecodeParams(request);
        const response = await addressFindUniqueCached<T>(params);
        return NextResponse.json(response, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "AddressFindUniqueApi -> " + (error as Error).message }, { status: 500 });
    }
};

// ==================== Count ==================== //

const addressCountCached = async (params: AddressCountProps) => {
    "use cache";
    cacheLife(cacheLifeApi);
    cacheTag("/api/address/count");
    return AddressService.count(params);
};

export const AddressCountApi = async (request: NextRequest) => {
    try {
        const params: AddressCountProps = parseAndDecodeParams(request);
        const response = await addressCountCached(params);
        return NextResponse.json(response, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "AddressCountApi -> " + (error as Error).message }, { status: 500 });
    }
};
