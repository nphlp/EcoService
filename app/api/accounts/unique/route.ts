import { AccountType } from "@actions/types/Account";
import { SelectAccountProps } from "@actions/types/Account";
import { selectAccountUniqueSchema } from "@actions/zod-sensitive/Account";
import PrismaInstance from "@lib/prisma";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { unstable_cache as cache } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";

/**
 * Retrieves a cached account by ID
 * @param stringParams Parameters containing the account ID in JSON format
 * @returns Account or null if not found
 */
const SelectAccountCached = cache(
    async (stringParams: string): Promise<AccountType | null> => {
        // Parse the params as object
        const params: SelectAccountProps = JSON.parse(stringParams);

        const { where, select } = selectAccountUniqueSchema.parse(params);

        const accountData: AccountType | null = await PrismaInstance.account.findUnique({
            where,
            ...(select && { select }),
        });

        return accountData;
    },
    ["/accounts/unique"],
    {
        /**
         * Cache revalidation
         * - development : revalidate every 5 seconds
         * - production : revalidate every 5 minutes
         */
        revalidate: process.env.NODE_ENV === "development" ? 5 : 300,
        tags: ["/accounts/unique"],
    },
);

export type SelectAccountResponse =
    | {
          data: AccountType | null;
      }
    | {
          error: string;
      };

/**
 * GET route handler for retrieving a single account by ID
 * @param request Incoming request with account ID parameter
 * @returns JSON response containing account data or error message
 */
export const GET = async (request: NextRequest): Promise<NextResponse<SelectAccountResponse>> => {
    try {
        // Get the params and decode them
        const encodedParams = request.nextUrl.searchParams.get("params") ?? "{}";
        const stringParams = decodeURIComponent(encodedParams);

        // Get the account
        const accountData: AccountType | null = await SelectAccountCached(stringParams);

        // Return the account
        return NextResponse.json({ data: accountData }, { status: 200 });
    } catch (error) {
        console.error("SelectAccountCached -> " + (error as Error).message);
        if (process.env.NODE_ENV === "development") {
            if (error instanceof ZodError)
                return NextResponse.json({ error: "SelectAccountCached -> Invalid Zod params -> " + error.message });
            if (error instanceof PrismaClientKnownRequestError)
                return NextResponse.json({ error: "SelectAccountCached -> Prisma error -> " + error.message });
            return NextResponse.json({ error: "SelectAccountCached -> " + (error as Error).message });
        }
        // TODO: add logging
        return NextResponse.json({ error: "Something went wrong..." }, { status: 500 });
    }
};
