import type { NextConfig } from "next";

// const isDocker = process.env.DOCKERFILE !== "";

const nextConfig: NextConfig = {
    // Docker optimization
    // output: isDocker ? "standalone" : undefined,

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
        viewTransition: true, // enable view transition API
        authInterrupts: true, // enable unauthorized()
        useCache: true, // enable useCache, cacheLife and cacheTag
    },
};

export default nextConfig;
