import { ContentCountCached, ContentFindFirstCached, ContentFindManyCached, ContentFindUniqueCached } from "@services/cached/index";
import { ContentCountProps, ContentCountResponse, ContentFindFirstProps, ContentFindFirstResponse, ContentFindManyProps, ContentFindManyResponse, ContentFindUniqueProps, ContentFindUniqueResponse } from "@services/types/index";
import { parseAndDecodeParams } from "@utils/FetchConfig";
import { NextRequest, NextResponse } from "next/server";

export type ContentRoutes<Input> = {
    "/content/findMany": {
        params: ContentFindManyProps,
        response: ContentFindManyResponse<Input extends ContentFindManyProps ? Input : never>
    },
    "/content/findFirst": {
        params: ContentFindFirstProps,
        response: ContentFindFirstResponse<Input extends ContentFindFirstProps ? Input : never>
    },
    "/content/findUnique": {
        params: ContentFindUniqueProps,
        response: ContentFindUniqueResponse<Input extends ContentFindUniqueProps ? Input : never>
    },
    "/content/count": {
        params: ContentCountProps,
        response: ContentCountResponse
    }
}

export const ContentFindManyApi = async <T extends ContentFindManyProps>(request: NextRequest) => {
    try {
        const params: T = parseAndDecodeParams(request);
        const response = await ContentFindManyCached<T>(params);
        return NextResponse.json(response, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "ContentFindManyApi -> " + (error as Error).message }, { status: 500 });
    }
};

export const ContentFindFirstApi = async <T extends ContentFindFirstProps>(request: NextRequest) => {
    try {
        const params: T = parseAndDecodeParams(request);
        const response = await ContentFindFirstCached<T>(params);
        return NextResponse.json(response, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "ContentFindFirstApi -> " + (error as Error).message }, { status: 500 });
    }
};

export const ContentFindUniqueApi = async <T extends ContentFindUniqueProps>(request: NextRequest) => {
    try {
        const params: T = parseAndDecodeParams(request);
        const response = await ContentFindUniqueCached<T>(params);
        return NextResponse.json(response, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "ContentFindUniqueApi -> " + (error as Error).message }, { status: 500 });
    }
};

export const ContentCountApi = async (request: NextRequest) => {
    try {
        const params: ContentCountProps = parseAndDecodeParams(request);
        const response = await ContentCountCached(params);
        return NextResponse.json(response, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "ContentCountApi -> " + (error as Error).message }, { status: 500 });
    }
};
