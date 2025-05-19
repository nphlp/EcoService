import ProductService from "@services/class/ProductClass";
import { CountProductProps, CountProductResponse, FindFirstProductProps, FindFirstProductResponse, FindManyProductProps, FindManyProductResponse, FindUniqueProductProps, FindUniqueProductResponse } from "@services/types/ProductType";
import { cacheLifeApi, parseAndDecodeParams } from "@utils/FetchConfig";
import { unstable_cacheLife as cacheLife, unstable_cacheTag as cacheTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

// ============== API Routes Types ============== //

export type ProductRoutes<Input> = {
    "/product": {
        params: FindManyProductProps,
        response: FindManyProductResponse<Input extends FindManyProductProps ? Input : never>
    },
    "/product/first": {
        params: FindFirstProductProps,
        response: FindFirstProductResponse<Input extends FindFirstProductProps ? Input : never>
    },
    "/product/unique": {
        params: FindUniqueProductProps,
        response: FindUniqueProductResponse<Input extends FindUniqueProductProps ? Input : never>
    },
    "/product/count": {
        params: CountProductProps,
        response: CountProductResponse
    }
}

// ==================== Find Many ==================== //

const productListCached = async <T extends FindManyProductProps>(params: T) => {
    "use cache";
    cacheLife(cacheLifeApi);
    cacheTag("/api/product");
    return ProductService.findMany<T>(params);
};

export const SelectProductList = async <T extends FindManyProductProps>(request: NextRequest) => {
    try {
        const params: T = parseAndDecodeParams(request);
        const response = await productListCached<T>(params);
        return NextResponse.json(response, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "getProductListCached -> " + (error as Error).message }, { status: 500 });
    }
};

// ==================== Find First ==================== //

const productFirstCached = async <T extends FindFirstProductProps>(params: T) => {
    "use cache";
    cacheLife(cacheLifeApi);
    cacheTag("/api/product/first");
    return ProductService.findFirst<T>(params);
};

export const SelectProductFirst = async <T extends FindFirstProductProps>(request: NextRequest) => {
    try {
        const params: T = parseAndDecodeParams(request);
        const response = await productFirstCached<T>(params);
        return NextResponse.json(response, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "getProductFirstCached -> " + (error as Error).message }, { status: 500 });
    }
};

// ==================== Find Unique ==================== //

const productUniqueCached = async <T extends FindUniqueProductProps>(params: T) => {
    "use cache";
    cacheLife(cacheLifeApi);
    cacheTag("/api/product/unique");
    return ProductService.findUnique<T>(params);
};

export const SelectProductUnique = async <T extends FindUniqueProductProps>(request: NextRequest) => {
    try {
        const params: T = parseAndDecodeParams(request);
        const response = await productUniqueCached<T>(params);
        return NextResponse.json(response, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "getProductUniqueCached -> " + (error as Error).message }, { status: 500 });
    }
};

// ==================== Count ==================== //

const productCountCached = async (params: CountProductProps) => {
    "use cache";
    cacheLife(cacheLifeApi);
    cacheTag("/api/product/count");
    return ProductService.count(params);
};

export const SelectProductCount = async (request: NextRequest) => {
    try {
        const params: CountProductProps = parseAndDecodeParams(request);
        const response = await productCountCached(params);
        return NextResponse.json(response, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "getProductCountCached -> " + (error as Error).message }, { status: 500 });
    }
};
