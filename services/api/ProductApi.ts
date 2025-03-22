import ProductService from "@services/class/ProductClass";
import { CountProductProps, CountProductResponse, FindManyProductProps, FindManyProductResponse, FindUniqueProductProps, FindUniqueProductResponse } from "@services/types/ProductType";
import { parseAndDecodeParams, revalidate } from "@utils/FetchV2";
import { unstable_cache as cache } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

// ============== API Routes Types ============== //

export type ProductRoutes<T> = {
    "/product": {
        props: FindManyProductProps,
        response: FindManyProductResponse<T extends FindManyProductProps ? T : never>
    },
    "/product/unique": {
        props: FindUniqueProductProps,
        response: FindUniqueProductResponse<T extends FindUniqueProductProps ? T : never>
    },
    "/product/count": {
        props: CountProductProps,
        response: CountProductResponse
    }
}

// ==================== Find Many ==================== //

const productListCached = cache(async (params: FindManyProductProps) => ProductService.findMany(params), ["product"], {
    revalidate,
    tags: ["product"],
});

export const SelectProductList = async (request: NextRequest) => {
    try {
        const params = parseAndDecodeParams(request);
        const response = await productListCached(params);
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
