import { analyseRequest } from "@permissions/analyseRequest";
import { NextRequest, NextResponse } from "next/server";
import csrfProtection from "./api/csrf";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
if (!baseUrl) throw new Error("NEXT_PUBLIC_BASE_URL environment variable is not defined");

const middlewarePermissions = process.env.MIDDLEWARE_PERMISSIONS ?? "enabled";

export default async function proxy(request: NextRequest) {
    const response = await csrfProtection(request);

    // Skip in dev for faster refresh
    if (process.env.NODE_ENV === "development" && middlewarePermissions === "disabled") {
        return NextResponse.next();
    }

    // Analyse request
    const isAuthorized = await analyseRequest(request);
    if (!isAuthorized) return NextResponse.redirect(`${baseUrl}/unauthorized`);

    return response;
}
