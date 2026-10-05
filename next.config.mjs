/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      // The old single-edition site's Connect page is Contact in the professional edition.
      { source: "/connect", destination: "/contact", permanent: true },
    ];
  },
};

export default nextConfig;
