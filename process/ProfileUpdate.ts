"use server";

import { getSession } from "@lib/auth-server";
import { hasPermission } from "@permissions/hasPermissions";
import { UserUpdateAction } from "@services/actions/UserAction";
import { revalidatePath } from "next/cache";
import { ZodType, strictObject, z } from "zod";
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
        const session = await getSession();

        // Check permissions
        const isAuthorized = await hasPermission(session, {
            User: ["update-HO"],
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

        revalidatePath("/profile");

        return { data: user.lastname, status: true };
    } catch (error) {
        const processName = "UpdateLastnameProcess";
        ProcessDevError(processName, error);

        // TODO: add logging
        return { message: "Something went wrong...", status: false };
    }
};
