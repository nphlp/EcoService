import { AccountCountCached, AccountFindFirstCached, AccountFindManyCached, AccountFindUniqueCached } from "@services/cached/index";
import { AccountCountProps, AccountCountResponse, AccountFindFirstProps, AccountFindFirstResponse, AccountFindManyProps, AccountFindManyResponse, AccountFindUniqueProps, AccountFindUniqueResponse } from "@services/types/index";
import { parseAndDecodeParams } from "@utils/FetchConfig";
import { NextRequest, NextResponse } from "next/server";

export type AccountRoutes<Input> = {
    "/account": {
        params: AccountFindManyProps,
        response: AccountFindManyResponse<Input extends AccountFindManyProps ? Input : never>
    },
    "/account/first": {
        params: AccountFindFirstProps,
        response: AccountFindFirstResponse<Input extends AccountFindFirstProps ? Input : never>
    },
    "/account/unique": {
        params: AccountFindUniqueProps,
        response: AccountFindUniqueResponse<Input extends AccountFindUniqueProps ? Input : never>
    },
    "/account/count": {
        params: AccountCountProps,
        response: AccountCountResponse
    }
}

export const AccountFindManyApi = async <T extends AccountFindManyProps>(request: NextRequest) => {
    try {
        const params: T = parseAndDecodeParams(request);
        const response = await AccountFindManyCached<T>(params);
        return NextResponse.json(response, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "AccountFindManyApi -> " + (error as Error).message }, { status: 500 });
    }
};

export const AccountFindFirstApi = async <T extends AccountFindFirstProps>(request: NextRequest) => {
    try {
        const params: T = parseAndDecodeParams(request);
        const response = await AccountFindFirstCached<T>(params);
        return NextResponse.json(response, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "AccountFindFirstApi -> " + (error as Error).message }, { status: 500 });
    }
};

export const AccountFindUniqueApi = async <T extends AccountFindUniqueProps>(request: NextRequest) => {
    try {
        const params: T = parseAndDecodeParams(request);
        const response = await AccountFindUniqueCached<T>(params);
        return NextResponse.json(response, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "AccountFindUniqueApi -> " + (error as Error).message }, { status: 500 });
    }
};

export const AccountCountApi = async (request: NextRequest) => {
    try {
        const params: AccountCountProps = parseAndDecodeParams(request);
        const response = await AccountCountCached(params);
        return NextResponse.json(response, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "AccountCountApi -> " + (error as Error).message }, { status: 500 });
    }
};
