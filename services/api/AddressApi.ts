import AddressService from "@services/class/AddressClass";
import { CountAddressProps, CountAddressResponse, FindFirstAddressProps, FindFirstAddressResponse, FindManyAddressProps, FindManyAddressResponse, FindUniqueAddressProps, FindUniqueAddressResponse } from "@services/types/AddressType";
import { cacheLifeApi, parseAndDecodeParams } from "@utils/FetchConfig";
import { unstable_cacheLife as cacheLife, unstable_cacheTag as cacheTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

// ============== API Routes Types ============== //

export type AddressRoutes<Input> = {
    "/address": {
        params: FindManyAddressProps,
        response: FindManyAddressResponse<Input extends FindManyAddressProps ? Input : never>
    },
    "/address/first": {
        params: FindFirstAddressProps,
        response: FindFirstAddressResponse<Input extends FindFirstAddressProps ? Input : never>
    },
    "/address/unique": {
        params: FindUniqueAddressProps,
        response: FindUniqueAddressResponse<Input extends FindUniqueAddressProps ? Input : never>
    },
    "/address/count": {
        params: CountAddressProps,
        response: CountAddressResponse
    }
}

// ==================== Find Many ==================== //

const addressListCached = async <T extends FindManyAddressProps>(params: T) => {
    "use cache";
    cacheLife(cacheLifeApi);
    cacheTag("/api/address");
    return AddressService.findMany<T>(params);
};

export const SelectAddressList = async <T extends FindManyAddressProps>(request: NextRequest) => {
    try {
        const params: T = parseAndDecodeParams(request);
        const response = await addressListCached<T>(params);
        return NextResponse.json(response, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "getAddressListCached -> " + (error as Error).message }, { status: 500 });
    }
};

// ==================== Find First ==================== //

const addressFirstCached = async <T extends FindFirstAddressProps>(params: T) => {
    "use cache";
    cacheLife(cacheLifeApi);
    cacheTag("/api/address/first");
    return AddressService.findFirst<T>(params);
};

export const SelectAddressFirst = async <T extends FindFirstAddressProps>(request: NextRequest) => {
    try {
        const params: T = parseAndDecodeParams(request);
        const response = await addressFirstCached<T>(params);
        return NextResponse.json(response, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "getAddressFirstCached -> " + (error as Error).message }, { status: 500 });
    }
};

// ==================== Find Unique ==================== //

const addressUniqueCached = async <T extends FindUniqueAddressProps>(params: T) => {
    "use cache";
    cacheLife(cacheLifeApi);
    cacheTag("/api/address/unique");
    return AddressService.findUnique<T>(params);
};

export const SelectAddressUnique = async <T extends FindUniqueAddressProps>(request: NextRequest) => {
    try {
        const params: T = parseAndDecodeParams(request);
        const response = await addressUniqueCached<T>(params);
        return NextResponse.json(response, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "getAddressUniqueCached -> " + (error as Error).message }, { status: 500 });
    }
};

// ==================== Count ==================== //

const addressCountCached = async (params: CountAddressProps) => {
    "use cache";
    cacheLife(cacheLifeApi);
    cacheTag("/api/address/count");
    return AddressService.count(params);
};

export const SelectAddressCount = async (request: NextRequest) => {
    try {
        const params: CountAddressProps = parseAndDecodeParams(request);
        const response = await addressCountCached(params);
        return NextResponse.json(response, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "getAddressCountCached -> " + (error as Error).message }, { status: 500 });
    }
};
