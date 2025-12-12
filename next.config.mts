import bundleAnalyzer from "@next/bundle-analyzer";
import type { NextConfig } from "next";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const isStandalone = process.env.NEXTJS_STANDALONE === "true";
const isTest = process.env.NEXT_TEST_MODE === "true";

const nextConfig: NextConfig = {
    // Switch between `.next` and `.next-test` build folders
    distDir: isTest ? ".next-test" : ".next",

    // Stripe images
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "files.stripe.com",
                pathname: "/links/**",
            },
        ],
    },

    // CLASSIC //

    // Build output mode
    output: isStandalone ? "standalone" : undefined,

    // Directory for tracing files in standalone mode
    outputFileTracingRoot: __dirname,

    // Typed routes for links
    typedRoutes: true,

    // Enable React memoryzing compiler
    reactCompiler: true,

    // New nextjs rendering method (every page is dynamic by default)
    // Directives: use cache, use cache private, use cache remote
    // Functions: cacheTag, cacheLife, revalidateTag, updateTag
    cacheComponents: true,

    experimental: {
        // View transition API
        viewTransition: true,

        // Unauthorized redirection support
        authInterrupts: true,

        // Turbopack persistent caching
        turbopackFileSystemCacheForDev: true,
        turbopackFileSystemCacheForBuild: true,
    },
};

const bundleAnalyzerWrapper = bundleAnalyzer({ enabled: process.env.ANALYZE === "true" });

const nextConfigExport = bundleAnalyzerWrapper(nextConfig);

export default nextConfigExport;
