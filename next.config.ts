import type { NextConfig } from "next";

// const isDocker = process.env.MYSQL_HOST === "mysql";
// const isProduction = process.env.NODE_ENV === "production";

const nextConfig: NextConfig = {
    // Docker production optimization
    // output: isDocker && isProduction ? "standalone" : undefined,

    // Redis cache handler
    // cacheHandler: require.resolve("./cache-handler.cjs"),

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
        nodeMiddleware: true, // enable node middleware
        viewTransition: true, // enable view transition API
        authInterrupts: true, // enable unauthorized()
        useCache: true, // enable useCache, cacheLife and cacheTag
        turbopackPersistentCaching: true, // enable turbopack persistent caching
    },
};

export default nextConfig;
