import AccountService from "@services/class/AccountClass";
import { AccountCountProps, AccountCountResponse, AccountFindFirstProps, AccountFindFirstResponse, AccountFindManyProps, AccountFindManyResponse, AccountFindUniqueProps, AccountFindUniqueResponse } from "@services/types/AccountType";
import { cacheLifeApi, parseAndDecodeParams } from "@utils/FetchConfig";
import { unstable_cacheLife as cacheLife, unstable_cacheTag as cacheTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

// ============== API Routes Types ============== //

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

// ==================== Find Many ==================== //

const accountFindManyCached = async <T extends AccountFindManyProps>(params: T) => {
    "use cache";
    cacheLife(cacheLifeApi);
    cacheTag("/api/account");
    return AccountService.findMany<T>(params);
};

export const AccountFindManyApi = async <T extends AccountFindManyProps>(request: NextRequest) => {
    try {
        const params: T = parseAndDecodeParams(request);
        const response = await accountFindManyCached<T>(params);
        return NextResponse.json(response, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "AccountFindManyApi -> " + (error as Error).message }, { status: 500 });
    }
};

// ==================== Find First ==================== //

const accountFindFirstCached = async <T extends AccountFindFirstProps>(params: T) => {
    "use cache";
    cacheLife(cacheLifeApi);
    cacheTag("/api/account/first");
    return AccountService.findFirst<T>(params);
};

export const AccountFindFirstApi = async <T extends AccountFindFirstProps>(request: NextRequest) => {
    try {
        const params: T = parseAndDecodeParams(request);
        const response = await accountFindFirstCached<T>(params);
        return NextResponse.json(response, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "AccountFindFirstApi -> " + (error as Error).message }, { status: 500 });
    }
};

// ==================== Find Unique ==================== //

const accountFindUniqueCached = async <T extends AccountFindUniqueProps>(params: T) => {
    "use cache";
    cacheLife(cacheLifeApi);
    cacheTag("/api/account/unique");
    return AccountService.findUnique<T>(params);
};

export const AccountFindUniqueApi = async <T extends AccountFindUniqueProps>(request: NextRequest) => {
    try {
        const params: T = parseAndDecodeParams(request);
        const response = await accountFindUniqueCached<T>(params);
        return NextResponse.json(response, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "AccountFindUniqueApi -> " + (error as Error).message }, { status: 500 });
    }
};

// ==================== Count ==================== //

const accountCountCached = async (params: AccountCountProps) => {
    "use cache";
    cacheLife(cacheLifeApi);
    cacheTag("/api/account/count");
    return AccountService.count(params);
};

export const AccountCountApi = async (request: NextRequest) => {
    try {
        const params: AccountCountProps = parseAndDecodeParams(request);
        const response = await accountCountCached(params);
        return NextResponse.json(response, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "AccountCountApi -> " + (error as Error).message }, { status: 500 });
    }
};
