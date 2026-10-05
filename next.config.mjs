/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      { source: "/app", destination: "/app/board", permanent: false },
      { source: "/app/", destination: "/app/board", permanent: false },
    ];
  },
};

export default nextConfig;
