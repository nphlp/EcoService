import { FruitCountCached, FruitFindFirstCached, FruitFindManyCached, FruitFindUniqueCached } from "@services/cached/index";
import { FruitCountProps, FruitCountResponse, FruitFindFirstProps, FruitFindFirstResponse, FruitFindManyProps, FruitFindManyResponse, FruitFindUniqueProps, FruitFindUniqueResponse } from "@services/types/index";
import { parseAndDecodeParams } from "@utils/FetchConfig";
import { NextRequest, NextResponse } from "next/server";

export type FruitRoutes<Input> = {
    "/fruit/findMany": {
        params: FruitFindManyProps,
        response: FruitFindManyResponse<Input extends FruitFindManyProps ? Input : never>
    },
    "/fruit/findFirst": {
        params: FruitFindFirstProps,
        response: FruitFindFirstResponse<Input extends FruitFindFirstProps ? Input : never>
    },
    "/fruit/findUnique": {
        params: FruitFindUniqueProps,
        response: FruitFindUniqueResponse<Input extends FruitFindUniqueProps ? Input : never>
    },
    "/fruit/count": {
        params: FruitCountProps,
        response: FruitCountResponse
    }
}

export const FruitFindManyApi = async <T extends FruitFindManyProps>(request: NextRequest) => {
    try {
        const params: T = parseAndDecodeParams(request);
        const response = await FruitFindManyCached<T>(params);
        return NextResponse.json(response, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "FruitFindManyApi -> " + (error as Error).message }, { status: 500 });
    }
};

export const FruitFindFirstApi = async <T extends FruitFindFirstProps>(request: NextRequest) => {
    try {
        const params: T = parseAndDecodeParams(request);
        const response = await FruitFindFirstCached<T>(params);
        return NextResponse.json(response, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "FruitFindFirstApi -> " + (error as Error).message }, { status: 500 });
    }
};

export const FruitFindUniqueApi = async <T extends FruitFindUniqueProps>(request: NextRequest) => {
    try {
        const params: T = parseAndDecodeParams(request);
        const response = await FruitFindUniqueCached<T>(params);
        return NextResponse.json(response, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "FruitFindUniqueApi -> " + (error as Error).message }, { status: 500 });
    }
};

export const FruitCountApi = async (request: NextRequest) => {
    try {
        const params: FruitCountProps = parseAndDecodeParams(request);
        const response = await FruitCountCached(params);
        return NextResponse.json(response, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "FruitCountApi -> " + (error as Error).message }, { status: 500 });
    }
};
