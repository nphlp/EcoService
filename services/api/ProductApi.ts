import ProductService from "@services/class/ProductClass";
import { ProductCountProps, ProductCountResponse, ProductFindFirstProps, ProductFindFirstResponse, ProductFindManyProps, ProductFindManyResponse, ProductFindUniqueProps, ProductFindUniqueResponse } from "@services/types/ProductType";
import { cacheLifeApi, parseAndDecodeParams } from "@utils/FetchConfig";
import { unstable_cacheLife as cacheLife, unstable_cacheTag as cacheTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

// ============== API Routes Types ============== //

export type ProductRoutes<Input> = {
    "/product": {
        params: ProductFindManyProps,
        response: ProductFindManyResponse<Input extends ProductFindManyProps ? Input : never>
    },
    "/product/first": {
        params: ProductFindFirstProps,
        response: ProductFindFirstResponse<Input extends ProductFindFirstProps ? Input : never>
    },
    "/product/unique": {
        params: ProductFindUniqueProps,
        response: ProductFindUniqueResponse<Input extends ProductFindUniqueProps ? Input : never>
    },
    "/product/count": {
        params: ProductCountProps,
        response: ProductCountResponse
    }
}

// ==================== Find Many ==================== //

const productFindManyCached = async <T extends ProductFindManyProps>(params: T) => {
    "use cache";
    cacheLife(cacheLifeApi);
    cacheTag("/api/product");
    return ProductService.findMany<T>(params);
};

export const ProductFindManyApi = async <T extends ProductFindManyProps>(request: NextRequest) => {
    try {
        const params: T = parseAndDecodeParams(request);
        const response = await productFindManyCached<T>(params);
        return NextResponse.json(response, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "ProductFindManyApi -> " + (error as Error).message }, { status: 500 });
    }
};

// ==================== Find First ==================== //

const productFindFirstCached = async <T extends ProductFindFirstProps>(params: T) => {
    "use cache";
    cacheLife(cacheLifeApi);
    cacheTag("/api/product/first");
    return ProductService.findFirst<T>(params);
};

export const ProductFindFirstApi = async <T extends ProductFindFirstProps>(request: NextRequest) => {
    try {
        const params: T = parseAndDecodeParams(request);
        const response = await productFindFirstCached<T>(params);
        return NextResponse.json(response, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "ProductFindFirstApi -> " + (error as Error).message }, { status: 500 });
    }
};

// ==================== Find Unique ==================== //

const productFindUniqueCached = async <T extends ProductFindUniqueProps>(params: T) => {
    "use cache";
    cacheLife(cacheLifeApi);
    cacheTag("/api/product/unique");
    return ProductService.findUnique<T>(params);
};

export const ProductFindUniqueApi = async <T extends ProductFindUniqueProps>(request: NextRequest) => {
    try {
        const params: T = parseAndDecodeParams(request);
        const response = await productFindUniqueCached<T>(params);
        return NextResponse.json(response, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "ProductFindUniqueApi -> " + (error as Error).message }, { status: 500 });
    }
};

// ==================== Count ==================== //

const productCountCached = async (params: ProductCountProps) => {
    "use cache";
    cacheLife(cacheLifeApi);
    cacheTag("/api/product/count");
    return ProductService.count(params);
};

export const ProductCountApi = async (request: NextRequest) => {
    try {
        const params: ProductCountProps = parseAndDecodeParams(request);
        const response = await productCountCached(params);
        return NextResponse.json(response, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "ProductCountApi -> " + (error as Error).message }, { status: 500 });
    }
};
