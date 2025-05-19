import DiyService from "@services/class/DiyClass";
import { CountDiyProps, CountDiyResponse, FindFirstDiyProps, FindFirstDiyResponse, FindManyDiyProps, FindManyDiyResponse, FindUniqueDiyProps, FindUniqueDiyResponse } from "@services/types/DiyType";
import { cacheLifeApi, parseAndDecodeParams } from "@utils/FetchConfig";
import { unstable_cacheLife as cacheLife, unstable_cacheTag as cacheTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

// ============== API Routes Types ============== //

export type DiyRoutes<Input> = {
    "/diy": {
        params: FindManyDiyProps,
        response: FindManyDiyResponse<Input extends FindManyDiyProps ? Input : never>
    },
    "/diy/first": {
        params: FindFirstDiyProps,
        response: FindFirstDiyResponse<Input extends FindFirstDiyProps ? Input : never>
    },
    "/diy/unique": {
        params: FindUniqueDiyProps,
        response: FindUniqueDiyResponse<Input extends FindUniqueDiyProps ? Input : never>
    },
    "/diy/count": {
        params: CountDiyProps,
        response: CountDiyResponse
    }
}

// ==================== Find Many ==================== //

const diyListCached = async <T extends FindManyDiyProps>(params: T) => {
    "use cache";
    cacheLife(cacheLifeApi);
    cacheTag("/api/diy");
    return DiyService.findMany<T>(params);
};

export const SelectDiyList = async <T extends FindManyDiyProps>(request: NextRequest) => {
    try {
        const params: T = parseAndDecodeParams(request);
        const response = await diyListCached<T>(params);
        return NextResponse.json(response, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "getDiyListCached -> " + (error as Error).message }, { status: 500 });
    }
};

// ==================== Find First ==================== //

const diyFirstCached = async <T extends FindFirstDiyProps>(params: T) => {
    "use cache";
    cacheLife(cacheLifeApi);
    cacheTag("/api/diy/first");
    return DiyService.findFirst<T>(params);
};

export const SelectDiyFirst = async <T extends FindFirstDiyProps>(request: NextRequest) => {
    try {
        const params: T = parseAndDecodeParams(request);
        const response = await diyFirstCached<T>(params);
        return NextResponse.json(response, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "getDiyFirstCached -> " + (error as Error).message }, { status: 500 });
    }
};

// ==================== Find Unique ==================== //

const diyUniqueCached = async <T extends FindUniqueDiyProps>(params: T) => {
    "use cache";
    cacheLife(cacheLifeApi);
    cacheTag("/api/diy/unique");
    return DiyService.findUnique<T>(params);
};

export const SelectDiyUnique = async <T extends FindUniqueDiyProps>(request: NextRequest) => {
    try {
        const params: T = parseAndDecodeParams(request);
        const response = await diyUniqueCached<T>(params);
        return NextResponse.json(response, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "getDiyUniqueCached -> " + (error as Error).message }, { status: 500 });
    }
};

// ==================== Count ==================== //

const diyCountCached = async (params: CountDiyProps) => {
    "use cache";
    cacheLife(cacheLifeApi);
    cacheTag("/api/diy/count");
    return DiyService.count(params);
};

export const SelectDiyCount = async (request: NextRequest) => {
    try {
        const params: CountDiyProps = parseAndDecodeParams(request);
        const response = await diyCountCached(params);
        return NextResponse.json(response, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "getDiyCountCached -> " + (error as Error).message }, { status: 500 });
    }
};
