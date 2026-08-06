import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // ============================================================================
  // REACT & COMPILATION
  // ============================================================================
  reactStrictMode: true,
  // Next handles SWC minification automatically; remove deprecated option
  
  // ============================================================================
  // PERFORMANCE OPTIMIZATIONS
  // ============================================================================
  compress: true,
  
  // Production optimizations
  experimental: {
    optimizeCss: true,
    optimizePackageImports: [
      "@radix-ui/react-icons",
      "lucide-react",
    ],
  },
  
  // ============================================================================
  // IMAGE OPTIMIZATION
  // ============================================================================
  images: {
    // Optimize images from external sources
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.supabase.co",
      },
      {
        protocol: "https",
        hostname: "**.cloudinary.com",
      },
      {
        protocol: "https",
        hostname: "**.googleapis.com",
      },
      // Allow any HTTPS image by default (can be more restrictive in production)
      {
        protocol: "https",
        hostname: "**",
      },
    ],
    // Image optimization settings
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  
  // ============================================================================
  // TURBOPACK CONFIGURATION
  // ============================================================================
  turbopack: {
    rules: {
      // Configure Turbopack rules for your project
    },
  },
  
  // ============================================================================
  // BUNDLE OPTIMIZATION
  // ============================================================================
  compiler: {
    // Remove console logs in production
    removeConsole: process.env.NODE_ENV === "production",
    // Emotion support (if needed)
    emotion: false,
    // Styled-components support (if needed)
    styledComponents: false,
  },
  
  // ============================================================================
  // WEBPACK CONFIGURATION
  // ============================================================================
  webpack: (config, { isServer }) => {
    // Fix module issues
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      net: false,
      tls: false,
    };
    
    // Prevent canvas module from being bundled on the client side
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        canvas: false,
        fs: false,
      };
    }
    
    // Handle Konva for SSR
    config.externals = [...(config.externals || []), { canvas: "canvas" }];
    
    return config;
  },
  
  // ============================================================================
  // HEADERS & SECURITY
  // ============================================================================
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          // Security headers
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN",
          },
          {
            key: "X-XSS-Protection",
            value: "1; mode=block",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          // Permissions policy
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
    ];
  },
  
  // ============================================================================
  // REDIRECTS
  // ============================================================================
  async redirects() {
    return [
      // Redirect deprecated routes
      {
        source: "/old-route",
        destination: "/new-route",
        permanent: false,
      },
    ];
  },
  
  // ============================================================================
  // REWRITES
  // ============================================================================
  async rewrites() {
    return {
      beforeFiles: [
        // Add any beforeFiles rewrites here
      ],
      afterFiles: [
        // Add any afterFiles rewrites here
      ],
      fallback: [
        // Add any fallback rewrites here
      ],
    };
  },
  
  // ============================================================================
  // BUILD & DEPLOYMENT
  // ============================================================================
  // Output standalone for Docker/self-hosted
  output: process.env.STANDALONE === "true" ? "standalone" : undefined,
  
  // Production source maps (for error tracking)
  productionBrowserSourceMaps: process.env.ENABLE_SOURCE_MAPS === "true",
  
  // ============================================================================
  // LOCALIZATION (if needed)
  // ============================================================================
  i18n: undefined, // Disable i18n routing in favor of app directory
  
  // ============================================================================
  // ENVIRONMENT VARIABLES
  // ============================================================================
  env: {
    // Add any publicly available env vars here if needed
  },
};

export default nextConfig;
