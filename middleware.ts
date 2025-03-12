import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
    // const session = await GetSession();

    // if (!session) {
    // return NextResponse.redirect(new URL("/login", request.url));
    // }

    return NextResponse.next({ request });
}

export const config = {
    matcher: [
        // "/profile",
        // "/api/stripe"
    ],
};
