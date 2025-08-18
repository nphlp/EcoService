import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Utility function combining CLSX and Tailwind Merge
 * - **CLSX** -> Combines multiple classes with conditional rendering.
 * - **Tailwind Merge** -> Resolves class conflicts and ensures proper Tailwind class deduplication.
 *
 * @example
 * ```tsx
 * <button className={combo(
 *     'px-4 py-2 rounded',
 *     isPrimary && 'bg-blue-500 text-white',
 *     isDisabled && 'opacity-50 cursor-not-allowed'
 * )}>Click me</button>
 * ```
 */
export function combo(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}
