import type { NextConfig } from "next";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));

// const isDocker = process.env.MYSQL_HOST === "mysql";
// const isProduction = process.env.NODE_ENV === "production";

const nextConfig: NextConfig = {
    // Docker production optimization with environment variable control
    output: process.env.NEXTJS_STANDALONE === "true" ? "standalone" : undefined,

    // Redis cache handler
    // cacheHandler: require.resolve("./cache-handler.cjs"),

    // Fix workspace eslint root warning
    outputFileTracingRoot: __dirname,

    // Classic server compile in .next
    // Test server compile in .next-test
    distDir: process.env.NEXT_TEST_MODE ? ".next-test" : ".next",

    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "files.stripe.com",
                pathname: "/links/**",
            },
        ],
    },

    // typedRoutes: true, // enable typed routes for links
    // typedEnv: true, // enable typed environment variables

    experimental: {
        viewTransition: true, // enable view transition API
        authInterrupts: true, // enable unauthorized()
        useCache: true, // enable useCache, cacheLife and cacheTag
        // turbopackPersistentCaching: true, // enable turbopack persistent caching
    },
};

export default nextConfig;
