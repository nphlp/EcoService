"use server";

import { UserUpdateAction } from "@actions/UserAction";
import { GetSession } from "@lib/authServer";
import { hasPermission } from "@permissions/hasPermissions";
import { strictObject, z, ZodType } from "zod";
import { ProcessDevError } from "./Error";
import { ProcessResponse } from "./Type";

type UpdateLastnameProcessProps = {
    lastname: string;
};

const UpdateLastnameSchema: ZodType<UpdateLastnameProcessProps> = strictObject({
    lastname: z.string(),
});

export const UpdateLastnameProcess = async (props: UpdateLastnameProcessProps): Promise<ProcessResponse<string>> => {
    try {
        // Extract and validate props
        const { lastname } = UpdateLastnameSchema.parse(props);

        // Get session for security
        const session = await GetSession();

        // Check permissions
        const isAuthorized = await hasPermission(session, {
            User: ["update"],
        });
        if (!isAuthorized) return { message: "Permission denied", status: false };

        // Update database
        const user = await UserUpdateAction(
            {
                where: { id: session?.user.id },
                data: { lastname },
            },
            true, // Disable safe message
        );

        if (!user.lastname) return { message: "Update failed", status: false };

        return {
            data: user.lastname,
            status: true,
            message: "Update successful",
        };
    } catch (error) {
        const processName = "UpdateLastnameProcess";

        ProcessDevError(processName, error);

        // TODO: add logging
        return { message: "Something went wrong...", status: false };
    }
};
