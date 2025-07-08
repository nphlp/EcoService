"use server";

import { UserUpdateAction } from "@actions/UserAction";
import { GetSession } from "@lib/authServer";
import { strictObject, z, ZodType } from "zod";
import { ErrorLogging } from "./Error";

type UpdateLastnameProcessProps = {
    lastname: string;
};

const UpdateLastnameSchema: ZodType<UpdateLastnameProcessProps> = strictObject({
    lastname: z.string(),
});

type UpdateLastnameProcessResponse = string | null;

export const UpdateLastnameProcess = async (
    props: UpdateLastnameProcessProps,
): Promise<UpdateLastnameProcessResponse> => {
    try {
        // Extract and validate props
        const { lastname } = UpdateLastnameSchema.parse(props);

        // Get session for security
        const session = await GetSession();

        // Check permissions
        // const isAuthorized = await hasPermission(session);
        // if (!isAuthorized) throw new Error("Permission denied");

        // Update database
        const user = await UserUpdateAction(
            {
                where: { id: session?.user.id },
                data: { lastname },
            },
            // true // Disable safe message
        );

        if (!user) throw new Error("Update failed");

        return user.lastname;
    } catch (error) {
        const processName = "UpdateLastnameProcess";
        return ErrorLogging({ processName, error });
    }
};
