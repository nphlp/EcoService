import AddFruitClient from "./client";

export const dynamic = 'force-dynamic';

export default function Page() {
    return (
        <div className="flex flex-1 flex-col items-center justify-center p-6">
            <AddFruitClient />
        </div>
    );
}
