"use client";

import { useRouter } from "next/navigation";
import { ReactNode } from "react";
import { RouterProvider } from "react-aria-components";

type ClientProvidersProps = {
    children: ReactNode;
}

export function ClientProviders(props: ClientProvidersProps) {
    const { children } = props;
    
    const router = useRouter();

    return <RouterProvider navigate={router.push}>{children}</RouterProvider>;
}
