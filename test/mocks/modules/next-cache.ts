const cacheTag = () => {};
const cacheLife = () => {};
const revalidateTag = () => {};
const revalidatePath = () => {};

/**
 * Mock for "next/cache" module
 * ```ts
 * vi.mock("next/cache", async () => import("../mocks/modules/next-cache"))
 * ```
 */
export { cacheTag, cacheLife, revalidateTag, revalidatePath };
