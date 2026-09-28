import { withSentryConfig } from "@sentry/nextjs/config";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      { source: "/finance/freelancing", destination: "/articles/finance/freelance-economy?topic=independent-work", permanent: true },
      { source: "/finance/ecommerce", destination: "/articles/finance/freelance-economy?topic=ecommerce", permanent: true },
      { source: "/finance/marketing", destination: "/articles/finance/freelance-economy?topic=multiple-income", permanent: true },
      { source: "/finance/content-economy", destination: "/articles/finance/freelance-economy?topic=multiple-income", permanent: true },
      { source: "/finance/crypto", destination: "/articles/finance/investment?topic=digital-currencies", permanent: true },
      { source: "/finance/hardware", destination: "/articles/finance/entrepreneurship?topic=startups", permanent: true },
      { source: "/tech/ai-apps", destination: "/articles/tech/artificial-intelligence?topic=ai-models", permanent: true },
      { source: "/tech/cybersecurity", destination: "/articles/tech/cybersecurity?topic=data-protection", permanent: true },
      { source: "/tech/cloud-remote", destination: "/articles/tech/emerging-tech?topic=green-tech", permanent: true },
      { source: "/tech/infra", destination: "/articles/tech/emerging-tech?topic=green-tech", permanent: true },
      { source: "/tech/iot-emerging", destination: "/articles/tech/emerging-tech?topic=iot", permanent: true },
      { source: "/media/creation", destination: "/articles/media/content-creation?topic=creator-economy", permanent: true },
      { source: "/media/news", destination: "/articles/media/social-platforms?topic=modern-digital-marketing", permanent: true },
      { source: "/media/podcasting", destination: "/articles/media/content-creation?topic=podcast-studios", permanent: true },
      { source: "/media/streaming", destination: "/articles/media/content-creation?topic=live-streaming", permanent: true },
      { source: "/media/gaming", destination: "/articles/media/gaming?topic=game-streaming", permanent: true },
      { source: "/digital-lifestyle/life-management", destination: "/articles/digital-lifestyle/remote-work?topic=personal-knowledge", permanent: true },
      { source: "/digital-lifestyle/health", destination: "/articles/digital-lifestyle/digital-health?topic=digital-toxins", permanent: true },
      { source: "/digital-lifestyle/learning", destination: "/articles/digital-lifestyle/virtual-reality?topic=home-tech-learning", permanent: true },
      { source: "/digital-lifestyle/culture", destination: "/articles/digital-lifestyle/remote-work?topic=digital-nomadism", permanent: true },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
    formats: ["image/avif", "image/webp"],
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-DNS-Prefetch-Control",
            value: "on",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(), browsing-topics=()",
          },
        ],
      },
    ];
  },
};

export default withSentryConfig(nextConfig, {
  org: "makasib-digital",
  project: "javascript-nextjs",
  silent: true,
  widenClientFileUpload: true,
  disableLogger: true,
});