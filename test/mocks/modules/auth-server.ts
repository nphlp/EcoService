import { mockSession } from "../session";

/**
 * Mock for "next/cache" module
 * ```ts
 * vi.mock("@lib/auth-server", async () => import("../mocks/modules/auth-server"))
 * ```
 */
export const getSession = () => Promise.resolve(mockSession);
