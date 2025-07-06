import { UserCountCached, UserFindFirstCached, UserFindManyCached, UserFindUniqueCached } from "@services/cached/index";
import { UserCountProps, UserCountResponse, UserFindFirstProps, UserFindFirstResponse, UserFindManyProps, UserFindManyResponse, UserFindUniqueProps, UserFindUniqueResponse } from "@services/types/index";
import { parseAndDecodeParams } from "@utils/FetchConfig";
import { NextRequest, NextResponse } from "next/server";

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

export const UserFindManyApi = async <T extends UserFindManyProps>(request: NextRequest) => {
    try {
        const params: T = parseAndDecodeParams(request);
        const response = await UserFindManyCached<T>(params);
        return NextResponse.json(response, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "UserFindManyApi -> " + (error as Error).message }, { status: 500 });
    }
};

export const UserFindFirstApi = async <T extends UserFindFirstProps>(request: NextRequest) => {
    try {
        const params: T = parseAndDecodeParams(request);
        const response = await UserFindFirstCached<T>(params);
        return NextResponse.json(response, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "UserFindFirstApi -> " + (error as Error).message }, { status: 500 });
    }
};

export const UserFindUniqueApi = async <T extends UserFindUniqueProps>(request: NextRequest) => {
    try {
        const params: T = parseAndDecodeParams(request);
        const response = await UserFindUniqueCached<T>(params);
        return NextResponse.json(response, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "UserFindUniqueApi -> " + (error as Error).message }, { status: 500 });
    }
};

export const UserCountApi = async (request: NextRequest) => {
    try {
        const params: UserCountProps = parseAndDecodeParams(request);
        const response = await UserCountCached(params);
        return NextResponse.json(response, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "UserCountApi -> " + (error as Error).message }, { status: 500 });
    }
};
