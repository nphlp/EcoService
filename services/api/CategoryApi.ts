import CategoryService from "@services/class/CategoryClass";
import { CategoryCountProps, CategoryCountResponse, CategoryFindFirstProps, CategoryFindFirstResponse, CategoryFindManyProps, CategoryFindManyResponse, CategoryFindUniqueProps, CategoryFindUniqueResponse } from "@services/types/CategoryType";
import { cacheLifeApi, parseAndDecodeParams } from "@utils/FetchConfig";
import { unstable_cacheLife as cacheLife, unstable_cacheTag as cacheTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

// ============== API Routes Types ============== //

export type CategoryRoutes<Input> = {
    "/category": {
        params: CategoryFindManyProps,
        response: CategoryFindManyResponse<Input extends CategoryFindManyProps ? Input : never>
    },
    "/category/first": {
        params: CategoryFindFirstProps,
        response: CategoryFindFirstResponse<Input extends CategoryFindFirstProps ? Input : never>
    },
    "/category/unique": {
        params: CategoryFindUniqueProps,
        response: CategoryFindUniqueResponse<Input extends CategoryFindUniqueProps ? Input : never>
    },
    "/category/count": {
        params: CategoryCountProps,
        response: CategoryCountResponse
    }
}

// ==================== Find Many ==================== //

const categoryFindManyCached = async <T extends CategoryFindManyProps>(params: T) => {
    "use cache";
    cacheLife(cacheLifeApi);
    cacheTag("/api/category");
    return CategoryService.findMany<T>(params);
};

export const CategoryFindManyApi = async <T extends CategoryFindManyProps>(request: NextRequest) => {
    try {
        const params: T = parseAndDecodeParams(request);
        const response = await categoryFindManyCached<T>(params);
        return NextResponse.json(response, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "CategoryFindManyApi -> " + (error as Error).message }, { status: 500 });
    }
};

// ==================== Find First ==================== //

const categoryFindFirstCached = async <T extends CategoryFindFirstProps>(params: T) => {
    "use cache";
    cacheLife(cacheLifeApi);
    cacheTag("/api/category/first");
    return CategoryService.findFirst<T>(params);
};

export const CategoryFindFirstApi = async <T extends CategoryFindFirstProps>(request: NextRequest) => {
    try {
        const params: T = parseAndDecodeParams(request);
        const response = await categoryFindFirstCached<T>(params);
        return NextResponse.json(response, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "CategoryFindFirstApi -> " + (error as Error).message }, { status: 500 });
    }
};

// ==================== Find Unique ==================== //

const categoryFindUniqueCached = async <T extends CategoryFindUniqueProps>(params: T) => {
    "use cache";
    cacheLife(cacheLifeApi);
    cacheTag("/api/category/unique");
    return CategoryService.findUnique<T>(params);
};

export const CategoryFindUniqueApi = async <T extends CategoryFindUniqueProps>(request: NextRequest) => {
    try {
        const params: T = parseAndDecodeParams(request);
        const response = await categoryFindUniqueCached<T>(params);
        return NextResponse.json(response, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "CategoryFindUniqueApi -> " + (error as Error).message }, { status: 500 });
    }
};

// ==================== Count ==================== //

const categoryCountCached = async (params: CategoryCountProps) => {
    "use cache";
    cacheLife(cacheLifeApi);
    cacheTag("/api/category/count");
    return CategoryService.count(params);
};

export const CategoryCountApi = async (request: NextRequest) => {
    try {
        const params: CategoryCountProps = parseAndDecodeParams(request);
        const response = await categoryCountCached(params);
        return NextResponse.json(response, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "CategoryCountApi -> " + (error as Error).message }, { status: 500 });
    }
};
