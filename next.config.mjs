/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    dirs: ["src", "app", "components", "lib", "utils"],
  },
  i18n: {
    locales: ["en", "es", "fr"], // Supported languages
    defaultLocale: "en", // Default language
  },
}

export default nextConfig
