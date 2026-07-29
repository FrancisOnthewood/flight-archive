const nextConfig = {
  output: "standalone",
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
