"use client";

import ClientFruitPage from "./client";

export default function ServerFruitPage() {
    return (
        <div className="space-y-4">
            <div>
                <h1 className="text-2xl font-bold">Fruit List</h1>
                <p>
                    Here is a list of fruits fetched and rendered on the <span className="font-bold">client side</span>. Click the following button to fetch some fruits.
                </p>
            </div>
            <ClientFruitPage />
        </div>
    );
}
