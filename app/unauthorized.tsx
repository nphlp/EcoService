"use client";

import Link from "@comps/UI/button/link";

export default function Unauthorized() {
    return (
        <div className="max-w-3/4 space-y-4">
            <h2 className="text-2xl font-bold">Mmm. You&apos;re not authorized</h2>
            <p>Please login with an authorized account before accessing this page.</p>
            <div className="flex flex-row items-center justify-center gap-4">
                <Link href="/" label="Home" className="w-fit">
                    Go back Home
                </Link>
                <Link href="/auth" label="Login" variant="outline" className="w-fit">
                    Login
                </Link>
            </div>
        </div>
    );
}
