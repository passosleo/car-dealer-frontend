import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
      {
        protocol: "https",
        hostname: "api.dicebear.com",
      },
      {
        protocol: "https",
        hostname: "upload.wikimedia.org",
      },
      {
        protocol: "https",
        hostname: "png.pngtree.com",
      },
      {
        protocol: "https",
        hostname: "cdn.oantagonista.com",
      },
      {
        protocol: "https",
        hostname: "cdn.motor1.com",
      },
      {
        protocol: "https",
        hostname: "img.freepik.com",
      },
      {
        protocol: "https",
        hostname: "www.chevrolet.com.br",
      },
      {
        protocol: "https",
        hostname: "i.pinimg.com",
      },
      {
        protocol: "https",
        hostname: "hlaureano.org.br",
      },

      {
        protocol: "https",
        hostname: "img.criativodahora.com.br",
      },
      {
        protocol: "https",
        hostname: "cdn2.storyasset.link",
      },
      {
        protocol: "https",
        hostname: "assets.volkswagen.com",
      },
    ],
  },
  rewrites: async () => {
    return [
      {
        source: "/",
        destination: "/home",
      },
      {
        source: "/admin",
        destination: "/admin/dashboard",
      },
    ];
  },
};

export default nextConfig;
