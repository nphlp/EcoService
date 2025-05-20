import DiyService from "@services/class/DiyClass";
import { DiyCountProps, DiyCountResponse, DiyFindFirstProps, DiyFindFirstResponse, DiyFindManyProps, DiyFindManyResponse, DiyFindUniqueProps, DiyFindUniqueResponse } from "@services/types/DiyType";
import { cacheLifeApi, parseAndDecodeParams } from "@utils/FetchConfig";
import { unstable_cacheLife as cacheLife, unstable_cacheTag as cacheTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

// ============== API Routes Types ============== //

export type DiyRoutes<Input> = {
    "/diy": {
        params: DiyFindManyProps,
        response: DiyFindManyResponse<Input extends DiyFindManyProps ? Input : never>
    },
    "/diy/first": {
        params: DiyFindFirstProps,
        response: DiyFindFirstResponse<Input extends DiyFindFirstProps ? Input : never>
    },
    "/diy/unique": {
        params: DiyFindUniqueProps,
        response: DiyFindUniqueResponse<Input extends DiyFindUniqueProps ? Input : never>
    },
    "/diy/count": {
        params: DiyCountProps,
        response: DiyCountResponse
    }
}

// ==================== Find Many ==================== //

const diyFindManyCached = async <T extends DiyFindManyProps>(params: T) => {
    "use cache";
    cacheLife(cacheLifeApi);
    cacheTag("/api/diy");
    return DiyService.findMany<T>(params);
};

export const DiyFindManyApi = async <T extends DiyFindManyProps>(request: NextRequest) => {
    try {
        const params: T = parseAndDecodeParams(request);
        const response = await diyFindManyCached<T>(params);
        return NextResponse.json(response, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "DiyFindManyApi -> " + (error as Error).message }, { status: 500 });
    }
};

// ==================== Find First ==================== //

const diyFindFirstCached = async <T extends DiyFindFirstProps>(params: T) => {
    "use cache";
    cacheLife(cacheLifeApi);
    cacheTag("/api/diy/first");
    return DiyService.findFirst<T>(params);
};

export const DiyFindFirstApi = async <T extends DiyFindFirstProps>(request: NextRequest) => {
    try {
        const params: T = parseAndDecodeParams(request);
        const response = await diyFindFirstCached<T>(params);
        return NextResponse.json(response, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "DiyFindFirstApi -> " + (error as Error).message }, { status: 500 });
    }
};

// ==================== Find Unique ==================== //

const diyFindUniqueCached = async <T extends DiyFindUniqueProps>(params: T) => {
    "use cache";
    cacheLife(cacheLifeApi);
    cacheTag("/api/diy/unique");
    return DiyService.findUnique<T>(params);
};

export const DiyFindUniqueApi = async <T extends DiyFindUniqueProps>(request: NextRequest) => {
    try {
        const params: T = parseAndDecodeParams(request);
        const response = await diyFindUniqueCached<T>(params);
        return NextResponse.json(response, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "DiyFindUniqueApi -> " + (error as Error).message }, { status: 500 });
    }
};

// ==================== Count ==================== //

const diyCountCached = async (params: DiyCountProps) => {
    "use cache";
    cacheLife(cacheLifeApi);
    cacheTag("/api/diy/count");
    return DiyService.count(params);
};

export const DiyCountApi = async (request: NextRequest) => {
    try {
        const params: DiyCountProps = parseAndDecodeParams(request);
        const response = await diyCountCached(params);
        return NextResponse.json(response, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "DiyCountApi -> " + (error as Error).message }, { status: 500 });
    }
};
