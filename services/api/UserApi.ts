import UserService from "@services/class/UserClass";
import { CountUserProps, CountUserResponse, FindManyUserProps, FindManyUserResponse, FindUniqueUserProps, FindUniqueUserResponse } from "@services/types/UserType";
import { parseAndDecodeParams, revalidate } from "@utils/FetchV2";
import { unstable_cache as cache } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

// ============== API Routes Types ============== //

export type UserRoutes<T> = {
    "/user": {
        props: FindManyUserProps,
        response: FindManyUserResponse<T extends FindManyUserProps ? T : never>
    },
    "/user/unique": {
        props: FindUniqueUserProps,
        response: FindUniqueUserResponse<T extends FindUniqueUserProps ? T : never>
    },
    "/user/count": {
        props: CountUserProps,
        response: CountUserResponse
    }
}

// ==================== Find Many ==================== //

const userListCached = cache(async (params: FindManyUserProps) => UserService.findMany(params), ["user"], {
    revalidate,
    tags: ["user"],
});

export const SelectUserList = async (request: NextRequest) => {
    try {
        const params = parseAndDecodeParams(request);
        const response = await userListCached(params);
        return NextResponse.json(response, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "getUserListCached -> " + (error as Error).message }, { status: 500 });
    }
};

// ==================== Find Unique ==================== //

const userUniqueCached = cache(
    async <T extends FindUniqueUserProps>(params: T) => UserService.findUnique(params),
    ["user/unique"],
    { revalidate, tags: ["user/unique"] },
);

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

const userCountCached = cache(async (params: CountUserProps) => UserService.count(params), ["user/count"], {
    revalidate,
    tags: ["user/count"],
});

export const SelectUserCount = async (request: NextRequest) => {
    try {
        const params: CountUserProps = parseAndDecodeParams(request);
        const response = await userCountCached(params);
        return NextResponse.json(response, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "getUserCountCached -> " + (error as Error).message }, { status: 500 });
    }
};
