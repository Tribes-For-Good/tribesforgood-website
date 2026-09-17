/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Next refuses to optimise SVGs unless this is set, which was leaving every
    // SVG rendered through next/image broken (the nav hamburger, social icons,
    // hero art). All SVGs here are first-party; the CSP below sandboxes them so
    // an SVG cannot execute script.
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    remotePatterns: [
      {
        protocol: "https",
        hostname: "wp.tribesforgood.com",
      },
    ],
  },
  async redirects() {
    return [
      // Young Advocates Program archived Aug 2026. The page code is kept in
      // src/app/advocates-program so it can be restored, but the route now
      // sends visitors to the programmes listing. 301 so search engines and
      // any old links follow it permanently.
      {
        source: "/advocates-program",
        destination: "/school-programs",
        permanent: true,
      },
    ];
  },
  async rewrites() {
    return [
      {
        source:
          "/:slug((?!about|advocates-program|blogs|careers|changemakers|contact|featured-projects|impact-travel|innovators-hub|privacy|professionals|school-programs|favicon.ico|_next|api|scripts).*)", // Dynamic route, excluding known paths
        destination: "/blogs/view/:slug", // Map to the original blog route
      },
      {
        source: "/scripts/fb.js",
        destination: "https://connect.facebook.net/en_US/fbevents.js",
      },
      {
        source: "/api/fb-tr",
        destination: "https://www.facebook.com/tr",
      },
    ];
  },
};
export default nextConfig;
