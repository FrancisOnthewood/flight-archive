const nextConfig = {
  output: "standalone",
  distDir: "dist",
  async redirects() {
    return [
      {
        source: "/",
        destination: "/atlas.html",
        permanent: false
      }
    ];
  }
};

export default nextConfig;
