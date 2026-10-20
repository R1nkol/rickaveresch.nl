import { PHASE_DEVELOPMENT_SERVER } from "next/constants.js";

/** @type {import('next').NextConfig} */
const nextConfig = {
    async headers() {
      return [
        {
          source: "/:path*", // Geldt voor alle routes
          headers: [
            {
              key: "Cross-Origin-Opener-Policy",
              value: "same-origin",
            },
            {
              key: "Cross-Origin-Embedder-Policy",
              value: "require-corp",
            },
          ],
        },
      ];
    },
  };
  
  export default (phase) => ({
    ...nextConfig,
    // Keep production builds from overwriting the running dev server's chunks.
    distDir: phase === PHASE_DEVELOPMENT_SERVER ? ".next-dev" : ".next",
  });
