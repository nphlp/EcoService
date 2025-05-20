import UserService from "@services/class/UserClass";
import { UserCountProps, UserCountResponse, UserFindFirstProps, UserFindFirstResponse, UserFindManyProps, UserFindManyResponse, UserFindUniqueProps, UserFindUniqueResponse } from "@services/types/UserType";
import { cacheLifeApi, parseAndDecodeParams } from "@utils/FetchConfig";
import { unstable_cacheLife as cacheLife, unstable_cacheTag as cacheTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

// ============== API Routes Types ============== //

export type UserRoutes<Input> = {
    "/user": {
        params: UserFindManyProps,
        response: UserFindManyResponse<Input extends UserFindManyProps ? Input : never>
    },
    "/user/first": {
        params: UserFindFirstProps,
        response: UserFindFirstResponse<Input extends UserFindFirstProps ? Input : never>
    },
    "/user/unique": {
        params: UserFindUniqueProps,
        response: UserFindUniqueResponse<Input extends UserFindUniqueProps ? Input : never>
    },
    "/user/count": {
        params: UserCountProps,
        response: UserCountResponse
    }
}

// ==================== Find Many ==================== //

const userFindManyCached = async <T extends UserFindManyProps>(params: T) => {
    "use cache";
    cacheLife(cacheLifeApi);
    cacheTag("/api/user");
    return UserService.findMany<T>(params);
};

export const UserFindManyApi = async <T extends UserFindManyProps>(request: NextRequest) => {
    try {
        const params: T = parseAndDecodeParams(request);
        const response = await userFindManyCached<T>(params);
        return NextResponse.json(response, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "UserFindManyApi -> " + (error as Error).message }, { status: 500 });
    }
};

// ==================== Find First ==================== //

const userFindFirstCached = async <T extends UserFindFirstProps>(params: T) => {
    "use cache";
    cacheLife(cacheLifeApi);
    cacheTag("/api/user/first");
    return UserService.findFirst<T>(params);
};

export const UserFindFirstApi = async <T extends UserFindFirstProps>(request: NextRequest) => {
    try {
        const params: T = parseAndDecodeParams(request);
        const response = await userFindFirstCached<T>(params);
        return NextResponse.json(response, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "UserFindFirstApi -> " + (error as Error).message }, { status: 500 });
    }
};

// ==================== Find Unique ==================== //

const userFindUniqueCached = async <T extends UserFindUniqueProps>(params: T) => {
    "use cache";
    cacheLife(cacheLifeApi);
    cacheTag("/api/user/unique");
    return UserService.findUnique<T>(params);
};

export const UserFindUniqueApi = async <T extends UserFindUniqueProps>(request: NextRequest) => {
    try {
        const params: T = parseAndDecodeParams(request);
        const response = await userFindUniqueCached<T>(params);
        return NextResponse.json(response, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "UserFindUniqueApi -> " + (error as Error).message }, { status: 500 });
    }
};

// ==================== Count ==================== //

const userCountCached = async (params: UserCountProps) => {
    "use cache";
    cacheLife(cacheLifeApi);
    cacheTag("/api/user/count");
    return UserService.count(params);
};

export const UserCountApi = async (request: NextRequest) => {
    try {
        const params: UserCountProps = parseAndDecodeParams(request);
        const response = await userCountCached(params);
        return NextResponse.json(response, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "UserCountApi -> " + (error as Error).message }, { status: 500 });
    }
};
