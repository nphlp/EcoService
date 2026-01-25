import { analyseRequest } from "@permissions/analyseRequest";
import { NextRequest, NextResponse } from "next/server";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
if (!baseUrl) throw new Error("NEXT_PUBLIC_BASE_URL environment variable is not defined");

const middlewarePermissions = process.env.MIDDLEWARE_PERMISSIONS ?? "enabled";

const NEXT_PUBLIC_BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
if (!NEXT_PUBLIC_BASE_URL) throw new Error("NEXT_PUBLIC_BASE_URL environment variable is not defined");

// Routes that use signature-based auth instead of CSRF (webhooks)
const csrfExcludedRoutes = ["/api/stripe/webhooks"];

const csrfProtection = async (request: NextRequest) => {
    const mutationMethods = ["POST", "PUT", "PATCH", "DELETE"];

    // If not a mutation method, skip CSRF check
    const hasMutationMethod = mutationMethods.includes(request.method);
    if (!hasMutationMethod) return NextResponse.next();

    // Skip CSRF for routes that use signature-based authentication
    const pathname = request.nextUrl.pathname;
    const isExcluded = csrfExcludedRoutes.some((route) => pathname.startsWith(route));
    if (isExcluded) return NextResponse.next();

    const origin = request.headers.get("origin");
    const host = request.headers.get("host");

    // If origin or host headers are missing, block the request
    if (!origin || !host) {
        return new NextResponse("Forbidden: missing origin or host headers", { status: 403 });
    }

    const allowedOrigins = [NEXT_PUBLIC_BASE_URL];

    const isAllowed = allowedOrigins.includes(origin);

    if (!isAllowed) {
        return new NextResponse("Forbidden: CSRF protection", { status: 403 });
    }

    return NextResponse.next();
};

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
