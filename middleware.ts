import { analyseRequest } from "@permissions/analyseRequest";
import { NextRequest, NextResponse } from "next/server";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
if (!baseUrl) throw new Error("NEXT_PUBLIC_BASE_URL environment variable is not defined");

export async function middleware(request: NextRequest) {
    // Skip in dev for faster refresh
    // if (process.env.NODE_ENV === "development") return NextResponse.next();

    // Analyse request
    const isAuthorized = await analyseRequest(request);
    if (!isAuthorized) return NextResponse.redirect(`${baseUrl}/unauthorized`);

    return NextResponse.next();
}

export const config = {
    runtime: "nodejs",
};
