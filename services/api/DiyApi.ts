import { DiyCountCached, DiyFindFirstCached, DiyFindManyCached, DiyFindUniqueCached } from "@services/cached/index";
import { DiyCountProps, DiyCountResponse, DiyFindFirstProps, DiyFindFirstResponse, DiyFindManyProps, DiyFindManyResponse, DiyFindUniqueProps, DiyFindUniqueResponse } from "@services/types/index";
import { parseAndDecodeParams } from "@utils/FetchConfig";
import { NextRequest, NextResponse } from "next/server";

export type DiyRoutes<Input> = {
    "/diy/findMany": {
        params: DiyFindManyProps,
        response: DiyFindManyResponse<Input extends DiyFindManyProps ? Input : never>
    },
    "/diy/findFirst": {
        params: DiyFindFirstProps,
        response: DiyFindFirstResponse<Input extends DiyFindFirstProps ? Input : never>
    },
    "/diy/findUnique": {
        params: DiyFindUniqueProps,
        response: DiyFindUniqueResponse<Input extends DiyFindUniqueProps ? Input : never>
    },
    "/diy/count": {
        params: DiyCountProps,
        response: DiyCountResponse
    }
}

export const DiyFindManyApi = async <T extends DiyFindManyProps>(request: NextRequest) => {
    try {
        const params: T = parseAndDecodeParams(request);
        const response = await DiyFindManyCached<T>(params);
        return NextResponse.json(response, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "DiyFindManyApi -> " + (error as Error).message }, { status: 500 });
    }
};

export const DiyFindFirstApi = async <T extends DiyFindFirstProps>(request: NextRequest) => {
    try {
        const params: T = parseAndDecodeParams(request);
        const response = await DiyFindFirstCached<T>(params);
        return NextResponse.json(response, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "DiyFindFirstApi -> " + (error as Error).message }, { status: 500 });
    }
};

export const DiyFindUniqueApi = async <T extends DiyFindUniqueProps>(request: NextRequest) => {
    try {
        const params: T = parseAndDecodeParams(request);
        const response = await DiyFindUniqueCached<T>(params);
        return NextResponse.json(response, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "DiyFindUniqueApi -> " + (error as Error).message }, { status: 500 });
    }
};

export const DiyCountApi = async (request: NextRequest) => {
    try {
        const params: DiyCountProps = parseAndDecodeParams(request);
        const response = await DiyCountCached(params);
        return NextResponse.json(response, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "DiyCountApi -> " + (error as Error).message }, { status: 500 });
    }
};
