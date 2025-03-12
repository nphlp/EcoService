import { UserType } from "@actions/types/User";
import { SelectUserProps } from "@actions/types/User";
import { selectUserUniqueSchema } from "@actions/zod-sensitive/User";
import PrismaInstance from "@lib/prisma";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { unstable_cache as cache } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";

/**
 * Retrieves a cached user by ID
 * @param stringParams Parameters containing the user ID in JSON format
 * @returns User or null if not found
 */
const SelectUserCached = cache(
    async (stringParams: string): Promise<UserType | null> => {
        // Parse the params as object
        const params: SelectUserProps = JSON.parse(stringParams);

        const { where, select } = selectUserUniqueSchema.parse(params);

        const userData: UserType | null = await PrismaInstance.user.findUnique({
            where,
            ...(select && { select }),
        });

        return userData;
    },
    ["/users/unique"],
    {
        /**
         * Cache revalidation
         * - development : revalidate every 5 seconds
         * - production : revalidate every 5 minutes
         */
        revalidate: process.env.NODE_ENV === "development" ? 5 : 300,
        tags: ["/users/unique"],
    },
);

export type SelectUserResponse =
    | {
          data: UserType | null;
      }
    | {
          error: string;
      };

/**
 * GET route handler for retrieving a single user by ID
 * @param request Incoming request with user ID parameter
 * @returns JSON response containing user data or error message
 */
export const GET = async (request: NextRequest): Promise<NextResponse<SelectUserResponse>> => {
    try {
        // Get the params and decode them
        const encodedParams = request.nextUrl.searchParams.get("params") ?? "{}";
        const stringParams = decodeURIComponent(encodedParams);

        // Get the user
        const userData: UserType | null = await SelectUserCached(stringParams);

        // Return the user
        return NextResponse.json({ data: userData }, { status: 200 });
    } catch (error) {
        console.error("SelectUserCached -> " + (error as Error).message);
        if (process.env.NODE_ENV === "development") {
            if (error instanceof ZodError)
                return NextResponse.json({ error: "SelectUserCached -> Invalid Zod params -> " + error.message });
            if (error instanceof PrismaClientKnownRequestError)
                return NextResponse.json({ error: "SelectUserCached -> Prisma error -> " + error.message });
            return NextResponse.json({ error: "SelectUserCached -> " + (error as Error).message });
        }
        // TODO: add logging
        return NextResponse.json({ error: "Something went wrong..." }, { status: 500 });
    }
};
