"use client";

import ButtonClient from "@comps/client/button";

export default function Unauthorized() {
    return (
        <div className="flex flex-1 flex-col items-center justify-center">
            <div className="space-y-4">
                <h2 className="text-2xl font-bold">Mmm. You&apos;re not authorized</h2>
                <p>Please login with an authorized account before accessing this page.</p>
                <ButtonClient className="w-fit" type="link" href="/" label="Home">
                    Go to Home
                </ButtonClient>
            </div>
        </div>
    );
}
