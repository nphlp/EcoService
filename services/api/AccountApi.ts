import AccountService from "@services/class/AccountClass";
import { CountAccountProps, CountAccountResponse, FindManyAccountProps, FindManyAccountResponse, FindUniqueAccountProps, FindUniqueAccountResponse } from "@services/types/AccountType";
import { parseAndDecodeParams, revalidate } from "@utils/FetchV2";
import { unstable_cache as cache } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

// ============== API Routes Types ============== //

export type AccountRoutes<T> = {
    "/account": {
        props: FindManyAccountProps,
        response: FindManyAccountResponse<T extends FindManyAccountProps ? T : never>
    },
    "/account/unique": {
        props: FindUniqueAccountProps,
        response: FindUniqueAccountResponse<T extends FindUniqueAccountProps ? T : never>
    },
    "/account/count": {
        props: CountAccountProps,
        response: CountAccountResponse
    }
}

// ==================== Find Many ==================== //

const accountListCached = cache(async (params: FindManyAccountProps) => AccountService.findMany(params), ["account"], {
    revalidate,
    tags: ["account"],
});

export const SelectAccountList = async (request: NextRequest) => {
    try {
        const params = parseAndDecodeParams(request);
        const response = await accountListCached(params);
        return NextResponse.json(response, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "getAccountListCached -> " + (error as Error).message }, { status: 500 });
    }
};

// ==================== Find Unique ==================== //

const accountUniqueCached = cache(
    async <T extends FindUniqueAccountProps>(params: T) => AccountService.findUnique(params),
    ["account/unique"],
    { revalidate, tags: ["account/unique"] },
);

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

const accountCountCached = cache(async (params: CountAccountProps) => AccountService.count(params), ["account/count"], {
    revalidate,
    tags: ["account/count"],
});

export const SelectAccountCount = async (request: NextRequest) => {
    try {
        const params: CountAccountProps = parseAndDecodeParams(request);
        const response = await accountCountCached(params);
        return NextResponse.json(response, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "getAccountCountCached -> " + (error as Error).message }, { status: 500 });
    }
};
