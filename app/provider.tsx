"use client";

import { useRouter } from "next/navigation";
import { RouterProvider } from "react-aria-components";

type ClientProvidersProps = {
    children: React.ReactNode;
}

export function ClientProviders(props: ClientProvidersProps) {
    const { children } = props;
    
    const router = useRouter();

    return <RouterProvider navigate={router.push}>{children}</RouterProvider>;
}
