import ProductService from "@services/class/ProductClass";
import { CountProductProps, CountProductResponse, FindManyProductProps, FindManyProductResponse, FindUniqueProductProps, FindUniqueProductResponse } from "@services/types/ProductType";
import { parseAndDecodeParams, revalidate } from "@utils/FetchConfig";
import { unstable_cache as cache } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

// ============== API Routes Types ============== //

export type ProductRoutes<Input> = {
    "/product": {
        params: FindManyProductProps,
        response: FindManyProductResponse<Input extends FindManyProductProps ? Input : never>
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

const productListCached = cache(async <T extends FindManyProductProps>(params: T) => ProductService.findMany(params), ["product"], {
    revalidate,
    tags: ["product"],
});

export const SelectProductList = async <T extends FindManyProductProps>(request: NextRequest) => {
    try {
        const params: T = parseAndDecodeParams(request);
        const response = await productListCached<T>(params);
        return NextResponse.json(response, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "getProductListCached -> " + (error as Error).message }, { status: 500 });
    }
};

// ==================== Find Unique ==================== //

const productUniqueCached = cache(
    async <T extends FindUniqueProductProps>(params: T) => ProductService.findUnique(params),
    ["product/unique"],
    { revalidate, tags: ["product/unique"] },
);

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

const productCountCached = cache(async (params: CountProductProps) => ProductService.count(params), ["product/count"], {
    revalidate,
    tags: ["product/count"],
});

export const SelectProductCount = async (request: NextRequest) => {
    try {
        const params: CountProductProps = parseAndDecodeParams(request);
        const response = await productCountCached(params);
        return NextResponse.json(response, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "getProductCountCached -> " + (error as Error).message }, { status: 500 });
    }
};
