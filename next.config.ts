// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {

  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },
  
  images: {
    remotePatterns: [
      { protocol: "http", hostname: "127.0.0.1", port: "8080", pathname: "/**" },
      { protocol: "https", hostname: "static1.mujerhoy.com", pathname: "/**" },
      { protocol: "https", hostname: "images-na.ssl-images-amazon.com", pathname: "/**" },
      { protocol: "https", hostname: "m.media-amazon.com", pathname: "/**" },
      { protocol: "https", hostname: "imagessl.casadellibro.com", pathname: "/**" },
      { protocol: "https", hostname: "highclass.com.py", pathname: "/**" },
      { protocol: "https", hostname: "d28hgpri8am2if.cloudfront.net", pathname: "/**" },
      { protocol: "https", hostname: "upload.wikimedia.org", pathname: "/**" },
      { protocol: "https", hostname: "i.pinimg.com", pathname: "/**" },
      { protocol: "https", hostname: "pictures.abebooks.com", pathname: "/**" },
      { protocol: "https", hostname: "images.gr-assets.com", pathname: "/**" },
      { protocol: "https", hostname: "trabalibros.com", pathname: "/**" },
      { protocol: "https", hostname: "bogota.gov.co", pathname: "/**" },
      { protocol: "https", hostname: "static01.nyt.com", pathname: "/**" },
      { protocol: "https", hostname: "images.cdn3.buscalibre.com", pathname: "/**" },
      { protocol: "https", hostname: "intelecto.com.co", pathname: "/**" },
      { protocol: "https", hostname: "images-na.ssl-images-amazon.com", pathname: "/**" },
      { protocol: "https", hostname: "www.tornamesa.co", pathname: "/**" },
      { protocol: "https", hostname: "images.cdn1.buscalibre.com", pathname: "/**" },
    ],
  },
};

export default nextConfig;
