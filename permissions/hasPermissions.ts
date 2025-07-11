import { BetterSessionServer } from "../lib/authServer";
import { Models, RolePermissions, globalPermissions } from "./PermissionsConfig";
import { getRole } from "./PermissionsUtils";

/**
 * Check user role permissions
 * @example
 * const isAuthorized = await hasPermission(session, {
 *     User: ["update-HO"],
 *     Product: ["create", "update"],
 * });
 * if (!isAuthorized) throw new Error("Permission denied");
 */
export const hasPermission = async (
    session: BetterSessionServer | null,
    askedPermissions: Partial<RolePermissions>,
): Promise<boolean> => {
    // Get role
    const role = getRole(session);

    // Get permissions for the role
    const rolePermissions: RolePermissions = globalPermissions[role];

    // Get asked model list
    const askedModelList = Object.keys(askedPermissions) as Models[];

    // Check if all asked methods are in the asked models permissions
    const hasPermission = askedModelList.every((model) =>
        rolePermissions[model].some((permission) => askedPermissions[model]?.includes(permission)),
    );

    console.log(
        "\n┏━━ Has Permission 🔑",
        "\n┃",
        `\n┃   Role -> ${role}`,
        `\n┃   Role permissions -> ${JSON.stringify(
            askedModelList.map((model) => ({ [model]: rolePermissions[model] })),
        )}`,
        `\n┃   Asked permissions -> ${JSON.stringify(askedPermissions)}`,
        `\n┃   Has permission -> ${hasPermission}`,
        "\n┗━━",
    );

    // Has permission
    if (hasPermission) return true;

    // Has not permission
    return false;
};
