import { UserType } from "@actions/types/User";
import { SelectUserListProps } from "@actions/types/User";
import { selectUserListSchema } from "@actions/zod-sensitive/User";
import PrismaInstance from "@lib/prisma";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { unstable_cache as cache } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";

/**
 * Retrieves a cached list of users
 * @param stringParams Filtering and pagination parameters in JSON format
 * @returns List of users or null if no users found
 */
const SelectUserListCached = cache(
    async (stringParams: string): Promise<UserType[] | null> => {
        // Parse the params as object
        const params: SelectUserListProps = JSON.parse(stringParams);

        // Validate the params with zod
        const { select, orderBy, take = 10, skip = 0, where } = selectUserListSchema.parse(params);

        const userDataList: UserType[] = await PrismaInstance.user.findMany({
            ...(select && { select }),
            ...(orderBy && { orderBy }),
            ...(take && { take }),
            ...(skip && { skip }),
            ...(where && { where }),
        });

        console.log("SelectUserList -> Revalidating users list from database...");

        // Return the user list
        return userDataList.length ? userDataList : null;
    },
    ["users"],
    {
        /**
         * Cache revalidation
         * - development : revalidate every 5 seconds
         * - production : revalidate every 5 minutes
         */
        revalidate: process.env.NODE_ENV === "development" ? 5 : 300,
        tags: ["users"],
    },
);

export type SelectUserListResponse =
    | {
          data: UserType[] | null;
      }
    | {
          error: string;
      };

/**
 * GET route handler for users API
 * @param request Incoming request with optional parameters
 * @returns JSON response containing user list or error message
 */
export const GET = async (request: NextRequest): Promise<NextResponse<SelectUserListResponse>> => {
    try {
        // Get the params and decode them
        const encodedParams = request.nextUrl.searchParams.get("params") ?? "{}";
        const stringParams = decodeURIComponent(encodedParams);

        // Get the user list
        const userList: UserType[] | null = await SelectUserListCached(stringParams);

        // Return the user list
        return NextResponse.json({ data: userList }, { status: 200 });
    } catch (error) {
        console.error("SelectUserListCached -> " + (error as Error).message);
        if (process.env.NODE_ENV === "development") {
            if (error instanceof ZodError)
                return NextResponse.json({ error: "SelectUserListCached -> Invalid Zod params -> " + error.message });
            if (error instanceof PrismaClientKnownRequestError)
                return NextResponse.json({ error: "SelectUserListCached -> Prisma error -> " + error.message });
            return NextResponse.json({ error: "SelectUserListCached -> " + (error as Error).message });
        }
        // TODO: add logging
        return NextResponse.json({ error: "Something went wrong..." }, { status: 500 });
    }
};
