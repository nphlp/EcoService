import { CategoryCountCached, CategoryFindFirstCached, CategoryFindManyCached, CategoryFindUniqueCached } from "@services/cached/index";
import { CategoryCountProps, CategoryCountResponse, CategoryFindFirstProps, CategoryFindFirstResponse, CategoryFindManyProps, CategoryFindManyResponse, CategoryFindUniqueProps, CategoryFindUniqueResponse } from "@services/types/index";
import { parseAndDecodeParams } from "@utils/FetchConfig";
import { NextRequest, NextResponse } from "next/server";

export type CategoryRoutes<Input> = {
    "/category/findMany": {
        params: CategoryFindManyProps,
        response: CategoryFindManyResponse<Input extends CategoryFindManyProps ? Input : never>
    },
    "/category/findFirst": {
        params: CategoryFindFirstProps,
        response: CategoryFindFirstResponse<Input extends CategoryFindFirstProps ? Input : never>
    },
    "/category/findUnique": {
        params: CategoryFindUniqueProps,
        response: CategoryFindUniqueResponse<Input extends CategoryFindUniqueProps ? Input : never>
    },
    "/category/count": {
        params: CategoryCountProps,
        response: CategoryCountResponse
    }
}

export const CategoryFindManyApi = async <T extends CategoryFindManyProps>(request: NextRequest) => {
    try {
        const params: T = parseAndDecodeParams(request);
        const response = await CategoryFindManyCached<T>(params);
        return NextResponse.json(response, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "CategoryFindManyApi -> " + (error as Error).message }, { status: 500 });
    }
};

export const CategoryFindFirstApi = async <T extends CategoryFindFirstProps>(request: NextRequest) => {
    try {
        const params: T = parseAndDecodeParams(request);
        const response = await CategoryFindFirstCached<T>(params);
        return NextResponse.json(response, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "CategoryFindFirstApi -> " + (error as Error).message }, { status: 500 });
    }
};

export const CategoryFindUniqueApi = async <T extends CategoryFindUniqueProps>(request: NextRequest) => {
    try {
        const params: T = parseAndDecodeParams(request);
        const response = await CategoryFindUniqueCached<T>(params);
        return NextResponse.json(response, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "CategoryFindUniqueApi -> " + (error as Error).message }, { status: 500 });
    }
};

export const CategoryCountApi = async (request: NextRequest) => {
    try {
        const params: CategoryCountProps = parseAndDecodeParams(request);
        const response = await CategoryCountCached(params);
        return NextResponse.json(response, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "CategoryCountApi -> " + (error as Error).message }, { status: 500 });
    }
};
