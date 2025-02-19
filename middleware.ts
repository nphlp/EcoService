import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
    // const session = await GetSession();

    // if (!session) {
        // return NextResponse.redirect(new URL("/login", request.url));
    // }

    return NextResponse.redirect(new URL("/", request.url));
}

export const config = {
    matcher: [
        // "/profile",
        // "/products",
        // "/stripe"
    ],
};
