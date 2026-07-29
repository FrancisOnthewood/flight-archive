const nextConfig = {
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
