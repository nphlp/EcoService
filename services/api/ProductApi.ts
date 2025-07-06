import { ProductCountCached, ProductFindFirstCached, ProductFindManyCached, ProductFindUniqueCached } from "@services/cached/index";
import { ProductCountProps, ProductCountResponse, ProductFindFirstProps, ProductFindFirstResponse, ProductFindManyProps, ProductFindManyResponse, ProductFindUniqueProps, ProductFindUniqueResponse } from "@services/types/index";
import { parseAndDecodeParams } from "@utils/FetchConfig";
import { NextRequest, NextResponse } from "next/server";

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

export const ProductFindManyApi = async <T extends ProductFindManyProps>(request: NextRequest) => {
    try {
        const params: T = parseAndDecodeParams(request);
        const response = await ProductFindManyCached<T>(params);
        return NextResponse.json(response, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "ProductFindManyApi -> " + (error as Error).message }, { status: 500 });
    }
};

export const ProductFindFirstApi = async <T extends ProductFindFirstProps>(request: NextRequest) => {
    try {
        const params: T = parseAndDecodeParams(request);
        const response = await ProductFindFirstCached<T>(params);
        return NextResponse.json(response, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "ProductFindFirstApi -> " + (error as Error).message }, { status: 500 });
    }
};

export const ProductFindUniqueApi = async <T extends ProductFindUniqueProps>(request: NextRequest) => {
    try {
        const params: T = parseAndDecodeParams(request);
        const response = await ProductFindUniqueCached<T>(params);
        return NextResponse.json(response, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "ProductFindUniqueApi -> " + (error as Error).message }, { status: 500 });
    }
};

export const ProductCountApi = async (request: NextRequest) => {
    try {
        const params: ProductCountProps = parseAndDecodeParams(request);
        const response = await ProductCountCached(params);
        return NextResponse.json(response, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "ProductCountApi -> " + (error as Error).message }, { status: 500 });
    }
};
