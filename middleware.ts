import { GetSession } from "@lib/auth";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
    // const session = await GetSession();

    // if(!session) {
    //     return NextResponse.redirect(new URL("/sign-in", request.url));
    // }

    return NextResponse.next();
}

export const config = {
    // runtime: "nodejs",
    matcher: ["/profile", "/dashboard"],
};
