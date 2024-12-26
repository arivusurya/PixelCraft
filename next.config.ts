import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost", // Allow localhost
        port: "3000", // Specify the port if needed (default is 3000)
        pathname: "/**", // Allow all paths
      },
      {
        protocol: "https",
        hostname: "**", // Allow all hostnames for HTTPS
        port: "",
        pathname: "/**",
      },
      {
        protocol: "http",
        hostname: "**", // Allow all hostnames for HTTP
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
