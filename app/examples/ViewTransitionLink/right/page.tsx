"use client";

import TransitionLink from "../transitionLink";

export default function Page() {
    return (
        <div className="flex h-full flex-col items-center justify-center gap-4 bg-amber-200">
            <h1 className="text-2xl font-bold">Swiper transition</h1>
            <p className="text-sm text-gray-500">Take a look at the URL, it&apos;s updated</p>
            <TransitionLink
                href="/examples/ViewTransitionLink"
                label="Swipe to left"
                animation="swipeToLeft"
                // animation="above"
            />
        </div>
    );
}
