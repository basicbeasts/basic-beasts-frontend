const nextTranslate = require("next-translate")

/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  ...nextTranslate(),
}
