import { UserFindMany, UserUpdate } from "@actions/UserAction";
import Button from "@comps/ui/button";
import Input from "@comps/ui/input";
import Select from "@comps/ui/select";
import { revalidatePath } from "next/cache";

export default async function Page() {
    const userList = await UserFindMany({});

    if (!userList.length) {
        return <div>No user found</div>;
    }

    const updateUserName = async (formData: FormData) => {
        "use server";

        const name = formData.get("name");
        const userId = formData.get("user");

        console.log(name, userId);

        if (!name || !userId) return;

        const userData = await UserUpdate({
            where: { id: userId as string },
            data: { name: name as string },
        });

        // Not required here, but it's a good practice to revalidate the page
        if (userData) revalidatePath("/examples/Actions/server");
    };

    return (
        <div className="flex h-full flex-col items-center justify-center gap-4">
            <div className="space-y-4">
                <div className="w-[260px] rounded-2xl border px-6 py-4">
                    <h1 className="text-lg text-gray-600">Actions</h1>
                    <p className="text-2xl font-bold">Server comps</p>
                </div>
                <div className="space-y-2 rounded-2xl border p-6">
                    <h2 className="text-lg font-bold">Users</h2>
                    <div>
                        {userList.map((user, index) => (
                            <div key={index}>{user.name}</div>
                        ))}
                    </div>
                </div>
                <form action={updateUserName} className="space-y-4 rounded-2xl border p-6">
                    <Select
                        label="User"
                        name="user"
                        options={userList.map((user) => ({
                            label: user.name,
                            value: user.id,
                        }))}
                    />
                    <Input label="Name" name="name" />
                    <Button label="Update user" type="submit" />
                </form>
            </div>
        </div>
    );
}
