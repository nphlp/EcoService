import { NextRequest, NextResponse } from "next/server";

const NEXT_PUBLIC_BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
if (!NEXT_PUBLIC_BASE_URL) throw new Error("NEXT_PUBLIC_BASE_URL environment variable is not defined");

const csrfProtection = async (request: NextRequest) => {
    const mutationMethods = ["POST", "PUT", "PATCH", "DELETE"];

    // If not a mutation method, skip CSRF check
    const hasMutationMethod = mutationMethods.includes(request.method);
    if (!hasMutationMethod) return NextResponse.next();

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

export default csrfProtection;
