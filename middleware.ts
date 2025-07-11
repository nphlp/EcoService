import { GetSession } from "@lib/authServer";
import { ApiPermsisions, StripePermissions } from "@permissions/ApiPermissions";
import { NextRequest, NextResponse } from "next/server";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
if (!baseUrl) throw new Error("NEXT_PUBLIC_BASE_URL environment variable is not defined");

const analyseRequest = async (request: NextRequest) => {
    // Get headers and pathname
    const pathname = request.nextUrl.pathname;

    // Get session
    const session = await GetSession();

    const isStripeRequest = pathname.startsWith("/api/stripe");
    if (isStripeRequest) return StripePermissions({ session, request });

    const isApiRequest = pathname.startsWith("/api/internal");
    if (isApiRequest) return await ApiPermsisions({ session, request });

    // If the case is not covered, return false
    return true;
};

export async function middleware(request: NextRequest) {
    const isAuthorized = await analyseRequest(request);

    if (!isAuthorized) {
        // return NextResponse.next(); // WARNING: To disable temporarily
        return NextResponse.redirect(`${baseUrl}/unauthorized`);
    }

    return NextResponse.next();
}

export const config = {
    runtime: "nodejs",
};
