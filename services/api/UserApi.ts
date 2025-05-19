import UserService from "@services/class/UserClass";
import { CountUserProps, CountUserResponse, FindFirstUserProps, FindFirstUserResponse, FindManyUserProps, FindManyUserResponse, FindUniqueUserProps, FindUniqueUserResponse } from "@services/types/UserType";
import { cacheLifeApi, parseAndDecodeParams } from "@utils/FetchConfig";
import { unstable_cacheLife as cacheLife, unstable_cacheTag as cacheTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

// ============== API Routes Types ============== //

export type UserRoutes<Input> = {
    "/user": {
        params: FindManyUserProps,
        response: FindManyUserResponse<Input extends FindManyUserProps ? Input : never>
    },
    "/user/first": {
        params: FindFirstUserProps,
        response: FindFirstUserResponse<Input extends FindFirstUserProps ? Input : never>
    },
    "/user/unique": {
        params: FindUniqueUserProps,
        response: FindUniqueUserResponse<Input extends FindUniqueUserProps ? Input : never>
    },
    "/user/count": {
        params: CountUserProps,
        response: CountUserResponse
    }
}

// ==================== Find Many ==================== //

const userListCached = async <T extends FindManyUserProps>(params: T) => {
    "use cache";
    cacheLife(cacheLifeApi);
    cacheTag("/api/user");
    return UserService.findMany<T>(params);
};

export const SelectUserList = async <T extends FindManyUserProps>(request: NextRequest) => {
    try {
        const params: T = parseAndDecodeParams(request);
        const response = await userListCached<T>(params);
        return NextResponse.json(response, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "getUserListCached -> " + (error as Error).message }, { status: 500 });
    }
};

// ==================== Find First ==================== //

const userFirstCached = async <T extends FindFirstUserProps>(params: T) => {
    "use cache";
    cacheLife(cacheLifeApi);
    cacheTag("/api/user/first");
    return UserService.findFirst<T>(params);
};

export const SelectUserFirst = async <T extends FindFirstUserProps>(request: NextRequest) => {
    try {
        const params: T = parseAndDecodeParams(request);
        const response = await userFirstCached<T>(params);
        return NextResponse.json(response, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "getUserFirstCached -> " + (error as Error).message }, { status: 500 });
    }
};

// ==================== Find Unique ==================== //

const userUniqueCached = async <T extends FindUniqueUserProps>(params: T) => {
    "use cache";
    cacheLife(cacheLifeApi);
    cacheTag("/api/user/unique");
    return UserService.findUnique<T>(params);
};

export const SelectUserUnique = async <T extends FindUniqueUserProps>(request: NextRequest) => {
    try {
        const params: T = parseAndDecodeParams(request);
        const response = await userUniqueCached<T>(params);
        return NextResponse.json(response, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "getUserUniqueCached -> " + (error as Error).message }, { status: 500 });
    }
};

// ==================== Count ==================== //

const userCountCached = async (params: CountUserProps) => {
    "use cache";
    cacheLife(cacheLifeApi);
    cacheTag("/api/user/count");
    return UserService.count(params);
};

export const SelectUserCount = async (request: NextRequest) => {
    try {
        const params: CountUserProps = parseAndDecodeParams(request);
        const response = await userCountCached(params);
        return NextResponse.json(response, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "getUserCountCached -> " + (error as Error).message }, { status: 500 });
    }
};
