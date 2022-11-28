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
  async headers() {
    return [
      {
        source: "/_next/:path*",
        headers: [
          { key: "Access-Control-Allow-Origin", value: "http://example.com" },
        ],
      },
    ]
  },
}
