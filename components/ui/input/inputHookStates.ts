import { useState } from "react";

/**
 * Typed hook to manage input state
 * @example
 * ```tsx
 * const [name, setName] = useInputState();
 * ```
 */
export const useInputState = () => useState<string>("");
