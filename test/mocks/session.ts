import type { Role } from "@prisma/client/client";

type MockRole = Role | null;

type MockSession = {
    user: {
        id: string;
        role: Role;
    };
} | null;

/**
 * Creates a mock session based on the role
 * - null: visitor (no session)
 * - "EMPLOYEE": regular employee
 * - "MANAGER": manager
 * - "ADMIN": admin user
 */
export const createMockSession = (role: MockRole): MockSession => {
    if (role === null) return null;
    const id = `${role.toLowerCase()}Id`;
    return { user: { id, role } };
};

/**
 * Session mocking state (getter)
 */
export let mockSession: MockSession = null;

/**
 * Session mocking state (setter)
 */
export const setMockSession = (role: MockRole) => {
    mockSession = createMockSession(role);
};
