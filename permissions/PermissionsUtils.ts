import { BetterSessionServer } from "@lib/authServer";
import { Methods, Models, Roles } from "./PermissionsConfig";

export const getModel = (pathname: string): Models | null => {
    const model = pathname.split("/")[3];
    if (!model) return null;
    return (model.charAt(0).toUpperCase() + model.slice(1)) as Models;
};

export const getMethod = (pathname: string): { method: Methods; methodForHimOnly: Methods } => {
    const method = pathname.split("/")[4] ?? "findMany";
    const methodForHimOnly = method + "-HO";
    return { method: method as Methods, methodForHimOnly: methodForHimOnly as Methods };
};

export const getRole = (session: BetterSessionServer | null): Roles => session?.user.role ?? "NON_LOGGED";
