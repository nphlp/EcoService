import DiyService from "@services/class/DiyClass";
import { CountDiyProps, CountDiyResponse, FindManyDiyProps, FindManyDiyResponse, FindUniqueDiyProps, FindUniqueDiyResponse } from "@services/types/DiyType";
import { parseAndDecodeParams, revalidate } from "@utils/FetchV2";
import { unstable_cache as cache } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

// ============== API Routes Types ============== //

export type DiyRoutes<T> = {
    "/diy": {
        props: FindManyDiyProps,
        response: FindManyDiyResponse<T extends FindManyDiyProps ? T : never>
    },
    "/diy/unique": {
        props: FindUniqueDiyProps,
        response: FindUniqueDiyResponse<T extends FindUniqueDiyProps ? T : never>
    },
    "/diy/count": {
        props: CountDiyProps,
        response: CountDiyResponse
    }
}

// ==================== Find Many ==================== //

const diyListCached = cache(async (params: FindManyDiyProps) => DiyService.findMany(params), ["diy"], {
    revalidate,
    tags: ["diy"],
});

export const SelectDiyList = async (request: NextRequest) => {
    try {
        const params = parseAndDecodeParams(request);
        const response = await diyListCached(params);
        return NextResponse.json(response, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "getDiyListCached -> " + (error as Error).message }, { status: 500 });
    }
};

// ==================== Find Unique ==================== //

const diyUniqueCached = cache(
    async <T extends FindUniqueDiyProps>(params: T) => DiyService.findUnique(params),
    ["diy/unique"],
    { revalidate, tags: ["diy/unique"] },
);

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

const diyCountCached = cache(async (params: CountDiyProps) => DiyService.count(params), ["diy/count"], {
    revalidate,
    tags: ["diy/count"],
});

export const SelectDiyCount = async (request: NextRequest) => {
    try {
        const params: CountDiyProps = parseAndDecodeParams(request);
        const response = await diyCountCached(params);
        return NextResponse.json(response, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "getDiyCountCached -> " + (error as Error).message }, { status: 500 });
    }
};
