"use client";

import TransitionLink from "./transitionLink";

export default function Page() {
    return (
        <div className="flex w-full flex-1 flex-col items-center justify-center gap-4 bg-emerald-200">
            <h1 className="text-2xl font-bold">Link transition</h1>
            <p className="text-sm text-gray-500">An example of a view transition link</p>
            <TransitionLink href="/examples/ViewTransitionLink/above" label="Swipe to right" animation="swipeToRight" />
        </div>
    );
}
