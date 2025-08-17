"use client";

import TransitionLink from "../transitionLink";

export default function Page() {
    return (
        <div className="flex w-full flex-1 flex-col items-center justify-center gap-4 bg-red-200">
            <h1 className="text-2xl font-bold">Swiper transition</h1>
            <p className="text-sm text-gray-500">That&apos;s awesome, right?!!</p>
            <TransitionLink href="/examples/ViewTransitionLink/right" label="Swipe up" animation="above" />
        </div>
    );
}
