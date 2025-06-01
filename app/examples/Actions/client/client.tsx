"use client";

import { UserUpdate } from "@actions/UserAction";
import Button from "@comps/ui/button";
import Input from "@comps/ui/input";
import Select from "@comps/ui/select";
import { UserModel } from "@services/types";
import { FormEvent, useState } from "react";

type ClientProps = {
    userList: UserModel[];
};

export default function ClientComponent(props: ClientProps) {
    const { userList: initialUserList } = props;

    const [userList, setUserList] = useState(initialUserList);

    const [name, setName] = useState("");
    const [userId, setUserId] = useState(initialUserList[0].id); // By default, select the first user

    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        if (!name || !userId) return;

        const userData = await UserUpdate({
            where: { id: userId },
            data: { name },
        });

        // Update the user list
        const newUserList = userList.map((user) => (user.id === userId ? userData : user));
        setUserList(newUserList);

        // Reset the form
        setName("");
        setUserId(newUserList[0].id);

        // Reset the loading state
        setIsLoading(false);
    };

    return (
        <div className="space-y-4">
            <div className="space-y-2 rounded-2xl border p-6">
                <h2 className="text-lg font-bold">Users</h2>
                <div>
                    {userList.map((user, index) => (
                        <div key={index}>{user.name}</div>
                    ))}
                </div>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4 rounded-2xl border p-6">
                <Select
                    label="User"
                    options={userList.map((user) => ({
                        label: user.name,
                        value: user.id,
                    }))}
                    onChange={(e) => setUserId(e.target.value)}
                    value={userId}
                    placeholder="Select an user"
                />
                <Input label="Name" onChange={(e) => setName(e.target.value)} value={name} />
                <Button label="Update user" type="submit" isLoading={isLoading} />
            </form>
        </div>
    );
}
