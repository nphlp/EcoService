import type { NextConfig } from "next";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const isStandalone = process.env.NEXTJS_STANDALONE === "true";
const isTest = process.env.NEXT_TEST_MODE === "true";

const nextConfig: NextConfig = {
    // Switch between `.next` and `.next-test` build folders
    distDir: isTest ? ".next-test" : ".next",

    // Stripe images ??
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "files.stripe.com",
                pathname: "/links/**",
            },
        ],
    },

    // Build output mode
    output: isStandalone ? "standalone" : undefined,

    // Directory for tracing files in standalone mode
    outputFileTracingRoot: __dirname,

    // Typed routes for links
    typedRoutes: true,

    experimental: {
        // View transition API
        viewTransition: true,

        // Unauthorized redirection support
        authInterrupts: true,

        // UseCache, cacheLife and cacheTag
        useCache: true,

        // Turbopack persistent caching
        turbopackPersistentCaching: true,
    },
};

export default nextConfig;
