import AccountService from "@services/class/AccountClass";
import { CountAccountProps, CountAccountResponse, FindFirstAccountProps, FindFirstAccountResponse, FindManyAccountProps, FindManyAccountResponse, FindUniqueAccountProps, FindUniqueAccountResponse } from "@services/types/AccountType";
import { cacheLifeApi, parseAndDecodeParams } from "@utils/FetchConfig";
import { unstable_cacheLife as cacheLife, unstable_cacheTag as cacheTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

// ============== API Routes Types ============== //

export type AccountRoutes<Input> = {
    "/account": {
        params: FindManyAccountProps,
        response: FindManyAccountResponse<Input extends FindManyAccountProps ? Input : never>
    },
    "/account/first": {
        params: FindFirstAccountProps,
        response: FindFirstAccountResponse<Input extends FindFirstAccountProps ? Input : never>
    },
    "/account/unique": {
        params: FindUniqueAccountProps,
        response: FindUniqueAccountResponse<Input extends FindUniqueAccountProps ? Input : never>
    },
    "/account/count": {
        params: CountAccountProps,
        response: CountAccountResponse
    }
}

// ==================== Find Many ==================== //

const accountListCached = async <T extends FindManyAccountProps>(params: T) => {
    "use cache";
    cacheLife(cacheLifeApi);
    cacheTag("/api/account");
    return AccountService.findMany<T>(params);
};

export const SelectAccountList = async <T extends FindManyAccountProps>(request: NextRequest) => {
    try {
        const params: T = parseAndDecodeParams(request);
        const response = await accountListCached<T>(params);
        return NextResponse.json(response, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "getAccountListCached -> " + (error as Error).message }, { status: 500 });
    }
};

// ==================== Find First ==================== //

const accountFirstCached = async <T extends FindFirstAccountProps>(params: T) => {
    "use cache";
    cacheLife(cacheLifeApi);
    cacheTag("/api/account/first");
    return AccountService.findFirst<T>(params);
};

export const SelectAccountFirst = async <T extends FindFirstAccountProps>(request: NextRequest) => {
    try {
        const params: T = parseAndDecodeParams(request);
        const response = await accountFirstCached<T>(params);
        return NextResponse.json(response, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "getAccountFirstCached -> " + (error as Error).message }, { status: 500 });
    }
};

// ==================== Find Unique ==================== //

const accountUniqueCached = async <T extends FindUniqueAccountProps>(params: T) => {
    "use cache";
    cacheLife(cacheLifeApi);
    cacheTag("/api/account/unique");
    return AccountService.findUnique<T>(params);
};

export const SelectAccountUnique = async <T extends FindUniqueAccountProps>(request: NextRequest) => {
    try {
        const params: T = parseAndDecodeParams(request);
        const response = await accountUniqueCached<T>(params);
        return NextResponse.json(response, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "getAccountUniqueCached -> " + (error as Error).message }, { status: 500 });
    }
};

// ==================== Count ==================== //

const accountCountCached = async (params: CountAccountProps) => {
    "use cache";
    cacheLife(cacheLifeApi);
    cacheTag("/api/account/count");
    return AccountService.count(params);
};

export const SelectAccountCount = async (request: NextRequest) => {
    try {
        const params: CountAccountProps = parseAndDecodeParams(request);
        const response = await accountCountCached(params);
        return NextResponse.json(response, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "getAccountCountCached -> " + (error as Error).message }, { status: 500 });
    }
};
