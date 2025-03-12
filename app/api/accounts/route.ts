import { AccountType } from "@actions/types/Account";
import { SelectAccountListProps } from "@actions/types/Account";
import { selectAccountListSchema } from "@actions/zod-sensitive/Account";
import PrismaInstance from "@lib/prisma";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { unstable_cache as cache } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";

/**
 * Retrieves a cached list of accounts
 * @param stringParams Filtering and pagination parameters in JSON format
 * @returns List of accounts or null if no accounts found
 */
const SelectAccountListCached = cache(
    async (stringParams: string): Promise<AccountType[] | null> => {
        // Parse the params as object
        const params: SelectAccountListProps = JSON.parse(stringParams);

        // Validate the params with zod
        const { select, orderBy, take = 10, skip = 0, where } = selectAccountListSchema.parse(params);

        const accountDataList: AccountType[] = await PrismaInstance.account.findMany({
            ...(select && { select }),
            ...(orderBy && { orderBy }),
            ...(take && { take }),
            ...(skip && { skip }),
            ...(where && { where }),
        });

        console.log("SelectAccountList -> Revalidating accounts list from database...");

        // Return the account list
        return accountDataList.length ? accountDataList : null;
    },
    ["accounts"],
    {
        /**
         * Cache revalidation
         * - development : revalidate every 5 seconds
         * - production : revalidate every 5 minutes
         */
        revalidate: process.env.NODE_ENV === "development" ? 5 : 300,
        tags: ["accounts"],
    },
);

export type SelectAccountListResponse =
    | {
          data: AccountType[] | null;
      }
    | {
          error: string;
      };

/**
 * GET route handler for accounts API
 * @param request Incoming request with optional parameters
 * @returns JSON response containing account list or error message
 */
export const GET = async (request: NextRequest): Promise<NextResponse<SelectAccountListResponse>> => {
    try {
        // Get the params and decode them
        const encodedParams = request.nextUrl.searchParams.get("params") ?? "{}";
        const stringParams = decodeURIComponent(encodedParams);

        // Get the account list
        const accountList: AccountType[] | null = await SelectAccountListCached(stringParams);

        // Return the account list
        return NextResponse.json({ data: accountList }, { status: 200 });
    } catch (error) {
        console.error("SelectAccountListCached -> " + (error as Error).message);
        if (process.env.NODE_ENV === "development") {
            if (error instanceof ZodError)
                return NextResponse.json({ error: "SelectAccountListCached -> Invalid Zod params -> " + error.message });
            if (error instanceof PrismaClientKnownRequestError)
                return NextResponse.json({ error: "SelectAccountListCached -> Prisma error -> " + error.message });
            return NextResponse.json({ error: "SelectAccountListCached -> " + (error as Error).message });
        }
        // TODO: add logging
        return NextResponse.json({ error: "Something went wrong..." }, { status: 500 });
    }
};
