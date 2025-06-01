"use server";

import { UserFindUnique, UserUpdate } from "@actions/UserAction";
import { UserModel } from "@services/types";

type UpdateProcessProps = {
    name: string;
    userId: string;
};

type UpdateProcessResponse = UserModel;

export const UpdateProcess = async (props: UpdateProcessProps): Promise<UpdateProcessResponse> => {
    const { name, userId } = props;

    // Check if the user exists
    const userList = await UserFindUnique({
        where: { id: userId },
    });

    if (!userList) {
        throw new Error("User not found");
    }

    // Update the user
    const userData = await UserUpdate({
        where: { id: userId },
        data: { name },
    });

    return userData;
};
