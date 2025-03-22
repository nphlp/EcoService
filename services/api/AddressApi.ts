import AddressService from "@services/class/AddressClass";
import { CountAddressProps, CountAddressResponse, FindManyAddressProps, FindManyAddressResponse, FindUniqueAddressProps, FindUniqueAddressResponse } from "@services/types/AddressType";
import { parseAndDecodeParams, revalidate } from "@utils/FetchV2";
import { unstable_cache as cache } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

// ============== API Routes Types ============== //

export type AddressRoutes<T> = {
    "/address": {
        props: FindManyAddressProps,
        response: FindManyAddressResponse<T extends FindManyAddressProps ? T : never>
    },
    "/address/unique": {
        props: FindUniqueAddressProps,
        response: FindUniqueAddressResponse<T extends FindUniqueAddressProps ? T : never>
    },
    "/address/count": {
        props: CountAddressProps,
        response: CountAddressResponse
    }
}

// ==================== Find Many ==================== //

const addressListCached = cache(async (params: FindManyAddressProps) => AddressService.findMany(params), ["address"], {
    revalidate,
    tags: ["address"],
});

export const SelectAddressList = async (request: NextRequest) => {
    try {
        const params = parseAndDecodeParams(request);
        const response = await addressListCached(params);
        return NextResponse.json(response, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "getAddressListCached -> " + (error as Error).message }, { status: 500 });
    }
};

// ==================== Find Unique ==================== //

const addressUniqueCached = cache(
    async <T extends FindUniqueAddressProps>(params: T) => AddressService.findUnique(params),
    ["address/unique"],
    { revalidate, tags: ["address/unique"] },
);

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

const addressCountCached = cache(async (params: CountAddressProps) => AddressService.count(params), ["address/count"], {
    revalidate,
    tags: ["address/count"],
});

export const SelectAddressCount = async (request: NextRequest) => {
    try {
        const params: CountAddressProps = parseAndDecodeParams(request);
        const response = await addressCountCached(params);
        return NextResponse.json(response, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "getAddressCountCached -> " + (error as Error).message }, { status: 500 });
    }
};
