/** @type {import('next').NextConfig} */
const validImageHosts = ["lh3.googleusercontent.com", "s.gravatar.com"]
const nextConfig = {
	reactStrictMode: true,
	publicRuntimeConfig: {
		apiBaseUrl: process.env.NEXT_BASE_URL
	},
	eslint: {
		dirs: ["src", "app", "components", "lib", "utils"]
	},
	// allow image from external source
	images: {
		// wild card for all image host
		// remotePatterns: [{ protocol: "https", hostname: "**.com" }]
		remotePatterns: validImageHosts.map((host) => ({ hostname: host }))
	}
}

export default nextConfig
