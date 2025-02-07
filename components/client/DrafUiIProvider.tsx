"use client";

import { useRouter } from "next/navigation";
import { ReactNode } from "react";
import { RouterProvider } from "react-aria-components";

type ClientProvidersProps = {
    children: ReactNode;
}

/**
 * DraftUI client provider for components that use `Link` NextJS component.
 */
export function ClientProviders(props: ClientProvidersProps) {
    const { children } = props;
    
    const router = useRouter();
    return <RouterProvider navigate={router.push}>{children}</RouterProvider>;
}
