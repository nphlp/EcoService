import type { NextConfig } from "next";

// const isDocker = process.env.MYSQL_HOST === "mysql";
// const isProduction = process.env.NODE_ENV === "production";

const nextConfig: NextConfig = {
    // Docker production optimization
    // output: isDocker && isProduction ? "standalone" : undefined,

    // Redis cache handler
    cacheHandler: require.resolve("./cache-handler.cjs"),
    cacheMaxMemorySize: 1024 * 1024, // 1MB - Force external cache handler

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
