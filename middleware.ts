import { hasPermission } from "@lib/permissions";
import { NextRequest, NextResponse } from "next/server";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
if (!baseUrl) throw new Error("NEXT_PUBLIC_BASE_URL environment variable is not defined");

export async function middleware(request: NextRequest) {
    const pathname = request.nextUrl.pathname;

    const isAuthorized = await hasPermission(pathname);

    if (!isAuthorized) {
        return NextResponse.next(); // TODO: Remove this
        return NextResponse.redirect(`${baseUrl}/unauthorized`);
    }

    return NextResponse.next();
}

export const config = {
    runtime: "nodejs",
};
