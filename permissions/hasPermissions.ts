import { Session } from "@lib/auth-server";
import { GLOBAL_PERMISSIONS } from "./permissionsConfig";
import { Models, RolePermissions, Roles } from "./permissionsType";
import { getRole } from "./permissionsUtils";

/**
 * Check user role permissions
 * @example
 * const isAuthorized = await hasPermission(session, {
 *     User: ["update-HO"],
 *     Product: ["create", "update"],
 * });
 * if (!isAuthorized) throw new Error("Permission denied");
 */
export const hasPermission = async (session: Session, askedPermissions: Partial<RolePermissions>): Promise<boolean> => {
    // Get role
    const role = getRole(session);

    // Get permissions for the role
    const rolePermissions: RolePermissions = GLOBAL_PERMISSIONS[role];

    // Get asked model list
    const askedModelList = Object.keys(askedPermissions) as Models[];

    // Check if all asked methods are in the asked models permissions
    const hasPermission = askedModelList.every((model) =>
        rolePermissions[model].some((permission) => askedPermissions[model]?.includes(permission)),
    );

    debugPermission("falseOnly", role, askedModelList, askedPermissions, rolePermissions, hasPermission);

    // Has permission
    if (hasPermission) return true;

    // Has not permission
    return false;
};

/**
 * Debug all cases, or false only \
 * For development environment only
 */
export const debugPermission = (
    mode: "all" | "falseOnly",
    role: Roles,
    askedModelList: Models[],
    askedPermissions: Partial<RolePermissions>,
    rolePermissions: RolePermissions,
    hasPermission: boolean,
) => {
    if (process.env.NODE_ENV !== "development") return;

    if (mode === "falseOnly" && hasPermission) return;

    const rolePermissionsJson = JSON.stringify(
        Object.fromEntries(askedModelList.map((model) => [model, rolePermissions[model]])),
    );
    const askedPermissionsJson = JSON.stringify(askedPermissions);

    console.log(
        "\n┏━━ Has Permission 🔑",
        "\n┃",
        `\n┃   Role -> ${role}`,
        "\n┃",
        `\n┃   Role permissions  -> ${rolePermissionsJson}`,
        `\n┃   Asked permissions -> ${askedPermissionsJson}`,
        "\n┃",
        `\n┃   Has permission: ${hasPermission ? "TRUE ✅" : "FALSE ❌"}`,
        "\n┃",
        "\n┗━━",
    );
};
