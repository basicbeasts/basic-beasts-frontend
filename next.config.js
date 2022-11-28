const nextTranslate = require("next-translate")

/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  ...nextTranslate(),
  async redirects() {
    return [
      {
        source: "/profile",
        destination: "/",
        permanent: true,
      },
    ]
  },
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "https://api.basicbeasts.io/:path*",
      },
    ]
  },
}
