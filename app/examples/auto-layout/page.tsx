"use client";

import Card from "@comps/server/card";
import Content from "./content";
import { combo } from "@lib/combo";

/**
 * ## Auto-Layout pattern
 *
 * The `layout.tsx` file above this page must be like this.
 *
 * @example
 * ```tsx
 * // layout.tsx
 *
 * type LayoutProps = {
 *     children: ReactNode;
 * };
 *
 * export default async function Layout(props: LayoutProps) {
 *     const { children } = props;
 *
 *     return (
 *         <html className="h-full overflow-hidden">
 *             <body className="h-full flex flex-col">
 *                 <Header />
 *                 <div className="flex-1 overflow-y-auto">
 *                     <main className="min-h-full flex flex-col items-center justify-center">
 *                         {children}
 *                     </main>
 *                     <Footer />
 *                 </div>
 *             </body>
 *         </html>
 *     );
 * }
 * ```
 *
 * ## How does it work?
 *
 * Into the `layout.tsx` file, we have:
 *
 * 1. `html` take all height
 * 2. `body` take all height and is display flex (required for `flex-1`)
 * 3. `Header` takes any height
 * 4. `div` use `flex-1` to take the remaining height in the viewport
 * 5. `div` use `overflow-y-auto` to make the content scrollable
 * 6. `main` use `min-h-full` to take all `div` height and more if needed
 * 7. `children` is centered with `flex` on `x` and `y` axis
 *
 * ---
 *
 * Into the `page.tsx` file, we have:
 *
 * - Option 1 (default):
 *     If the content is smaller than "main viewport", the content of the page is `justify-center` (vertically centered)
 *     If the content is bigger than "main viewport", the content of the page is `justify-start` and scrollable
 *
 * - Option 2:
 *     Use `flex-1` to retrieve a behavior like `justify-start` or "css default" behavior
 *     Use `w-full` as usual to take the full width of the viewport
 */
export default function Page() {
    return (
        <div
            className={combo(
                "bg-red-100 p-5",
                // Toggle `flex-1` to see the difference
                // "flex-1",
                // Toggle `w-full` to see the difference
                // "w-full"
            )}
        >
            <Card className="flex max-w-[300px] flex-col gap-8">
                <Content />
            </Card>
        </div>
    );
}
