import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    /* config options here */
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "files.stripe.com",
                pathname: "/links/**",
            },
        ],
    },

    experimental: {
        viewTransition: true, // enable view transition API with "<ViewTransition() />"
        authInterrupts: true, // enable "unauthorized()" to redirect to unauthorized page
        // nodeMiddleware: true,
    },
};

export default nextConfig;
