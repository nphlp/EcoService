import { UserFindMany } from "@actions/UserAction";
import ClientComponent from "./client";

export default async function Page() {
    const userList = await UserFindMany({});

    if (!userList.length) {
        return <div>No user found</div>;
    }

    return (
        <div className="flex h-full flex-col items-center justify-center gap-4">
            <div className="w-[260px] rounded-2xl border px-6 py-4">
                <h1 className="text-lg text-gray-600">Actions</h1>
                <p className="text-2xl font-bold">Client comps</p>
            </div>
            <ClientComponent userList={userList} />
        </div>
    );
}
