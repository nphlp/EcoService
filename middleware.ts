import { NextResponse } from "next/server";

export async function middleware() {
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
