import { AddressCountCached, AddressFindFirstCached, AddressFindManyCached, AddressFindUniqueCached } from "@services/cached/index";
import { AddressCountProps, AddressCountResponse, AddressFindFirstProps, AddressFindFirstResponse, AddressFindManyProps, AddressFindManyResponse, AddressFindUniqueProps, AddressFindUniqueResponse } from "@services/types/index";
import { parseAndDecodeParams } from "@utils/FetchConfig";
import { NextRequest, NextResponse } from "next/server";

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

export const AddressFindManyApi = async <T extends AddressFindManyProps>(request: NextRequest) => {
    try {
        const params: T = parseAndDecodeParams(request);
        const response = await AddressFindManyCached<T>(params);
        return NextResponse.json(response, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "AddressFindManyApi -> " + (error as Error).message }, { status: 500 });
    }
};

export const AddressFindFirstApi = async <T extends AddressFindFirstProps>(request: NextRequest) => {
    try {
        const params: T = parseAndDecodeParams(request);
        const response = await AddressFindFirstCached<T>(params);
        return NextResponse.json(response, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "AddressFindFirstApi -> " + (error as Error).message }, { status: 500 });
    }
};

export const AddressFindUniqueApi = async <T extends AddressFindUniqueProps>(request: NextRequest) => {
    try {
        const params: T = parseAndDecodeParams(request);
        const response = await AddressFindUniqueCached<T>(params);
        return NextResponse.json(response, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "AddressFindUniqueApi -> " + (error as Error).message }, { status: 500 });
    }
};

export const AddressCountApi = async (request: NextRequest) => {
    try {
        const params: AddressCountProps = parseAndDecodeParams(request);
        const response = await AddressCountCached(params);
        return NextResponse.json(response, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "AddressCountApi -> " + (error as Error).message }, { status: 500 });
    }
};
