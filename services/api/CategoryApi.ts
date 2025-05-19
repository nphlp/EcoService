import CategoryService from "@services/class/CategoryClass";
import { CountCategoryProps, CountCategoryResponse, FindFirstCategoryProps, FindFirstCategoryResponse, FindManyCategoryProps, FindManyCategoryResponse, FindUniqueCategoryProps, FindUniqueCategoryResponse } from "@services/types/CategoryType";
import { cacheLifeApi, parseAndDecodeParams } from "@utils/FetchConfig";
import { unstable_cacheLife as cacheLife, unstable_cacheTag as cacheTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

// ============== API Routes Types ============== //

export type CategoryRoutes<Input> = {
    "/category": {
        params: FindManyCategoryProps,
        response: FindManyCategoryResponse<Input extends FindManyCategoryProps ? Input : never>
    },
    "/category/first": {
        params: FindFirstCategoryProps,
        response: FindFirstCategoryResponse<Input extends FindFirstCategoryProps ? Input : never>
    },
    "/category/unique": {
        params: FindUniqueCategoryProps,
        response: FindUniqueCategoryResponse<Input extends FindUniqueCategoryProps ? Input : never>
    },
    "/category/count": {
        params: CountCategoryProps,
        response: CountCategoryResponse
    }
}

// ==================== Find Many ==================== //

const categoryListCached = async <T extends FindManyCategoryProps>(params: T) => {
    "use cache";
    cacheLife(cacheLifeApi);
    cacheTag("/api/category");
    return CategoryService.findMany<T>(params);
};

export const SelectCategoryList = async <T extends FindManyCategoryProps>(request: NextRequest) => {
    try {
        const params: T = parseAndDecodeParams(request);
        const response = await categoryListCached<T>(params);
        return NextResponse.json(response, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "getCategoryListCached -> " + (error as Error).message }, { status: 500 });
    }
};

// ==================== Find First ==================== //

const categoryFirstCached = async <T extends FindFirstCategoryProps>(params: T) => {
    "use cache";
    cacheLife(cacheLifeApi);
    cacheTag("/api/category/first");
    return CategoryService.findFirst<T>(params);
};

export const SelectCategoryFirst = async <T extends FindFirstCategoryProps>(request: NextRequest) => {
    try {
        const params: T = parseAndDecodeParams(request);
        const response = await categoryFirstCached<T>(params);
        return NextResponse.json(response, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "getCategoryFirstCached -> " + (error as Error).message }, { status: 500 });
    }
};

// ==================== Find Unique ==================== //

const categoryUniqueCached = async <T extends FindUniqueCategoryProps>(params: T) => {
    "use cache";
    cacheLife(cacheLifeApi);
    cacheTag("/api/category/unique");
    return CategoryService.findUnique<T>(params);
};

export const SelectCategoryUnique = async <T extends FindUniqueCategoryProps>(request: NextRequest) => {
    try {
        const params: T = parseAndDecodeParams(request);
        const response = await categoryUniqueCached<T>(params);
        return NextResponse.json(response, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "getCategoryUniqueCached -> " + (error as Error).message }, { status: 500 });
    }
};

// ==================== Count ==================== //

const categoryCountCached = async (params: CountCategoryProps) => {
    "use cache";
    cacheLife(cacheLifeApi);
    cacheTag("/api/category/count");
    return CategoryService.count(params);
};

export const SelectCategoryCount = async (request: NextRequest) => {
    try {
        const params: CountCategoryProps = parseAndDecodeParams(request);
        const response = await categoryCountCached(params);
        return NextResponse.json(response, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "getCategoryCountCached -> " + (error as Error).message }, { status: 500 });
    }
};
