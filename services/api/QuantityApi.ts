import { QuantityCountCached, QuantityFindFirstCached, QuantityFindManyCached, QuantityFindUniqueCached } from "@services/cached/index";
import { QuantityCountProps, QuantityCountResponse, QuantityFindFirstProps, QuantityFindFirstResponse, QuantityFindManyProps, QuantityFindManyResponse, QuantityFindUniqueProps, QuantityFindUniqueResponse } from "@services/types/index";
import { parseAndDecodeParams } from "@utils/FetchConfig";
import { NextRequest, NextResponse } from "next/server";

export type QuantityRoutes<Input> = {
    "/quantity/findMany": {
        params: QuantityFindManyProps,
        response: QuantityFindManyResponse<Input extends QuantityFindManyProps ? Input : never>
    },
    "/quantity/findFirst": {
        params: QuantityFindFirstProps,
        response: QuantityFindFirstResponse<Input extends QuantityFindFirstProps ? Input : never>
    },
    "/quantity/findUnique": {
        params: QuantityFindUniqueProps,
        response: QuantityFindUniqueResponse<Input extends QuantityFindUniqueProps ? Input : never>
    },
    "/quantity/count": {
        params: QuantityCountProps,
        response: QuantityCountResponse
    }
}

export const QuantityFindManyApi = async <T extends QuantityFindManyProps>(request: NextRequest) => {
    try {
        const params: T = parseAndDecodeParams(request);
        const response = await QuantityFindManyCached<T>(params);
        return NextResponse.json(response, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "QuantityFindManyApi -> " + (error as Error).message }, { status: 500 });
    }
};

export const QuantityFindFirstApi = async <T extends QuantityFindFirstProps>(request: NextRequest) => {
    try {
        const params: T = parseAndDecodeParams(request);
        const response = await QuantityFindFirstCached<T>(params);
        return NextResponse.json(response, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "QuantityFindFirstApi -> " + (error as Error).message }, { status: 500 });
    }
};

export const QuantityFindUniqueApi = async <T extends QuantityFindUniqueProps>(request: NextRequest) => {
    try {
        const params: T = parseAndDecodeParams(request);
        const response = await QuantityFindUniqueCached<T>(params);
        return NextResponse.json(response, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "QuantityFindUniqueApi -> " + (error as Error).message }, { status: 500 });
    }
};

export const QuantityCountApi = async (request: NextRequest) => {
    try {
        const params: QuantityCountProps = parseAndDecodeParams(request);
        const response = await QuantityCountCached(params);
        return NextResponse.json(response, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "QuantityCountApi -> " + (error as Error).message }, { status: 500 });
    }
};
